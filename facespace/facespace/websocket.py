import uuid

clients = []

class Client:
	def __init__(self, uuid, scope, receive, send):
		self.id = uuid
		self.scope = scope
		self.receive = receive
		self.send = send

async def handleConnect(scope, receive, send):
	return

async def handleDisconnect(scope, receive, send):
	return

async def handleReceive(scope, receive, send):
	return

async def websocket_application(scope, receive, send):
	print(scope)
	print(receive)
	print(send)
	print(event)

	while True:
		event = await receive()

		if event['type'] == 'websocket.connect':
			response = {
				'type': 'websocket.accept',
			}
			await send(response)

			_id = uuid.uuid4()
			clients.append(_id)

		if event['type'] == 'websocket.disconnect':
			break

		if event['type'] == 'websocket.receive':
			if event['text'] == 'ping':
				response = {
					'type': 'websocket.send',
					'text': 'pong!'
				}
				await send(response)

