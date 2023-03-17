import { userModel, IUser } from './../models/user.model';

export class UserRepository {
	public async getById(id: string): Promise<IUser> {
		return await userModel.findById(id);
	}

	public async getByUsername(username: string): Promise<IUser> {
		return await userModel.findOne({
			username,
		});
	}

	public async create(user: IUser): Promise<IUser> {
		return await userModel.create(user);
	}
}
