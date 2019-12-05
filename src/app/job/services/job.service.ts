import { Injectable } from '@angular/core';
import { Job } from '../../shared/store';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class JobService {
	constructor(private http: HttpClient) {}

	startJob(job: Job) {
		console.log(job);
		return this.http.post(environment.apiUrl + 'jobs/new', job);
	}
}
