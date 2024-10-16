
import os
import django
from django.contrib.auth import get_user_model

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'shop_service.settings')
django.setup()

User = get_user_model()

SUPERUSER_EMAIL = 'admin@gmail.com'
SUPERUSER_PASSWORD = 'admin1234'

if not User.objects.filter(email=SUPERUSER_EMAIL).exists():
    print('Creating superuser...')
    User.objects.create_superuser(email=SUPERUSER_EMAIL, password=SUPERUSER_PASSWORD)
    print(f'Superuser {SUPERUSER_EMAIL} created.')
else:
    print(f'Superuser {SUPERUSER_EMAIL} already exists.')
