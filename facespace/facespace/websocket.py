import uuid

async def websocket_application(scope, receive, send):
	clients = []
	while True:
		event = await receive()

		if event['type'] == 'websocket.connect':
			id = uuid.uuid4()
			clients.append(id)
			response = {
				'type': 'websocket.accept',
				'text': str(id)
			}
			await send(response)

		if event['type'] == 'websocket.disconnect':
			break

		if event['type'] == 'websocket.receive':
			if event['text'] == 'ping':
				response = {
					'type': 'websocket.send',
					'text': 'pong!'
				}
				await send(response)

