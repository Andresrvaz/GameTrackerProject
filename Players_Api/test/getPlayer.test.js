const supertest = require('supertest');
const mongoose = require('mongoose');

const Players = require('../model/users');

const { app, server } = require('../app');

const api = supertest(app);

const initialPlayers = [
	{
		_id: 'bf4c8552-1f19-4520-83ad-03a56b3ab6ce',
		name: 'Bimba',
		score: 0,
	},
	{
		_id: 'adf15719-f340-4ce3-9e48-d77db3bc0af4',
		name: 'AndresV',
		score: 1,
	},
	{
		_id: 'c8141dcd-c7d3-49f9-9782-71d41806f887',
		name: 'Daniela',
		score: 2,
	},
	{
		_id: 'ab78f81a-5717-4630-8bb7-abc22430438a',
		name: 'Susana',
		score: 0,
	},
	{
		_id: '944c2915-326e-4ae9-a9fc-7578907ba001',
		name: 'Carlos',
		score: 1,
	},
];

beforeEach(async () => {
	await Players.deleteMany({});

	const fill = await Promise.all(
		initialPlayers.map(async (player) => {
			const sPlayer = new Players(player);
			await sPlayer.save();
		})
	);
});

describe('Get All players', () => {
	test('players are returned as json', async () => {
		await api
			.get('/api/players')
			.expect(200)
			.expect('Content-Type', /application\/json/);
	});

	test('there are 6 players', async () => {
		const response = await api.get('/api/players');
		expect(response.body.Users).toHaveLength(initialPlayers.length);
	});
});

describe('Post Player', () => {
	test('a valid note can be added', async () => {
		const newPlayer = {
			player: 'Pedro',
		};

		await api
			.post('/api/players')
			.send(newPlayer)
			.expect(201)
			.expect('Content-Type', /application\/json/);

		const response = await api.get('/api/players');
		expect(response.body.Users).toHaveLength(initialPlayers.length + 1);
	});

	test.failing(
		'Player with numbers in the string will not be added',
		async () => {
			const newPlayer = {
				player: 'Andres54',
			};

			await api
				.post('/api/players')
				.send(newPlayer)
				.expect(201)
				.expect('Content-Type', /application\/json/);
		}
	);

	test.failing(
		'Player with less than 4 or more than 14 characters will not be added',
		async () => {
			const newPlayer = {
				player: 'Bob',
			};

			await api
				.post('/api/players')
				.send(newPlayer)
				.expect(201)
				.expect('Content-Type', /application\/json/);
		}
	);
});

describe('Get Player by ID ', () => {
	test('Player name should match', async () => {
		const response = await api
			.get('/api/players/' + initialPlayers[0]._id)
			.expect(200)
			.expect('Content-Type', /application\/json/);
		expect(response.body[0].name).toBe(initialPlayers[0].name);
	});
});

afterAll(() => {
	mongoose.connection.close();
	server.close();
});
