import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WordlistComponent } from './wordlist.component';
import { MatCardModule, MatListModule } from '@angular/material';

@NgModule({
	declarations: [WordlistComponent],
	imports: [CommonModule, MatCardModule, MatListModule],
})
export class WordlistModule {}
