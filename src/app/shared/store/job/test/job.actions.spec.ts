import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { AddJobs, GetJobs } from '../job.actions';
import { JobSelectors } from '../job.selectors';
import { JobsState } from '../job.state';

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

	beforeEach(async () => {
		await TestBed.configureTestingModule({
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
	});

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
