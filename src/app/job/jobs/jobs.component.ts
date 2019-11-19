import { Component, OnInit } from '@angular/core';
import { Select } from '@ngxs/store';
import { Job, JobSelectors } from '../../shared/store/job';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-jobs',
	templateUrl: './jobs.component.html',
	styleUrls: ['./jobs.component.scss'],
})
export class JobsComponent implements OnInit {
	constructor() {}
	/**
	 * @description Selects all jobs
	 */
	@Select(JobSelectors.jobs) jobs: Observable<Job[]>;

	ngOnInit() {}
}
