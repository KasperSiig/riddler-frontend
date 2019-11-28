import { Component, Input, OnInit } from '@angular/core';
import { Job } from '../../shared/store/job';

@Component({
	selector: 'app-status',
	templateUrl: './status.component.html',
	styleUrls: ['./status.component.scss'],
})
export class StatusComponent implements OnInit {
	constructor() {
	}

	/**
	 * @description - Job
	 */
	@Input() job: Job;

	ngOnInit() {

	}
}
