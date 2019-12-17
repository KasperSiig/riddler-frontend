import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Component } from '@angular/core';
import {
	async,
	ComponentFixture,
	fakeAsync,
	TestBed,
	tick,
} from '@angular/core/testing';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { StoreModule } from './shared/store/store.module';
import { setProp, selectAll, select } from '../test';

describe('AppComponent', () => {
	let fixture: ComponentFixture<AppComponent>;
	let component: AppComponent;
	let router: Router;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				RouterTestingModule.withRoutes([
					{ path: '', pathMatch: 'full', redirectTo: 'jobs' },
					{ path: 'jobs', pathMatch: 'full', component: MockComponent },
				]),
				MatToolbarModule,
				StoreModule,
				HttpClientTestingModule,
			],
			declarations: [AppComponent, MockComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(AppComponent);
		component = fixture.debugElement.componentInstance;
		router = TestBed.get(Router);
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should create two tabs', () => {
		setProp('tabs', [{ title: 'Jobs', url: '/jobs' }], component, fixture);
		const tabs = selectAll(fixture, '.toolbar__tab');

		expect(tabs.length).toBe(1);
	});

	it('should highlight the active url', fakeAsync(() => {
		setProp('tabs', [{ title: 'Jobs', url: '/jobs' }], component, fixture);
		fixture.ngZone.run(() => {
			router.navigate(['/jobs']);
		});

		tick();
		const tab = select(fixture, '.toolbar__tab');
		expect(tab.textContent).toBe(component.tabs[0].title);
		expect(tab.className).toBe('toolbar__tab toolbar__tab--active');
	}));

	@Component({
		selector: 'app-mock',
		template: '<div></div>',
	})
	class MockComponent {}
});
