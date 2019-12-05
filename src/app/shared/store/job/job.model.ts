import { STATUS } from './status.enum';
import { Wordlist } from '../wordlist';

export class Job {
	// tslint:disable-next-line: variable-name
	_id?: string;
	name: string;
	status?: STATUS;
	format?: string;
	wordlist?: Wordlist;
	directory?: string;
	time?: number;
}
