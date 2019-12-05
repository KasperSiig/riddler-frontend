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

@Component({
	selector: 'app-start-job',
	templateUrl: './start-job.component.html',
	styleUrls: ['./start-job.component.scss'],
})
export class StartJobComponent implements OnInit {
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

	constructor(private jobSvc: JobService, private store: Store) {}

	ngOnInit() {
		this.store.dispatch(new GetWordlists());
		this.store.select(WordlistSelectors.wordlists).subscribe(wordlists => {
			this.wordlists = wordlists;
		});
	}

	/**
	 * Calls service to start a new job
	 */
	onSubmit() {
		this.jobSvc.startJob(this.jobForm.value).subscribe(() => {
			this.store.dispatch(new GetJobs());
		});
	}
}
