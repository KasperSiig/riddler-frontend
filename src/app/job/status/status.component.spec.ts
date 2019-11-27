import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusComponent } from './status.component';
import { of } from 'rxjs';
import { StoreModule } from '../../shared/store/store.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Component } from '@angular/core';
import { STATUS } from '../../shared/store/job';

describe('JobComponent', () => {
	let testHostComponent: TestHostComponent;
	let testHostFixture: ComponentFixture<TestHostComponent>;
	let component: StatusComponent;
	let job;
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [StatusComponent, TestHostComponent],
			imports: [StoreModule, RouterTestingModule],
		}).compileComponents();
	}));

	beforeEach(() => {
		job = { file: 'password.txt', name: 'Sommer2019', wordlist: 'ripper1', status: STATUS.STARTED, };
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

	@Component({
		selector: 'app-host-component',
		template: `
			<app-status job="job"></app-status>
		`,
	})
	class TestHostComponent {}
});
