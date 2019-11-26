import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { of } from 'rxjs';

@Injectable({
	providedIn: 'root',
})
export class StatsService {
	constructor(private http: HttpClient) {}

	getAdminsCracked(id: string) {
		return of({
			total: 500,
			cracked: 250,
			percentage: 50,
		});
	}

	getAllCracked(id: string) {
		return of({
			total: 1000,
			cracked: 500,
			percentage: 550,
		});
	}
}
