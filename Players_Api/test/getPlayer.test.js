const supertest = require('supertest');
const mongoose = require('mongoose');

const { app, server } = require('../app');

const api = supertest(app);

test('players are returned as json', async () => {
	await api
		.get('/api/players')
		.expect(200)
		.expect('Content-Type', /application\/json/);
});

test('there are 6 players', async () => {
	const response = await api.get('/api/players');
	expect(response.body.Users).toHaveLength(6);
});

afterAll(() => {
	mongoose.connection.close();
	server.close();
});
