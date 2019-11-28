import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material';
import { StoreModule } from '../shared/store/store.module';
import { StatsComponent } from './stats.component';

@NgModule({
	declarations: [StatsComponent],
	imports: [CommonModule, StoreModule, MatCardModule],
	exports: [StatsComponent],
})
export class StatsModule { }
