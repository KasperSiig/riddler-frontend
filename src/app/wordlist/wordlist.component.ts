import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Store } from '@ngxs/store';
import { GetWordlists, Wordlist, WordlistSelectors } from '../shared/store';
import { WordlistService } from './wordlist.service';
import { catchError } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material';

@Component({
	selector: 'app-wordlist',
	templateUrl: './wordlist.component.html',
	styleUrls: ['./wordlist.component.scss'],
})
export class WordlistComponent implements OnInit, OnDestroy {
	// Contains all wordlists from store
	wordlists: Wordlist[];

	// File containing wordlist
	file: File;

	// Specifies what, if any, wordlist is being updated
	updating: string;

	// Filename of chosen file
	filename: string;

	// Form containing info about wordlists
	editForm = new FormGroup({});
	newWordlistForm = new FormGroup({
		name: new FormControl(''),
		path: new FormControl(''),
	});

	// Contains all active subscription
	subscription: Subscription;

	constructor(
		private store: Store,
		private wordlistSvc: WordlistService,
		private snackBar: MatSnackBar,
	) {}

	ngOnInit() {
		this.store.dispatch(new GetWordlists());
		this.subscription = this.store
			.select(WordlistSelectors.wordlists)
			.subscribe(wordlists => {
				wordlists.forEach(w => {
					this.editForm.setControl('name' + w._id, new FormControl(w.name));
					this.editForm.setControl('path' + w._id, new FormControl(w.path));
				});
				this.wordlists = wordlists;
			});
		this.filename = 'File Chosen...';
	}

	ngOnDestroy() {
		if (this.subscription) this.subscription.unsubscribe();
	}

	/**
	 * Forwards request to backend, to create new wordlist
	 */
	onSubmit() {
		this.wordlistSvc
			.newWordlist(this.newWordlistForm.value, this.file)
			.pipe(
				catchError(err => {
					this.snackBar.open(err.error.message, 'close');
					return of([]);
				}),
			)
			.subscribe(() => {
				this.store.dispatch(new GetWordlists());
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

	/**
	 * The file chosen shows in textfield
	 * @param event is the event of file chooser
	 */
	async chooseNewWordlist(event) {
		this.file = event.target.files[0];
		this.filename = this.file.name;
	}
}
