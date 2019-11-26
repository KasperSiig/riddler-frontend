import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobsComponent } from './job/jobs/jobs.component';
import { StatsComponent } from './stats';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'jobs',
	},
	{ path: 'jobs', component: JobsComponent },
	{ path: 'wordlists', component: JobsComponent },
	{ path: 'stats/:id', component: StatsComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
