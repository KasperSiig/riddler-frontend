import { Component } from '@angular/core';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	tabs = [
		{ title: 'Jobs', url: 'jobs' },
		{ title: 'Wordlists', url: 'wordlists' },
	];
}
