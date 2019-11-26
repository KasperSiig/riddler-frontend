import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsComponent } from './stats.component';
import { StoreModule } from '../shared/store/store.module';

@NgModule({
	declarations: [StatsComponent],
	imports: [CommonModule, StoreModule],

	exports: [StatsComponent],
})
export class StatsModule {}
