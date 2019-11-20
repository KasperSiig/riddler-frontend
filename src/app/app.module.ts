import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from './shared/store/store.module';
import { JobModule } from './job/job.module';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		StoreModule,
		MatToolbarModule,
		JobModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
