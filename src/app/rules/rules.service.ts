import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root',
})
export class RulesService {
	constructor(private http: HttpClient) {}

	/**
	 * Gets all rules
	 */
	getAll() {
		return this.http.get<string[]>(environment.apiUrl + 'rules');
	}
}
