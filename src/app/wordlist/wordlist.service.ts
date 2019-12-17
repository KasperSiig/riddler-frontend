import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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

	/**
	 * Updates a given wordlist
	 *
	 * @param wordlist Wordlist to update
	 */
	updateOne(wordlist: Wordlist) {
		return this.http.put(
			environment.apiUrl + 'wordlist/' + wordlist._id,
			wordlist,
		);
	}

	/**
	 * Requests backend to create a wordlist
	 *
	 * @param wordlist Info about wordlist to create
	 * @param file File to create wordlist from
	 */
	newWordlist(wordlist: Wordlist, file: File) {
		const formData = new FormData();
		formData.append('file', file);
		formData.append('wordlist', JSON.stringify(wordlist));
		return this.http.post(environment.apiUrl + 'wordlist/', formData);
	}
}
