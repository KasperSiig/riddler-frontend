import { Selector } from '@ngxs/store';
import { JobsState } from './job.state';
import { JobStateModel } from './job-state.model';

export class JobSelectors {
	/**
	 * @emits - All Jobs in store
	 */
	@Selector([JobsState])
	static jobs({ jobs }: JobStateModel) {
		return jobs;
	}
}
