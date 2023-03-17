import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { UserRepository } from '../repositories/user.repository';

import type { JWTToken } from '../types/global';
import { Logger } from '../utils/logger';

export class AppService {
	private logger: Logger;

	private userRepository: UserRepository;

	constructor() {
		this.logger = new Logger('AppService');

		this.userRepository = new UserRepository();
	}

	public sendTestMessage() {
		return 'Server is working!';
	}

	public async login(body: any) {
		try {
			if (body.username && body.password) {
				const user = await this.userRepository.getByUsername(body.username);

				if (user && (await compare(body.password, user.password))) {
					return {
						token: sign({ id: user._id } as JWTToken, process.env.JWT_SECRET, {
							expiresIn: '1d',
						}),
					};
				} else {
					throw new Error('Invalid username or password', {
						cause: {
							statusCode: 400,
						},
					});
				}
			} else {
				throw new Error('Missing username or password', {
					cause: {
						statusCode: 400,
					},
				});
			}
		} catch (error: any) {
			this.logger.error(error.stack);
			throw error;
		}
	}

	public async register(body: any) {
		try {
			if (body.username && body.password) {
				const password = await hash(body.password, 10);
				const user = await this.userRepository.create({
					username: body.username,
					password,
				});

				return {
					token: sign({ id: user._id } as JWTToken, process.env.JWT_SECRET, {
						expiresIn: '1d',
					}),
				};
			} else {
				throw new Error('Missing username or password', {
					cause: {
						statusCode: 400,
					},
				});
			}
		} catch (error: any) {
			this.logger.error(error.stack);
			throw error;
		}
	}
}

export default AppService;
