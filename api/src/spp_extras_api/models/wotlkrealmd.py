from django.db import models


class WotlkAccount(models.Model):
    username = models.CharField(unique=True, max_length=32)
    gmlevel = models.PositiveIntegerField()
    sessionkey = models.TextField(blank=True, null=True)
    v = models.TextField(blank=True, null=True)
    s = models.TextField(blank=True, null=True)
    email = models.TextField(blank=True, null=True)
    joindate = models.DateTimeField()
    lockedip = models.CharField(db_column='lockedIp', max_length=30)  # Field name made lowercase.
    failed_logins = models.PositiveIntegerField()
    locked = models.PositiveIntegerField()
    last_login = models.DateTimeField()
    active_realm_id = models.PositiveIntegerField()
    expansion = models.PositiveIntegerField()
    mutetime = models.PositiveBigIntegerField()
    locale = models.CharField(max_length=4)
    token = models.TextField(blank=True, null=True)
    os = models.CharField(max_length=4)
    platform = models.CharField(max_length=4)
    flags = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'account'
