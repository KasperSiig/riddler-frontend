import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngxs/store';
import { of } from 'rxjs';
import { StoreModule } from 'src/app/shared/store/store.module';
import { JobService } from '..';
import { select, selectAll } from '../../../test';
import { StartJobComponent } from '../start-job/start-job.component';

describe('StartJobComponent', () => {
	let component: StartJobComponent;
	let fixture: ComponentFixture<StartJobComponent>;

	let jobSvc: JobService;
	let store: Store;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			declarations: [StartJobComponent],
			imports: [
				MatInputModule,
				MatSelectModule,
				MatButtonModule,
				BrowserAnimationsModule,
				ReactiveFormsModule,
				StoreModule,
				RouterTestingModule,
				MatSnackBarModule,
				HttpClientTestingModule,
			],
			providers: [JobService, Store],
		}).compileComponents();

		fixture = TestBed.createComponent(StartJobComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();

		jobSvc = TestBed.get<JobService>(JobService);
		store = TestBed.get<Store>(Store);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should contain two inputs', () => {
		expect(selectAll(fixture, 'input').length).toBe(2);
	});

	it('should contain one text field', () => {
		expect(selectAll(fixture, 'form').length).toBe(1);
	});

	it('should contain specified wordlist', () => {
		const wordlist = 'wordlist.txt';
		component.jobForm.patchValue({
			wordlist,
		});
		expect(component.jobForm.get('wordlist').value).toBe(wordlist);
	});

	it('should call service on click', () => {
		const spy = jest.spyOn(jobSvc, 'startJob').mockImplementation(() => of(''));
		(select(fixture, '.start__submit') as HTMLElement).click();
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should get new jobs after starting', async () => {
		jest.spyOn(jobSvc, 'startJob').mockImplementation(() => of(''));
		const spy = jest.spyOn(store, 'dispatch').mockImplementation(() => of(''));
		component.jobForm.patchValue({
			name: 'test',
			file: 'passwd.txt',
			wordlist: 'wordlist.txt',
		});
		component.onSubmit();
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should show a file in textfield', () => {
		component.chooseFile({ target: { files: [{ name: 'test.txt' }] } });
		expect(component.filename).toBe('test.txt');
	});
});
