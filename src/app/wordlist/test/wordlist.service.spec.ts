import {
	HttpClientTestingModule,
	HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { environment } from 'src/environments/environment';
import { WordlistService } from '../wordlist.service';
import { Wordlist } from 'src/app/shared/store';

describe('WordlistService', () => {
	let service: WordlistService;
	let httpController: HttpTestingController;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [HttpClientTestingModule],
		}).compileComponents();
		service = TestBed.get(WordlistService);
		httpController = TestBed.get(HttpTestingController);
	});

	it('should be created', () => {
		expect(service).toBeTruthy();
	});

	it('should send delete request to backend', async () => {
		service.delete('id').subscribe();
		const req = httpController.expectOne(environment.apiUrl + 'wordlist/id');

		expect(req.request.method).toEqual('DELETE');
	});

	it('should send update request to backend', async () => {
		service.updateOne({ _id: 'id' } as Wordlist).subscribe();
		const req = httpController.expectOne(environment.apiUrl + 'wordlist/id');

		expect(req.request.method).toEqual('PUT');
	});
});
