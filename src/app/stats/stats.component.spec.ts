import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StatsComponent } from './stats.component';
import { StoreModule } from '../shared/store/store.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngxs/store';
import { RouterSelectors } from '../shared/store/router/router.selectors';
import { Navigate } from '@ngxs/router-plugin';
import { Router } from '@angular/router';
import { MatExpansionModule, MatListModule } from '@angular/material';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { StatsService } from './services/stats.service';
import { of } from 'rxjs';
import Any = jasmine.Any;

describe('StatsComponent', () => {
	let component: StatsComponent;
	let fixture: ComponentFixture<StatsComponent>;
	let store: Store;
	let router: Router;
	let statSvcMock: any;

	beforeEach(async(() => {
		statSvcMock = {
			getAdminsCracked: jest.fn((id: string) => {
				return of({ total: 100, cracked: 100, percentage: 100 });
			}),
			getAllCracked: jest.fn((id: string) => {
				return of({ total: 200, cracked: 100, percentage: 50 });
			}),
		};
		TestBed.configureTestingModule({
			declarations: [StatsComponent],
			providers: [
				{
					provide: StatsService,
					useValue: statSvcMock,
				},
			],
			imports: [
				HttpClientTestingModule,
				HttpClientTestingModule,
				BrowserAnimationsModule,
				CommonModule,
				MatListModule,
				MatExpansionModule,
				StoreModule,
				RouterTestingModule.withRoutes([
					{
						path: '',
						pathMatch: 'full',
						redirectTo: 'stats/test',
					},
					{
						path: 'stats/:id',
						component: StatsComponent,
					},
				]),
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(StatsComponent);
		component = fixture.componentInstance;
		store = TestBed.get<Store>(Store);
		router = TestBed.get(Router);
		fixture = TestBed.createComponent(StatsComponent);
		component = fixture.componentInstance;
		store.reset({
			router: {
				state: {
					params: { id: 'test' },
				},
			},
		});
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should call getAdminsCracked', () => {
		expect(statSvcMock.getAdminsCracked).toHaveBeenCalledTimes(1);
	});

	it('should call getAllCracked', () => {
		expect(statSvcMock.getAllCracked).toHaveBeenCalledTimes(1);
	});

	it('should contains admins stats', () => {
		const el: HTMLElement = fixture.debugElement.nativeElement;
		const stats = el.querySelector('.stats__admins');

		expect(stats.textContent.trim()).toBe(
			'Admins Total: 100 Cracked: 100 Percentage: 100',
		);
	});

	it('should contains user stats', () => {
		const el: HTMLElement = fixture.debugElement.nativeElement;
		const stats = el.querySelector('.stats__users');

		expect(stats.textContent.trim()).toBe(
			'Users Total: 200 Cracked: 100 Percentage: 50',
		);
	});
});
