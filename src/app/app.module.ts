import { BrowserModule } from '@angular/platform-browser';
import { NgModule, OnInit } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from './shared/store/store.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JobModule } from './job/job.module';
import { Store } from '@ngxs/store';
import { STATUS, AddJobs } from './shared/store';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		StoreModule,
		BrowserAnimationsModule,
		JobModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
