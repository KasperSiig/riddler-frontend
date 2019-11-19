import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Job, JobSelectors, STATUS, AddJobs } from '../../shared/store/job';
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

	// TODO: Remove this
	ngOnInit() {
		const jobs = [
			{
				file: 'password.txt',
				name: 'Sommer2019',
				wordlist: 'ripper1',
				status: STATUS.STARTED,
			},
			{
				file: 'password.txt',
				name: 'Fall2019',
				wordlist: 'ripper1',
				status: STATUS.FINISHED,
			},
			{
				file: 'password.txt',
				name: 'NewYar2019',
				wordlist: 'wordlist.txt',
				status: STATUS.PAUSED,
			},
			{
				file: 'password.txt',
				name: 'Som2019',
				wordlist: 'ripper1',
				status: STATUS.STARTED,
			},
		];
		this.store.dispatch(new AddJobs(jobs));
	}
}
