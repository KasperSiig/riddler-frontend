import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { RouterSelectors } from '../shared/store/router/router.selectors';
import { Params } from '@angular/router';
import { StatsService } from './services/stats.service';
import { switchMap } from 'rxjs/operators';

@Component({
	selector: 'app-stats',
	templateUrl: './stats.component.html',
	styleUrls: ['./stats.component.scss'],
})
export class StatsComponent implements OnInit {
	params: Params;
	adminsCracked: { total: number; cracked: number; percentage: number };
	allCracked: { total: number; cracked: number; percentage: number };
	panelOpenState: boolean;
	constructor(private store: Store, private statsSvc: StatsService) {}

	ngOnInit() {
		this.params = this.store.selectSnapshot(RouterSelectors.params);
		this.statsSvc
			.getAdminsCracked(this.params.id)
			.pipe(
				switchMap(stats => {
					this.adminsCracked = stats;
					return this.statsSvc.getAllCracked(this.params.id);
				}),
			)
			.subscribe(stats => {
				this.allCracked = stats;
			});
	}
}
