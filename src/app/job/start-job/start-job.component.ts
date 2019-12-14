import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { JobService } from '../services/job.service';
import { Store } from '@ngxs/store';
import {
	GetJobs,
	WordlistSelectors,
	GetWordlists,
	Wordlist,
} from 'src/app/shared/store';
import { MatSnackBar } from '@angular/material';
import { catchError, subscribeOn } from 'rxjs/operators';
import { of } from 'rxjs';
import { RulesService } from 'src/app/rules';

@Component({
	selector: 'app-start-job',
	templateUrl: './start-job.component.html',
	styleUrls: ['./start-job.component.scss'],
})
export class StartJobComponent implements OnInit {
	/**
	 * File containing passwords
	 */
	file: File;

	/**
	 * Filename of chosen file
	 */
	filename: string;

	/**
	 * Form containing info about new job
	 */
	jobForm = new FormGroup({
		name: new FormControl(''),
		wordlist: new FormControl(''),
		rule: new FormControl(''),
	});

	/**
	 * An array containing valid wordlists
	 */
	wordlists: Wordlist[];

	/**
	 * Array containing valid rules
	 */
	rules: string[];

	constructor(
		private jobSvc: JobService,
		private store: Store,
		private snackBar: MatSnackBar,
		private rulesSvc: RulesService,
	) {}

	ngOnInit() {
		this.store.dispatch(new GetWordlists());
		this.store.select(WordlistSelectors.wordlists).subscribe(wordlists => {
			this.wordlists = wordlists;
		});
		this.rulesSvc.getAll().subscribe(rules => (this.rules = rules));
		this.filename = 'File Chosen...';
	}

	/**
	 * Calls service to start a new job
	 */
	onSubmit() {
		this.jobSvc
			.startJob(this.jobForm.value, this.file)
			.pipe(
				catchError(err => {
					this.snackBar.open(err.error.message, 'close');
					return of([]);
				}),
			)
			.subscribe(() => {
				this.store.dispatch(new GetJobs());
			});
	}

	/**
	 * The file chosen shows in textfield
	 * @param event is the event of file chooser
	 */
	async chooseFile(event) {
		this.file = event.target.files[0];
		this.filename = this.file.name;
	}
}
