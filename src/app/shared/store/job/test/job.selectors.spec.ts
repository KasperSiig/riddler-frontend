import { JobStateModel } from '../job-state.model';
import { JobSelectors } from '../job.selectors';

describe('Job Selectors', () => {
	it('should select all jobs', () => {
		const jobState: JobStateModel = {
			jobs: [{ file: 'passwd.txt', name: 'test' }],
		};
		expect(JobSelectors.jobs(jobState)).toBe(jobState.jobs);
	});
});
