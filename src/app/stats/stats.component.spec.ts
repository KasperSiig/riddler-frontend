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
import { RouterSelectors } from '../shared/store';
import { Component } from '@angular/core';

const time = Date.now();
const DESIRED_STATE = {
	router: {
		state: {
			params: { id: 'test' },
		},
	},
	jobs: {
		jobs: [{
			_id: 'test',
			file: '/opt/jtr/passwd.txt',
			name: 'testname',
			status: STATUS.FINISHED,
			format: 'nt',
			wordlist: '/opt/jtr/wordlist.txt',
			directory: '/opt/jtr/jobs/test/',
			time
		}]
	}
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

		expect(info.textContent.trim()).toContain('Name: testname  Password file: /opt/jtr/passwd.txt Status: ' +
			'FINISHED Format: nt Wordlist: /opt/jtr/wordlist.txt Directory: /opt/jtr/jobs/test/ Time:');
	});

	it('should contain the Id of the job', () => {
		const el: HTMLElement = fixture.debugElement.nativeElement;
		const info = el.querySelector('.stats__info');
		expect(info.textContent.trim()).toContain(DESIRED_STATE.jobs.jobs[0]._id);
	});

});
