import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusComponent } from './status/status.component';
import { JobsComponent } from './jobs/jobs.component';

@NgModule({
	declarations: [StatusComponent, JobsComponent],
	imports: [CommonModule],
	exports: [StatusComponent, JobsComponent],
})
export class JobModule {}
