import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordlistComponent } from '../wordlist.component';
import { Store } from '@ngxs/store';
import { MatCardModule, MatListModule } from '@angular/material';
import { of } from 'rxjs';
import { WordlistService } from '../wordlist.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

const WORDLISTS = [
	{
		_id: 'default',
		name: 'default',
		path: '/opt/jtr/wordlist.txt',
	},
	{
		_id: 'test',
		name: 'test',
		path: '/opt/wordlist.txt',
	},
];

describe('WordlistComponent', () => {
	let component: WordlistComponent;
	let fixture: ComponentFixture<WordlistComponent>;
	let wordlistSvc: WordlistService;
	const storeMock = {
		select: jest.fn((selector: any) => {
			return of(WORDLISTS);
		}),
		dispatch: jest.fn(() => {
			return of('');
		}),
	};

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [MatCardModule, MatListModule, HttpClientTestingModule],
			declarations: [WordlistComponent],
			providers: [
				{
					provide: Store,
					useValue: storeMock,
				},
				WordlistService,
			],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(WordlistComponent);
		component = fixture.componentInstance;
		wordlistSvc = TestBed.get<WordlistService>(WordlistService);
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});

	it('should select wordlists from store', () => {
		expect(component.wordlists).toBe(WORDLISTS);
	});

	it('should contain titles', () => {
		const el: HTMLElement = fixture.debugElement.nativeElement;
		const titles: NodeListOf<HTMLElement> = el.querySelectorAll(
			'.wordlists__list__title',
		);

		expect(titles.length).toBe(1);
		expect(titles[0].children.length).toBe(2);
		expect(titles[0].children[0].textContent).toBe('Name');
		expect(titles[0].children[1].textContent).toBe('Path');
	});

	it('should contain wordlist options', () => {
		const el: HTMLElement = fixture.debugElement.nativeElement;
		const options: NodeListOf<HTMLElement> = el.querySelectorAll(
			'.wordlists__list__option',
		);
		expect(options.length).toBe(2);
		expect(options[1].textContent.trim()).toBe(
			WORDLISTS[1].name + WORDLISTS[1].path,
		);
	});

	it('should call service to delete all selected wordlists', () => {
		const spy = jest
			.spyOn(wordlistSvc, 'delete')
			.mockImplementation((): any => of(''));
		component.delete({
			selected: WORDLISTS.map(w => ({ value: w._id })),
		} as any);
		expect(spy).toHaveBeenCalledTimes(2);
	});
});
