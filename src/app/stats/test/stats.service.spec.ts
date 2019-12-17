import {
	HttpClientTestingModule,
	HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { StatsService } from '../services/stats.service';

describe('StatsService', () => {
	let service: StatsService;
	let httpController: HttpTestingController;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
		}).compileComponents();

		service = TestBed.get(StatsService);
		httpController = TestBed.get(HttpTestingController);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should get admin stats from backend', () => {
		service.getAdminsCracked('id').subscribe(() => {
			const req = httpController.expectOne(
				environment.apiUrl + 'stats/id/admins',
			);

			expect(req.request.method).toEqual('GET');
		});
	});

	it('should get all stats from backend', () => {
		service.getAllCracked('id').subscribe(() => {
			const req = httpController.expectOne(environment.apiUrl + 'stats/id/all');

			expect(req.request.method).toEqual('GET');
		});
	});

	it('should call the backend to export stats', () => {
		service.exportStats('id').subscribe(() => {
			const req = httpController.expectOne(
				environment.apiUrl + 'stats/id/export',
			);
			expect(req.request.method).toEqual('GET');
		});
	});

	it('should get password frequency from backend', () => {
		const password = 'test123';
		service.getFrequency('id', password).subscribe(() => {
			const req = httpController.expectOne(
				environment.apiUrl + 'stats/id/frequency?password=' + password,
			);
			expect(req.request.method).toEqual('GET');
		});
	});

	it('should call the backend to get top 10 stats', () => {
		service.getTopTenStats('id').subscribe(() => {
			const req = httpController.expectOne(
				environment.apiUrl + 'stats/id/topten',
			);
			expect(req.request.method).toEqual('GET');
		});
	});
});
