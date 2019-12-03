import { TestBed } from '@angular/core/testing';

import { StatsService } from './stats.service';
import {
	HttpClientTestingModule,
	HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';

describe('StatsService', () => {
	let service: StatsService;
	let httpController: HttpTestingController;

	beforeEach(() =>
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
		}),
	);

	it('should be created', () => {
		service = TestBed.get(StatsService);
		httpController = TestBed.get(HttpTestingController);
		expect(service).toBeTruthy();
	});

	it('should get admin stats from backend', () => {
		service.getAdminsCracked('id').subscribe();

		const req = httpController.expectOne(
			environment.apiUrl + 'stats/id/admins',
		);

		expect(req.request.method).toEqual('GET');
	});

	it('should get all stats from backend', () => {
		service.getAllCracked('id').subscribe();

		const req = httpController.expectOne(environment.apiUrl + 'stats/id/all');

		expect(req.request.method).toEqual('GET');
	});

	it('should call the backend to export stats', () => {
		service.exportStats('id').subscribe();
		const req = httpController.expectOne(
			environment.apiUrl + 'stats/id/export',
		);
		expect(req.request.method).toEqual('GET');
	});
});
