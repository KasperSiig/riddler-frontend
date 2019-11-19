import { State, Action, StateContext } from '@ngxs/store';
import { JobStateModel } from './job-state.model';
import { AddJobs } from './job.actions';

@State<JobStateModel>({
	name: 'jobs',
	defaults: {
		jobs: [],
	},
})
export class JobsState {
	@Action(AddJobs)
	addJobs(
		{ getState, patchState }: StateContext<JobStateModel>,
		{ jobs }: AddJobs,
	) {
		patchState({
			jobs: [...getState().jobs, ...jobs],
		});
	}
}
