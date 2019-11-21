import { Selector } from '@ngxs/store';
import { WordlistsState } from './wordlist.state';
import { WordlistStateModel } from './wordlist-state.model';
import { Wordlist } from './wordlist.model';

export class WordlistSelectors {
	@Selector([WordlistsState])
	static wordlists({ wordlists }: WordlistStateModel): Wordlist[] {
		return wordlists;
	}
}
