import fs, { WriteStream } from 'fs';

export class Logger {
	private name: string;

	private info_log: WriteStream;
	private warn_log: WriteStream;
	private error_log: WriteStream;

	constructor(name: string) {
		this.name = name;

		this.info_log = fs.createWriteStream('../../logs/info.log', { flags: 'w' });
		this.warn_log = fs.createWriteStream('../../logs/warn.log', { flags: 'w' });
		this.error_log = fs.createWriteStream('../../logs/error.log', { flags: 'w' });
	}

	public info(info: string) {
		const message = `[${this.name}](${new Date().toISOString()}) ${info}`;

		this.info_log.write(message);
		console.info(message);
	}

	public warn(warn: string) {
		const message = `[${this.name}](${new Date().toISOString()}) ${warn}`;

		this.warn_log.write(message);
		console.warn(message);
	}

	public error(error: string) {
		const message = `[${this.name}](${new Date().toISOString()}) ${error}`;

		this.error_log.write(message);
		console.error(message);
	}
}
