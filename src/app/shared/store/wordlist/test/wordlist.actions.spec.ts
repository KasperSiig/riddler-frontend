import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { AddWordlists, GetWordlists } from '../wordlist.actions';
import { WordlistSelectors } from '../wordlist.selectors';
import { WordlistsState } from '../wordlist.state';

const DESIRED_STATE = {
	wordlists: {
		wordlists: [
			{ _id: 'default', name: 'default', path: '/opt/jtr/wordlist1.txt' },
		],
	},
};

const TEST_WORDLIST = {
	_id: 'test',
	name: 'test',
	path: '/opt/jtr/wordlist.txt',
};

describe('Wordlist Actions', () => {
	let store: Store;
	const httpMock = {
		get: jest.fn(() => {
			return of([TEST_WORDLIST]);
		}),
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [NgxsModule.forRoot([WordlistsState]), HttpClientTestingModule],
			providers: [
				{
					provide: HttpClient,
					useValue: httpMock,
				},
			],
		}).compileComponents();

		store = TestBed.get(Store);
		store.reset(DESIRED_STATE);
	}));

	it('should get Wordlists', () => {
		store.dispatch(new GetWordlists());
		store.selectOnce(WordlistSelectors.wordlists).subscribe(wordlists => {
			expect(wordlists).toEqual([TEST_WORDLIST]);
		});
	});

	it('should add Wordlists', () => {
		const expected = [...DESIRED_STATE.wordlists.wordlists, TEST_WORDLIST];
		store.dispatch(new AddWordlists([TEST_WORDLIST]));
		store.selectOnce(WordlistSelectors.wordlists).subscribe(wordlists => {
			expect(wordlists).toBe(expected);
		});
	});
});
