import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobModule } from './job';
import { StoreModule } from './shared/store/store.module';
import { StatsModule } from './stats';
import { WordlistModule } from './wordlist';
import { MatSnackBarModule } from '@angular/material';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		AppRoutingModule,
		StoreModule,
		MatToolbarModule,
		BrowserAnimationsModule,
		JobModule,
		StatsModule,
		WordlistModule,
		MatSnackBarModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
