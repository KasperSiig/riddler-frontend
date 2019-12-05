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

	/**
	 * Gets stats from backend to export
	 *
	 * @param id Id of job to get stats of
	 */
	exportStats(id: string) {
		return this.http.get<{ stats: string }>(
			environment.apiUrl + 'stats/' + id + '/export',
		);
	}

	/**
	 * Gets frequency from backend
	 *
	 * @param id Id of job to get frequency of
	 * @param password password that is guessed
	 */
	getFrequency(id: string, password: string) {
		return this.http.get<any>(
			environment.apiUrl + 'stats/' + id + '/frequency?password=' + password,
		);
	}
}
