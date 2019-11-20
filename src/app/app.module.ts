import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from './shared/store/store.module';
import { JobModule } from './job/job.module';
import { NgModule, OnInit } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngxs/store';
import { STATUS, AddJobs } from './shared/store';


@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		StoreModule,
		MatToolbarModule,
		BrowserAnimationsModule,
		JobModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
