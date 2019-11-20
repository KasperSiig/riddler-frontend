import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobModule } from './job';
import { StoreModule } from './shared/store/store.module';

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
