import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
	MatCardModule,
	MatIconModule,
	MatButtonModule, MatInputModule,
} from '@angular/material';
import { StoreModule } from '../shared/store/store.module';
import { StatsComponent } from './stats.component';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';

@NgModule({
	declarations: [StatsComponent],
	imports: [
		CommonModule,
		StoreModule,
		MatCardModule,
		MatIconModule,
		RouterModule,
		ChartsModule,
		MatButtonModule,
		MatInputModule,
	],
	exports: [StatsComponent],
})
export class StatsModule {}
