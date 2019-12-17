import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { JobsComponent } from './job/jobs/jobs.component';
import { StatsComponent } from './stats';
import { WordlistComponent } from './wordlist/wordlist.component';

const routes: Routes = [
	{
		path: '',
		pathMatch: 'full',
		redirectTo: 'jobs',
	},
	{ path: 'jobs', component: JobsComponent },
	{ path: 'wordlists', component: WordlistComponent },
	{ path: 'stats/:id', component: StatsComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
