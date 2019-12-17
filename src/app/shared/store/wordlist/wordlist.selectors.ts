import { Selector } from '@ngxs/store';
import { WordlistStateModel } from './wordlist-state.model';
import { Wordlist } from './wordlist.model';
import { WordlistsState } from './wordlist.state';

export class WordlistSelectors {
	/**
	 * Selects all wordlists
	 */
	@Selector([WordlistsState])
	static wordlists({ wordlists }: WordlistStateModel): Wordlist[] {
		return wordlists;
	}
}
