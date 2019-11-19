import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-job',
	templateUrl: './job.component.html',
	styleUrls: ['./job.component.scss'],
})
export class JobComponent implements OnInit {
	constructor() {}

	/**
	 * @description - Id of Job to fetch
	 */
	@Input() job: string;

	ngOnInit() {}
}
