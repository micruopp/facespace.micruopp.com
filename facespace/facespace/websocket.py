import uuid

clients = []

async def websocket_application(scope, receive, send):
	while True:
		event = await receive()

		if event['type'] == 'websocket.connect':
			response = {
				'type': 'websocket.accept',
			}
			await send(response)

			_id = uuid.uuid4()
			clients.append(_id)

			id_message = "You are " + str(_id)
			message = {
				'type': 'websocket.send',
				'text': id_message
			}
			await send(message)

			# clients_message = "New client connected: ".join(str(i) for i in clients)
			# message_2 = {
			# 	'type': 'websocket.send',
			# 	'text': clients_message
			# }
			# await send(message_2)


		if event['type'] == 'websocket.disconnect':
			break

		if event['type'] == 'websocket.receive':
			if event['text'] == 'ping':
				response = {
					'type': 'websocket.send',
					'text': 'pong!'
				}
				await send(response)

