import { NextFunction, Request, Response } from 'express';

export default function AuthMiddleware(req: Request, res: Response, next: NextFunction) {
	next();
}
