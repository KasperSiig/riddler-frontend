import { STATUS } from './status.enum';

export class Job {
	// tslint:disable-next-line: variable-name
	_id?: string;
	name: string;
	file: string;
	status?: STATUS;
	format?: string;
	wordlist?: string;
	directory?: string;
}
