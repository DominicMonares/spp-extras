# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class CharacterBattlegroundData(models.Model):
    guid = models.PositiveIntegerField(primary_key=True)
    instance_id = models.PositiveIntegerField()
    team = models.PositiveIntegerField()
    join_x = models.FloatField()
    join_y = models.FloatField()
    join_z = models.FloatField()
    join_o = models.FloatField()
    join_map = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'character_battleground_data'


class CharacterGifts(models.Model):
    guid = models.PositiveIntegerField()
    item_guid = models.PositiveIntegerField(primary_key=True)
    entry = models.PositiveIntegerField()
    flags = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'character_gifts'


class CharacterHonorCp(models.Model):
    guid = models.PositiveIntegerField()
    victim_type = models.PositiveIntegerField()
    victim = models.PositiveIntegerField()
    honor = models.FloatField()
    date = models.PositiveIntegerField()
    type = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'character_honor_cp'


class CharacterInventory(models.Model):
    guid = models.PositiveIntegerField()
    bag = models.PositiveIntegerField()
    slot = models.PositiveIntegerField()
    item = models.PositiveIntegerField(primary_key=True)
    item_template = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'character_inventory'


class CharacterQueststatus(models.Model):
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

    class Meta:
        managed = False
        db_table = 'character_queststatus'
        unique_together = (('guid', 'quest'),)


class CharacterQueststatusWeekly(models.Model):
    guid = models.PositiveIntegerField(primary_key=True)
    quest = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'character_queststatus_weekly'
        unique_together = (('guid', 'quest'),)


class CharacterReputation(models.Model):
    guid = models.PositiveIntegerField(primary_key=True)
    faction = models.PositiveIntegerField()
    standing = models.IntegerField()
    flags = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'character_reputation'
        unique_together = (('guid', 'faction'),)


class CharacterSpell(models.Model):
    guid = models.PositiveIntegerField(primary_key=True)
    spell = models.PositiveIntegerField()
    active = models.PositiveIntegerField()
    disabled = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'character_spell'
        unique_together = (('guid', 'spell'),)


class CharacterStats(models.Model):
    guid = models.PositiveIntegerField(primary_key=True)
    maxhealth = models.PositiveIntegerField()
    maxpower1 = models.PositiveIntegerField()
    maxpower2 = models.PositiveIntegerField()
    maxpower3 = models.PositiveIntegerField()
    maxpower4 = models.PositiveIntegerField()
    maxpower5 = models.PositiveIntegerField()
    maxpower6 = models.PositiveIntegerField()
    maxpower7 = models.PositiveIntegerField()
    strength = models.PositiveIntegerField()
    agility = models.PositiveIntegerField()
    stamina = models.PositiveIntegerField()
    intellect = models.PositiveIntegerField()
    spirit = models.PositiveIntegerField()
    armor = models.PositiveIntegerField()
    # Field name made lowercase.
    resholy = models.PositiveIntegerField(db_column='resHoly')
    # Field name made lowercase.
    resfire = models.PositiveIntegerField(db_column='resFire')
    # Field name made lowercase.
    resnature = models.PositiveIntegerField(db_column='resNature')
    # Field name made lowercase.
    resfrost = models.PositiveIntegerField(db_column='resFrost')
    # Field name made lowercase.
    resshadow = models.PositiveIntegerField(db_column='resShadow')
    # Field name made lowercase.
    resarcane = models.PositiveIntegerField(db_column='resArcane')
    # Field name made lowercase.
    blockpct = models.FloatField(db_column='blockPct')
    # Field name made lowercase.
    dodgepct = models.FloatField(db_column='dodgePct')
    # Field name made lowercase.
    parrypct = models.FloatField(db_column='parryPct')
    # Field name made lowercase.
    critpct = models.FloatField(db_column='critPct')
    # Field name made lowercase.
    rangedcritpct = models.FloatField(db_column='rangedCritPct')
    # Field name made lowercase.
    spellcritpct = models.FloatField(db_column='spellCritPct')
    # Field name made lowercase.
    holycritpct = models.FloatField(db_column='holyCritPct')
    # Field name made lowercase.
    firecritpct = models.FloatField(db_column='fireCritPct')
    # Field name made lowercase.
    naturecritpct = models.FloatField(db_column='natureCritPct')
    # Field name made lowercase.
    frostcritpct = models.FloatField(db_column='frostCritPct')
    # Field name made lowercase.
    shadowcritpct = models.FloatField(db_column='shadowCritPct')
    # Field name made lowercase.
    arcanecritpct = models.FloatField(db_column='arcaneCritPct')
    # Field name made lowercase.
    attackpower = models.PositiveIntegerField(db_column='attackPower')
    # Field name made lowercase.
    attackpowermod = models.PositiveIntegerField(db_column='attackPowerMod')
    # Field name made lowercase.
    rangedattackpower = models.PositiveIntegerField(
        db_column='rangedAttackPower')
    # Field name made lowercase.
    rangedattackpowermod = models.PositiveIntegerField(
        db_column='rangedAttackPowerMod')
    # Field name made lowercase.
    spellpower = models.PositiveIntegerField(db_column='spellPower')
    # Field name made lowercase.
    holydamage = models.PositiveIntegerField(db_column='holyDamage')
    # Field name made lowercase.
    firedamage = models.PositiveIntegerField(db_column='fireDamage')
    # Field name made lowercase.
    naturedamage = models.PositiveIntegerField(db_column='natureDamage')
    # Field name made lowercase.
    frostdamage = models.PositiveIntegerField(db_column='frostDamage')
    # Field name made lowercase.
    shadowdamage = models.PositiveIntegerField(db_column='shadowDamage')
    # Field name made lowercase.
    arcanedamage = models.PositiveIntegerField(db_column='arcaneDamage')
    # Field name made lowercase.
    healbonus = models.PositiveIntegerField(db_column='healBonus')
    # Field name made lowercase.
    defenserating = models.PositiveIntegerField(db_column='defenseRating')
    # Field name made lowercase.
    dodgerating = models.PositiveIntegerField(db_column='dodgeRating')
    # Field name made lowercase.
    parryrating = models.PositiveIntegerField(db_column='parryRating')
    # Field name made lowercase.
    blockrating = models.PositiveIntegerField(db_column='blockRating')
    resilience = models.PositiveIntegerField()
    # Field name made lowercase.
    meleehitrating = models.PositiveIntegerField(db_column='meleeHitRating')
    # Field name made lowercase.
    rangedhitrating = models.PositiveIntegerField(db_column='rangedHitRating')
    # Field name made lowercase.
    spellhitrating = models.PositiveIntegerField(db_column='spellHitRating')
    # Field name made lowercase.
    meleecritrating = models.PositiveIntegerField(db_column='meleeCritRating')
    # Field name made lowercase.
    rangedcritrating = models.PositiveIntegerField(
        db_column='rangedCritRating')
    # Field name made lowercase.
    spellcritrating = models.PositiveIntegerField(db_column='spellCritRating')
    # Field name made lowercase.
    meleehasterating = models.PositiveIntegerField(
        db_column='meleeHasteRating')
    # Field name made lowercase.
    rangedhasterating = models.PositiveIntegerField(
        db_column='rangedHasteRating')
    # Field name made lowercase.
    spellhasterating = models.PositiveIntegerField(
        db_column='spellHasteRating')
    expertise = models.PositiveIntegerField()
    # Field name made lowercase.
    expertiserating = models.PositiveIntegerField(db_column='expertiseRating')
    # Field name made lowercase.
    mainhanddamagemin = models.FloatField(db_column='mainHandDamageMin')
    # Field name made lowercase.
    mainhanddamagemax = models.FloatField(db_column='mainHandDamageMax')
    # Field name made lowercase.
    mainhandspeed = models.FloatField(db_column='mainHandSpeed')
    # Field name made lowercase.
    offhanddamagemin = models.FloatField(db_column='offHandDamageMin')
    # Field name made lowercase.
    offhanddamagemax = models.FloatField(db_column='offHandDamageMax')
    # Field name made lowercase.
    offhandspeed = models.FloatField(db_column='offHandSpeed')
    # Field name made lowercase.
    rangeddamagemin = models.FloatField(db_column='rangedDamageMin')
    # Field name made lowercase.
    rangeddamagemax = models.FloatField(db_column='rangedDamageMax')
    # Field name made lowercase.
    rangedspeed = models.FloatField(db_column='rangedSpeed')
    # Field name made lowercase.
    manaregen = models.FloatField(db_column='manaRegen')
    # Field name made lowercase.
    manainterrupt = models.FloatField(db_column='manaInterrupt')
    # Field name made lowercase.
    pvprank = models.PositiveIntegerField(db_column='pvpRank')

    class Meta:
        managed = False
        db_table = 'character_stats'


class Characters(models.Model):
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
    honor_highest_rank = models.PositiveIntegerField()
    honor_standing = models.PositiveIntegerField()
    stored_honor_rating = models.FloatField()
    stored_dishonorable_kills = models.IntegerField()
    stored_honorable_kills = models.IntegerField()
    # Field name made lowercase.
    watchedfaction = models.PositiveIntegerField(db_column='watchedFaction')
    drunk = models.PositiveSmallIntegerField()
    health = models.PositiveIntegerField()
    power1 = models.PositiveIntegerField()
    power2 = models.PositiveIntegerField()
    power3 = models.PositiveIntegerField()
    power4 = models.PositiveIntegerField()
    power5 = models.PositiveIntegerField()
    # Field name made lowercase.
    exploredzones = models.TextField(
        db_column='exploredZones', blank=True, null=True)
    # Field name made lowercase.
    equipmentcache = models.TextField(
        db_column='equipmentCache', blank=True, null=True)
    # Field name made lowercase.
    ammoid = models.PositiveIntegerField(db_column='ammoId')
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


class ItemInstance(models.Model):
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
    itemtextid = models.PositiveIntegerField(db_column='itemTextId')

    class Meta:
        managed = False
        db_table = 'item_instance'


class ItemLoot(models.Model):
    guid = models.PositiveIntegerField(primary_key=True)
    owner_guid = models.PositiveIntegerField()
    itemid = models.PositiveIntegerField()
    amount = models.PositiveIntegerField()
    property = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'item_loot'
        unique_together = (('guid', 'itemid'),)


class ItemText(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    text = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'item_text'


class Mail(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    # Field name made lowercase.
    messagetype = models.PositiveIntegerField(db_column='messageType')
    stationery = models.IntegerField()
    # Field name made lowercase.
    mailtemplateid = models.PositiveIntegerField(db_column='mailTemplateId')
    sender = models.PositiveIntegerField()
    receiver = models.PositiveIntegerField()
    subject = models.TextField(blank=True, null=True)
    # Field name made lowercase.
    itemtextid = models.PositiveIntegerField(db_column='itemTextId')
    has_items = models.PositiveIntegerField()
    expire_time = models.PositiveBigIntegerField()
    deliver_time = models.PositiveBigIntegerField()
    money = models.PositiveIntegerField()
    cod = models.PositiveIntegerField()
    checked = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'mail'


class MailItems(models.Model):
    mail_id = models.IntegerField(primary_key=True)
    item_guid = models.IntegerField()
    item_template = models.IntegerField()
    receiver = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'mail_items'
        unique_together = (('mail_id', 'item_guid'),)


class PvpstatsPlayers(models.Model):
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
