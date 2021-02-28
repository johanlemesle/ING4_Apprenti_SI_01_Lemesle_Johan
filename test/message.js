const app = require('../app');
const db = require('../db_config');
const request = require('supertest');

describe('message api tests', () => {
	beforeEach(async () => {
		await db.clear(); //on va clean la base de données
	});

	it('list empty', async () => {
		// Return an empty message list by default
		const channel = {
			id: '123',
			name: 'name',
		};
		await db.put(`channels:${channel.id}`, JSON.stringify(channel));
		await request(app)
			.get('/api/v1/messages/123')
			.expect(200, []);
	});


	it('create new message content not given', async () => {
		await request(app)
			.post('/api/v1/messages')
			.send({id: '123', created_at: 'created_at 1', channelId: '12'})
			.expect(400);
	});

	it('create new message create_at not given', async () => {
		await request(app)
			.post('/api/v1/messages')
			.send({id: '123', content: 'content', channelId: '12'})
			.expect(400);
	});

	it('create new message channelId not given', async () => {
		await request(app)
			.post('/api/v1/messages')
			.send({id: '123', content: 'content', created_at: 'bobby'})
			.expect(400);
	});

	it('create new message', async () => {
		const {body} = await request(app)
			.post('/api/v1/messages')
			.send({content: 'content 1', created_at: 'created_at 1', channelId: '12'})
			.expect(201);

		body.should.match({
			id: /^\w+-\w+-\w+-\w+-\w+$/, //on utilise une regex pour dire que notre id correspond bien à un uui
			content: 'content 1',
            created_at: 'created_at 1',
			channelId: '12',
		});
	});
	
	it('update message with all cases', async () => {
		const message = {
			id: '123',
			content: 'content',
            created_at: 'created_at',
			channelId: '12',
		};
		await db.put(`messages:${message.id}`, JSON.stringify(message));

		const channel = {
			id: '12',
			name: 'name',
		};
		await db.put(`channels:${channel.id}`, JSON.stringify(channel));

		await request(app)
			.put('/api/v1/messages/123/channels/12')
			.send({name: 'message 123', content: 'content 12', created_at: 'created_at 12', channelId: '12'})
			.expect(201);
	});

	//TODO delete message with all cases
	it('delete message with all cases', async () => {
		// Create a message
		const channel = {
			id: '5',
			name: 'name',
		};
		await db.put(`channels:${channel.id}`, JSON.stringify(channel));
		const message = {
			id: '26',
			content: 'content',
            created_at: 'created_at',
			channelId: '5',
		};
		await db.put(`messages:${message.id}`, JSON.stringify(message));
		await request(app)
			.delete('/api/v1/messages/26/channels/5')
			.expect(201);
	});
});
