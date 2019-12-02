import { Injectable } from '@angular/core';
import { Job } from '../../shared/store';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { error } from 'util';

@Injectable({
	providedIn: 'root',
})
export class JobService {
	constructor(private http: HttpClient) {}

	/**
	 * Start job
	 * @param job to be startet
	 */
	startJob(job: Job, file: File) {
		const formData = new FormData();
		formData.append('file' , file);
		formData.append('job' , job.toString());
		return this.http.post(environment.apiUrl + 'jobs/new', formData);
	}

}
