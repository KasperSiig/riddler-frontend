import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
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
import { select, selectAll, setProp } from '../../../test';
import { STATUS } from '../../shared/store/job';
import { StoreModule } from '../../shared/store/store.module';
import { JobsComponent } from '../jobs/jobs.component';
import { StartJobComponent } from '../start-job/start-job.component';
import { StatusComponent } from '../status/status.component';

describe('Status Component', () => {
	let testHostComponent: TestHostComponent;
	let testHostFixture: ComponentFixture<TestHostComponent>;
	let component: StatusComponent;

	let router: Router;
	let store: Store;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
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

		testHostFixture = TestBed.createComponent(TestHostComponent);
		testHostComponent = testHostFixture.componentInstance;

		testHostFixture.detectChanges();
		component = testHostFixture.debugElement.children[0].componentInstance;

		router = TestBed.get<Router>(Router);
		store = TestBed.get<Store>(Store);
	});

	it('should create', () => {
		expect(testHostComponent).toBeTruthy();
	});

	it('should contain name', () => {
		const job = { name: 'test' };
		setProp('job', job, component, testHostFixture);
		const name = select(testHostFixture, '.job__name');

		expect(name.textContent.trim()).toEqual(job.name);
	});

	it('should contain the wordlist', () => {
		const job = { wordlist: { name: 'test' } };
		setProp('job', job, component, testHostFixture);
		const wordlist = select(testHostFixture, '.job__wordlist');

		expect(wordlist.textContent.trim()).toEqual(job.wordlist.name);
	});

	it('should contain a date', () => {
		const job = {};
		setProp('job', job, component, testHostFixture);
		const time = selectAll(testHostFixture, '.job__time');

		expect(time.length).toBe(1);
	});

	it('should contain a status', () => {
		const job = { status: STATUS.STARTED };
		setProp('job', job, component, testHostFixture);

		const status = select(testHostFixture, '.job__status');
		expect(status.className).toContain('job__status__yellow');
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
