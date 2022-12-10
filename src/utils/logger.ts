export class Logger {
	private name: string;

	constructor(name: string) {
		this.name = name;
	}

	public error(message: string) {
		console.error(`[${this.name}](${new Date().toISOString()}) ${message}`);
	}
}
