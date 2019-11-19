import { Job } from './job.model';

/**
 * Adds jobs to store
 */
export class AddJobs {
	static readonly type = '[Jobs] Add Jobs';
	constructor(public jobs: Job[]) {}
}
