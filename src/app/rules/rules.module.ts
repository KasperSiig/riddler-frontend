import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { RulesService } from './rules.service';

@NgModule({
	declarations: [],
	imports: [CommonModule, HttpClientModule],
	providers: [RulesService],
})
export class RulesModule {}
