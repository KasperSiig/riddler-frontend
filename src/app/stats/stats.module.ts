import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule, MatIconModule } from '@angular/material';
import { StoreModule } from '../shared/store/store.module';
import { StatsComponent } from './stats.component';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [StatsComponent],
	imports: [CommonModule, StoreModule, MatCardModule, MatIconModule, RouterModule],
	exports: [StatsComponent],
})
export class StatsModule { }
