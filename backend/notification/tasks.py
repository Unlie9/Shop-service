from celery import shared_task
from asgiref.sync import async_to_sync
from channels.layers import get_channel_layer


@shared_task
def send_order_notification(email):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        "notifications",
        {
            "type": 'send_notification',
            "message": f"User {email} has made an order.",
        }
    )


@shared_task
def send_registration_notification(email):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
        "notifications",
        {
            "type": "send_notification",
            "message": f"New user {email} has registered.",
        }
    )
