import {
	HttpClientTestingModule,
	HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from '../../../environments/environment';
import { RulesService } from '../rules.service';

describe('RulesService', () => {
	let service: RulesService;
	let httpController: HttpTestingController;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
		}).compileComponents();

		service = TestBed.get(RulesService);
		httpController = TestBed.get(HttpTestingController);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should call backend to get all rules', async () => {
		service.getAll().subscribe(() => {
			const req = httpController.expectOne(environment.apiUrl + 'rules');

			expect(req.request.method).toEqual('GET');
		});
	});
});
