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
		file: new FormControl(''),
		wordlist: new FormControl(''),
	});

	/**
	 * An array containing valid wordlists
	 */
	wordlists: Wordlist[];

	constructor(
		private jobSvc: JobService,
		private store: Store,
		private snackBar: MatSnackBar,
	) {}

	ngOnInit() {
		this.store.dispatch(new GetWordlists());
		this.store.select(WordlistSelectors.wordlists).subscribe(wordlists => {
			this.wordlists = wordlists;
		});
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
