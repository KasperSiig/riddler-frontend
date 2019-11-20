import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobsComponent } from './job/jobs/jobs.component';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'jobs',
	},
	{ path: 'jobs', component: JobsComponent },
	{ path: 'wordlists', component: JobsComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
