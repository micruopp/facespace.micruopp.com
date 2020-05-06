import uuid

async def websocket_application(scope, receive, send):
	clients = []
	while True:
		event = await receive()

		if event['type'] == 'websocket.connect':
			response = {
				'type': 'websocket.accept',
			}
			await send(response)

			clientId = uuid.uuid4()
			clients.append(clientId)
			message = {
				'type': 'websocket.send',
				'text': clientId
			}
			await send(message)


		if event['type'] == 'websocket.disconnect':
			break

		if event['type'] == 'websocket.receive':
			if event['text'] == 'ping':
				response = {
					'type': 'websocket.send',
					'text': 'pong!'
				}
				await send(response)

