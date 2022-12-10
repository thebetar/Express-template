// Simple express server
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

import ApplicationController from './controllers/app.controller';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(
	cors({
		origin: process.env.CLIENT_URL || '*'
	})
);
app.use(bodyParser.json());

bootstrapControllers([ApplicationController]);

app.listen(PORT, async () => {
	console.log(`Server started on port ${PORT}`);
});

function bootstrapControllers(list: any[]) {
	list.forEach((controller: any) => {
		new controller(app);
		console.log(`[Controller] ${controller.name} set`);
	});
}
