import { Job } from './job.model';

/**
 * Adds jobs to store
 */
export class AddJobs {
	static readonly type = '[Jobs] Add Jobs';
	constructor(public jobs: Job[]) {}
}

export class GetJobs {
	static readonly type = '[Jobs] Get Jobs';
	constructor() {}
}
