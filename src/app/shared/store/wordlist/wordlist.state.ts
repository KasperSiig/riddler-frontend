import { HttpClient } from '@angular/common/http';
import { Action, State, StateContext } from '@ngxs/store';
import { environment } from '../../../../environments/environment';
import { WordlistStateModel } from './wordlist-state.model';
import { AddWordlists, GetWordlists } from './wordlist.actions';
import { Wordlist } from './wordlist.model';

@State<WordlistStateModel>({
	name: 'wordlists',
	defaults: {
		wordlists: [],
	},
})
export class WordlistsState {
	constructor(private http: HttpClient) {}

	/**
	 * Adds Wordlists to the store
	 */
	@Action(AddWordlists)
	addWordlists(
		{ getState, patchState }: StateContext<WordlistStateModel>,
		{ wordlists }: AddWordlists,
	) {
		patchState({
			wordlists: [...getState().wordlists, ...wordlists],
		});
	}

	/**
	 * Gets Wordlists and adds them to the store
	 */
	@Action(GetWordlists)
	getWordlists({ setState }: StateContext<WordlistStateModel>) {
		this.http
			.get<Wordlist[]>(environment.apiUrl + 'wordlist')
			.subscribe(wordlists => {
				setState({
					wordlists,
				});
			});
	}
}
