# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Account(models.Model):
    id = models.BigAutoField(primary_key=True)
    username = models.CharField(unique=True, max_length=32)
    gmlevel = models.PositiveIntegerField()
    sessionkey = models.TextField(blank=True, null=True)
    v = models.TextField(blank=True, null=True)
    s = models.TextField(blank=True, null=True)
    email = models.TextField(blank=True, null=True)
    joindate = models.DateField()
    lockedip = models.CharField(db_column='lockedIp', max_length=30)  # Field name made lowercase.
    failed_logins = models.PositiveIntegerField()
    locked = models.PositiveIntegerField()
    last_login = models.DateField()
    active_realm_id = models.PositiveIntegerField()
    expansion = models.PositiveIntegerField()
    mutetime = models.PositiveBigIntegerField()
    locale = models.CharField(max_length=4)
    token = models.TextField(blank=True, null=True)
    os = models.CharField(max_length=4)
    flags = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'account'
