import { Application, Router } from 'express';

import { AppService } from '../services/app.service';

import { Logger } from '../utils/logger';
import { body } from 'express-validator';
import AuthMiddleware from '../middlewares/auth.middleware';

export default class AppController {
	private logger: Logger;

	private router: Router;

	private appService: AppService;

	constructor(app: Application) {
		this.logger = new Logger('AppController');

		this.router = Router();

		this.appService = new AppService();

		this.router.get('/', (req, res) => {
			try {
				const message = this.appService.sendTestMessage();

				res.status(200).send(message);
			} catch (error: any) {
				this.logger.error(error.stack);
				res.status(error.cause.statusCode || 500).send('Internal Server Error');
			}
		});

		this.router.get('/check', AuthMiddleware, (req, res) => {
			try {
				const message = this.appService.sendTestMessage();

				res.status(200).send(message);
			} catch (error: any) {
				this.logger.error(error.stack);
				res.status(error.cause.statusCode || 500).send('Internal Server Error');
			}
		});

		this.router.post('/login', body('username').isEmail(), body('password').isLength({ min: 6 }), (req, res) => {
			try {
				const body = req.body;

				const message = this.appService.login(body);

				res.status(200).send(message);
			} catch (error: any) {
				this.logger.error(error.stack);
				res.status(error.cause.statusCode || 500).send('Internal Server Error');
			}
		});

		this.router.post('/register', body('username').isEmail(), body('password').isLength({ min: 6 }), (req, res) => {
			try {
				const body = req.body;

				const message = this.appService.register(body);

				res.status(200).send(message);
			} catch (error: any) {
				this.logger.error(error.stack);
				res.status(error.cause.statusCode || 500).send('Internal Server Error');
			}
		});

		app.use('/', this.router);
	}
}
