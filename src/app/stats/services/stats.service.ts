import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class StatsService {
	constructor(private http: HttpClient) {}

	/**
	 * Gets stats on how many admin accounts are cracked
	 *
	 * @param id Id of job to get stats on
	 */
	getAdminsCracked(
		id: string,
	): Observable<{ total: number; cracked: number; percentage: number }> {
		return this.http.get<{
			total: number;
			cracked: number;
			percentage: number;
		}>(environment.apiUrl + 'stats/' + id + '/admins');
	}

	/**
	 * Gets stats on how many user accounts are cracked
	 *
	 * @param id Id of job to get stats on
	 */
	getAllCracked(
		id: string,
	): Observable<{ total: number; cracked: number; percentage: number }> {
		return this.http.get<{
			total: number;
			cracked: number;
			percentage: number;
		}>(environment.apiUrl + 'stats/' + id + '/all');
	}
}
