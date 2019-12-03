import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule, MatIconModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngxs/store';
import { of } from 'rxjs';
import { STATUS } from '../shared/store';
import { StoreModule } from '../shared/store/store.module';
import { StatsService } from './services/stats.service';
import { StatsComponent } from './stats.component';
import { ChartsModule } from 'ng2-charts';

const time = Date.now();
const DESIRED_STATE = {
	router: {
		state: {
			params: { id: 'test' },
		},
	},
	jobs: {
		jobs: [
			{
				_id: 'test',
				file: '/opt/jtr/passwd.txt',
				name: 'testname',
				status: STATUS.FINISHED,
				format: 'nt',
				wordlist: '/opt/jtr/wordlist.txt',
				directory: '/opt/jtr/jobs/test/',
				time,
			},
		],
	},
};

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
			exportStats: jest.fn((id: string) => {
				return of('');
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
				StoreModule,
				MatCardModule,
				MatIconModule,
				ChartsModule,
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
		store.reset(DESIRED_STATE);
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

	it('should get a job from the store', () => {
		expect(component.job).toEqual(DESIRED_STATE.jobs.jobs[0]);
	});

	it('should contain info about the job', () => {
		const el: HTMLElement = fixture.debugElement.nativeElement;
		const info = el.querySelector('.stats__info__content');

		expect(info.textContent.trim()).toContain(
			'Name: testname  Password file: /opt/jtr/passwd.txt Status: ' +
				'FINISHED Format: nt Wordlist: /opt/jtr/wordlist.txt Directory: /opt/jtr/jobs/test/ Time:',
		);
	});

	it('should contain the Id of the job', () => {
		const el: HTMLElement = fixture.debugElement.nativeElement;
		const info = el.querySelector('.stats__info');
		expect(info.textContent.trim()).toContain(DESIRED_STATE.jobs.jobs[0]._id);
	});

	it('should return [0,0] if stats is undefined', () => {
		const data = component.getDataForPie(undefined);
		expect(data).toEqual([0, 0]);
	});

	it('should return correct data', () => {
		const data = component.getDataForPie({
			total: 2,
			cracked: 1,
			percentage: 50,
		});
		expect(data).toEqual([1, 1]);
	});

	it('should contain an admins cracked chart', () => {
		const el: HTMLElement = fixture.debugElement.nativeElement;
		const card = el.querySelector('.stats__admins-cracked');
		expect(card).toBeTruthy();
	});

	it('should contain info within admins cracked', () => {
		component.adminsCracked = {
			total: 2,
			cracked: 1,
			percentage: 50,
		};
		fixture.detectChanges();
		const el: HTMLElement = fixture.debugElement.nativeElement;
		const info = el.querySelector('.stats__admins-cracked__info');
		expect(info.textContent.trim()).toBe('Total:  2Cracked:  1Percentage:  50');
	});

	it('should contain an all cracked chart', () => {
		const el: HTMLElement = fixture.debugElement.nativeElement;
		const card = el.querySelector('.stats__all-cracked');
		expect(card).toBeTruthy();
	});

	it('should contain info within all cracked', () => {
		component.allCracked = {
			total: 4,
			cracked: 2,
			percentage: 50,
		};
		fixture.detectChanges();
		const el: HTMLElement = fixture.debugElement.nativeElement;
		const info = el.querySelector('.stats__all-cracked__info');
		expect(info.textContent.trim()).toBe('Total:  4Cracked:  2Percentage:  50');
	});

	it('should contain button to export', () => {
		const el: HTMLElement = fixture.debugElement.nativeElement;
		const exportBtn = el.querySelectorAll('.stats__info__export-btn');
		expect(exportBtn.length).toBe(1);
	});

	it('should call service on export button click', () => {
		const el: HTMLElement = fixture.debugElement.nativeElement;
		const exportBtn: HTMLElement = el.querySelector('.stats__info__export-btn');

		exportBtn.click();
		fixture.detectChanges();
		expect(statSvcMock.exportStats).toHaveBeenCalledTimes(1);
	});
});
