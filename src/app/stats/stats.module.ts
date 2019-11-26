import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatsComponent } from './stats.component';
import { StoreModule } from '../shared/store/store.module';
import { MatExpansionModule, MatListModule } from '@angular/material';


@NgModule({
	declarations: [StatsComponent],
	imports: [CommonModule, StoreModule, MatListModule, MatExpansionModule],

	exports: [StatsComponent],
})
export class StatsModule {}
