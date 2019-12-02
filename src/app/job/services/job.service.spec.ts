import { fakeAsync, TestBed } from '@angular/core/testing';

import { JobService } from './job.service';
import {
	HttpClientTestingModule,
	HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';

describe('JobService', () => {
	let service: JobService;
	let httpController: HttpTestingController;

	beforeEach(() => {

		TestBed.configureTestingModule({
			imports: [
				HttpClientTestingModule,
			]
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
			file: 'passwd.txt',
			wordlist: 'wordlist.txt',
		};
		service.startJob(job).subscribe();

		const req = httpController.expectOne(environment.apiUrl + 'jobs/new');

		expect(req.request.method).toEqual('POST');

		req.flush(job);
	});

	it('returned observable should match data', fakeAsync(async () => {
		const mockFile = new File([''], 'filename', {type: 'text/plain'});
		service.uploadFile(mockFile).subscribe();
		const req = httpController.expectOne(environment.apiUrl + '/files');
		expect(req.request.method).toEqual('POST');
	}));
});
