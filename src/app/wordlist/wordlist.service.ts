import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Wordlist } from '../shared/store';

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

	updateOne(wordlist: Wordlist) {
		return this.http.put(
			environment.apiUrl + 'wordlist/' + wordlist._id,
			wordlist,
		);
	}
}
