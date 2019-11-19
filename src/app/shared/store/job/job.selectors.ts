import { Selector } from '@ngxs/store';
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
}
