import { JobStateModel } from '../job-state.model';
import { Store, NgxsModule } from '@ngxs/store';
import { TestBed, async } from '@angular/core/testing';
import { JobsState } from '../job.state';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AddJobs, GetJobs } from '../job.actions';
import { JobSelectors } from '../job.selectors';
import { of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const DESIRED_STATE = {
	jobs: {
		jobs: [{ file: 'passwd.txt', name: 'test' }],
	},
};

const TEST_JOB = { file: 'passwd1.txt', name: 'test' };

describe('Job Actions', () => {
	let store: Store;
	const httpMock = {
		get: jest.fn(() => {
			return of([TEST_JOB]);
		}),
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [NgxsModule.forRoot([JobsState]), HttpClientTestingModule],
			providers: [
				{
					provide: HttpClient,
					useValue: httpMock,
				},
			],
		}).compileComponents();

		store = TestBed.get(Store);
		store.reset(DESIRED_STATE);
	}));

	it('should get jobs', () => {
		store.dispatch(new GetJobs());
		store.selectOnce(JobSelectors.jobs).subscribe(jobsRtn => {
			expect(jobsRtn).toEqual([TEST_JOB]);
		});
	});

	it('should add jobs', () => {
		const jobs = [{ file: 'passwd.txt', name: 'test' }];
		const expected = [...DESIRED_STATE.jobs.jobs, ...jobs];
		store.dispatch(new AddJobs(jobs));
		store.selectOnce(JobSelectors.jobs).subscribe(jobsRtn => {
			expect(jobsRtn).toBe(expected);
		});
	});
});
