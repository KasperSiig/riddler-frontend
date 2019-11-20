import {
	TestBed,
	async,
	ComponentFixture,
	fakeAsync,
	tick,
} from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Component } from '@angular/core';
import { StoreModule } from './shared/store/store.module';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';

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
		Object.defineProperty(component, 'tabs', { writable: true });
		component.tabs = [{ title: 'Jobs', url: 'jobs' }];
		fixture.detectChanges();
		const el: HTMLElement = fixture.debugElement.nativeElement;
		const tabs = el.querySelectorAll('.toolbar__tab');

		expect(tabs.length).toBe(1);
	});

	it('should highlight the active url', fakeAsync(() => {
		Object.defineProperty(component, 'tabs', { writable: true });
		component.tabs = [{ title: 'Jobs', url: '/jobs' }];
		fixture.detectChanges();
		fixture.ngZone.run(() => {
			router.navigate(['/jobs']);
		});

		tick();
		const el: HTMLElement = fixture.debugElement.nativeElement;
		const tab = el.querySelector('.toolbar__tab');
		expect(tab.textContent).toBe(component.tabs[0].title);
		expect(tab.className).toBe('toolbar__tab toolbar__tab--active');
	}));

	@Component({
		selector: 'app-mock',
		template: '<div></div>',
	})
	class MockComponent {}
});
