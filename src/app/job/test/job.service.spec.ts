import {
	HttpClientTestingModule,
	HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { Job } from 'src/app/shared/store';
import { environment } from 'src/environments/environment';
import { JobService } from '../services/job.service';

describe('JobService', () => {
	let service: JobService;
	let httpController: HttpTestingController;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
		}).compileComponents();

		service = TestBed.get(JobService);
		httpController = TestBed.get(HttpTestingController);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should request backend to start job', () => {
		service.startJob({} as Job, {} as File).subscribe(() => {
			const req = httpController.expectOne(environment.apiUrl + 'jobs/new');

			expect(req.request.method).toEqual('POST');
		});
	});
});
