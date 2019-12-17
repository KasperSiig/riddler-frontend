import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
	MatButtonModule,
	MatCardModule,
	MatIconModule,
	MatInputModule,
} from '@angular/material';
import { RouterModule } from '@angular/router';
import { ChartsModule } from 'ng2-charts';
import { StoreModule } from '../shared/store/store.module';
import { StatsComponent } from './stats.component';

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
