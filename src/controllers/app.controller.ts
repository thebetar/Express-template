import { Application, Router } from 'express';

import AppService from '../services/app.service';

export default class AppController {
	private router: Router;

	private appService: AppService;

	constructor(app: Application) {
		this.router = Router();

		this.appService = new AppService();

		this.router.get('/', this.appService.sendHelloWorld.bind(this.appService));

		app.use('/', this.router);
	}
}
