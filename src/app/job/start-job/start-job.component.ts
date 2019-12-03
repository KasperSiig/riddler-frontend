import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { JobService } from '../services/job.service';
import { Store } from '@ngxs/store';
import { GetJobs } from 'src/app/shared/store';

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
	wordlists: any[] = ['/opt/jtr/wordlist.txt', 'wordlist1.txt'];

	constructor(private jobSvc: JobService, private store: Store) {}

	ngOnInit() {
		this.filename = 'File Chosen...';
	}

	/**
	 * Calls service to start a new job
	 */
	onSubmit() {
		this.jobSvc.startJob(this.jobForm.value, this.file).subscribe(() => {
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
