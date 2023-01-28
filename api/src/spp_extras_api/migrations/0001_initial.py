# Generated by Django 4.1.2 on 2022-10-31 00:09

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Account',
            fields=[
                ('id', models.IntegerField(primary_key=True, serialize=False)),
                ('username', models.CharField(max_length=32)),
            ],
            options={
                'db_table': 'account',
            },
        ),
        migrations.CreateModel(
            name='Character',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('account', models.IntegerField()),
            ],
            options={
                'db_table': 'characters',
            },
        ),
    ]