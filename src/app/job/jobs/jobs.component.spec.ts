import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobsComponent } from './jobs.component';
import { StatusComponent } from '../status/status.component';
import { StoreModule } from '../../shared/store/store.module';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { StartJobComponent } from '../start-job/start-job.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('JobsComponent', () => {
	let component: JobsComponent;
	let fixture: ComponentFixture<JobsComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [JobsComponent, StatusComponent, StartJobComponent],
			imports: [
				StoreModule,
				RouterTestingModule,
				ReactiveFormsModule,
				MatInputModule,
				MatButtonModule,
				MatSelectModule,
				BrowserAnimationsModule,
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(JobsComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should select jobs from store', () => {
		expect(component.jobs).toBeTruthy();
	});

	it('should show two jobs', () => {
		const jobs = [
			{ file: 'password.txt', name: 'Sommer2019' },
			{ file: 'password2.txt', name: 'Sommer2020' },
		];

		Object.defineProperty(component, 'jobs', { writable: true });
		component.jobs = of(jobs);
		fixture.detectChanges();

		const el: HTMLElement = fixture.debugElement.nativeElement;
		const status = el.querySelectorAll('app-status');

		expect(status.length).toBe(3);
	});
});
