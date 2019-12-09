import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import {
	MatButtonModule,
	MatCardModule,
	MatInputModule,
	MatListModule,
	MatIconModule,
} from '@angular/material';
import { WordlistComponent } from './wordlist.component';
import { WordlistService } from './wordlist.service';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
	declarations: [WordlistComponent],
	imports: [
		CommonModule,
		MatCardModule,
		MatListModule,
		MatButtonModule,
		HttpClientModule,
		MatInputModule,
		MatIconModule,
		ReactiveFormsModule,
	],
	providers: [WordlistService],
})
export class WordlistModule {}
