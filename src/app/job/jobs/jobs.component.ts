import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import {
	Job,
	JobSelectors,
	STATUS,
	AddJobs,
	GetJobs,
} from '../../shared/store/job';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-jobs',
	templateUrl: './jobs.component.html',
	styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent implements OnInit {
	/**
	 * @description Selects all jobs
	 */
	jobs: Job[];
	sorting = 'time';

	constructor(private store: Store) {}

	ngOnInit() {
		this.store.dispatch(new GetJobs());
		this.store.select(JobSelectors.jobs).subscribe(jobs => {
			this.jobs = jobs;
		});
	}

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
