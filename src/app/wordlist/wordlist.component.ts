import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
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
	updating: string;
	editForm = new FormGroup({});

	constructor(private store: Store, private wordlistSvc: WordlistService) {}

	ngOnInit() {
		this.store.dispatch(new GetWordlists());
		this.store.select(WordlistSelectors.wordlists).subscribe(wordlists => {
			wordlists.forEach(w => {
				this.editForm.setControl('name' + w._id, new FormControl(w.name));
				this.editForm.setControl('path' + w._id, new FormControl(w.path));
			});
			this.wordlists = wordlists;
		});
	}

	/**
	 * Deletes all selected wordlists
	 */
	delete(id: string) {
		this.wordlistSvc.delete(id).subscribe(() => {
			this.store.dispatch(new GetWordlists());
		});
	}

	/**
	 * Activates editing on a wordlist
	 *
	 * @param id Id of wordlist to edit
	 */
	edit(id: string) {
		this.updating = id;
	}

	/**
	 * Updates wordlist
	 *
	 * @param id Id of wordlist to save
	 */
	save(id: string) {
		this.updating = '';
		const name = this.editForm.get('name' + id).value;
		const path = this.editForm.get('path' + id).value;
		this.wordlistSvc.updateOne({ _id: id, name, path }).subscribe(() => {
			this.store.dispatch(new GetWordlists());
		});
	}
}
