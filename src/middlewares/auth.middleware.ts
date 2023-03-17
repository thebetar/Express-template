import { userModel } from './../models/user.model';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import type { JWTToken } from '../types/global';

export default function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
	try {
		if (req.headers.authorization) {
			const token = req.headers.authorization.split(' ')[1];
			const decoded = verify(token, process.env.JWT_SECRET) as JWTToken;

			if (decoded.id) {
				const user = userModel.findById(decoded.id);
				if (user) {
					req.body.userId = decoded.id;
					return next();
				}
			}
		}
		return res.status(401).json({
			message: 'Unauthorized',
		});
	} catch (error: any) {
		throw error;
	}
}
