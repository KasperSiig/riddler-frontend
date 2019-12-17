import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Job } from '../../shared/store';

@Injectable({
	providedIn: 'root',
})
export class JobService {
	constructor(private http: HttpClient) {}

	/**
	 * Start job
	 * @param job to be startet
	 * @param file File to use
	 */
	startJob(job: Job, file: File) {
		const formData = new FormData();
		formData.append('file', file);
		formData.append('job', JSON.stringify(job));
		return this.http.post(environment.apiUrl + 'jobs', formData);
	}
}
