import { JobStateModel } from '../job-state.model';
import { JobSelectors } from '../job.selectors';

describe('Job Selectors', () => {
	it('should select all jobs', () => {
		const jobState: JobStateModel = {
			jobs: [{ name: 'test' }],
		};
		expect(JobSelectors.jobs(jobState)).toBe(jobState.jobs);
	});

	it('should select a single job', () => {
		const jobState: JobStateModel = {
			jobs: [{ _id: 'test', name: 'test' }],
		};
		expect(JobSelectors.job(jobState.jobs[0]._id)(jobState)).toBe(
			jobState.jobs[0],
		);
	});
});
