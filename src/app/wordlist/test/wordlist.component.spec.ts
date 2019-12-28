import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import {
	MatButtonModule,
	MatCardModule,
	MatIconModule,
	MatInputModule,
	MatListModule,
	MatSnackBarModule,
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Store } from '@ngxs/store';
import { of } from 'rxjs';
import { select, selectAll } from 'src/test';
import { WordlistComponent } from '../wordlist.component';
import { WordlistService } from '../wordlist.service';

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
	const storeMock = {
		select: jest.fn(() => {
			return of(WORDLISTS);
		}),
		dispatch: jest.fn(() => {
			return of('');
		}),
	};
	let component: WordlistComponent;
	let fixture: ComponentFixture<WordlistComponent>;
	let wordlistSvc: WordlistService;

	beforeEach(async () => {
		await TestBed.configureTestingModule({
			imports: [
				MatCardModule,
				MatListModule,
				HttpClientTestingModule,
				MatInputModule,
				MatIconModule,
				MatButtonModule,
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
		const titles = selectAll(fixture, '.wordlist__title') as NodeListOf<
			HTMLElement
		>;

		expect(titles.length).toBe(1);
		expect(titles[0].children.length).toBe(4);
		expect(titles[0].children[2].textContent).toBe('Name');
		expect(titles[0].children[3].textContent).toBe('Path');
	});

	it('should contain wordlist options', () => {
		const options = selectAll(
			fixture,
			'.wordlists__list__option',
		) as NodeListOf<HTMLElement>;
		expect(options.length).toBe(2);
		expect(options[1].textContent.trim()).toBe(
			'deleteedit' + WORDLISTS[1].name + WORDLISTS[1].path,
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
		const deleteBtn = select(
			fixture,
			'.wordlists__list__options__delete',
		) as HTMLElement;
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
		const submitBtn = select(fixture, '.new__wordlist__submit') as HTMLElement;

		submitBtn.click();
		expect(spy).toHaveBeenCalledTimes(1);
	});

	it('should show a file in textfield', () => {
		component.chooseNewWordlist({ target: { files: [{ name: 'test.txt' }] } });
		expect(component.filename).toBe('test.txt');
	});

	it('should contain two inputs', () => {
		const textFields = selectAll(fixture, 'input');

		expect(textFields.length).toBe(2);
	});

	it('should contain two text fields', () => {
		const textFields = selectAll(fixture, 'form');

		expect(textFields.length).toBe(2);
	});
});
