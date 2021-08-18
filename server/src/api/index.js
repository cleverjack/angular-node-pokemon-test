import { version } from '../../package.json';
import { Router } from 'express';
import facets from './facets';
import axios from 'axios';

export default ({ config, db }) => {
	let api = Router();

	// mount the facets resource
	// api.use('/facets', facets({ config, db }));

	// perhaps expose some API metadata at the root
	api.get('/', (req, res) => {
		res.json({ version });
	});

	api.get('/pokemons', async (req, res) => {
		try {
			const response = await axios.get(`https://pokeapi.co/api/v2/pokemon?limit=${req.query.limit}&offset=${req.query.page * req.query.limit}`)
			res.json(response.data);
		} catch (error) {
			console.log(error);
			res.sendStatus(500);
		}
	});

	api.get('/pokemon/:id', async (req, res) => {
		try {
			let id = req.params.id;
			const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
			res.json(response.data);
		} catch (error) {
			console.log(error);
			res.sendStatus(500);
		}
	});

	return api;
}
