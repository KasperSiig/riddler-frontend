import { Component } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RouterSelectors } from './shared/store/router/router.selectors';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss'],
})
export class AppComponent {
	tabs = [
		{ title: 'Jobs', url: '/jobs' },
		{ title: 'Wordlists', url: '/wordlists' },
	];

	@Select(RouterSelectors.url) url: Observable<string>;
}
