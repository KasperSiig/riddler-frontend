import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { JobsComponent } from './jobs/jobs.component';
import { StatusComponent } from './status/status.component';
import { JobService } from './services/job.service';
import { HttpClientModule } from '@angular/common/http';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { StartJobComponent } from './start-job/start-job.component';
import { StoreModule } from '../shared/store/store.module';
import { RouterModule } from '@angular/router';

@NgModule({
	declarations: [StatusComponent, JobsComponent, StartJobComponent],
	imports: [
		CommonModule,
		HttpClientModule,
		MatInputModule,
		MatSelectModule,
		ReactiveFormsModule,
		MatButtonModule,
		StoreModule,
		RouterModule,
	],
	exports: [StatusComponent, JobsComponent, StartJobComponent],
	providers: [JobService],
})
export class JobModule {}
