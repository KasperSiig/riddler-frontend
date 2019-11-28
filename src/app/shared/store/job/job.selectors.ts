import { Selector, createSelector } from '@ngxs/store';
import { JobsState } from './job.state';
import { JobStateModel } from './job-state.model';
import { Job } from './job.model';

export class JobSelectors {
	/**
	 * @emits - All Jobs in store
	 */
	@Selector([JobsState])
	static jobs({ jobs }: JobStateModel): Job[] {
		return jobs;
	}

	static job(id: string) {
		return createSelector([JobsState], ({ jobs }: JobStateModel) => {
			return jobs.find(j => j._id === id);
		});
	}
}
