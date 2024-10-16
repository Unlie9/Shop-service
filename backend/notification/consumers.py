from channels.generic.websocket import AsyncJsonWebsocketConsumer

class AdminNotificationConsumer(AsyncJsonWebsocketConsumer):
    async def connect(self):
        self.group_name = "notifications"
        await self.channel_layer.group_add(self.group_name, self.channel_name)
        await self.accept()

    async def disconnect(self, close_code):
        await self.channel_layer.group_discard(self.group_name, self.channel_name)

    async def send_notification(self, event):
        message = event['message']
        print(f"Sending notification: {message}") 
        await self.send_json({
            "type": "send_notification",
            "message": message,
        })
  