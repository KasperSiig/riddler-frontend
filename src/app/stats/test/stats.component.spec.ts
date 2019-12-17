import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import {
	MatCardModule,
	MatIconModule,
	MatInputModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngxs/store';
import { ChartsModule } from 'ng2-charts';
import { of } from 'rxjs';
import { select, selectAll } from '../../../test';
import { STATUS } from '../../shared/store';
import { StoreModule } from '../../shared/store/store.module';
import { StatsService } from '../services/stats.service';
import { StatsComponent } from '../stats.component';

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
				wordlist: { name: 'default', path: '/opt/jtr/wordlist.txt' },
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
	let statsSvcMock: any;

	beforeEach(async () => {
		statsSvcMock = {
			getAdminsCracked: jest.fn((id: string) => {
				return of({ total: 100, cracked: 100, percentage: 100 });
			}),
			getAllCracked: jest.fn((id: string) => {
				return of({ total: 200, cracked: 100, percentage: 50 });
			}),
			exportStats: jest.fn((id: string) => {
				return of('');
			}),
			getFrequency: jest.fn((id: string, passwrd: string) => {
				return of({ count: 55 });
			}),
			getTopTenStats: jest.fn((id: string) => {
				return of([{ password: '#Password', count: 10 }]);
			}),
		};
		await TestBed.configureTestingModule({
			declarations: [StatsComponent],
			providers: [
				{
					provide: StatsService,
					useValue: statsSvcMock,
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
				MatInputModule,
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

		fixture = TestBed.createComponent(StatsComponent);
		component = fixture.componentInstance;

		store = TestBed.get<Store>(Store);
		router = TestBed.get<Router>(Router);
		store.reset(DESIRED_STATE);

		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should call getAdminsCracked', () => {
		fixture = TestBed.createComponent(StatsComponent);
		expect(statsSvcMock.getAdminsCracked).toHaveBeenCalledTimes(1);
	});

	it('should call getAllCracked', () => {
		expect(statsSvcMock.getAllCracked).toHaveBeenCalledTimes(1);
	});

	it('should get a job from the store', () => {
		expect(component.job).toEqual(DESIRED_STATE.jobs.jobs[0]);
	});

	it('should contain info about the job', () => {
		const content = select(fixture, '.stats__info__content');

		expect(content.textContent.trim()).toContain(
			'Name: testname  Password file: /opt/jtr/jobs/test/passwd.txt Status: ' +
				'FINISHED Format: nt Wordlist: default Directory: /opt/jtr/jobs/test/ Time:',
		);
	});

	it('should contain the Id of the job', () => {
		const info = select(fixture, '.stats__info');
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
		const card = select(fixture, '.stats__admins-cracked');
		expect(card).toBeTruthy();
	});

	it('should contain info within admins cracked', () => {
		component.adminsCracked = {
			total: 2,
			cracked: 1,
			percentage: 50,
		};
		fixture.detectChanges();
		const info = select(fixture, '.stats__admins-cracked__info');
		expect(info.textContent.trim()).toBe('Total:  2Cracked:  1Percentage:  50');
	});

	it('should contain an all cracked chart', () => {
		const card = select(fixture, '.stats__all-cracked');
		expect(card).toBeTruthy();
	});

	it('should contain info within all cracked', () => {
		component.allCracked = {
			total: 4,
			cracked: 2,
			percentage: 50,
		};
		fixture.detectChanges();
		const info = select(fixture, '.stats__all-cracked__info');
		expect(info.textContent.trim()).toBe('Total:  4Cracked:  2Percentage:  50');
	});

	it('should contain button to export', () => {
		expect(selectAll(fixture, '.stats__info__export-btn').length).toBe(1);
	});

	it('should contain info within password frequency', () => {
		component.passwdFreq = 40;
		fixture.detectChanges();
		const frequency = select(fixture, '.stats__frequency__number');
		expect(frequency.textContent.trim()).toEqual('40');
	});

	it('should only send request to service after 100 milliseconds', async () => {
		component.getFrequency({ target: { value: '' } });
		expect(statsSvcMock.getFrequency).toHaveBeenCalledTimes(1);
		component.getFrequency({ target: { value: '' } });
		expect(statsSvcMock.getFrequency).toHaveBeenCalledTimes(1);
		await new Promise(res => {
			setTimeout(() => {
				res();
			}, 200);
		});
		component.getFrequency({ target: { value: '' } });
		expect(statsSvcMock.getFrequency).toHaveBeenCalledTimes(2);
	});

	it('should contain top 10 graph', () => {
		const graph = select(fixture, '.stats__topten__graph');
		expect(graph).toBeTruthy();
	});

	it('should get top 10 stats from service', () => {
		const top10Data = [{ password: '#Password', count: 10 }];
		component.setTop10Stats(top10Data);
		expect(statsSvcMock.getTopTenStats).toHaveBeenCalledTimes(1);
		expect(component.top10Data).toEqual([{ data: [top10Data[0].count] }]);
		expect(component.top10Labels).toEqual([top10Data[0].password]);
	});

	it('should call service on export button click', () => {
		(select(fixture, '.stats__info__export-btn') as HTMLElement).click();
		fixture.detectChanges();
		expect(statsSvcMock.exportStats).toHaveBeenCalledTimes(1);
	});
});
