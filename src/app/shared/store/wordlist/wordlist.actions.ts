import { Wordlist } from './wordlist.model';

/**
 * Add Wordlists to the store
 */
export class AddWordlists {
	static readonly type = '[Wordlists] Add Wordlists';
	constructor(public wordlists: Wordlist[]) {}
}

/**
 * Gets Wordlists and adds to store
 */
export class GetWordlists {
	static readonly type = '[Wordlists] Get Wordlists';
	constructor() {}
}
