import { AppRepository } from './../repositories/app.repository';

export class AppService {
	private appRepository: AppRepository;

	constructor() {
		this.appRepository = new AppRepository();
	}

	public sendHelloWorld() {
		return 'Hello world';
	}

	public login(body: any) {
		if (body.username && body.password) {
			return this.appRepository.login(body.username, body.password);
		} else {
			throw new Error('Missing username or password', {
				cause: {
					statusCode: 400
				}
			});
		}
	}

	public register(body: any) {
		if (body.username && body.password) {
			return this.appRepository.register(body.username, body.password);
		} else {
			throw new Error('Missing username or password', {
				cause: {
					statusCode: 400
				}
			});
		}
	}
}

export default AppService;
