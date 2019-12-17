import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetJobs, Job, JobSelectors } from '../../shared/store/job';
import { Subscription } from 'rxjs';

@Component({
	selector: 'app-jobs',
	templateUrl: './jobs.component.html',
	styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent implements OnInit, OnDestroy {
	// Contains all jobs
	jobs: Job[];

	// Specifies how the jobs should be sorted
	sorting = 'time';

	// Contains active subscriptions within this component
	subscription: Subscription;

	constructor(private store: Store) {}

	ngOnInit() {
		this.store.dispatch(new GetJobs());
		this.subscription = this.store.select(JobSelectors.jobs).subscribe(jobs => {
			this.jobs = jobs;
		});
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
	}

	/**
	 * Sorts jobs
	 *
	 * @param sorting What to sort the jobs by
	 */
	setSorting(sorting: string) {
		this.sorting = this.sorting === sorting ? sorting + 'reversed' : sorting;
		if (this.sorting.includes('reversed')) {
			this.jobs = this.jobs.slice().sort((joba, jobb) => {
				return jobb[sorting].toString().localeCompare(joba[sorting].toString());
			});
		} else {
			this.jobs = this.jobs.slice().sort((joba, jobb) => {
				return joba[sorting].toString().localeCompare(jobb[sorting].toString());
			});
		}
	}
}
