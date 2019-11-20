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
	@Select(JobSelectors.jobs) jobs: Observable<Job[]>;

	constructor(private store: Store) {}

	ngOnInit() {
		this.store.dispatch(new GetJobs());
	}
}
