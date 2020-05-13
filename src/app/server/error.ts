export const middlewareErro = (err: any, req: any, res: any, next: any) => {
	console.log(err);
	switch (err.name) {
		case 'ErrorBody': {

			res.status(400).send({
				sucess: false,
				message: err.message,
				data: err.fields
			});
			break;
		}

		default: {
			res.status(500).send({
				sucess: false,
				message: err.message,
				data: null
			});
		}

	}

}