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
	 * Start
	 * @param job to be startet
	 */
	startJob(job: Job) {
		return this.http.post(environment.apiUrl + 'jobs/new', job);
	}

	/**
	 * Posts file to Angular
	 * @param file to be uploaded
	 */
	uploadFile(file: File): Observable<any> {
		return this.http.post(environment.apiUrl + '/files', file);
	}
}
