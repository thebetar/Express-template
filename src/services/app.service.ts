export default class AppService {
	sendHelloWorld(req: any, res: any) {
		res.status(200).send('Hello World');
	}
}
