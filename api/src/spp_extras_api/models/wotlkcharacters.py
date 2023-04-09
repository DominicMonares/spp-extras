from django.db import models


class WotlkCharacterAchievement(models.Model):
    guid = models.PositiveIntegerField(primary_key=True)
    achievement = models.PositiveIntegerField()
    date = models.PositiveBigIntegerField()

    class Meta:
        managed = False
        db_table = 'character_achievement'
        unique_together = (('guid', 'achievement'),)


class WotlkCharacterAchievementProgress(models.Model):
    guid = models.PositiveIntegerField(primary_key=True)
    criteria = models.PositiveIntegerField()
    counter = models.PositiveIntegerField()
    date = models.PositiveBigIntegerField()

    class Meta:
        managed = False
        db_table = 'character_achievement_progress'
        unique_together = (('guid', 'criteria'),)


class WotlkCharacterAchievementSharedProgress(models.Model):
    achievement = models.IntegerField(primary_key=True)
    progress = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'character_achievement_shared_progress'


class WotlkCharacterInventory(models.Model):
    guid = models.PositiveIntegerField()
    bag = models.PositiveIntegerField()
    slot = models.PositiveIntegerField()
    item = models.PositiveIntegerField(primary_key=True)
    item_template = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'character_inventory'


class WotlkCharacterQueststatus(models.Model):
    guid = models.PositiveIntegerField(primary_key=True)
    quest = models.PositiveIntegerField()
    status = models.PositiveIntegerField()
    rewarded = models.PositiveIntegerField()
    explored = models.PositiveIntegerField()
    timer = models.PositiveBigIntegerField()
    mobcount1 = models.PositiveIntegerField()
    mobcount2 = models.PositiveIntegerField()
    mobcount3 = models.PositiveIntegerField()
    mobcount4 = models.PositiveIntegerField()
    itemcount1 = models.PositiveIntegerField()
    itemcount2 = models.PositiveIntegerField()
    itemcount3 = models.PositiveIntegerField()
    itemcount4 = models.PositiveIntegerField()
    itemcount5 = models.PositiveIntegerField()
    itemcount6 = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'character_queststatus'
        unique_together = (('guid', 'quest'),)


class WotlkCharacterQueststatusDaily(models.Model):
    guid = models.PositiveIntegerField(primary_key=True)
    quest = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'character_queststatus_daily'
        unique_together = (('guid', 'quest'),)


class WotlkCharacterQueststatusMonthly(models.Model):
    guid = models.PositiveIntegerField(primary_key=True)
    quest = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'character_queststatus_monthly'
        unique_together = (('guid', 'quest'),)


class WotlkCharacterQueststatusWeekly(models.Model):
    guid = models.PositiveIntegerField(primary_key=True)
    quest = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'character_queststatus_weekly'
        unique_together = (('guid', 'quest'),)


class WotlkCharacterReputation(models.Model):
    guid = models.PositiveIntegerField(primary_key=True)
    faction = models.PositiveIntegerField()
    standing = models.IntegerField()
    flags = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'character_reputation'
        unique_together = (('guid', 'faction'),)


class WotlkCharacterSkills(models.Model):
    guid = models.PositiveIntegerField(primary_key=True)
    skill = models.PositiveIntegerField()
    value = models.PositiveIntegerField()
    max = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'character_skills'
        unique_together = (('guid', 'skill'),)


class WotlkCharacterSpell(models.Model):
    guid = models.PositiveIntegerField(primary_key=True)
    spell = models.PositiveIntegerField()
    active = models.PositiveIntegerField()
    disabled = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'character_spell'
        unique_together = (('guid', 'spell'),)


class WotlkCharacters(models.Model):
    guid = models.PositiveIntegerField(primary_key=True)
    account = models.PositiveIntegerField()
    name = models.CharField(max_length=12)
    race = models.PositiveIntegerField()
    # Field renamed because it was a Python reserved word.
    class_field = models.PositiveIntegerField(db_column='class')
    gender = models.PositiveIntegerField()
    level = models.PositiveIntegerField()
    xp = models.PositiveIntegerField()
    money = models.PositiveIntegerField()
    # Field name made lowercase.
    playerbytes = models.PositiveIntegerField(db_column='playerBytes')
    # Field name made lowercase.
    playerbytes2 = models.PositiveIntegerField(db_column='playerBytes2')
    # Field name made lowercase.
    playerflags = models.PositiveIntegerField(db_column='playerFlags')
    position_x = models.FloatField()
    position_y = models.FloatField()
    position_z = models.FloatField()
    map = models.PositiveIntegerField()
    dungeon_difficulty = models.PositiveIntegerField()
    orientation = models.FloatField()
    taximask = models.TextField(blank=True, null=True)
    online = models.PositiveIntegerField()
    cinematic = models.PositiveIntegerField()
    totaltime = models.PositiveIntegerField()
    leveltime = models.PositiveIntegerField()
    logout_time = models.PositiveBigIntegerField()
    is_logout_resting = models.PositiveIntegerField()
    rest_bonus = models.FloatField()
    resettalents_cost = models.PositiveIntegerField()
    resettalents_time = models.PositiveBigIntegerField()
    trans_x = models.FloatField()
    trans_y = models.FloatField()
    trans_z = models.FloatField()
    trans_o = models.FloatField()
    transguid = models.PositiveBigIntegerField()
    extra_flags = models.PositiveIntegerField()
    stable_slots = models.PositiveIntegerField()
    at_login = models.PositiveIntegerField()
    zone = models.PositiveIntegerField()
    death_expire_time = models.PositiveBigIntegerField()
    taxi_path = models.TextField(blank=True, null=True)
    # Field name made lowercase.
    arenapoints = models.PositiveIntegerField(db_column='arenaPoints')
    # Field name made lowercase.
    totalhonorpoints = models.PositiveIntegerField(
        db_column='totalHonorPoints')
    # Field name made lowercase.
    todayhonorpoints = models.PositiveIntegerField(
        db_column='todayHonorPoints')
    # Field name made lowercase.
    yesterdayhonorpoints = models.PositiveIntegerField(
        db_column='yesterdayHonorPoints')
    # Field name made lowercase.
    totalkills = models.PositiveIntegerField(db_column='totalKills')
    # Field name made lowercase.
    todaykills = models.PositiveSmallIntegerField(db_column='todayKills')
    # Field name made lowercase.
    yesterdaykills = models.PositiveSmallIntegerField(
        db_column='yesterdayKills')
    # Field name made lowercase.
    chosentitle = models.PositiveIntegerField(db_column='chosenTitle')
    # Field name made lowercase.
    knowncurrencies = models.PositiveBigIntegerField(
        db_column='knownCurrencies')
    # Field name made lowercase.
    watchedfaction = models.PositiveIntegerField(db_column='watchedFaction')
    drunk = models.PositiveIntegerField()
    health = models.PositiveIntegerField()
    power1 = models.PositiveIntegerField()
    power2 = models.PositiveIntegerField()
    power3 = models.PositiveIntegerField()
    power4 = models.PositiveIntegerField()
    power5 = models.PositiveIntegerField()
    power6 = models.PositiveIntegerField()
    power7 = models.PositiveIntegerField()
    # Field name made lowercase.
    speccount = models.PositiveIntegerField(db_column='specCount')
    # Field name made lowercase.
    activespec = models.PositiveIntegerField(db_column='activeSpec')
    # Field name made lowercase.
    exploredzones = models.TextField(
        db_column='exploredZones', blank=True, null=True)
    # Field name made lowercase.
    equipmentcache = models.TextField(
        db_column='equipmentCache', blank=True, null=True)
    # Field name made lowercase.
    ammoid = models.PositiveIntegerField(db_column='ammoId')
    # Field name made lowercase.
    knowntitles = models.TextField(
        db_column='knownTitles', blank=True, null=True)
    # Field name made lowercase.
    actionbars = models.PositiveIntegerField(db_column='actionBars')
    # Field name made lowercase.
    grantablelevels = models.PositiveIntegerField(
        db_column='grantableLevels', blank=True, null=True)
    # Field name made lowercase.
    fishingsteps = models.PositiveIntegerField(db_column='fishingSteps')
    deleteinfos_account = models.PositiveIntegerField(
        db_column='deleteInfos_Account', blank=True, null=True)  # Field name made lowercase.
    # Field name made lowercase.
    deleteinfos_name = models.CharField(
        db_column='deleteInfos_Name', max_length=12, blank=True, null=True)
    # Field name made lowercase.
    deletedate = models.PositiveBigIntegerField(
        db_column='deleteDate', blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'characters'


class WotlkItemInstance(models.Model):
    guid = models.PositiveIntegerField(primary_key=True)
    owner_guid = models.PositiveIntegerField()
    # Field name made lowercase.
    itementry = models.PositiveIntegerField(db_column='itemEntry')
    # Field name made lowercase.
    creatorguid = models.PositiveIntegerField(db_column='creatorGuid')
    # Field name made lowercase.
    giftcreatorguid = models.PositiveIntegerField(db_column='giftCreatorGuid')
    count = models.PositiveIntegerField()
    duration = models.PositiveIntegerField()
    charges = models.TextField()
    flags = models.PositiveIntegerField()
    enchantments = models.TextField()
    # Field name made lowercase.
    randompropertyid = models.SmallIntegerField(db_column='randomPropertyId')
    durability = models.PositiveIntegerField()
    # Field name made lowercase.
    playedtime = models.PositiveIntegerField(db_column='playedTime')
    text = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'item_instance'


class WotlkMail(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    # Field name made lowercase.
    messagetype = models.PositiveIntegerField(db_column='messageType')
    stationery = models.IntegerField()
    # Field name made lowercase.
    mailtemplateid = models.PositiveIntegerField(db_column='mailTemplateId')
    sender = models.PositiveIntegerField()
    receiver = models.PositiveIntegerField()
    subject = models.TextField(blank=True, null=True)
    body = models.TextField(blank=True, null=True)
    has_items = models.PositiveIntegerField()
    expire_time = models.PositiveBigIntegerField()
    deliver_time = models.PositiveBigIntegerField()
    money = models.PositiveIntegerField()
    cod = models.PositiveIntegerField()
    checked = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'mail'


class WotlkMailItems(models.Model):
    mail_id = models.IntegerField(primary_key=True)
    item_guid = models.IntegerField()
    item_template = models.IntegerField()
    receiver = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'mail_items'
        unique_together = (('mail_id', 'item_guid'),)


class WotlkPvpstatsPlayers(models.Model):
    battleground_id = models.PositiveBigIntegerField(primary_key=True)
    character_guid = models.PositiveIntegerField()
    score_killing_blows = models.PositiveIntegerField()
    score_deaths = models.PositiveIntegerField()
    score_honorable_kills = models.PositiveIntegerField()
    score_bonus_honor = models.PositiveIntegerField()
    score_damage_done = models.PositiveIntegerField()
    score_healing_done = models.PositiveIntegerField()
    attr_1 = models.PositiveIntegerField()
    attr_2 = models.PositiveIntegerField()
    attr_3 = models.PositiveIntegerField()
    attr_4 = models.PositiveIntegerField()
    attr_5 = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'pvpstats_players'
        unique_together = (('battleground_id', 'character_guid'),)
