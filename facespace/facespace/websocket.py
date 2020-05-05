async def websocket_application(scope, receive, send):
	while True:
		event = await receive()

		if event['type'] == 'websocket.connect':
			response = { 'type': 'websocket.accept' }
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