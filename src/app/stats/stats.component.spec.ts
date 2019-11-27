import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { StatsComponent } from './stats.component';
import { StoreModule } from '../shared/store/store.module';
import { RouterTestingModule } from '@angular/router/testing';
import { Store } from '@ngxs/store';
import { RouterSelectors } from '../shared/store/router/router.selectors';
import { Navigate } from '@ngxs/router-plugin';
import { Router } from '@angular/router';

describe('StatsComponent', () => {
	let component: StatsComponent;
	let fixture: ComponentFixture<StatsComponent>;
	let store: Store;
	let router: Router;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [StatsComponent],
			imports: [
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
});
