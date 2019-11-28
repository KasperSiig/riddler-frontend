import { Component, OnInit } from '@angular/core';
import { Params } from '@angular/router';
import { Store } from '@ngxs/store';
import { switchMap } from 'rxjs/operators';
import { Job, GetJobs, JobSelectors } from '../shared/store';
import { RouterSelectors } from '../shared/store/router/router.selectors';
import { StatsService } from './services/stats.service';

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

	constructor(private store: Store, private statsSvc: StatsService) { }

	ngOnInit() {
		this.store.dispatch(new GetJobs());
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
}

