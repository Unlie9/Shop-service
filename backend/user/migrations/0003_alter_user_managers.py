# Generated by Django 5.1.2 on 2024-10-14 12:03

import user.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('user', '0002_remove_user_username'),
    ]

    operations = [
        migrations.AlterModelManagers(
            name='user',
            managers=[
                ('objects', user.models.UserManager()),
            ],
        ),
    ]
