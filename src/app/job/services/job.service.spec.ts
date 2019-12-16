import {
	HttpClientTestingModule,
	HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { JobService } from './job.service';

describe('JobService', () => {
	let service: JobService;
	let httpController: HttpTestingController;

	beforeEach(() => {
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
		});
	});

	it('should be created', () => {
		service = TestBed.get(JobService);
		httpController = TestBed.get(HttpTestingController);
		expect(service).toBeTruthy();
	});

	it('should request backend to start job', () => {
		const job = {
			name: 'test',
			wordlist: {
				_id: 'default',
				name: 'default',
				path: '/opt/jtr/wordlist.txt',
			},
		};
		const mockFile = new File([''], 'filename', { type: 'text/plain' });
		service.startJob(job, mockFile).subscribe(() => {
			const req = httpController.expectOne(environment.apiUrl + 'jobs/new');

			expect(req.request.method).toEqual('POST');

			req.flush(job);
		});
	});
});
