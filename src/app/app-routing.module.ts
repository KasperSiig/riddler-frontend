import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JobComponent } from './job/job.component';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'jobs',
	},
	{ path: 'jobs', component: JobComponent },
	{ path: 'wordlists', component: JobComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
