import { Component, OnInit } from '@angular/core';
import { Wordlist, WordlistSelectors, GetWordlists } from '../shared/store';
import { Store } from '@ngxs/store';

@Component({
	selector: 'app-wordlist',
	templateUrl: './wordlist.component.html',
	styleUrls: ['./wordlist.component.scss'],
})
export class WordlistComponent implements OnInit {
	/**
	 * Contains all wordlists from store
	 */
	wordlists: Wordlist[];

	constructor(private store: Store) {}

	ngOnInit() {
		this.store.dispatch(new GetWordlists());
		this.store.select(WordlistSelectors.wordlists).subscribe(wordlists => {
			this.wordlists = wordlists;
		});
	}
}
