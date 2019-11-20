import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartJobComponent } from './start-job.component';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { JobService, JobModule } from '..';
import { MatButtonModule } from '@angular/material/button';
import { of } from 'rxjs';
import { StoreModule } from 'src/app/shared/store/store.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngxs/store';

describe('StartJobComponent', () => {
	const jobSvcMock = {
		startJob: jest.fn(() => of('')),
	};
	const storeMock = {
		dispatch: jest.fn(() => {}),
		select: jest.fn(() => of('')),
	};
	let component: StartJobComponent;
	let fixture: ComponentFixture<StartJobComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [StartJobComponent],
			imports: [
				MatInputModule,
				MatSelectModule,
				MatButtonModule,
				BrowserAnimationsModule,
				ReactiveFormsModule,
				StoreModule,
				RouterTestingModule,
			],
			providers: [
				{
					provide: JobService,
					useValue: jobSvcMock,
				},
				{
					provide: Store,
					useValue: storeMock,
				},
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(StartJobComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should contain two text fields', () => {
		const el: HTMLElement = fixture.debugElement.nativeElement;
		const textFields = el.querySelectorAll('input');

		expect(textFields.length).toBe(2);
	});

	it('should contain two text fields', () => {
		const el: HTMLElement = fixture.debugElement.nativeElement;
		const textFields = el.querySelectorAll('form');

		expect(textFields.length).toBe(1);
	});

	it('should contain specified wordlist', () => {
		const wordlist = 'wordlist.txt';
		component.jobForm.patchValue({
			wordlist,
		});
		expect(component.jobForm.get('wordlist').value).toBe(wordlist);
	});

	it('should call service on click', () => {
		jobSvcMock.startJob.mockClear();
		const el: HTMLElement = fixture.debugElement.nativeElement;
		const submitBtn: HTMLElement = el.querySelector('.start__submit');

		submitBtn.click();
		expect(jobSvcMock.startJob).toHaveBeenCalledTimes(1);
	});

	it('should get new jobs after starting', async () => {
		storeMock.dispatch.mockClear();
		const job = {
			name: 'test',
			file: 'passwd.txt',
			wordlist: 'wordlist.txt',
		};
		component.jobForm.patchValue(job);
		component.onSubmit();
		expect(storeMock.dispatch).toHaveBeenCalledTimes(1);
	});
});
