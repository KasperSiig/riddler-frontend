import { HttpClient } from '@angular/common/http';
import { Action, State, StateContext } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { JobStateModel } from './job-state.model';
import { AddJobs, GetJobs } from './job.actions';
import { Job } from './job.model';

@State<JobStateModel>({
	name: 'jobs',
	defaults: {
		jobs: [],
	},
})
export class JobsState {
	constructor(private http: HttpClient) {}

	/**
	 * Adds jobs to to store
	 */
	@Action(AddJobs)
	addJobs(
		{ getState, patchState }: StateContext<JobStateModel>,
		{ jobs }: AddJobs,
	) {
		patchState({
			jobs: [...getState().jobs, ...jobs],
		});
	}

	/**
	 * Gets jobs from backup and replaces them in store
	 */
	@Action(GetJobs)
	getJobs({ setState }: StateContext<JobStateModel>) {
		this.http.get<Job[]>(environment.apiUrl + 'jobs').subscribe(jobs => {
			setState({
				jobs,
			});
		});
	}
}
