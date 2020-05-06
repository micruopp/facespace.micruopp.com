import uuid

clients = []

class Client:
	def __init__(self, uuid, scope, receive, send):
		self.id = uuid
		self.scope = scope
		self.receive = receive
		self.send = send

async def handleConnect(scope, receive, send):
	response = {
		'type': 'websocket.accept',
	}
	await send(response)

	_uuid = uuid.uuid4()
	client = Client(_uuid, scope, receive, send)

	clients.append(client)
	message = {
		'type': 'websocket.send',
		'text': "UUID: " + _uuid
	}
	await send(message)

async def handleDisconnect(scope, receive, send):
	return

async def handleReceive(event, scope, receive, send):
	if event['text'] == 'ping':
		response = {
			'type': 'websocket.send',
			'text': 'pong!'
		}
		await send(response)


async def websocket_application(scope, receive, send):
	print(scope)
	print(receive)
	print(send)

	while True:
		event = await receive()
		# print(event)

		if event['type'] == 'websocket.connect':
			await handleConnect(scope, receive, send)
			
		if event['type'] == 'websocket.disconnect':
			break

		if event['type'] == 'websocket.receive':
			await handleReceive(event, scope, receive, send)
