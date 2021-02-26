const app = require('../app');
const db = require('../db_config');
const request = require('supertest');

describe('message api tests', () => {
	beforeEach(async () => {
		await db.clear(); //on va clean la base de données
	});

	it('list empty', async () => {
		// Return an empty message list by default
		await request(app)
			.get('/api/v1/messages')
			.expect(200, []);
	});

	it('list one element', async () => {
		// Create a message
		const message = {
			id: '123',
			content: 'content',
            created_at: 'created_at',
		};
		await db.put(`messages:${message.id}`, JSON.stringify(message));

		// Ensure we list the messages correctly
		await request(app)
			.get('/api/v1/messages')
			.expect(200, [{
				id: '123',
				content: 'content',
                created_at: 'created_at',
			}]);
	});

	it('create new message content not given', async () => {
		await request(app)
			.post('/api/v1/messages')
			.expect(400, {content: 'Content is required.'});
	});

	it('create new message', async () => {
		const {body} = await request(app)
			.post('/api/v1/messages')
			.send({content: 'message 1'})
			.expect(201);

		body.should.match({
			id: /^\w+-\w+-\w+-\w+-\w+$/, //on utilise une regex pour dire que notre id correspond bien à un uui
			content: 'message 1'
		});
	});

	it('show message', async () => {
		// Create a message
		const message = {
			id: '123',
			content: 'content',
            created_at: 'created_at',
		};
		await db.put(`messages:${message.id}`, JSON.stringify(message));

		// Ensure we list the messages correctly
		await request(app)
			.get('/api/v1/messages/123')
			.expect(200, {
				id: '123',
				content: 'content',
                created_at: 'created_at',
			});
	});

	//TODO show message with id who does not exist
	it('show message with id who does not exist', async () => {
		// Create a message
		const message = {
			id: '123',
			content: 'content',
            created_at: 'created_at',
		};
		await db.put(`messages:${message.id}`, JSON.stringify(message));

		// Ensure we list the messages correctly
		await request(app)
			.get('/api/v1/messages/123')
			.expect(200, {
				id: '123',
				content: 'content',
                created_at: 'created_at',
			});
	});

	//TODO update message with all cases
	it('update message with all cases', async () => {
		// Create a message
		const message = {
			id: '123',
			content: 'content',
            created_at: 'created_at',
		};
		await db.put(`messages:${message.id}`, JSON.stringify(message));
		await request(app)
			.put('/api/v1/messages/123')
			.send({content: 'message 123'})
			.expect(201);
	});

	//TODO delete message with all cases
	it('delete message with all cases', async () => {
		// Create a message
		const message = {
			id: '123',
			content: 'content',
            created_at: 'created_at',
		};
		await db.put(`messages:${message.id}`, JSON.stringify(message));
		await request(app)
			.delete('/api/v1/messages/123')
			.expect(201);
	});
});
