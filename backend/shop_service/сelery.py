import os
from celery import Celery
from django.conf import settings

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "shop_service.settings")

celery = Celery("shop_service", broker=settings.CELERY_BROKER_URL)

celery.config_from_object("django.conf:settings", namespace="CELERY")

celery.autodiscover_tasks(lambda: settings.INSTALLED_APPS)
