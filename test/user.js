const app = require('../app');
const db = require('../db_config');
const request = require('supertest');

describe('user api tests', () => {
	beforeEach(async () => {
		await db.clear(); //on va clean la base de données
	});

	it('list empty', async () => {
		// Return an empty user list by default
		await request(app)
			.get('/api/v1/users')
			.expect(200, []);
	});

	it('list one element', async () => {
		// Create a user
		const user = {
			id: '123',
			name: 'name',
            email: 'email',
            password: 'pwd',
		};
		await db.put(`users:${user.id}`, JSON.stringify(user));

		// Ensure we list the users correctly
		await request(app)
			.get('/api/v1/users')
			.expect(200, [{
				id: '123',
				name: 'name',
                email: 'email',
                password: 'pwd',
			}]);
	});

	it('create new user name not given', async () => {
		await request(app)
			.post('/api/v1/users')
			.expect(400, {name: 'Name is required.'});
	});

	it('create new user', async () => {
		const {body} = await request(app)
			.post('/api/v1/users')
			.send({name: 'user 1'})
			.expect(201);

		body.should.match({
			id: /^\w+-\w+-\w+-\w+-\w+$/, //on utilise une regex pour dire que notre id correspond bien à un uui
			name: 'user 1'
		});
	});

	it('show user', async () => {
		// Create a user
		const user = {
			id: '123',
			name: 'name',
            email: 'email',
            password: 'pwd',
		};
		await db.put(`users:${user.id}`, JSON.stringify(user));

		// Ensure we list the users correctly
		await request(app)
			.get('/api/v1/users/123')
			.expect(200, {
				id: '123',
				name: 'name',
                email: 'email',
                password: 'pwd',
			});
	});

	//TODO show user with id who does not exist
	it('show user with id who does not exist', async () => {
		// Create a user
		const user = {
			id: '123',
			name: 'name',
            email: 'email',
            password: 'pwd',
		};
		await db.put(`users:${user.id}`, JSON.stringify(user));

		// Ensure we list the users correctly
		await request(app)
			.get('/api/v1/users/123')
			.expect(200, {
				id: '123',
				name: 'name',
                email: 'email',
                password: 'pwd',
			});
	});

	//TODO update user with all cases
	it('update user with all cases', async () => {
		// Create a user
		const user = {
			id: '123',
			name: 'name',
            email: 'email',
            password: 'pwd',
		};
		await db.put(`users:${user.id}`, JSON.stringify(user));
		await request(app)
			.put('/api/v1/users/123')
			.send({name: 'user 123'})
			.expect(201);
	});

	//TODO delete user with all cases
	it('delete user with all cases', async () => {
		// Create a user
		const user = {
			id: '123',
			name: 'name',
            email: 'email',
            password: 'pwd',
		};
		await db.put(`users:${user.id}`, JSON.stringify(user));
		await request(app)
			.delete('/api/v1/users/123')
			.expect(201);
	});
});
