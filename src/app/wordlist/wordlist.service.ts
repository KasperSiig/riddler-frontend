import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class WordlistService {
	constructor(private http: HttpClient) {}

	/**
	 * Requests the backend to delete a wordlist
	 *
	 * @param id Id of wordlist to delete
	 */
	delete(id: string) {
		return this.http.delete(environment.apiUrl + 'wordlist/' + id);
	}
}
