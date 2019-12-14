import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RulesService } from './rules.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
	declarations: [],
	imports: [CommonModule, HttpClientModule],
	providers: [RulesService],
})
export class RulesModule {}
