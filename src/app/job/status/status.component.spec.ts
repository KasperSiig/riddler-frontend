import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
	MatButtonModule,
	MatCardModule,
	MatExpansionModule,
	MatIconModule,
	MatInputModule,
	MatListModule,
	MatSelectModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngxs/store';
import { Job, STATUS } from '../../shared/store/job';
import { StoreModule } from '../../shared/store/store.module';
import { JobsComponent } from '../jobs/jobs.component';
import { StartJobComponent } from '../start-job/start-job.component';
import { StatusComponent } from './status.component';

describe('Status Component', () => {
	let testHostComponent: TestHostComponent;
	let testHostFixture: ComponentFixture<TestHostComponent>;
	let component: StatusComponent;
	let job: Job;
	let router: Router;
	let store: Store;
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				StatusComponent,
				TestHostComponent,
				JobsComponent,
				StartJobComponent,
				DummyComponent,
			],
			imports: [
				StoreModule,
				RouterTestingModule.withRoutes([
					{ path: 'jobs', component: JobsComponent },
					{ path: 'stats/:id', component: DummyComponent },
				]),
				MatButtonModule,
				MatInputModule,
				MatSelectModule,
				BrowserAnimationsModule,
				ReactiveFormsModule,
				MatListModule,
				MatExpansionModule,
				MatCardModule,
				MatIconModule,
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		job = {
			_id: 'test',
			file: 'password.txt',
			name: 'Sommer2019',
			wordlist: 'ripper1',
			status: STATUS.STARTED,
			time: new Date(2020, 1, 1).getMinutes(),
		};
		router = TestBed.get<Router>(Router);
		store = TestBed.get<Store>(Store);
		testHostFixture = TestBed.createComponent(TestHostComponent);
		testHostComponent = testHostFixture.componentInstance;
		testHostFixture.detectChanges();
		component = testHostFixture.debugElement.children[0].componentInstance;
	});

	it('should create', () => {
		expect(testHostComponent).toBeTruthy();
	});

	it('should contain name', () => {
		Object.defineProperty(testHostComponent, 'job', { writable: true });
		component.job = job;
		testHostFixture.detectChanges();

		const el: HTMLElement = testHostFixture.debugElement.nativeElement;
		const name = el.querySelector('.job__name');
		expect(name.textContent.trim()).toEqual(job.name);
	});

	it('should contain the wordlist', () => {
		Object.defineProperty(testHostComponent, 'job', { writable: true });
		component.job = job;
		testHostFixture.detectChanges();

		const el: HTMLElement = testHostFixture.debugElement.nativeElement;
		const name = el.querySelector('.job__wordlist');
		expect(name.textContent.trim()).toEqual(job.wordlist);
	});

	it('should contain a date', () => {
		Object.defineProperty(testHostComponent, 'job', { writable: true });
		component.job = job;
		testHostFixture.detectChanges();

		const el: HTMLElement = testHostFixture.debugElement.nativeElement;
		const time = el.querySelectorAll('.job__time');
		expect(time.length).toBe(1);
	});

	it('should contain a status', () => {
		Object.defineProperty(testHostComponent, 'job', { writable: true });
		component.job = job;
		testHostFixture.detectChanges();

		const el: HTMLElement = testHostFixture.debugElement.nativeElement;
		const name = el.querySelector('.job__status');
		expect(name.className).toContain('job__status__yellow');
	});

	@Component({
		selector: 'app-host-component',
		template: `
			<app-status job="job"></app-status>
		`,
	})
	class TestHostComponent {}

	@Component({
		selector: 'app-dummy-component',
		template: `
			<div></div>
		`,
	})
	class DummyComponent {}
});
