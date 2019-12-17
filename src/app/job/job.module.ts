import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { RulesModule } from '../rules';
import { StoreModule } from '../shared/store/store.module';
import { JobsComponent } from './jobs/jobs.component';
import { JobService } from './services/job.service';
import { StartJobComponent } from './start-job/start-job.component';
import { StatusComponent } from './status/status.component';

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
		RulesModule,
	],
	exports: [StatusComponent, JobsComponent, StartJobComponent],
	providers: [JobService],
})
export class JobModule {}
