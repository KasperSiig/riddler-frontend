import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WordlistComponent } from '../wordlist.component';
import { Store } from '@ngxs/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
	MatCardModule,
	MatListModule,
	MatInputModule,
	MatIconModule,
	MatSnackBarModule,
} from '@angular/material';
import { of } from 'rxjs';
import { WordlistService } from '../wordlist.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';

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
	const wordlistSvcMock = {
		newWordlist: jest.fn( () => of('')),
	};
	const storeMock = {
		select: jest.fn((selector: any) => {
			return of(WORDLISTS);
		}),
		dispatch: jest.fn(() => {
			return of('');
		}),
	};
	let component: WordlistComponent;
	let fixture: ComponentFixture<WordlistComponent>;
	let wordlistSvc: WordlistService;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [
				MatCardModule,
				MatListModule,
				HttpClientTestingModule,
				MatInputModule,
				MatIconModule,
				MatSnackBarModule,
				BrowserAnimationsModule,
				ReactiveFormsModule,
			],
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
		expect(titles[0].children.length).toBe(4);
		expect(titles[0].children[2].textContent).toBe('Name');
		expect(titles[0].children[3].textContent).toBe('Path');
	});

	it('should contain wordlist options', () => {
		const el: HTMLElement = fixture.debugElement.nativeElement;
		const options: NodeListOf<HTMLElement> = el.querySelectorAll(
			'.wordlists__list__option',
		);
		expect(options.length).toBe(2);
		expect(options[1].textContent.trim()).toBe(
			'closeedit' + WORDLISTS[1].name + WORDLISTS[1].path,
		);
	});

	it('should call service to delete all selected wordlists', () => {
		const spy = jest
			.spyOn(wordlistSvc, 'delete')
			.mockImplementation((): any => of(''));
		WORDLISTS.forEach(w => {
			component.delete(w._id);
		});
		expect(spy).toHaveBeenCalledTimes(2);
	});

	it('should call service on delete button click', () => {
		const spy = jest.spyOn(component, 'delete');
		const el: HTMLElement = fixture.debugElement.nativeElement;
		const deleteBtn: HTMLElement = el.querySelector(
			'.wordlists__list__options__delete',
		);
		deleteBtn.click();
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should update updating variable', () => {
		const expected = 'test';
		component.edit(expected);
		expect(component.updating).toBe(expected);
	});

	it('should call service to save wordlist', () => {
		component.updating = 'test';
		const spy = jest
			.spyOn(wordlistSvc, 'updateOne')
			.mockImplementation(() => of(''));
		component.save(WORDLISTS[0]._id);
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should call service on click', () => {
		const spy = jest
			.spyOn(wordlistSvc, 'newWordlist')
			.mockImplementation((): any => of(''));
		const el: HTMLElement = fixture.debugElement.nativeElement;
		const submitBtn: HTMLElement = el.querySelector('.new__wordlist__submit');

		submitBtn.click();
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should show a file in textfield', () => {
		component.chooseNewWordlist({ target: { files: [{ name: 'test.txt' }] } });
		expect(component.filename).toBe('test.txt');
	});
});
