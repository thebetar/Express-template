import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';

import { UserRepository } from '../repositories/user.repository';

export class AppService {
	private userRepository: UserRepository;

	constructor() {
		this.userRepository = new UserRepository();
	}

	public sendTestMessage() {
		return 'Server is working!';
	}

	public async login(body: any) {
		if (body.username && body.password) {
			const user = await this.userRepository.getByUsername(body.username);

			if (user && (await compare(body.password, user.password))) {
				return {
					token: sign({ id: user._id }, process.env.JWT_SECRET, {
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
	}

	public async register(body: any) {
		if (body.username && body.password) {
			const password = await hash(body.password, 10);
			const user = await this.userRepository.create({
				username: body.username,
				password,
			});

			return {
				token: sign({ id: user._id }, process.env.JWT_SECRET, {
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
	}
}

export default AppService;
