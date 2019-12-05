import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordlistComponent } from './wordlist.component';
import {
	MatCardModule,
	MatListModule,
	MatButtonModule,
} from '@angular/material';
import { WordlistService } from './wordlist.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	declarations: [WordlistComponent],
	imports: [
		CommonModule,
		MatCardModule,
		MatListModule,
		MatButtonModule,
		HttpClientModule,
	],
	providers: [WordlistService],
})
export class WordlistModule {}
