async def websocket_application(scope, receive, send):
	
	def handleConnect():
		response = { 'type': 'websocket.accept' }
		await send(response)

	def handleDisconnect():
		return

	def handleReceive():
		if event['text'] == 'ping':
			response = {
				'type': 'websocket.send',
				'text': 'pong!'
			}
			await send(response)

		while True:
			event = await receive()

			if event['type'] == 'websocket.connect':
				handleConnect()
				
			if event['type'] == 'websocket.disconnect':
				handleDisconnect()
				break

			if event['type'] == 'websocket.receive':
				handleReceive()
			
