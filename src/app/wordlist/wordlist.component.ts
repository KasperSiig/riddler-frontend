import { SelectionModel } from '@angular/cdk/collections';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngxs/store';
import { GetWordlists, Wordlist, WordlistSelectors } from '../shared/store';
import { WordlistService } from './wordlist.service';

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

	constructor(private store: Store, private wordlistSvc: WordlistService) {}

	ngOnInit() {
		this.store.dispatch(new GetWordlists());
		this.store.select(WordlistSelectors.wordlists).subscribe(wordlists => {
			this.wordlists = wordlists;
		});
	}

	/**
	 * Deletes all selected wordlists
	 */
	delete(wordlists: SelectionModel<any>) {
		wordlists.selected.forEach(s => {
			this.wordlistSvc.delete(s.value).subscribe(() => {
				this.store.dispatch(new GetWordlists());
			});
		});
	}
}
