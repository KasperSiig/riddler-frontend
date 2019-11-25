import { WordlistStateModel } from '../wordlist-state.model';
import { WordlistSelectors } from '../wordlist.selectors';

describe('Wordlist Selectors', () => {
	it('should select all wordlists', () => {
		const wordlistState: WordlistStateModel = {
			wordlists: [{ name: 'Wordlist', path: '/opt/jtr/wordlist.txt' }],
		};
		expect(WordlistSelectors.wordlists(wordlistState)).toBe(
			wordlistState.wordlists,
		);
	});
});
