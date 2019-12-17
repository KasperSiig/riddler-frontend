import { Component, OnDestroy, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { Store } from '@ngxs/store';
import { saveAs } from 'file-saver';
import { Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { GetJobs, Job, JobSelectors } from '../shared/store';
import { RouterSelectors } from '../shared/store/router/router.selectors';
import { StatsService } from './services/stats.service';

@Component({
	selector: 'app-stats',
	templateUrl: './stats.component.html',
	styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit, OnDestroy {
	job: Job;
	params: Params;

	// Data to populate pie charts
	adminsCracked: { total: number; cracked: number; percentage: number };
	adminsCrackedData: number[];
	allCracked: { total: number; cracked: number; percentage: number };
	allCrackedData: number[];

	// Data to populate top 10 graph
	top10Data: { data: number[] }[];
	top10Labels: string[];
	top10: { password: string; count: number }[] = [
		{ password: '#Password', count: 10 },
	];

	// How many times a given password has been used
	passwdFreq: number;

	// Keeps track of when the last request was sent
	lastReqSent: number;

	// Contains all active subscriptions
	subscription: Subscription;

	constructor(private store: Store, private statsSvc: StatsService) {}

	ngOnInit() {
		this.store.dispatch(new GetJobs());
		this.passwdFreq = 0;
		this.lastReqSent = Date.now();

		// Initializing data for charts
		this.top10Data = [{ data: [] }];
		this.top10Labels = [];
		this.adminsCrackedData = [0, 0];
		this.allCrackedData = [0, 0];

		this.params = this.store.selectSnapshot(RouterSelectors.params);
		this.subscription = this.store
			.select(JobSelectors.job(this.params.id))
			.subscribe(job => {
				this.job = job;
				if (job)
					this.statsSvc
						.getTopTenStats(this.job._id)
						.subscribe(dataArr => this.setTop10Stats(dataArr));
			});

		this.statsSvc
			.getAdminsCracked(this.params.id)
			.pipe(
				switchMap(stats => {
					this.adminsCrackedData = [stats.total - stats.cracked, stats.cracked];
					this.adminsCracked = stats;
					return this.statsSvc.getAllCracked(this.params.id);
				}),
			)
			.subscribe(stats => {
				this.allCrackedData = [stats.total - stats.cracked, stats.cracked];
				this.allCracked = stats;
			});
	}

	ngOnDestroy() {
		if (this.subscription) this.subscription.unsubscribe();
	}

	/**
	 * Sets the data for top 10 stats
	 *
	 * @param dataArr Array containing top 10 stats
	 */
	setTop10Stats(dataArr: { password: string; count: number }[]) {
		this.top10Data = [{ data: dataArr.map(p => p.count) }];
		this.top10Labels = dataArr.map(p => p.password);
	}

	/**
	 * Gets data from given stats to use in pie chart
	 *
	 * @param stats Stats to get data from
	 */
	getDataForPie(stats: { total: number; cracked: number; percentage: number }) {
		if (!stats) return [0, 0];
		return [stats.total - stats.cracked, stats.cracked];
	}

	/**
	 * Exports stats retrieved from backend
	 */
	exportStats() {
		this.statsSvc.exportStats(this.job._id).subscribe(res => {
			const blob = new Blob([res.stats], { type: 'text/csv' });
			saveAs(blob, 'stats.csv');
		});
	}

	/**
	 * Get password frequency of a password
	 * Sends request every 500 milliseconds when user types a password in field
	 *
	 * @param event Event when user types a password
	 */
	getFrequency(event: any) {
		if (Date.now() > this.lastReqSent + 100) {
			this.statsSvc
				.getFrequency(this.job._id, event.target.value)
				.subscribe(res => {
					this.passwdFreq = res.count;
				});
			this.lastReqSent = Date.now();
		}
	}
}
