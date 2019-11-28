import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule, MatCardModule, MatExpansionModule, MatInputModule, MatListModule, MatSelectModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Job, STATUS } from '../../shared/store/job';
import { StoreModule } from '../../shared/store/store.module';
import { StatsComponent } from '../../stats';
import { JobsComponent } from '../jobs/jobs.component';
import { StartJobComponent } from '../start-job/start-job.component';
import { StatusComponent } from './status.component';


describe('Status Component', () => {
	let testHostComponent: TestHostComponent;
	let testHostFixture: ComponentFixture<TestHostComponent>;
	let component: StatusComponent;
	let job: Job;
	let router: Router;
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				StatusComponent,
				TestHostComponent,
				JobsComponent,
				StatsComponent,
				StartJobComponent,
			],
			imports: [
				StoreModule,
				RouterTestingModule.withRoutes([
					{ path: 'jobs', component: JobsComponent },
					{ path: 'stats/:id', component: StatsComponent },
				]),
				MatButtonModule,
				MatInputModule,
				MatSelectModule,
				BrowserAnimationsModule,
				ReactiveFormsModule,
				MatListModule,
				MatExpansionModule,
				MatCardModule
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		job = {
			file: 'password.txt',
			name: 'Sommer2019',
			wordlist: 'ripper1',
			status: STATUS.STARTED,
		};
		router = TestBed.get<Router>(Router);
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

	it('should contain a status', () => {
		Object.defineProperty(testHostComponent, 'job', { writable: true });
		component.job = job;
		testHostFixture.detectChanges();

		const el: HTMLElement = testHostFixture.debugElement.nativeElement;
		const name = el.querySelector('.job__status');
		expect(name.className).toContain('job__status__yellow');
	});

	it('should navigate to stats', async(() => {
		const el: HTMLElement = testHostFixture.debugElement.nativeElement;
		const button: HTMLElement = el.querySelector('.job__btn');
		button.click();
		testHostFixture.ngZone.run(() => {
			router.navigate(['stats/:id']).then(() => {
				expect(router.url).toEqual('/stats/:id');
			});
		});
	}));

	@Component({
		selector: 'app-host-component',
		template: `
			<app-status job="job"></app-status>
		`,
	})
	class TestHostComponent { }
});
