import { State, Action, StateContext } from '@ngxs/store';
import { JobStateModel } from './job-state.model';
import { AddJobs, GetJobs } from './job.actions';
import { HttpClient } from '@angular/common/http';
import { Job } from './job.model';
import { environment } from 'src/environments/environment';

@State<JobStateModel>({
	name: 'jobs',
	defaults: {
		jobs: [],
	},
})
export class JobsState {
	constructor(private http: HttpClient) {}

	@Action(AddJobs)
	addJobs(
		{ getState, patchState }: StateContext<JobStateModel>,
		{ jobs }: AddJobs,
	) {
		patchState({
			jobs: [...getState().jobs, ...jobs],
		});
	}

	@Action(GetJobs)
	getJobs(state: StateContext<JobStateModel>) {
		this.http.get<Job[]>(environment.apiUrl + 'jobs').subscribe(jobs => {
			this.addJobs(state, new AddJobs(jobs));
		});
	}
}
