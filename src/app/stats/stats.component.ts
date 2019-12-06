import { Component, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { Store } from '@ngxs/store';
import { debounceTime, switchMap } from 'rxjs/operators';
import { GetJobs, Job, JobSelectors } from '../shared/store';
import { RouterSelectors } from '../shared/store/router/router.selectors';
import { StatsService } from './services/stats.service';
import { saveAs } from 'file-saver';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-stats',
	templateUrl: './stats.component.html',
	styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
	job: Job;
	params: Params;
	adminsCracked: { total: number; cracked: number; percentage: number };
	allCracked: { total: number; cracked: number; percentage: number };
	passwdFreq: number;
	req: number;

	constructor(private store: Store, private statsSvc: StatsService) {}

	ngOnInit() {
		this.store.dispatch(new GetJobs());
		this.passwdFreq = 0;
		this.req = Date.now();
		this.params = this.store.selectSnapshot(RouterSelectors.params);
		this.store.select(JobSelectors.job(this.params.id)).subscribe(job => {
			this.job = job;
		});
		this.statsSvc
			.getAdminsCracked(this.params.id)
			.pipe(
				switchMap(stats => {
					this.adminsCracked = stats;
					return this.statsSvc.getAllCracked(this.params.id);
				}),
			)
			.subscribe(stats => {
				this.allCracked = stats;
			});
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
		if (Date.now() > this.req + 100) {
			this.statsSvc
				.getFrequency(this.job._id, event.target.value)
				.subscribe(res => {
					this.passwdFreq = res.count;
				});
			this.req = Date.now();
		}
	}
}
