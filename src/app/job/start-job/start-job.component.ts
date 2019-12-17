import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Store } from '@ngxs/store';
import { of, Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RulesService } from 'src/app/rules';
import {
	GetJobs,
	GetWordlists,
	Wordlist,
	WordlistSelectors,
} from 'src/app/shared/store';
import { JobService } from '../services/job.service';

@Component({
	selector: 'app-start-job',
	templateUrl: './start-job.component.html',
	styleUrls: ['./start-job.component.scss'],
})
export class StartJobComponent implements OnInit, OnDestroy {
	// File containing passwords
	file: File;

	// Filename of chosen file
	filename: string;

	// Form containing info about new job
	jobForm = new FormGroup({
		name: new FormControl(''),
		wordlist: new FormControl(''),
		rule: new FormControl(''),
	});

	// An array containing valid wordlists
	wordlists: Wordlist[];

	// Array containing valid rules
	rules: string[];

	// Contains all active subscriptions
	subscription: Subscription;

	constructor(
		private jobSvc: JobService,
		private store: Store,
		private snackBar: MatSnackBar,
		private rulesSvc: RulesService,
	) {}

	ngOnInit() {
		this.store.dispatch(new GetWordlists());

		this.subscription = this.store
			.select(WordlistSelectors.wordlists)
			.subscribe(wordlists => {
				this.wordlists = wordlists;
			});
		this.rulesSvc.getAll().subscribe(rules => (this.rules = rules));

		this.filename = 'File Chosen...';
	}

	ngOnDestroy() {
		this.subscription.unsubscribe();
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
	async chooseFile(event: any) {
		this.file = event.target.files[0];
		this.filename = this.file.name;
	}
}
