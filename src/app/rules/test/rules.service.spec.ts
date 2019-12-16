import { TestBed } from '@angular/core/testing';

import { RulesService } from '../rules.service';
import {
	HttpClientTestingModule,
	HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';

describe('RulesService', () => {
	let service: RulesService;
	let httpController: HttpTestingController;

	beforeEach(() =>
		TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
		}),
	);

	it('should be created', () => {
		service = TestBed.get(RulesService);
		httpController = TestBed.get(HttpTestingController);
		expect(service).toBeTruthy();
	});

	it('should call backend to get all rules', async () => {
		service.getAll().subscribe(() => {
			const req = httpController.expectOne(environment.apiUrl + 'rules');

			expect(req.request.method).toEqual('GET');
		});
	});
});
