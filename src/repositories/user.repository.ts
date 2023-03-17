import { Logger } from '../utils/logger';
import { userModel, IUser } from './../models/user.model';

export class UserRepository {
	private logger: Logger;

	constructor() {
		this.logger = new Logger('UserRepository');
	}

	public async getById(id: string): Promise<IUser> {
		try {
			return await userModel.findById(id);
		} catch (error: any) {
			this.logger.error(error.stack);
			throw error;
		}
	}

	public async getByUsername(username: string): Promise<IUser> {
		try {
			return await userModel.findOne({
				username,
			});
		} catch (error: any) {
			this.logger.error(error.stack);
			throw error;
		}
	}

	public async create(user: IUser): Promise<IUser> {
		try {
			return await userModel.create(user);
		} catch (error: any) {
			this.logger.error(error.stack);
			throw error;
		}
	}
}
