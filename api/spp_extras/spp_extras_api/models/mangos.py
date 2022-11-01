# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class AiPlayerbotRpgRaces(models.Model):
    id = models.BigAutoField(primary_key=True)
    entry = models.BigIntegerField(blank=True, null=True)
    race = models.BigIntegerField(blank=True, null=True)
    minl = models.BigIntegerField(blank=True, null=True)
    maxl = models.BigIntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'ai_playerbot_rpg_races'


class AreatriggerInvolvedrelation(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    quest = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'areatrigger_involvedrelation'


class AreatriggerTavern(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    name = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'areatrigger_tavern'


class AreatriggerTeleport(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    name = models.TextField(blank=True, null=True)
    required_level = models.PositiveIntegerField()
    required_item = models.PositiveIntegerField()
    required_item2 = models.PositiveIntegerField()
    required_quest_done = models.PositiveIntegerField()
    target_map = models.PositiveSmallIntegerField()
    target_position_x = models.FloatField()
    target_position_y = models.FloatField()
    target_position_z = models.FloatField()
    target_orientation = models.FloatField()
    status_failed_text = models.TextField(blank=True, null=True)
    condition_id = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'areatrigger_teleport'


class Auction(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    houseid = models.PositiveIntegerField()
    itemguid = models.PositiveIntegerField()
    item_template = models.PositiveIntegerField()
    item_count = models.PositiveIntegerField()
    item_randompropertyid = models.IntegerField()
    itemowner = models.PositiveIntegerField()
    buyoutprice = models.IntegerField()
    time = models.PositiveBigIntegerField()
    buyguid = models.PositiveIntegerField()
    lastbid = models.IntegerField()
    startbid = models.IntegerField()
    deposit = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'auction'


class BattlegroundEvents(models.Model):
    map = models.SmallIntegerField(primary_key=True)
    event1 = models.PositiveIntegerField()
    event2 = models.PositiveIntegerField()
    description = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'battleground_events'
        unique_together = (('map', 'event1', 'event2'),)


class BattlegroundTemplate(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    minplayersperteam = models.PositiveSmallIntegerField(db_column='MinPlayersPerTeam')  # Field name made lowercase.
    maxplayersperteam = models.PositiveSmallIntegerField(db_column='MaxPlayersPerTeam')  # Field name made lowercase.
    minlvl = models.PositiveIntegerField(db_column='MinLvl')  # Field name made lowercase.
    maxlvl = models.PositiveIntegerField(db_column='MaxLvl')  # Field name made lowercase.
    alliancestartloc = models.PositiveIntegerField(db_column='AllianceStartLoc')  # Field name made lowercase.
    hordestartloc = models.PositiveIntegerField(db_column='HordeStartLoc')  # Field name made lowercase.
    startmaxdist = models.FloatField(db_column='StartMaxDist')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'battleground_template'


class BattlemasterEntry(models.Model):
    entry = models.PositiveIntegerField(primary_key=True)
    bg_template = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'battlemaster_entry'


class BroadcastText(models.Model):
    id = models.IntegerField(db_column='Id', primary_key=True)  # Field name made lowercase.
    text = models.TextField(db_column='Text', blank=True, null=True)  # Field name made lowercase.
    text1 = models.TextField(db_column='Text1', blank=True, null=True)  # Field name made lowercase.
    chattypeid = models.IntegerField(db_column='ChatTypeID')  # Field name made lowercase.
    languageid = models.IntegerField(db_column='LanguageID')  # Field name made lowercase.
    conditionid = models.IntegerField(db_column='ConditionID')  # Field name made lowercase.
    emotesid = models.IntegerField(db_column='EmotesID')  # Field name made lowercase.
    flags = models.IntegerField(db_column='Flags')  # Field name made lowercase.
    soundentriesid1 = models.IntegerField(db_column='SoundEntriesID1')  # Field name made lowercase.
    soundentriesid2 = models.IntegerField(db_column='SoundEntriesID2')  # Field name made lowercase.
    emoteid1 = models.IntegerField(db_column='EmoteID1')  # Field name made lowercase.
    emoteid2 = models.IntegerField(db_column='EmoteID2')  # Field name made lowercase.
    emoteid3 = models.IntegerField(db_column='EmoteID3')  # Field name made lowercase.
    emotedelay1 = models.IntegerField(db_column='EmoteDelay1')  # Field name made lowercase.
    emotedelay2 = models.IntegerField(db_column='EmoteDelay2')  # Field name made lowercase.
    emotedelay3 = models.IntegerField(db_column='EmoteDelay3')  # Field name made lowercase.
    verifiedbuild = models.IntegerField(db_column='VerifiedBuild')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'broadcast_text'


class BroadcastTextLocale(models.Model):
    id = models.IntegerField(db_column='Id', primary_key=True)  # Field name made lowercase.
    locale = models.CharField(db_column='Locale', max_length=10)  # Field name made lowercase.
    text_lang = models.TextField(db_column='Text_lang', blank=True, null=True)  # Field name made lowercase.
    text1_lang = models.TextField(db_column='Text1_lang', blank=True, null=True)  # Field name made lowercase.
    verifiedbuild = models.IntegerField(db_column='VerifiedBuild')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'broadcast_text_locale'
        unique_together = (('id', 'locale'),)


class Bugreport(models.Model):
    type = models.TextField()
    content = models.TextField()

    class Meta:
        managed = False
        db_table = 'bugreport'


class Command(models.Model):
    name = models.CharField(primary_key=True, max_length=50)
    security = models.PositiveIntegerField()
    help = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'command'


class Conditions(models.Model):
    condition_entry = models.AutoField(primary_key=True)
    type = models.IntegerField()
    value1 = models.PositiveIntegerField()
    value2 = models.PositiveIntegerField()
    value3 = models.PositiveIntegerField()
    value4 = models.PositiveIntegerField()
    flags = models.PositiveIntegerField()
    comments = models.CharField(max_length=500, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'conditions'
        unique_together = (('type', 'value1', 'value2', 'value3', 'value4', 'flags'),)


class Creature(models.Model):
    guid = models.AutoField(primary_key=True)
    id = models.PositiveIntegerField()
    map = models.PositiveSmallIntegerField()
    spawnmask = models.PositiveIntegerField(db_column='spawnMask')  # Field name made lowercase.
    modelid = models.PositiveIntegerField()
    equipment_id = models.IntegerField()
    position_x = models.FloatField()
    position_y = models.FloatField()
    position_z = models.FloatField()
    orientation = models.FloatField()
    spawntimesecsmin = models.PositiveIntegerField()
    spawntimesecsmax = models.PositiveIntegerField()
    spawndist = models.FloatField()
    currentwaypoint = models.PositiveIntegerField()
    curhealth = models.PositiveIntegerField()
    curmana = models.PositiveIntegerField()
    deathstate = models.PositiveIntegerField(db_column='DeathState')  # Field name made lowercase.
    movementtype = models.PositiveIntegerField(db_column='MovementType')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'creature'


class CreatureAddon(models.Model):
    guid = models.PositiveIntegerField(primary_key=True)
    mount = models.PositiveIntegerField()
    bytes1 = models.PositiveIntegerField()
    b2_0_sheath = models.PositiveIntegerField()
    b2_1_flags = models.PositiveIntegerField()
    emote = models.PositiveIntegerField()
    moveflags = models.PositiveIntegerField()
    auras = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'creature_addon'


class CreatureAiScripts(models.Model):
    creature_id = models.PositiveIntegerField()
    event_type = models.PositiveIntegerField()
    event_inverse_phase_mask = models.IntegerField()
    event_chance = models.PositiveIntegerField()
    event_flags = models.PositiveIntegerField()
    event_param1 = models.IntegerField()
    event_param2 = models.IntegerField()
    event_param3 = models.IntegerField()
    event_param4 = models.IntegerField()
    event_param5 = models.IntegerField()
    event_param6 = models.IntegerField()
    action1_type = models.PositiveIntegerField()
    action1_param1 = models.IntegerField()
    action1_param2 = models.IntegerField()
    action1_param3 = models.IntegerField()
    action2_type = models.PositiveIntegerField()
    action2_param1 = models.IntegerField()
    action2_param2 = models.IntegerField()
    action2_param3 = models.IntegerField()
    action3_type = models.PositiveIntegerField()
    action3_param1 = models.IntegerField()
    action3_param2 = models.IntegerField()
    action3_param3 = models.IntegerField()
    comment = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'creature_ai_scripts'


class CreatureAiSummons(models.Model):
    position_x = models.FloatField()
    position_y = models.FloatField()
    position_z = models.FloatField()
    orientation = models.FloatField()
    spawntimesecs = models.PositiveIntegerField()
    comment = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'creature_ai_summons'


class CreatureAiTexts(models.Model):
    entry = models.IntegerField(primary_key=True)
    content_default = models.TextField()
    content_loc1 = models.TextField(blank=True, null=True)
    content_loc2 = models.TextField(blank=True, null=True)
    content_loc3 = models.TextField(blank=True, null=True)
    content_loc4 = models.TextField(blank=True, null=True)
    content_loc5 = models.TextField(blank=True, null=True)
    content_loc6 = models.TextField(blank=True, null=True)
    content_loc7 = models.TextField(blank=True, null=True)
    content_loc8 = models.TextField(blank=True, null=True)
    sound = models.PositiveIntegerField()
    type = models.PositiveIntegerField()
    language = models.PositiveIntegerField()
    emote = models.PositiveSmallIntegerField()
    broadcast_text_id = models.IntegerField()
    comment = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'creature_ai_texts'


class CreatureBattleground(models.Model):
    guid = models.PositiveIntegerField(primary_key=True)
    event1 = models.PositiveIntegerField()
    event2 = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'creature_battleground'


class CreatureConditionalSpawn(models.Model):
    guid = models.AutoField(db_column='Guid', primary_key=True)  # Field name made lowercase.
    entryalliance = models.PositiveIntegerField(db_column='EntryAlliance')  # Field name made lowercase.
    entryhorde = models.PositiveIntegerField(db_column='EntryHorde')  # Field name made lowercase.
    comments = models.CharField(db_column='Comments', max_length=255)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'creature_conditional_spawn'


class CreatureCooldowns(models.Model):
    entry = models.PositiveIntegerField(db_column='Entry', primary_key=True)  # Field name made lowercase.
    spellid = models.PositiveIntegerField(db_column='SpellId')  # Field name made lowercase.
    cooldownmin = models.PositiveIntegerField(db_column='CooldownMin')  # Field name made lowercase.
    cooldownmax = models.PositiveIntegerField(db_column='CooldownMax')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'creature_cooldowns'
        unique_together = (('entry', 'spellid'),)


class CreatureEquipTemplate(models.Model):
    entry = models.PositiveIntegerField(primary_key=True)
    equipentry1 = models.PositiveIntegerField()
    equipentry2 = models.PositiveIntegerField()
    equipentry3 = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'creature_equip_template'


class CreatureImmunities(models.Model):
    entry = models.PositiveIntegerField(db_column='Entry', primary_key=True)  # Field name made lowercase.
    setid = models.PositiveIntegerField(db_column='SetId')  # Field name made lowercase.
    type = models.PositiveIntegerField(db_column='Type')  # Field name made lowercase.
    value = models.PositiveIntegerField(db_column='Value')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'creature_immunities'
        unique_together = (('entry', 'setid', 'type', 'value'),)


class CreatureInvolvedrelation(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    quest = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'creature_involvedrelation'
        unique_together = (('id', 'quest'),)


class CreatureLinking(models.Model):
    guid = models.PositiveIntegerField(primary_key=True)
    master_guid = models.PositiveIntegerField()
    flag = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'creature_linking'


class CreatureLinkingTemplate(models.Model):
    entry = models.PositiveIntegerField(primary_key=True)
    map = models.PositiveSmallIntegerField()
    master_entry = models.PositiveIntegerField()
    flag = models.PositiveIntegerField()
    search_range = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'creature_linking_template'
        unique_together = (('entry', 'map'),)


class CreatureLootTemplate(models.Model):
    entry = models.PositiveIntegerField(primary_key=True)
    item = models.PositiveIntegerField()
    chanceorquestchance = models.FloatField(db_column='ChanceOrQuestChance')  # Field name made lowercase.
    groupid = models.PositiveIntegerField()
    mincountorref = models.IntegerField(db_column='mincountOrRef')  # Field name made lowercase.
    maxcount = models.PositiveIntegerField()
    condition_id = models.PositiveIntegerField()
    comments = models.CharField(max_length=300, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'creature_loot_template'
        unique_together = (('entry', 'item'),)


class CreatureModelInfo(models.Model):
    modelid = models.PositiveIntegerField(primary_key=True)
    bounding_radius = models.FloatField()
    combat_reach = models.FloatField()
    speedwalk = models.FloatField(db_column='SpeedWalk')  # Field name made lowercase.
    speedrun = models.FloatField(db_column='SpeedRun')  # Field name made lowercase.
    gender = models.PositiveIntegerField()
    modelid_other_gender = models.PositiveIntegerField()
    modelid_other_team = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'creature_model_info'


class CreatureModelRace(models.Model):
    modelid = models.PositiveIntegerField(primary_key=True)
    racemask = models.PositiveIntegerField()
    creature_entry = models.PositiveIntegerField()
    modelid_racial = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'creature_model_race'
        unique_together = (('modelid', 'racemask'),)


class CreatureMovement(models.Model):
    id = models.PositiveIntegerField(db_column='Id', primary_key=True)  # Field name made lowercase.
    point = models.PositiveIntegerField(db_column='Point')  # Field name made lowercase.
    positionx = models.FloatField(db_column='PositionX')  # Field name made lowercase.
    positiony = models.FloatField(db_column='PositionY')  # Field name made lowercase.
    positionz = models.FloatField(db_column='PositionZ')  # Field name made lowercase.
    orientation = models.FloatField(db_column='Orientation')  # Field name made lowercase.
    waittime = models.PositiveIntegerField(db_column='WaitTime')  # Field name made lowercase.
    scriptid = models.PositiveIntegerField(db_column='ScriptId')  # Field name made lowercase.
    comment = models.TextField(db_column='Comment', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'creature_movement'
        unique_together = (('id', 'point'),)


class CreatureMovementTemplate(models.Model):
    entry = models.PositiveIntegerField(db_column='Entry', primary_key=True)  # Field name made lowercase.
    pathid = models.PositiveIntegerField(db_column='PathId')  # Field name made lowercase.
    point = models.PositiveIntegerField(db_column='Point')  # Field name made lowercase.
    positionx = models.FloatField(db_column='PositionX')  # Field name made lowercase.
    positiony = models.FloatField(db_column='PositionY')  # Field name made lowercase.
    positionz = models.FloatField(db_column='PositionZ')  # Field name made lowercase.
    orientation = models.FloatField(db_column='Orientation')  # Field name made lowercase.
    waittime = models.PositiveIntegerField(db_column='WaitTime')  # Field name made lowercase.
    scriptid = models.PositiveIntegerField(db_column='ScriptId')  # Field name made lowercase.
    comment = models.TextField(db_column='Comment', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'creature_movement_template'
        unique_together = (('entry', 'pathid', 'point'),)


class CreatureOnkillReputation(models.Model):
    creature_id = models.PositiveIntegerField(primary_key=True)
    rewonkillrepfaction1 = models.SmallIntegerField(db_column='RewOnKillRepFaction1')  # Field name made lowercase.
    rewonkillrepfaction2 = models.SmallIntegerField(db_column='RewOnKillRepFaction2')  # Field name made lowercase.
    maxstanding1 = models.IntegerField(db_column='MaxStanding1')  # Field name made lowercase.
    isteamaward1 = models.IntegerField(db_column='IsTeamAward1')  # Field name made lowercase.
    rewonkillrepvalue1 = models.IntegerField(db_column='RewOnKillRepValue1')  # Field name made lowercase.
    maxstanding2 = models.IntegerField(db_column='MaxStanding2')  # Field name made lowercase.
    isteamaward2 = models.IntegerField(db_column='IsTeamAward2')  # Field name made lowercase.
    rewonkillrepvalue2 = models.IntegerField(db_column='RewOnKillRepValue2')  # Field name made lowercase.
    teamdependent = models.PositiveIntegerField(db_column='TeamDependent')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'creature_onkill_reputation'


class CreatureQuestrelation(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    quest = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'creature_questrelation'
        unique_together = (('id', 'quest'),)


class CreatureSpawnData(models.Model):
    guid = models.PositiveIntegerField(db_column='Guid', primary_key=True)  # Field name made lowercase.
    id = models.PositiveIntegerField(db_column='Id')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'creature_spawn_data'


class CreatureSpawnDataTemplate(models.Model):
    entry = models.PositiveIntegerField(db_column='Entry', primary_key=True)  # Field name made lowercase.
    npcflags = models.IntegerField(db_column='NpcFlags')  # Field name made lowercase.
    unitflags = models.BigIntegerField(db_column='UnitFlags')  # Field name made lowercase.
    faction = models.PositiveIntegerField(db_column='Faction')  # Field name made lowercase.
    modelid = models.PositiveIntegerField(db_column='ModelId')  # Field name made lowercase.
    equipmentid = models.IntegerField(db_column='EquipmentId')  # Field name made lowercase.
    curhealth = models.PositiveIntegerField(db_column='CurHealth')  # Field name made lowercase.
    curmana = models.PositiveIntegerField(db_column='CurMana')  # Field name made lowercase.
    spawnflags = models.PositiveIntegerField(db_column='SpawnFlags')  # Field name made lowercase.
    relayid = models.PositiveIntegerField(db_column='RelayId')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'creature_spawn_data_template'
        unique_together = (('entry', 'npcflags', 'unitflags', 'modelid', 'equipmentid', 'curhealth', 'curmana', 'spawnflags'),)


class CreatureSpawnEntry(models.Model):
    guid = models.PositiveIntegerField(primary_key=True)
    entry = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'creature_spawn_entry'
        unique_together = (('guid', 'entry'),)


class CreatureSpellList(models.Model):
    id = models.IntegerField(db_column='Id', primary_key=True)  # Field name made lowercase.
    position = models.IntegerField(db_column='Position')  # Field name made lowercase.
    spellid = models.IntegerField(db_column='SpellId')  # Field name made lowercase.
    flags = models.IntegerField(db_column='Flags')  # Field name made lowercase.
    targetid = models.IntegerField(db_column='TargetId')  # Field name made lowercase.
    scriptid = models.IntegerField(db_column='ScriptId')  # Field name made lowercase.
    availability = models.IntegerField(db_column='Availability')  # Field name made lowercase.
    probability = models.IntegerField(db_column='Probability')  # Field name made lowercase.
    initialmin = models.IntegerField(db_column='InitialMin')  # Field name made lowercase.
    initialmax = models.IntegerField(db_column='InitialMax')  # Field name made lowercase.
    repeatmin = models.IntegerField(db_column='RepeatMin')  # Field name made lowercase.
    repeatmax = models.IntegerField(db_column='RepeatMax')  # Field name made lowercase.
    comments = models.CharField(db_column='Comments', max_length=255)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'creature_spell_list'
        unique_together = (('id', 'position'),)


class CreatureSpellListEntry(models.Model):
    id = models.IntegerField(db_column='Id', primary_key=True)  # Field name made lowercase.
    name = models.CharField(db_column='Name', max_length=200)  # Field name made lowercase.
    chancesupportaction = models.IntegerField(db_column='ChanceSupportAction')  # Field name made lowercase.
    chancerangedattack = models.IntegerField(db_column='ChanceRangedAttack')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'creature_spell_list_entry'


class CreatureSpellTargeting(models.Model):
    id = models.IntegerField(db_column='Id', primary_key=True)  # Field name made lowercase.
    type = models.IntegerField(db_column='Type')  # Field name made lowercase.
    param1 = models.IntegerField(db_column='Param1')  # Field name made lowercase.
    param2 = models.IntegerField(db_column='Param2')  # Field name made lowercase.
    param3 = models.IntegerField(db_column='Param3')  # Field name made lowercase.
    comments = models.CharField(db_column='Comments', max_length=255)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'creature_spell_targeting'


class CreatureTemplate(models.Model):
    entry = models.PositiveIntegerField(db_column='Entry', primary_key=True)  # Field name made lowercase.
    name = models.CharField(db_column='Name', max_length=100)  # Field name made lowercase.
    subname = models.CharField(db_column='SubName', max_length=100, blank=True, null=True)  # Field name made lowercase.
    minlevel = models.PositiveIntegerField(db_column='MinLevel')  # Field name made lowercase.
    maxlevel = models.PositiveIntegerField(db_column='MaxLevel')  # Field name made lowercase.
    modelid1 = models.PositiveIntegerField(db_column='ModelId1')  # Field name made lowercase.
    modelid2 = models.PositiveIntegerField(db_column='ModelId2')  # Field name made lowercase.
    modelid3 = models.PositiveIntegerField(db_column='ModelId3')  # Field name made lowercase.
    modelid4 = models.PositiveIntegerField(db_column='ModelId4')  # Field name made lowercase.
    faction = models.PositiveSmallIntegerField(db_column='Faction')  # Field name made lowercase.
    scale = models.FloatField(db_column='Scale')  # Field name made lowercase.
    family = models.IntegerField(db_column='Family')  # Field name made lowercase.
    creaturetype = models.PositiveIntegerField(db_column='CreatureType')  # Field name made lowercase.
    inhabittype = models.PositiveIntegerField(db_column='InhabitType')  # Field name made lowercase.
    regeneratestats = models.PositiveIntegerField(db_column='RegenerateStats')  # Field name made lowercase.
    racialleader = models.PositiveIntegerField(db_column='RacialLeader')  # Field name made lowercase.
    npcflags = models.PositiveIntegerField(db_column='NpcFlags')  # Field name made lowercase.
    unitflags = models.PositiveIntegerField(db_column='UnitFlags')  # Field name made lowercase.
    dynamicflags = models.PositiveIntegerField(db_column='DynamicFlags')  # Field name made lowercase.
    extraflags = models.PositiveIntegerField(db_column='ExtraFlags')  # Field name made lowercase.
    creaturetypeflags = models.PositiveIntegerField(db_column='CreatureTypeFlags')  # Field name made lowercase.
    speedwalk = models.FloatField(db_column='SpeedWalk')  # Field name made lowercase.
    speedrun = models.FloatField(db_column='SpeedRun')  # Field name made lowercase.
    detection = models.PositiveIntegerField(db_column='Detection')  # Field name made lowercase.
    callforhelp = models.PositiveIntegerField(db_column='CallForHelp')  # Field name made lowercase.
    pursuit = models.PositiveIntegerField(db_column='Pursuit')  # Field name made lowercase.
    leash = models.PositiveIntegerField(db_column='Leash')  # Field name made lowercase.
    timeout = models.PositiveIntegerField(db_column='Timeout')  # Field name made lowercase.
    unitclass = models.PositiveIntegerField(db_column='UnitClass')  # Field name made lowercase.
    rank = models.PositiveIntegerField(db_column='Rank')  # Field name made lowercase.
    healthmultiplier = models.FloatField(db_column='HealthMultiplier')  # Field name made lowercase.
    powermultiplier = models.FloatField(db_column='PowerMultiplier')  # Field name made lowercase.
    damagemultiplier = models.FloatField(db_column='DamageMultiplier')  # Field name made lowercase.
    damagevariance = models.FloatField(db_column='DamageVariance')  # Field name made lowercase.
    armormultiplier = models.FloatField(db_column='ArmorMultiplier')  # Field name made lowercase.
    experiencemultiplier = models.FloatField(db_column='ExperienceMultiplier')  # Field name made lowercase.
    minlevelhealth = models.PositiveIntegerField(db_column='MinLevelHealth')  # Field name made lowercase.
    maxlevelhealth = models.PositiveIntegerField(db_column='MaxLevelHealth')  # Field name made lowercase.
    minlevelmana = models.PositiveIntegerField(db_column='MinLevelMana')  # Field name made lowercase.
    maxlevelmana = models.PositiveIntegerField(db_column='MaxLevelMana')  # Field name made lowercase.
    minmeleedmg = models.FloatField(db_column='MinMeleeDmg')  # Field name made lowercase.
    maxmeleedmg = models.FloatField(db_column='MaxMeleeDmg')  # Field name made lowercase.
    minrangeddmg = models.FloatField(db_column='MinRangedDmg')  # Field name made lowercase.
    maxrangeddmg = models.FloatField(db_column='MaxRangedDmg')  # Field name made lowercase.
    armor = models.PositiveIntegerField(db_column='Armor')  # Field name made lowercase.
    meleeattackpower = models.PositiveIntegerField(db_column='MeleeAttackPower')  # Field name made lowercase.
    rangedattackpower = models.PositiveSmallIntegerField(db_column='RangedAttackPower')  # Field name made lowercase.
    meleebaseattacktime = models.PositiveIntegerField(db_column='MeleeBaseAttackTime')  # Field name made lowercase.
    rangedbaseattacktime = models.PositiveIntegerField(db_column='RangedBaseAttackTime')  # Field name made lowercase.
    damageschool = models.IntegerField(db_column='DamageSchool')  # Field name made lowercase.
    minlootgold = models.PositiveIntegerField(db_column='MinLootGold')  # Field name made lowercase.
    maxlootgold = models.PositiveIntegerField(db_column='MaxLootGold')  # Field name made lowercase.
    lootid = models.PositiveIntegerField(db_column='LootId')  # Field name made lowercase.
    pickpocketlootid = models.PositiveIntegerField(db_column='PickpocketLootId')  # Field name made lowercase.
    skinninglootid = models.PositiveIntegerField(db_column='SkinningLootId')  # Field name made lowercase.
    killcredit1 = models.PositiveIntegerField(db_column='KillCredit1')  # Field name made lowercase.
    killcredit2 = models.PositiveIntegerField(db_column='KillCredit2')  # Field name made lowercase.
    mechanicimmunemask = models.PositiveIntegerField(db_column='MechanicImmuneMask')  # Field name made lowercase.
    schoolimmunemask = models.PositiveIntegerField(db_column='SchoolImmuneMask')  # Field name made lowercase.
    resistanceholy = models.SmallIntegerField(db_column='ResistanceHoly')  # Field name made lowercase.
    resistancefire = models.SmallIntegerField(db_column='ResistanceFire')  # Field name made lowercase.
    resistancenature = models.SmallIntegerField(db_column='ResistanceNature')  # Field name made lowercase.
    resistancefrost = models.SmallIntegerField(db_column='ResistanceFrost')  # Field name made lowercase.
    resistanceshadow = models.SmallIntegerField(db_column='ResistanceShadow')  # Field name made lowercase.
    resistancearcane = models.SmallIntegerField(db_column='ResistanceArcane')  # Field name made lowercase.
    petspelldataid = models.PositiveIntegerField(db_column='PetSpellDataId')  # Field name made lowercase.
    movementtype = models.PositiveIntegerField(db_column='MovementType')  # Field name made lowercase.
    trainertype = models.IntegerField(db_column='TrainerType')  # Field name made lowercase.
    trainerspell = models.PositiveIntegerField(db_column='TrainerSpell')  # Field name made lowercase.
    trainerclass = models.PositiveIntegerField(db_column='TrainerClass')  # Field name made lowercase.
    trainerrace = models.PositiveIntegerField(db_column='TrainerRace')  # Field name made lowercase.
    trainertemplateid = models.PositiveIntegerField(db_column='TrainerTemplateId')  # Field name made lowercase.
    vendortemplateid = models.PositiveIntegerField(db_column='VendorTemplateId')  # Field name made lowercase.
    gossipmenuid = models.PositiveIntegerField(db_column='GossipMenuId')  # Field name made lowercase.
    interactionpausetimer = models.IntegerField(db_column='InteractionPauseTimer')  # Field name made lowercase.
    visibilitydistancetype = models.IntegerField(db_column='visibilityDistanceType')  # Field name made lowercase.
    corpsedecay = models.PositiveIntegerField(db_column='CorpseDecay')  # Field name made lowercase.
    spelllist = models.IntegerField(db_column='SpellList')  # Field name made lowercase.
    equipmenttemplateid = models.PositiveIntegerField(db_column='EquipmentTemplateId')  # Field name made lowercase.
    civilian = models.PositiveIntegerField(db_column='Civilian')  # Field name made lowercase.
    ainame = models.CharField(db_column='AIName', max_length=64)  # Field name made lowercase.
    scriptname = models.CharField(db_column='ScriptName', max_length=64)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'creature_template'


class CreatureTemplateAddon(models.Model):
    entry = models.PositiveIntegerField(primary_key=True)
    mount = models.PositiveIntegerField()
    bytes1 = models.PositiveIntegerField()
    b2_0_sheath = models.PositiveIntegerField()
    b2_1_flags = models.PositiveIntegerField()
    emote = models.PositiveIntegerField()
    moveflags = models.PositiveIntegerField()
    auras = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'creature_template_addon'


class CreatureTemplateArmor(models.Model):
    entry = models.PositiveIntegerField(db_column='Entry', primary_key=True)  # Field name made lowercase.
    name = models.CharField(db_column='Name', max_length=100)  # Field name made lowercase.
    subname = models.CharField(db_column='SubName', max_length=100, blank=True, null=True)  # Field name made lowercase.
    minlevel = models.PositiveIntegerField(db_column='MinLevel')  # Field name made lowercase.
    maxlevel = models.PositiveIntegerField(db_column='MaxLevel')  # Field name made lowercase.
    modelid1 = models.PositiveIntegerField(db_column='ModelId1')  # Field name made lowercase.
    modelid2 = models.PositiveIntegerField(db_column='ModelId2')  # Field name made lowercase.
    modelid3 = models.PositiveIntegerField(db_column='ModelId3')  # Field name made lowercase.
    modelid4 = models.PositiveIntegerField(db_column='ModelId4')  # Field name made lowercase.
    factionalliance = models.PositiveSmallIntegerField(db_column='FactionAlliance')  # Field name made lowercase.
    factionhorde = models.PositiveSmallIntegerField(db_column='FactionHorde')  # Field name made lowercase.
    scale = models.FloatField(db_column='Scale')  # Field name made lowercase.
    family = models.IntegerField(db_column='Family')  # Field name made lowercase.
    creaturetype = models.PositiveIntegerField(db_column='CreatureType')  # Field name made lowercase.
    inhabittype = models.PositiveIntegerField(db_column='InhabitType')  # Field name made lowercase.
    regeneratestats = models.PositiveIntegerField(db_column='RegenerateStats')  # Field name made lowercase.
    racialleader = models.PositiveIntegerField(db_column='RacialLeader')  # Field name made lowercase.
    npcflags = models.PositiveIntegerField(db_column='NpcFlags')  # Field name made lowercase.
    unitflags = models.PositiveIntegerField(db_column='UnitFlags')  # Field name made lowercase.
    dynamicflags = models.PositiveIntegerField(db_column='DynamicFlags')  # Field name made lowercase.
    extraflags = models.PositiveIntegerField(db_column='ExtraFlags')  # Field name made lowercase.
    creaturetypeflags = models.PositiveIntegerField(db_column='CreatureTypeFlags')  # Field name made lowercase.
    speedwalk = models.FloatField(db_column='SpeedWalk')  # Field name made lowercase.
    speedrun = models.FloatField(db_column='SpeedRun')  # Field name made lowercase.
    unitclass = models.PositiveIntegerField(db_column='UnitClass')  # Field name made lowercase.
    rank = models.PositiveIntegerField(db_column='Rank')  # Field name made lowercase.
    healthmultiplier = models.FloatField(db_column='HealthMultiplier')  # Field name made lowercase.
    powermultiplier = models.FloatField(db_column='PowerMultiplier')  # Field name made lowercase.
    damagemultiplier = models.FloatField(db_column='DamageMultiplier')  # Field name made lowercase.
    damagevariance = models.FloatField(db_column='DamageVariance')  # Field name made lowercase.
    armormultiplier = models.FloatField(db_column='ArmorMultiplier')  # Field name made lowercase.
    experiencemultiplier = models.FloatField(db_column='ExperienceMultiplier')  # Field name made lowercase.
    minlevelhealth = models.PositiveIntegerField(db_column='MinLevelHealth')  # Field name made lowercase.
    maxlevelhealth = models.PositiveIntegerField(db_column='MaxLevelHealth')  # Field name made lowercase.
    minlevelmana = models.PositiveIntegerField(db_column='MinLevelMana')  # Field name made lowercase.
    maxlevelmana = models.PositiveIntegerField(db_column='MaxLevelMana')  # Field name made lowercase.
    minmeleedmg = models.FloatField(db_column='MinMeleeDmg')  # Field name made lowercase.
    maxmeleedmg = models.FloatField(db_column='MaxMeleeDmg')  # Field name made lowercase.
    minrangeddmg = models.FloatField(db_column='MinRangedDmg')  # Field name made lowercase.
    maxrangeddmg = models.FloatField(db_column='MaxRangedDmg')  # Field name made lowercase.
    armor = models.PositiveIntegerField(db_column='Armor')  # Field name made lowercase.
    meleeattackpower = models.PositiveIntegerField(db_column='MeleeAttackPower')  # Field name made lowercase.
    rangedattackpower = models.PositiveSmallIntegerField(db_column='RangedAttackPower')  # Field name made lowercase.
    meleebaseattacktime = models.PositiveIntegerField(db_column='MeleeBaseAttackTime')  # Field name made lowercase.
    rangedbaseattacktime = models.PositiveIntegerField(db_column='RangedBaseAttackTime')  # Field name made lowercase.
    damageschool = models.IntegerField(db_column='DamageSchool')  # Field name made lowercase.
    minlootgold = models.PositiveIntegerField(db_column='MinLootGold')  # Field name made lowercase.
    maxlootgold = models.PositiveIntegerField(db_column='MaxLootGold')  # Field name made lowercase.
    lootid = models.PositiveIntegerField(db_column='LootId')  # Field name made lowercase.
    pickpocketlootid = models.PositiveIntegerField(db_column='PickpocketLootId')  # Field name made lowercase.
    skinninglootid = models.PositiveIntegerField(db_column='SkinningLootId')  # Field name made lowercase.
    killcredit1 = models.PositiveIntegerField(db_column='KillCredit1')  # Field name made lowercase.
    killcredit2 = models.PositiveIntegerField(db_column='KillCredit2')  # Field name made lowercase.
    mechanicimmunemask = models.PositiveIntegerField(db_column='MechanicImmuneMask')  # Field name made lowercase.
    schoolimmunemask = models.PositiveIntegerField(db_column='SchoolImmuneMask')  # Field name made lowercase.
    resistanceholy = models.SmallIntegerField(db_column='ResistanceHoly')  # Field name made lowercase.
    resistancefire = models.SmallIntegerField(db_column='ResistanceFire')  # Field name made lowercase.
    resistancenature = models.SmallIntegerField(db_column='ResistanceNature')  # Field name made lowercase.
    resistancefrost = models.SmallIntegerField(db_column='ResistanceFrost')  # Field name made lowercase.
    resistanceshadow = models.SmallIntegerField(db_column='ResistanceShadow')  # Field name made lowercase.
    resistancearcane = models.SmallIntegerField(db_column='ResistanceArcane')  # Field name made lowercase.
    petspelldataid = models.PositiveIntegerField(db_column='PetSpellDataId')  # Field name made lowercase.
    movementtype = models.PositiveIntegerField(db_column='MovementType')  # Field name made lowercase.
    trainertype = models.IntegerField(db_column='TrainerType')  # Field name made lowercase.
    trainerspell = models.PositiveIntegerField(db_column='TrainerSpell')  # Field name made lowercase.
    trainerclass = models.PositiveIntegerField(db_column='TrainerClass')  # Field name made lowercase.
    trainerrace = models.PositiveIntegerField(db_column='TrainerRace')  # Field name made lowercase.
    trainertemplateid = models.PositiveIntegerField(db_column='TrainerTemplateId')  # Field name made lowercase.
    vendortemplateid = models.PositiveIntegerField(db_column='VendorTemplateId')  # Field name made lowercase.
    gossipmenuid = models.PositiveIntegerField(db_column='GossipMenuId')  # Field name made lowercase.
    equipmenttemplateid = models.PositiveIntegerField(db_column='EquipmentTemplateId')  # Field name made lowercase.
    civilian = models.PositiveIntegerField(db_column='Civilian')  # Field name made lowercase.
    ainame = models.CharField(db_column='AIName', max_length=64)  # Field name made lowercase.
    scriptname = models.CharField(db_column='ScriptName', max_length=64)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'creature_template_armor'


class CreatureTemplateClasslevelstats(models.Model):
    level = models.IntegerField(db_column='Level', primary_key=True)  # Field name made lowercase.
    class_field = models.IntegerField(db_column='Class')  # Field name made lowercase. Field renamed because it was a Python reserved word.
    basehealthexp0 = models.PositiveIntegerField(db_column='BaseHealthExp0')  # Field name made lowercase.
    basemana = models.PositiveIntegerField(db_column='BaseMana')  # Field name made lowercase.
    basedamageexp0 = models.FloatField(db_column='BaseDamageExp0')  # Field name made lowercase.
    basemeleeattackpower = models.FloatField(db_column='BaseMeleeAttackPower')  # Field name made lowercase.
    baserangedattackpower = models.FloatField(db_column='BaseRangedAttackPower')  # Field name made lowercase.
    basearmor = models.PositiveIntegerField(db_column='BaseArmor')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'creature_template_classlevelstats'
        unique_together = (('level', 'class_field'),)


class CreatureTemplateSpells(models.Model):
    entry = models.PositiveIntegerField(primary_key=True)
    setid = models.PositiveIntegerField(db_column='setId')  # Field name made lowercase.
    spell1 = models.PositiveIntegerField()
    spell2 = models.PositiveIntegerField()
    spell3 = models.PositiveIntegerField()
    spell4 = models.PositiveIntegerField()
    spell5 = models.PositiveIntegerField()
    spell6 = models.PositiveIntegerField()
    spell7 = models.PositiveIntegerField()
    spell8 = models.PositiveIntegerField()
    spell9 = models.PositiveIntegerField()
    spell10 = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'creature_template_spells'
        unique_together = (('entry', 'setid'),)


class CustomTexts(models.Model):
    entry = models.IntegerField(primary_key=True)
    content_default = models.TextField()
    content_loc1 = models.TextField(blank=True, null=True)
    content_loc2 = models.TextField(blank=True, null=True)
    content_loc3 = models.TextField(blank=True, null=True)
    content_loc4 = models.TextField(blank=True, null=True)
    content_loc5 = models.TextField(blank=True, null=True)
    content_loc6 = models.TextField(blank=True, null=True)
    content_loc7 = models.TextField(blank=True, null=True)
    content_loc8 = models.TextField(blank=True, null=True)
    sound = models.PositiveIntegerField()
    type = models.PositiveIntegerField()
    language = models.PositiveIntegerField()
    emote = models.PositiveSmallIntegerField()
    broadcast_text_id = models.IntegerField()
    comment = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'custom_texts'


class DbVersion(models.Model):
    version = models.CharField(max_length=120, blank=True, null=True)
    creature_ai_version = models.CharField(max_length=120, blank=True, null=True)
    required_z2795_01_mangos_waypoint_path_name = models.TextField(blank=True, null=True)  # This field type is a guess.
    content_4003_tdb_0313_quest_completed_robe = models.TextField(db_column='content_4003_TDB-0313_quest_completed_robe', blank=True, null=True)  # Field name made lowercase. Field renamed to remove unsuitable characters. This field type is a guess.

    class Meta:
        managed = False
        db_table = 'db_version'


class DbscriptRandomTemplates(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    type = models.PositiveIntegerField()
    target_id = models.IntegerField()
    chance = models.IntegerField()
    comments = models.CharField(max_length=500, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'dbscript_random_templates'
        unique_together = (('id', 'type', 'target_id'),)


class DbscriptString(models.Model):
    entry = models.PositiveIntegerField(primary_key=True)
    content_default = models.TextField()
    content_loc1 = models.TextField(blank=True, null=True)
    content_loc2 = models.TextField(blank=True, null=True)
    content_loc3 = models.TextField(blank=True, null=True)
    content_loc4 = models.TextField(blank=True, null=True)
    content_loc5 = models.TextField(blank=True, null=True)
    content_loc6 = models.TextField(blank=True, null=True)
    content_loc7 = models.TextField(blank=True, null=True)
    content_loc8 = models.TextField(blank=True, null=True)
    sound = models.PositiveIntegerField()
    type = models.PositiveIntegerField()
    language = models.PositiveIntegerField()
    emote = models.PositiveSmallIntegerField()
    broadcast_text_id = models.IntegerField()
    comment = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'dbscript_string'


class DbscriptsOnCreatureDeath(models.Model):
    id = models.PositiveIntegerField()
    delay = models.PositiveIntegerField()
    priority = models.PositiveIntegerField()
    command = models.PositiveIntegerField()
    datalong = models.PositiveIntegerField()
    datalong2 = models.PositiveIntegerField()
    datalong3 = models.PositiveIntegerField()
    buddy_entry = models.PositiveIntegerField()
    search_radius = models.PositiveIntegerField()
    data_flags = models.PositiveIntegerField()
    dataint = models.IntegerField()
    dataint2 = models.IntegerField()
    dataint3 = models.IntegerField()
    dataint4 = models.IntegerField()
    datafloat = models.FloatField()
    x = models.FloatField()
    y = models.FloatField()
    z = models.FloatField()
    o = models.FloatField()
    speed = models.FloatField()
    condition_id = models.PositiveIntegerField()
    comments = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'dbscripts_on_creature_death'


class DbscriptsOnCreatureMovement(models.Model):
    id = models.PositiveIntegerField()
    delay = models.PositiveIntegerField()
    priority = models.PositiveIntegerField()
    command = models.PositiveIntegerField()
    datalong = models.PositiveIntegerField()
    datalong2 = models.PositiveIntegerField()
    datalong3 = models.PositiveIntegerField()
    buddy_entry = models.PositiveIntegerField()
    search_radius = models.PositiveIntegerField()
    data_flags = models.PositiveIntegerField()
    dataint = models.IntegerField()
    dataint2 = models.IntegerField()
    dataint3 = models.IntegerField()
    dataint4 = models.IntegerField()
    datafloat = models.FloatField()
    x = models.FloatField()
    y = models.FloatField()
    z = models.FloatField()
    o = models.FloatField()
    speed = models.FloatField()
    condition_id = models.PositiveIntegerField()
    comments = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'dbscripts_on_creature_movement'


class DbscriptsOnEvent(models.Model):
    id = models.PositiveIntegerField()
    delay = models.PositiveIntegerField()
    priority = models.PositiveIntegerField()
    command = models.PositiveIntegerField()
    datalong = models.PositiveIntegerField()
    datalong2 = models.PositiveIntegerField()
    datalong3 = models.PositiveIntegerField()
    buddy_entry = models.PositiveIntegerField()
    search_radius = models.PositiveIntegerField()
    data_flags = models.PositiveIntegerField()
    dataint = models.IntegerField()
    dataint2 = models.IntegerField()
    dataint3 = models.IntegerField()
    dataint4 = models.IntegerField()
    datafloat = models.FloatField()
    x = models.FloatField()
    y = models.FloatField()
    z = models.FloatField()
    o = models.FloatField()
    speed = models.FloatField()
    condition_id = models.PositiveIntegerField()
    comments = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'dbscripts_on_event'


class DbscriptsOnGoTemplateUse(models.Model):
    id = models.PositiveIntegerField()
    delay = models.PositiveIntegerField()
    priority = models.PositiveIntegerField()
    command = models.PositiveIntegerField()
    datalong = models.PositiveIntegerField()
    datalong2 = models.PositiveIntegerField()
    datalong3 = models.PositiveIntegerField()
    buddy_entry = models.PositiveIntegerField()
    search_radius = models.PositiveIntegerField()
    data_flags = models.PositiveIntegerField()
    dataint = models.IntegerField()
    dataint2 = models.IntegerField()
    dataint3 = models.IntegerField()
    dataint4 = models.IntegerField()
    datafloat = models.FloatField()
    x = models.FloatField()
    y = models.FloatField()
    z = models.FloatField()
    o = models.FloatField()
    speed = models.FloatField()
    condition_id = models.PositiveIntegerField()
    comments = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'dbscripts_on_go_template_use'


class DbscriptsOnGoUse(models.Model):
    id = models.PositiveIntegerField()
    delay = models.PositiveIntegerField()
    priority = models.PositiveIntegerField()
    command = models.PositiveIntegerField()
    datalong = models.PositiveIntegerField()
    datalong2 = models.PositiveIntegerField()
    datalong3 = models.PositiveIntegerField()
    buddy_entry = models.PositiveIntegerField()
    search_radius = models.PositiveIntegerField()
    data_flags = models.PositiveIntegerField()
    dataint = models.IntegerField()
    dataint2 = models.IntegerField()
    dataint3 = models.IntegerField()
    dataint4 = models.IntegerField()
    datafloat = models.FloatField()
    x = models.FloatField()
    y = models.FloatField()
    z = models.FloatField()
    o = models.FloatField()
    speed = models.FloatField()
    condition_id = models.PositiveIntegerField()
    comments = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'dbscripts_on_go_use'


class DbscriptsOnGossip(models.Model):
    id = models.PositiveIntegerField()
    delay = models.PositiveIntegerField()
    priority = models.PositiveIntegerField()
    command = models.PositiveIntegerField()
    datalong = models.PositiveIntegerField()
    datalong2 = models.PositiveIntegerField()
    datalong3 = models.PositiveIntegerField()
    buddy_entry = models.PositiveIntegerField()
    search_radius = models.PositiveIntegerField()
    data_flags = models.PositiveIntegerField()
    dataint = models.IntegerField()
    dataint2 = models.IntegerField()
    dataint3 = models.IntegerField()
    dataint4 = models.IntegerField()
    datafloat = models.FloatField()
    x = models.FloatField()
    y = models.FloatField()
    z = models.FloatField()
    o = models.FloatField()
    speed = models.FloatField()
    condition_id = models.PositiveIntegerField()
    comments = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'dbscripts_on_gossip'


class DbscriptsOnQuestEnd(models.Model):
    id = models.PositiveIntegerField()
    delay = models.PositiveIntegerField()
    priority = models.PositiveIntegerField()
    command = models.PositiveIntegerField()
    datalong = models.PositiveIntegerField()
    datalong2 = models.PositiveIntegerField()
    datalong3 = models.PositiveIntegerField()
    buddy_entry = models.PositiveIntegerField()
    search_radius = models.PositiveIntegerField()
    data_flags = models.PositiveIntegerField()
    dataint = models.IntegerField()
    dataint2 = models.IntegerField()
    dataint3 = models.IntegerField()
    dataint4 = models.IntegerField()
    datafloat = models.FloatField()
    x = models.FloatField()
    y = models.FloatField()
    z = models.FloatField()
    o = models.FloatField()
    speed = models.FloatField()
    condition_id = models.PositiveIntegerField()
    comments = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'dbscripts_on_quest_end'


class DbscriptsOnQuestStart(models.Model):
    id = models.PositiveIntegerField()
    delay = models.PositiveIntegerField()
    priority = models.PositiveIntegerField()
    command = models.PositiveIntegerField()
    datalong = models.PositiveIntegerField()
    datalong2 = models.PositiveIntegerField()
    datalong3 = models.PositiveIntegerField()
    buddy_entry = models.PositiveIntegerField()
    search_radius = models.PositiveIntegerField()
    data_flags = models.PositiveIntegerField()
    dataint = models.IntegerField()
    dataint2 = models.IntegerField()
    dataint3 = models.IntegerField()
    dataint4 = models.IntegerField()
    datafloat = models.FloatField()
    x = models.FloatField()
    y = models.FloatField()
    z = models.FloatField()
    o = models.FloatField()
    speed = models.FloatField()
    condition_id = models.PositiveIntegerField()
    comments = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'dbscripts_on_quest_start'


class DbscriptsOnRelay(models.Model):
    id = models.PositiveIntegerField()
    delay = models.PositiveIntegerField()
    priority = models.PositiveIntegerField()
    command = models.PositiveIntegerField()
    datalong = models.PositiveIntegerField()
    datalong2 = models.PositiveIntegerField()
    datalong3 = models.PositiveIntegerField()
    buddy_entry = models.PositiveIntegerField()
    search_radius = models.PositiveIntegerField()
    data_flags = models.PositiveIntegerField()
    dataint = models.IntegerField()
    dataint2 = models.IntegerField()
    dataint3 = models.IntegerField()
    dataint4 = models.IntegerField()
    datafloat = models.FloatField()
    x = models.FloatField()
    y = models.FloatField()
    z = models.FloatField()
    o = models.FloatField()
    speed = models.FloatField()
    condition_id = models.PositiveIntegerField()
    comments = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'dbscripts_on_relay'


class DbscriptsOnSpell(models.Model):
    id = models.PositiveIntegerField()
    delay = models.PositiveIntegerField()
    priority = models.PositiveIntegerField()
    command = models.PositiveIntegerField()
    datalong = models.PositiveIntegerField()
    datalong2 = models.PositiveIntegerField()
    datalong3 = models.PositiveIntegerField()
    buddy_entry = models.PositiveIntegerField()
    search_radius = models.PositiveIntegerField()
    data_flags = models.PositiveIntegerField()
    dataint = models.IntegerField()
    dataint2 = models.IntegerField()
    dataint3 = models.IntegerField()
    dataint4 = models.IntegerField()
    datafloat = models.FloatField()
    x = models.FloatField()
    y = models.FloatField()
    z = models.FloatField()
    o = models.FloatField()
    speed = models.FloatField()
    condition_id = models.PositiveIntegerField()
    comments = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'dbscripts_on_spell'


class DisenchantLootTemplate(models.Model):
    entry = models.PositiveIntegerField(primary_key=True)
    item = models.PositiveIntegerField()
    chanceorquestchance = models.FloatField(db_column='ChanceOrQuestChance')  # Field name made lowercase.
    groupid = models.PositiveIntegerField()
    mincountorref = models.IntegerField(db_column='mincountOrRef')  # Field name made lowercase.
    maxcount = models.PositiveIntegerField()
    condition_id = models.PositiveIntegerField()
    comments = models.CharField(max_length=300, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'disenchant_loot_template'
        unique_together = (('entry', 'item'),)


class ExplorationBasexp(models.Model):
    level = models.IntegerField(primary_key=True)
    basexp = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'exploration_basexp'


class FishingLootTemplate(models.Model):
    entry = models.PositiveIntegerField(primary_key=True)
    item = models.PositiveIntegerField()
    chanceorquestchance = models.FloatField(db_column='ChanceOrQuestChance')  # Field name made lowercase.
    groupid = models.PositiveIntegerField()
    mincountorref = models.IntegerField(db_column='mincountOrRef')  # Field name made lowercase.
    maxcount = models.PositiveIntegerField()
    condition_id = models.PositiveIntegerField()
    comments = models.CharField(max_length=300, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'fishing_loot_template'
        unique_together = (('entry', 'item'),)


class GameEvent(models.Model):
    entry = models.PositiveIntegerField(primary_key=True)
    schedule_type = models.IntegerField()
    occurence = models.PositiveBigIntegerField()
    length = models.PositiveBigIntegerField()
    holiday = models.PositiveIntegerField()
    linkedto = models.PositiveIntegerField(db_column='linkedTo')  # Field name made lowercase.
    description = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'game_event'


class GameEventCreature(models.Model):
    guid = models.PositiveIntegerField(primary_key=True)
    event = models.SmallIntegerField()

    class Meta:
        managed = False
        db_table = 'game_event_creature'
        unique_together = (('guid', 'event'),)


class GameEventCreatureData(models.Model):
    guid = models.PositiveIntegerField(primary_key=True)
    entry_id = models.PositiveIntegerField()
    modelid = models.PositiveIntegerField()
    equipment_id = models.PositiveIntegerField()
    spell_start = models.PositiveIntegerField()
    spell_end = models.PositiveIntegerField()
    event = models.PositiveSmallIntegerField()

    class Meta:
        managed = False
        db_table = 'game_event_creature_data'
        unique_together = (('guid', 'event'),)


class GameEventGameobject(models.Model):
    guid = models.PositiveIntegerField(primary_key=True)
    event = models.SmallIntegerField()

    class Meta:
        managed = False
        db_table = 'game_event_gameobject'
        unique_together = (('guid', 'event'),)


class GameEventMail(models.Model):
    event = models.SmallIntegerField(primary_key=True)
    racemask = models.PositiveIntegerField(db_column='raceMask')  # Field name made lowercase.
    quest = models.PositiveIntegerField()
    mailtemplateid = models.PositiveIntegerField(db_column='mailTemplateId')  # Field name made lowercase.
    senderentry = models.PositiveIntegerField(db_column='senderEntry')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'game_event_mail'
        unique_together = (('event', 'racemask', 'quest'),)


class GameEventQuest(models.Model):
    quest = models.PositiveIntegerField(primary_key=True)
    event = models.PositiveSmallIntegerField()

    class Meta:
        managed = False
        db_table = 'game_event_quest'
        unique_together = (('quest', 'event'),)


class GameEventTime(models.Model):
    entry = models.PositiveIntegerField(primary_key=True)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'game_event_time'


class GameGraveyardZone(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    ghost_loc = models.PositiveIntegerField()
    link_kind = models.PositiveIntegerField()
    faction = models.PositiveSmallIntegerField()

    class Meta:
        managed = False
        db_table = 'game_graveyard_zone'
        unique_together = (('id', 'ghost_loc', 'link_kind'),)


class GameTele(models.Model):
    position_x = models.FloatField()
    position_y = models.FloatField()
    position_z = models.FloatField()
    orientation = models.FloatField()
    map = models.PositiveSmallIntegerField()
    name = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'game_tele'


class GameWeather(models.Model):
    zone = models.PositiveIntegerField(primary_key=True)
    spring_rain_chance = models.PositiveIntegerField()
    spring_snow_chance = models.PositiveIntegerField()
    spring_storm_chance = models.PositiveIntegerField()
    summer_rain_chance = models.PositiveIntegerField()
    summer_snow_chance = models.PositiveIntegerField()
    summer_storm_chance = models.PositiveIntegerField()
    fall_rain_chance = models.PositiveIntegerField()
    fall_snow_chance = models.PositiveIntegerField()
    fall_storm_chance = models.PositiveIntegerField()
    winter_rain_chance = models.PositiveIntegerField()
    winter_snow_chance = models.PositiveIntegerField()
    winter_storm_chance = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'game_weather'


class Gameobject(models.Model):
    guid = models.AutoField(primary_key=True)
    id = models.PositiveIntegerField()
    map = models.PositiveSmallIntegerField()
    spawnmask = models.PositiveIntegerField(db_column='spawnMask')  # Field name made lowercase.
    position_x = models.FloatField()
    position_y = models.FloatField()
    position_z = models.FloatField()
    orientation = models.FloatField()
    rotation0 = models.FloatField()
    rotation1 = models.FloatField()
    rotation2 = models.FloatField()
    rotation3 = models.FloatField()
    spawntimesecsmin = models.IntegerField()
    spawntimesecsmax = models.IntegerField()
    animprogress = models.PositiveIntegerField()
    state = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'gameobject'


class GameobjectAddon(models.Model):
    guid = models.PositiveIntegerField(primary_key=True)
    path_rotation0 = models.FloatField()
    path_rotation1 = models.FloatField()
    path_rotation2 = models.FloatField()
    path_rotation3 = models.FloatField()

    class Meta:
        managed = False
        db_table = 'gameobject_addon'


class GameobjectBattleground(models.Model):
    guid = models.PositiveIntegerField(primary_key=True)
    event1 = models.PositiveIntegerField()
    event2 = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'gameobject_battleground'


class GameobjectInvolvedrelation(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    quest = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'gameobject_involvedrelation'
        unique_together = (('id', 'quest'),)


class GameobjectLootTemplate(models.Model):
    entry = models.PositiveIntegerField(primary_key=True)
    item = models.PositiveIntegerField()
    chanceorquestchance = models.FloatField(db_column='ChanceOrQuestChance')  # Field name made lowercase.
    groupid = models.PositiveIntegerField()
    mincountorref = models.IntegerField(db_column='mincountOrRef')  # Field name made lowercase.
    maxcount = models.PositiveIntegerField()
    condition_id = models.PositiveIntegerField()
    comments = models.CharField(max_length=300, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'gameobject_loot_template'
        unique_together = (('entry', 'item'),)


class GameobjectQuestrelation(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    quest = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'gameobject_questrelation'
        unique_together = (('id', 'quest'),)


class GameobjectSpawnEntry(models.Model):
    guid = models.PositiveIntegerField(primary_key=True)
    entry = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'gameobject_spawn_entry'
        unique_together = (('guid', 'entry'),)


class GameobjectTemplate(models.Model):
    entry = models.PositiveIntegerField(primary_key=True)
    type = models.PositiveIntegerField()
    displayid = models.PositiveIntegerField(db_column='displayId')  # Field name made lowercase.
    name = models.CharField(max_length=100)
    faction = models.PositiveSmallIntegerField()
    flags = models.PositiveIntegerField()
    extraflags = models.PositiveIntegerField(db_column='ExtraFlags')  # Field name made lowercase.
    size = models.FloatField()
    data0 = models.PositiveIntegerField()
    data1 = models.IntegerField()
    data2 = models.PositiveIntegerField()
    data3 = models.PositiveIntegerField()
    data4 = models.PositiveIntegerField()
    data5 = models.PositiveIntegerField()
    data6 = models.IntegerField()
    data7 = models.PositiveIntegerField()
    data8 = models.PositiveIntegerField()
    data9 = models.PositiveIntegerField()
    data10 = models.PositiveIntegerField()
    data11 = models.PositiveIntegerField()
    data12 = models.PositiveIntegerField()
    data13 = models.PositiveIntegerField()
    data14 = models.PositiveIntegerField()
    data15 = models.PositiveIntegerField()
    data16 = models.PositiveIntegerField()
    data17 = models.PositiveIntegerField()
    data18 = models.PositiveIntegerField()
    data19 = models.PositiveIntegerField()
    data20 = models.PositiveIntegerField()
    data21 = models.PositiveIntegerField()
    data22 = models.PositiveIntegerField()
    data23 = models.PositiveIntegerField()
    customdata1 = models.PositiveIntegerField(db_column='CustomData1')  # Field name made lowercase.
    mingold = models.PositiveIntegerField()
    maxgold = models.PositiveIntegerField()
    scriptname = models.CharField(db_column='ScriptName', max_length=64)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'gameobject_template'


class GameobjectTemplateAddon(models.Model):
    entry = models.PositiveIntegerField(db_column='Entry', primary_key=True)  # Field name made lowercase.
    artkit0 = models.IntegerField(db_column='Artkit0')  # Field name made lowercase.
    artkit1 = models.IntegerField(db_column='Artkit1')  # Field name made lowercase.
    artkit2 = models.IntegerField(db_column='Artkit2')  # Field name made lowercase.
    artkit3 = models.IntegerField(db_column='Artkit3')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'gameobject_template_addon'


class GossipMenu(models.Model):
    entry = models.PositiveSmallIntegerField(primary_key=True)
    text_id = models.PositiveIntegerField()
    script_id = models.PositiveIntegerField()
    condition_id = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'gossip_menu'
        unique_together = (('entry', 'text_id', 'script_id'),)


class GossipMenuOption(models.Model):
    menu_id = models.PositiveSmallIntegerField(primary_key=True)
    id = models.PositiveSmallIntegerField()
    option_icon = models.PositiveIntegerField()
    option_text = models.TextField(blank=True, null=True)
    option_broadcast_text = models.IntegerField()
    option_id = models.PositiveIntegerField()
    npc_option_npcflag = models.PositiveIntegerField()
    action_menu_id = models.IntegerField()
    action_poi_id = models.PositiveIntegerField()
    action_script_id = models.PositiveIntegerField()
    box_coded = models.PositiveIntegerField()
    box_money = models.PositiveIntegerField()
    box_text = models.TextField(blank=True, null=True)
    box_broadcast_text = models.IntegerField()
    condition_id = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'gossip_menu_option'
        unique_together = (('menu_id', 'id'),)


class GossipTexts(models.Model):
    entry = models.IntegerField(primary_key=True)
    content_default = models.TextField()
    content_loc1 = models.TextField(blank=True, null=True)
    content_loc2 = models.TextField(blank=True, null=True)
    content_loc3 = models.TextField(blank=True, null=True)
    content_loc4 = models.TextField(blank=True, null=True)
    content_loc5 = models.TextField(blank=True, null=True)
    content_loc6 = models.TextField(blank=True, null=True)
    content_loc7 = models.TextField(blank=True, null=True)
    content_loc8 = models.TextField(blank=True, null=True)
    comment = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'gossip_texts'


class InstanceDungeonEncounters(models.Model):
    id = models.PositiveIntegerField(db_column='Id', primary_key=True)  # Field name made lowercase.
    mapid = models.PositiveIntegerField(db_column='MapId')  # Field name made lowercase.
    difficulty = models.PositiveIntegerField(db_column='Difficulty')  # Field name made lowercase.
    encounterdata = models.PositiveIntegerField(db_column='EncounterData')  # Field name made lowercase.
    encounterindex = models.PositiveIntegerField(db_column='EncounterIndex')  # Field name made lowercase.
    encountername = models.TextField(db_column='EncounterName')  # Field name made lowercase.
    encountername2 = models.TextField(db_column='EncounterName2', blank=True, null=True)  # Field name made lowercase.
    encountername3 = models.TextField(db_column='EncounterName3', blank=True, null=True)  # Field name made lowercase.
    encountername4 = models.TextField(db_column='EncounterName4', blank=True, null=True)  # Field name made lowercase.
    encountername5 = models.TextField(db_column='EncounterName5', blank=True, null=True)  # Field name made lowercase.
    encountername6 = models.TextField(db_column='EncounterName6', blank=True, null=True)  # Field name made lowercase.
    encountername7 = models.TextField(db_column='EncounterName7', blank=True, null=True)  # Field name made lowercase.
    encountername8 = models.TextField(db_column='EncounterName8', blank=True, null=True)  # Field name made lowercase.
    encountername9 = models.TextField(db_column='EncounterName9', blank=True, null=True)  # Field name made lowercase.
    encountername10 = models.TextField(db_column='EncounterName10', blank=True, null=True)  # Field name made lowercase.
    encountername11 = models.TextField(db_column='EncounterName11', blank=True, null=True)  # Field name made lowercase.
    encountername12 = models.TextField(db_column='EncounterName12', blank=True, null=True)  # Field name made lowercase.
    encountername13 = models.TextField(db_column='EncounterName13', blank=True, null=True)  # Field name made lowercase.
    encountername14 = models.TextField(db_column='EncounterName14', blank=True, null=True)  # Field name made lowercase.
    encountername15 = models.TextField(db_column='EncounterName15', blank=True, null=True)  # Field name made lowercase.
    encountername16 = models.TextField(db_column='EncounterName16', blank=True, null=True)  # Field name made lowercase.
    namelangflags = models.PositiveIntegerField(db_column='NameLangFlags')  # Field name made lowercase.
    spelliconid = models.PositiveIntegerField(db_column='SpellIconID')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'instance_dungeon_encounters'


class InstanceEncounters(models.Model):
    entry = models.PositiveIntegerField(primary_key=True)
    credittype = models.PositiveIntegerField(db_column='creditType')  # Field name made lowercase.
    creditentry = models.PositiveIntegerField(db_column='creditEntry')  # Field name made lowercase.
    lastencounterdungeon = models.PositiveSmallIntegerField(db_column='lastEncounterDungeon')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'instance_encounters'


class InstanceTemplate(models.Model):
    map = models.PositiveSmallIntegerField(primary_key=True)
    parent = models.PositiveSmallIntegerField()
    levelmin = models.PositiveIntegerField(db_column='levelMin')  # Field name made lowercase.
    levelmax = models.PositiveIntegerField(db_column='levelMax')  # Field name made lowercase.
    maxplayers = models.PositiveIntegerField(db_column='maxPlayers')  # Field name made lowercase.
    reset_delay = models.PositiveIntegerField()
    ghostentrancemap = models.PositiveSmallIntegerField(db_column='ghostEntranceMap')  # Field name made lowercase.
    ghostentrancex = models.FloatField(db_column='ghostEntranceX')  # Field name made lowercase.
    ghostentrancey = models.FloatField(db_column='ghostEntranceY')  # Field name made lowercase.
    scriptname = models.CharField(db_column='ScriptName', max_length=128)  # Field name made lowercase.
    mountallowed = models.PositiveIntegerField(db_column='mountAllowed')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'instance_template'


class ItemConvert(models.Model):
    entry = models.PositiveIntegerField(primary_key=True)
    item = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'item_convert'


class ItemEnchantmentTemplate(models.Model):
    entry = models.PositiveIntegerField(primary_key=True)
    ench = models.PositiveIntegerField()
    chance = models.FloatField()

    class Meta:
        managed = False
        db_table = 'item_enchantment_template'
        unique_together = (('entry', 'ench'),)


class ItemExpireConvert(models.Model):
    entry = models.PositiveIntegerField(primary_key=True)
    item = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'item_expire_convert'


class ItemLootTemplate(models.Model):
    entry = models.PositiveIntegerField(primary_key=True)
    item = models.PositiveIntegerField()
    chanceorquestchance = models.FloatField(db_column='ChanceOrQuestChance')  # Field name made lowercase.
    groupid = models.PositiveIntegerField()
    mincountorref = models.IntegerField(db_column='mincountOrRef')  # Field name made lowercase.
    maxcount = models.PositiveIntegerField()
    condition_id = models.PositiveIntegerField()
    comments = models.CharField(max_length=300, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'item_loot_template'
        unique_together = (('entry', 'item'),)


class ItemRequiredTarget(models.Model):
    entry = models.PositiveIntegerField()
    type = models.PositiveIntegerField()
    targetentry = models.PositiveIntegerField(db_column='targetEntry')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'item_required_target'
        unique_together = (('entry', 'type', 'targetentry'),)


class ItemTemplate(models.Model):
    entry = models.PositiveIntegerField(primary_key=True)
    class_field = models.PositiveIntegerField(db_column='class')  # Field renamed because it was a Python reserved word.
    subclass = models.PositiveIntegerField()
    name = models.CharField(max_length=255)
    displayid = models.PositiveIntegerField()
    quality = models.PositiveIntegerField(db_column='Quality')  # Field name made lowercase.
    flags = models.PositiveIntegerField(db_column='Flags')  # Field name made lowercase.
    buycount = models.PositiveIntegerField(db_column='BuyCount')  # Field name made lowercase.
    buyprice = models.PositiveIntegerField(db_column='BuyPrice')  # Field name made lowercase.
    sellprice = models.PositiveIntegerField(db_column='SellPrice')  # Field name made lowercase.
    inventorytype = models.PositiveIntegerField(db_column='InventoryType')  # Field name made lowercase.
    allowableclass = models.IntegerField(db_column='AllowableClass')  # Field name made lowercase.
    allowablerace = models.IntegerField(db_column='AllowableRace')  # Field name made lowercase.
    itemlevel = models.PositiveIntegerField(db_column='ItemLevel')  # Field name made lowercase.
    requiredlevel = models.PositiveIntegerField(db_column='RequiredLevel')  # Field name made lowercase.
    requiredskill = models.PositiveSmallIntegerField(db_column='RequiredSkill')  # Field name made lowercase.
    requiredskillrank = models.PositiveSmallIntegerField(db_column='RequiredSkillRank')  # Field name made lowercase.
    requiredspell = models.PositiveIntegerField()
    requiredhonorrank = models.PositiveIntegerField()
    requiredcityrank = models.PositiveIntegerField(db_column='RequiredCityRank')  # Field name made lowercase.
    requiredreputationfaction = models.PositiveSmallIntegerField(db_column='RequiredReputationFaction')  # Field name made lowercase.
    requiredreputationrank = models.PositiveSmallIntegerField(db_column='RequiredReputationRank')  # Field name made lowercase.
    maxcount = models.PositiveSmallIntegerField()
    stackable = models.PositiveSmallIntegerField()
    containerslots = models.PositiveIntegerField(db_column='ContainerSlots')  # Field name made lowercase.
    stat_type1 = models.PositiveIntegerField()
    stat_value1 = models.SmallIntegerField()
    stat_type2 = models.PositiveIntegerField()
    stat_value2 = models.SmallIntegerField()
    stat_type3 = models.PositiveIntegerField()
    stat_value3 = models.SmallIntegerField()
    stat_type4 = models.PositiveIntegerField()
    stat_value4 = models.SmallIntegerField()
    stat_type5 = models.PositiveIntegerField()
    stat_value5 = models.SmallIntegerField()
    stat_type6 = models.PositiveIntegerField()
    stat_value6 = models.SmallIntegerField()
    stat_type7 = models.PositiveIntegerField()
    stat_value7 = models.SmallIntegerField()
    stat_type8 = models.PositiveIntegerField()
    stat_value8 = models.SmallIntegerField()
    stat_type9 = models.PositiveIntegerField()
    stat_value9 = models.SmallIntegerField()
    stat_type10 = models.PositiveIntegerField()
    stat_value10 = models.SmallIntegerField()
    dmg_min1 = models.FloatField()
    dmg_max1 = models.FloatField()
    dmg_type1 = models.PositiveIntegerField()
    dmg_min2 = models.FloatField()
    dmg_max2 = models.FloatField()
    dmg_type2 = models.PositiveIntegerField()
    dmg_min3 = models.FloatField()
    dmg_max3 = models.FloatField()
    dmg_type3 = models.PositiveIntegerField()
    dmg_min4 = models.FloatField()
    dmg_max4 = models.FloatField()
    dmg_type4 = models.PositiveIntegerField()
    dmg_min5 = models.FloatField()
    dmg_max5 = models.FloatField()
    dmg_type5 = models.PositiveIntegerField()
    armor = models.PositiveSmallIntegerField()
    holy_res = models.PositiveIntegerField()
    fire_res = models.PositiveIntegerField()
    nature_res = models.PositiveIntegerField()
    frost_res = models.PositiveIntegerField()
    shadow_res = models.PositiveIntegerField()
    arcane_res = models.PositiveIntegerField()
    delay = models.PositiveSmallIntegerField()
    ammo_type = models.PositiveIntegerField()
    rangedmodrange = models.FloatField(db_column='RangedModRange')  # Field name made lowercase.
    spellid_1 = models.PositiveIntegerField()
    spelltrigger_1 = models.PositiveIntegerField()
    spellcharges_1 = models.IntegerField()
    spellppmrate_1 = models.FloatField(db_column='spellppmRate_1')  # Field name made lowercase.
    spellcooldown_1 = models.IntegerField()
    spellcategory_1 = models.PositiveSmallIntegerField()
    spellcategorycooldown_1 = models.IntegerField()
    spellid_2 = models.PositiveIntegerField()
    spelltrigger_2 = models.PositiveIntegerField()
    spellcharges_2 = models.IntegerField()
    spellppmrate_2 = models.FloatField(db_column='spellppmRate_2')  # Field name made lowercase.
    spellcooldown_2 = models.IntegerField()
    spellcategory_2 = models.PositiveSmallIntegerField()
    spellcategorycooldown_2 = models.IntegerField()
    spellid_3 = models.PositiveIntegerField()
    spelltrigger_3 = models.PositiveIntegerField()
    spellcharges_3 = models.IntegerField()
    spellppmrate_3 = models.FloatField(db_column='spellppmRate_3')  # Field name made lowercase.
    spellcooldown_3 = models.IntegerField()
    spellcategory_3 = models.PositiveSmallIntegerField()
    spellcategorycooldown_3 = models.IntegerField()
    spellid_4 = models.PositiveIntegerField()
    spelltrigger_4 = models.PositiveIntegerField()
    spellcharges_4 = models.IntegerField()
    spellppmrate_4 = models.FloatField(db_column='spellppmRate_4')  # Field name made lowercase.
    spellcooldown_4 = models.IntegerField()
    spellcategory_4 = models.PositiveSmallIntegerField()
    spellcategorycooldown_4 = models.IntegerField()
    spellid_5 = models.PositiveIntegerField()
    spelltrigger_5 = models.PositiveIntegerField()
    spellcharges_5 = models.IntegerField()
    spellppmrate_5 = models.FloatField(db_column='spellppmRate_5')  # Field name made lowercase.
    spellcooldown_5 = models.IntegerField()
    spellcategory_5 = models.PositiveSmallIntegerField()
    spellcategorycooldown_5 = models.IntegerField()
    bonding = models.PositiveIntegerField()
    description = models.CharField(max_length=255)
    pagetext = models.PositiveIntegerField(db_column='PageText')  # Field name made lowercase.
    languageid = models.PositiveIntegerField(db_column='LanguageID')  # Field name made lowercase.
    pagematerial = models.PositiveIntegerField(db_column='PageMaterial')  # Field name made lowercase.
    startquest = models.PositiveIntegerField()
    lockid = models.PositiveIntegerField()
    material = models.IntegerField(db_column='Material')  # Field name made lowercase.
    sheath = models.PositiveIntegerField()
    randomproperty = models.PositiveIntegerField(db_column='RandomProperty')  # Field name made lowercase.
    block = models.PositiveIntegerField()
    itemset = models.PositiveIntegerField()
    maxdurability = models.PositiveSmallIntegerField(db_column='MaxDurability')  # Field name made lowercase.
    area = models.PositiveIntegerField()
    map = models.SmallIntegerField(db_column='Map')  # Field name made lowercase.
    bagfamily = models.IntegerField(db_column='BagFamily')  # Field name made lowercase.
    scriptname = models.CharField(db_column='ScriptName', max_length=64)  # Field name made lowercase.
    disenchantid = models.PositiveIntegerField(db_column='DisenchantID')  # Field name made lowercase.
    foodtype = models.PositiveIntegerField(db_column='FoodType')  # Field name made lowercase.
    minmoneyloot = models.PositiveIntegerField(db_column='minMoneyLoot')  # Field name made lowercase.
    maxmoneyloot = models.PositiveIntegerField(db_column='maxMoneyLoot')  # Field name made lowercase.
    duration = models.PositiveIntegerField(db_column='Duration')  # Field name made lowercase.
    extraflags = models.PositiveIntegerField(db_column='ExtraFlags')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'item_template'


class LocalesCreature(models.Model):
    entry = models.PositiveIntegerField(primary_key=True)
    name_loc1 = models.CharField(max_length=100)
    name_loc2 = models.CharField(max_length=100)
    name_loc3 = models.CharField(max_length=100)
    name_loc4 = models.CharField(max_length=100)
    name_loc5 = models.CharField(max_length=100)
    name_loc6 = models.CharField(max_length=100)
    name_loc7 = models.CharField(max_length=100)
    name_loc8 = models.CharField(max_length=100)
    subname_loc1 = models.CharField(max_length=100, blank=True, null=True)
    subname_loc2 = models.CharField(max_length=100, blank=True, null=True)
    subname_loc3 = models.CharField(max_length=100, blank=True, null=True)
    subname_loc4 = models.CharField(max_length=100, blank=True, null=True)
    subname_loc5 = models.CharField(max_length=100, blank=True, null=True)
    subname_loc6 = models.CharField(max_length=100, blank=True, null=True)
    subname_loc7 = models.CharField(max_length=100, blank=True, null=True)
    subname_loc8 = models.CharField(max_length=100, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'locales_creature'


class LocalesGameobject(models.Model):
    entry = models.PositiveIntegerField(primary_key=True)
    name_loc1 = models.CharField(max_length=100)
    name_loc2 = models.CharField(max_length=100)
    name_loc3 = models.CharField(max_length=100)
    name_loc4 = models.CharField(max_length=100)
    name_loc5 = models.CharField(max_length=100)
    name_loc6 = models.CharField(max_length=100)
    name_loc7 = models.CharField(max_length=100)
    name_loc8 = models.CharField(max_length=100)
    castbarcaption_loc1 = models.CharField(max_length=100)
    castbarcaption_loc2 = models.CharField(max_length=100)
    castbarcaption_loc3 = models.CharField(max_length=100)
    castbarcaption_loc4 = models.CharField(max_length=100)
    castbarcaption_loc5 = models.CharField(max_length=100)
    castbarcaption_loc6 = models.CharField(max_length=100)
    castbarcaption_loc7 = models.CharField(max_length=100)
    castbarcaption_loc8 = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'locales_gameobject'


class LocalesGossipMenuOption(models.Model):
    menu_id = models.PositiveSmallIntegerField(primary_key=True)
    id = models.PositiveSmallIntegerField()
    option_text_loc1 = models.TextField(blank=True, null=True)
    option_text_loc2 = models.TextField(blank=True, null=True)
    option_text_loc3 = models.TextField(blank=True, null=True)
    option_text_loc4 = models.TextField(blank=True, null=True)
    option_text_loc5 = models.TextField(blank=True, null=True)
    option_text_loc6 = models.TextField(blank=True, null=True)
    option_text_loc7 = models.TextField(blank=True, null=True)
    option_text_loc8 = models.TextField(blank=True, null=True)
    box_text_loc1 = models.TextField(blank=True, null=True)
    box_text_loc2 = models.TextField(blank=True, null=True)
    box_text_loc3 = models.TextField(blank=True, null=True)
    box_text_loc4 = models.TextField(blank=True, null=True)
    box_text_loc5 = models.TextField(blank=True, null=True)
    box_text_loc6 = models.TextField(blank=True, null=True)
    box_text_loc7 = models.TextField(blank=True, null=True)
    box_text_loc8 = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'locales_gossip_menu_option'
        unique_together = (('menu_id', 'id'),)


class LocalesItem(models.Model):
    entry = models.PositiveIntegerField(primary_key=True)
    name_loc1 = models.CharField(max_length=100)
    name_loc2 = models.CharField(max_length=100)
    name_loc3 = models.CharField(max_length=100)
    name_loc4 = models.CharField(max_length=100)
    name_loc5 = models.CharField(max_length=100)
    name_loc6 = models.CharField(max_length=100)
    name_loc7 = models.CharField(max_length=100)
    name_loc8 = models.CharField(max_length=100)
    description_loc1 = models.CharField(max_length=255, blank=True, null=True)
    description_loc2 = models.CharField(max_length=255, blank=True, null=True)
    description_loc3 = models.CharField(max_length=255, blank=True, null=True)
    description_loc4 = models.CharField(max_length=255, blank=True, null=True)
    description_loc5 = models.CharField(max_length=255, blank=True, null=True)
    description_loc6 = models.CharField(max_length=255, blank=True, null=True)
    description_loc7 = models.CharField(max_length=255, blank=True, null=True)
    description_loc8 = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'locales_item'


class LocalesNpcText(models.Model):
    entry = models.PositiveIntegerField(primary_key=True)
    text0_0_loc1 = models.TextField(db_column='Text0_0_loc1', blank=True, null=True)  # Field name made lowercase.
    text0_0_loc2 = models.TextField(db_column='Text0_0_loc2', blank=True, null=True)  # Field name made lowercase.
    text0_0_loc3 = models.TextField(db_column='Text0_0_loc3', blank=True, null=True)  # Field name made lowercase.
    text0_0_loc4 = models.TextField(db_column='Text0_0_loc4', blank=True, null=True)  # Field name made lowercase.
    text0_0_loc5 = models.TextField(db_column='Text0_0_loc5', blank=True, null=True)  # Field name made lowercase.
    text0_0_loc6 = models.TextField(db_column='Text0_0_loc6', blank=True, null=True)  # Field name made lowercase.
    text0_0_loc7 = models.TextField(db_column='Text0_0_loc7', blank=True, null=True)  # Field name made lowercase.
    text0_0_loc8 = models.TextField(db_column='Text0_0_loc8', blank=True, null=True)  # Field name made lowercase.
    text0_1_loc1 = models.TextField(db_column='Text0_1_loc1', blank=True, null=True)  # Field name made lowercase.
    text0_1_loc2 = models.TextField(db_column='Text0_1_loc2', blank=True, null=True)  # Field name made lowercase.
    text0_1_loc3 = models.TextField(db_column='Text0_1_loc3', blank=True, null=True)  # Field name made lowercase.
    text0_1_loc4 = models.TextField(db_column='Text0_1_loc4', blank=True, null=True)  # Field name made lowercase.
    text0_1_loc5 = models.TextField(db_column='Text0_1_loc5', blank=True, null=True)  # Field name made lowercase.
    text0_1_loc6 = models.TextField(db_column='Text0_1_loc6', blank=True, null=True)  # Field name made lowercase.
    text0_1_loc7 = models.TextField(db_column='Text0_1_loc7', blank=True, null=True)  # Field name made lowercase.
    text0_1_loc8 = models.TextField(db_column='Text0_1_loc8', blank=True, null=True)  # Field name made lowercase.
    text1_0_loc1 = models.TextField(db_column='Text1_0_loc1', blank=True, null=True)  # Field name made lowercase.
    text1_0_loc2 = models.TextField(db_column='Text1_0_loc2', blank=True, null=True)  # Field name made lowercase.
    text1_0_loc3 = models.TextField(db_column='Text1_0_loc3', blank=True, null=True)  # Field name made lowercase.
    text1_0_loc4 = models.TextField(db_column='Text1_0_loc4', blank=True, null=True)  # Field name made lowercase.
    text1_0_loc5 = models.TextField(db_column='Text1_0_loc5', blank=True, null=True)  # Field name made lowercase.
    text1_0_loc6 = models.TextField(db_column='Text1_0_loc6', blank=True, null=True)  # Field name made lowercase.
    text1_0_loc7 = models.TextField(db_column='Text1_0_loc7', blank=True, null=True)  # Field name made lowercase.
    text1_0_loc8 = models.TextField(db_column='Text1_0_loc8', blank=True, null=True)  # Field name made lowercase.
    text1_1_loc1 = models.TextField(db_column='Text1_1_loc1', blank=True, null=True)  # Field name made lowercase.
    text1_1_loc2 = models.TextField(db_column='Text1_1_loc2', blank=True, null=True)  # Field name made lowercase.
    text1_1_loc3 = models.TextField(db_column='Text1_1_loc3', blank=True, null=True)  # Field name made lowercase.
    text1_1_loc4 = models.TextField(db_column='Text1_1_loc4', blank=True, null=True)  # Field name made lowercase.
    text1_1_loc5 = models.TextField(db_column='Text1_1_loc5', blank=True, null=True)  # Field name made lowercase.
    text1_1_loc6 = models.TextField(db_column='Text1_1_loc6', blank=True, null=True)  # Field name made lowercase.
    text1_1_loc7 = models.TextField(db_column='Text1_1_loc7', blank=True, null=True)  # Field name made lowercase.
    text1_1_loc8 = models.TextField(db_column='Text1_1_loc8', blank=True, null=True)  # Field name made lowercase.
    text2_0_loc1 = models.TextField(db_column='Text2_0_loc1', blank=True, null=True)  # Field name made lowercase.
    text2_0_loc2 = models.TextField(db_column='Text2_0_loc2', blank=True, null=True)  # Field name made lowercase.
    text2_0_loc3 = models.TextField(db_column='Text2_0_loc3', blank=True, null=True)  # Field name made lowercase.
    text2_0_loc4 = models.TextField(db_column='Text2_0_loc4', blank=True, null=True)  # Field name made lowercase.
    text2_0_loc5 = models.TextField(db_column='Text2_0_loc5', blank=True, null=True)  # Field name made lowercase.
    text2_0_loc6 = models.TextField(db_column='Text2_0_loc6', blank=True, null=True)  # Field name made lowercase.
    text2_0_loc7 = models.TextField(db_column='Text2_0_loc7', blank=True, null=True)  # Field name made lowercase.
    text2_0_loc8 = models.TextField(db_column='Text2_0_loc8', blank=True, null=True)  # Field name made lowercase.
    text2_1_loc1 = models.TextField(db_column='Text2_1_loc1', blank=True, null=True)  # Field name made lowercase.
    text2_1_loc2 = models.TextField(db_column='Text2_1_loc2', blank=True, null=True)  # Field name made lowercase.
    text2_1_loc3 = models.TextField(db_column='Text2_1_loc3', blank=True, null=True)  # Field name made lowercase.
    text2_1_loc4 = models.TextField(db_column='Text2_1_loc4', blank=True, null=True)  # Field name made lowercase.
    text2_1_loc5 = models.TextField(db_column='Text2_1_loc5', blank=True, null=True)  # Field name made lowercase.
    text2_1_loc6 = models.TextField(db_column='Text2_1_loc6', blank=True, null=True)  # Field name made lowercase.
    text2_1_loc7 = models.TextField(db_column='Text2_1_loc7', blank=True, null=True)  # Field name made lowercase.
    text2_1_loc8 = models.TextField(db_column='Text2_1_loc8', blank=True, null=True)  # Field name made lowercase.
    text3_0_loc1 = models.TextField(db_column='Text3_0_loc1', blank=True, null=True)  # Field name made lowercase.
    text3_0_loc2 = models.TextField(db_column='Text3_0_loc2', blank=True, null=True)  # Field name made lowercase.
    text3_0_loc3 = models.TextField(db_column='Text3_0_loc3', blank=True, null=True)  # Field name made lowercase.
    text3_0_loc4 = models.TextField(db_column='Text3_0_loc4', blank=True, null=True)  # Field name made lowercase.
    text3_0_loc5 = models.TextField(db_column='Text3_0_loc5', blank=True, null=True)  # Field name made lowercase.
    text3_0_loc6 = models.TextField(db_column='Text3_0_loc6', blank=True, null=True)  # Field name made lowercase.
    text3_0_loc7 = models.TextField(db_column='Text3_0_loc7', blank=True, null=True)  # Field name made lowercase.
    text3_0_loc8 = models.TextField(db_column='Text3_0_loc8', blank=True, null=True)  # Field name made lowercase.
    text3_1_loc1 = models.TextField(db_column='Text3_1_loc1', blank=True, null=True)  # Field name made lowercase.
    text3_1_loc2 = models.TextField(db_column='Text3_1_loc2', blank=True, null=True)  # Field name made lowercase.
    text3_1_loc3 = models.TextField(db_column='Text3_1_loc3', blank=True, null=True)  # Field name made lowercase.
    text3_1_loc4 = models.TextField(db_column='Text3_1_loc4', blank=True, null=True)  # Field name made lowercase.
    text3_1_loc5 = models.TextField(db_column='Text3_1_loc5', blank=True, null=True)  # Field name made lowercase.
    text3_1_loc6 = models.TextField(db_column='Text3_1_loc6', blank=True, null=True)  # Field name made lowercase.
    text3_1_loc7 = models.TextField(db_column='Text3_1_loc7', blank=True, null=True)  # Field name made lowercase.
    text3_1_loc8 = models.TextField(db_column='Text3_1_loc8', blank=True, null=True)  # Field name made lowercase.
    text4_0_loc1 = models.TextField(db_column='Text4_0_loc1', blank=True, null=True)  # Field name made lowercase.
    text4_0_loc2 = models.TextField(db_column='Text4_0_loc2', blank=True, null=True)  # Field name made lowercase.
    text4_0_loc3 = models.TextField(db_column='Text4_0_loc3', blank=True, null=True)  # Field name made lowercase.
    text4_0_loc4 = models.TextField(db_column='Text4_0_loc4', blank=True, null=True)  # Field name made lowercase.
    text4_0_loc5 = models.TextField(db_column='Text4_0_loc5', blank=True, null=True)  # Field name made lowercase.
    text4_0_loc6 = models.TextField(db_column='Text4_0_loc6', blank=True, null=True)  # Field name made lowercase.
    text4_0_loc7 = models.TextField(db_column='Text4_0_loc7', blank=True, null=True)  # Field name made lowercase.
    text4_0_loc8 = models.TextField(db_column='Text4_0_loc8', blank=True, null=True)  # Field name made lowercase.
    text4_1_loc1 = models.TextField(db_column='Text4_1_loc1', blank=True, null=True)  # Field name made lowercase.
    text4_1_loc2 = models.TextField(db_column='Text4_1_loc2', blank=True, null=True)  # Field name made lowercase.
    text4_1_loc3 = models.TextField(db_column='Text4_1_loc3', blank=True, null=True)  # Field name made lowercase.
    text4_1_loc4 = models.TextField(db_column='Text4_1_loc4', blank=True, null=True)  # Field name made lowercase.
    text4_1_loc5 = models.TextField(db_column='Text4_1_loc5', blank=True, null=True)  # Field name made lowercase.
    text4_1_loc6 = models.TextField(db_column='Text4_1_loc6', blank=True, null=True)  # Field name made lowercase.
    text4_1_loc7 = models.TextField(db_column='Text4_1_loc7', blank=True, null=True)  # Field name made lowercase.
    text4_1_loc8 = models.TextField(db_column='Text4_1_loc8', blank=True, null=True)  # Field name made lowercase.
    text5_0_loc1 = models.TextField(db_column='Text5_0_loc1', blank=True, null=True)  # Field name made lowercase.
    text5_0_loc2 = models.TextField(db_column='Text5_0_loc2', blank=True, null=True)  # Field name made lowercase.
    text5_0_loc3 = models.TextField(db_column='Text5_0_loc3', blank=True, null=True)  # Field name made lowercase.
    text5_0_loc4 = models.TextField(db_column='Text5_0_loc4', blank=True, null=True)  # Field name made lowercase.
    text5_0_loc5 = models.TextField(db_column='Text5_0_loc5', blank=True, null=True)  # Field name made lowercase.
    text5_0_loc6 = models.TextField(db_column='Text5_0_loc6', blank=True, null=True)  # Field name made lowercase.
    text5_0_loc7 = models.TextField(db_column='Text5_0_loc7', blank=True, null=True)  # Field name made lowercase.
    text5_0_loc8 = models.TextField(db_column='Text5_0_loc8', blank=True, null=True)  # Field name made lowercase.
    text5_1_loc1 = models.TextField(db_column='Text5_1_loc1', blank=True, null=True)  # Field name made lowercase.
    text5_1_loc2 = models.TextField(db_column='Text5_1_loc2', blank=True, null=True)  # Field name made lowercase.
    text5_1_loc3 = models.TextField(db_column='Text5_1_loc3', blank=True, null=True)  # Field name made lowercase.
    text5_1_loc4 = models.TextField(db_column='Text5_1_loc4', blank=True, null=True)  # Field name made lowercase.
    text5_1_loc5 = models.TextField(db_column='Text5_1_loc5', blank=True, null=True)  # Field name made lowercase.
    text5_1_loc6 = models.TextField(db_column='Text5_1_loc6', blank=True, null=True)  # Field name made lowercase.
    text5_1_loc7 = models.TextField(db_column='Text5_1_loc7', blank=True, null=True)  # Field name made lowercase.
    text5_1_loc8 = models.TextField(db_column='Text5_1_loc8', blank=True, null=True)  # Field name made lowercase.
    text6_0_loc1 = models.TextField(db_column='Text6_0_loc1', blank=True, null=True)  # Field name made lowercase.
    text6_0_loc2 = models.TextField(db_column='Text6_0_loc2', blank=True, null=True)  # Field name made lowercase.
    text6_0_loc3 = models.TextField(db_column='Text6_0_loc3', blank=True, null=True)  # Field name made lowercase.
    text6_0_loc4 = models.TextField(db_column='Text6_0_loc4', blank=True, null=True)  # Field name made lowercase.
    text6_0_loc5 = models.TextField(db_column='Text6_0_loc5', blank=True, null=True)  # Field name made lowercase.
    text6_0_loc6 = models.TextField(db_column='Text6_0_loc6', blank=True, null=True)  # Field name made lowercase.
    text6_0_loc7 = models.TextField(db_column='Text6_0_loc7', blank=True, null=True)  # Field name made lowercase.
    text6_0_loc8 = models.TextField(db_column='Text6_0_loc8', blank=True, null=True)  # Field name made lowercase.
    text6_1_loc1 = models.TextField(db_column='Text6_1_loc1', blank=True, null=True)  # Field name made lowercase.
    text6_1_loc2 = models.TextField(db_column='Text6_1_loc2', blank=True, null=True)  # Field name made lowercase.
    text6_1_loc3 = models.TextField(db_column='Text6_1_loc3', blank=True, null=True)  # Field name made lowercase.
    text6_1_loc4 = models.TextField(db_column='Text6_1_loc4', blank=True, null=True)  # Field name made lowercase.
    text6_1_loc5 = models.TextField(db_column='Text6_1_loc5', blank=True, null=True)  # Field name made lowercase.
    text6_1_loc6 = models.TextField(db_column='Text6_1_loc6', blank=True, null=True)  # Field name made lowercase.
    text6_1_loc7 = models.TextField(db_column='Text6_1_loc7', blank=True, null=True)  # Field name made lowercase.
    text6_1_loc8 = models.TextField(db_column='Text6_1_loc8', blank=True, null=True)  # Field name made lowercase.
    text7_0_loc1 = models.TextField(db_column='Text7_0_loc1', blank=True, null=True)  # Field name made lowercase.
    text7_0_loc2 = models.TextField(db_column='Text7_0_loc2', blank=True, null=True)  # Field name made lowercase.
    text7_0_loc3 = models.TextField(db_column='Text7_0_loc3', blank=True, null=True)  # Field name made lowercase.
    text7_0_loc4 = models.TextField(db_column='Text7_0_loc4', blank=True, null=True)  # Field name made lowercase.
    text7_0_loc5 = models.TextField(db_column='Text7_0_loc5', blank=True, null=True)  # Field name made lowercase.
    text7_0_loc6 = models.TextField(db_column='Text7_0_loc6', blank=True, null=True)  # Field name made lowercase.
    text7_0_loc7 = models.TextField(db_column='Text7_0_loc7', blank=True, null=True)  # Field name made lowercase.
    text7_0_loc8 = models.TextField(db_column='Text7_0_loc8', blank=True, null=True)  # Field name made lowercase.
    text7_1_loc1 = models.TextField(db_column='Text7_1_loc1', blank=True, null=True)  # Field name made lowercase.
    text7_1_loc2 = models.TextField(db_column='Text7_1_loc2', blank=True, null=True)  # Field name made lowercase.
    text7_1_loc3 = models.TextField(db_column='Text7_1_loc3', blank=True, null=True)  # Field name made lowercase.
    text7_1_loc4 = models.TextField(db_column='Text7_1_loc4', blank=True, null=True)  # Field name made lowercase.
    text7_1_loc5 = models.TextField(db_column='Text7_1_loc5', blank=True, null=True)  # Field name made lowercase.
    text7_1_loc6 = models.TextField(db_column='Text7_1_loc6', blank=True, null=True)  # Field name made lowercase.
    text7_1_loc7 = models.TextField(db_column='Text7_1_loc7', blank=True, null=True)  # Field name made lowercase.
    text7_1_loc8 = models.TextField(db_column='Text7_1_loc8', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'locales_npc_text'


class LocalesPageText(models.Model):
    entry = models.PositiveIntegerField(primary_key=True)
    text_loc1 = models.TextField(db_column='Text_loc1', blank=True, null=True)  # Field name made lowercase.
    text_loc2 = models.TextField(db_column='Text_loc2', blank=True, null=True)  # Field name made lowercase.
    text_loc3 = models.TextField(db_column='Text_loc3', blank=True, null=True)  # Field name made lowercase.
    text_loc4 = models.TextField(db_column='Text_loc4', blank=True, null=True)  # Field name made lowercase.
    text_loc5 = models.TextField(db_column='Text_loc5', blank=True, null=True)  # Field name made lowercase.
    text_loc6 = models.TextField(db_column='Text_loc6', blank=True, null=True)  # Field name made lowercase.
    text_loc7 = models.TextField(db_column='Text_loc7', blank=True, null=True)  # Field name made lowercase.
    text_loc8 = models.TextField(db_column='Text_loc8', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'locales_page_text'


class LocalesPointsOfInterest(models.Model):
    entry = models.PositiveIntegerField(primary_key=True)
    icon_name_loc1 = models.TextField(blank=True, null=True)
    icon_name_loc2 = models.TextField(blank=True, null=True)
    icon_name_loc3 = models.TextField(blank=True, null=True)
    icon_name_loc4 = models.TextField(blank=True, null=True)
    icon_name_loc5 = models.TextField(blank=True, null=True)
    icon_name_loc6 = models.TextField(blank=True, null=True)
    icon_name_loc7 = models.TextField(blank=True, null=True)
    icon_name_loc8 = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'locales_points_of_interest'


class LocalesQuest(models.Model):
    entry = models.PositiveIntegerField(primary_key=True)
    title_loc1 = models.TextField(db_column='Title_loc1', blank=True, null=True)  # Field name made lowercase.
    title_loc2 = models.TextField(db_column='Title_loc2', blank=True, null=True)  # Field name made lowercase.
    title_loc3 = models.TextField(db_column='Title_loc3', blank=True, null=True)  # Field name made lowercase.
    title_loc4 = models.TextField(db_column='Title_loc4', blank=True, null=True)  # Field name made lowercase.
    title_loc5 = models.TextField(db_column='Title_loc5', blank=True, null=True)  # Field name made lowercase.
    title_loc6 = models.TextField(db_column='Title_loc6', blank=True, null=True)  # Field name made lowercase.
    title_loc7 = models.TextField(db_column='Title_loc7', blank=True, null=True)  # Field name made lowercase.
    title_loc8 = models.TextField(db_column='Title_loc8', blank=True, null=True)  # Field name made lowercase.
    details_loc1 = models.TextField(db_column='Details_loc1', blank=True, null=True)  # Field name made lowercase.
    details_loc2 = models.TextField(db_column='Details_loc2', blank=True, null=True)  # Field name made lowercase.
    details_loc3 = models.TextField(db_column='Details_loc3', blank=True, null=True)  # Field name made lowercase.
    details_loc4 = models.TextField(db_column='Details_loc4', blank=True, null=True)  # Field name made lowercase.
    details_loc5 = models.TextField(db_column='Details_loc5', blank=True, null=True)  # Field name made lowercase.
    details_loc6 = models.TextField(db_column='Details_loc6', blank=True, null=True)  # Field name made lowercase.
    details_loc7 = models.TextField(db_column='Details_loc7', blank=True, null=True)  # Field name made lowercase.
    details_loc8 = models.TextField(db_column='Details_loc8', blank=True, null=True)  # Field name made lowercase.
    objectives_loc1 = models.TextField(db_column='Objectives_loc1', blank=True, null=True)  # Field name made lowercase.
    objectives_loc2 = models.TextField(db_column='Objectives_loc2', blank=True, null=True)  # Field name made lowercase.
    objectives_loc3 = models.TextField(db_column='Objectives_loc3', blank=True, null=True)  # Field name made lowercase.
    objectives_loc4 = models.TextField(db_column='Objectives_loc4', blank=True, null=True)  # Field name made lowercase.
    objectives_loc5 = models.TextField(db_column='Objectives_loc5', blank=True, null=True)  # Field name made lowercase.
    objectives_loc6 = models.TextField(db_column='Objectives_loc6', blank=True, null=True)  # Field name made lowercase.
    objectives_loc7 = models.TextField(db_column='Objectives_loc7', blank=True, null=True)  # Field name made lowercase.
    objectives_loc8 = models.TextField(db_column='Objectives_loc8', blank=True, null=True)  # Field name made lowercase.
    offerrewardtext_loc1 = models.TextField(db_column='OfferRewardText_loc1', blank=True, null=True)  # Field name made lowercase.
    offerrewardtext_loc2 = models.TextField(db_column='OfferRewardText_loc2', blank=True, null=True)  # Field name made lowercase.
    offerrewardtext_loc3 = models.TextField(db_column='OfferRewardText_loc3', blank=True, null=True)  # Field name made lowercase.
    offerrewardtext_loc4 = models.TextField(db_column='OfferRewardText_loc4', blank=True, null=True)  # Field name made lowercase.
    offerrewardtext_loc5 = models.TextField(db_column='OfferRewardText_loc5', blank=True, null=True)  # Field name made lowercase.
    offerrewardtext_loc6 = models.TextField(db_column='OfferRewardText_loc6', blank=True, null=True)  # Field name made lowercase.
    offerrewardtext_loc7 = models.TextField(db_column='OfferRewardText_loc7', blank=True, null=True)  # Field name made lowercase.
    offerrewardtext_loc8 = models.TextField(db_column='OfferRewardText_loc8', blank=True, null=True)  # Field name made lowercase.
    requestitemstext_loc1 = models.TextField(db_column='RequestItemsText_loc1', blank=True, null=True)  # Field name made lowercase.
    requestitemstext_loc2 = models.TextField(db_column='RequestItemsText_loc2', blank=True, null=True)  # Field name made lowercase.
    requestitemstext_loc3 = models.TextField(db_column='RequestItemsText_loc3', blank=True, null=True)  # Field name made lowercase.
    requestitemstext_loc4 = models.TextField(db_column='RequestItemsText_loc4', blank=True, null=True)  # Field name made lowercase.
    requestitemstext_loc5 = models.TextField(db_column='RequestItemsText_loc5', blank=True, null=True)  # Field name made lowercase.
    requestitemstext_loc6 = models.TextField(db_column='RequestItemsText_loc6', blank=True, null=True)  # Field name made lowercase.
    requestitemstext_loc7 = models.TextField(db_column='RequestItemsText_loc7', blank=True, null=True)  # Field name made lowercase.
    requestitemstext_loc8 = models.TextField(db_column='RequestItemsText_loc8', blank=True, null=True)  # Field name made lowercase.
    endtext_loc1 = models.TextField(db_column='EndText_loc1', blank=True, null=True)  # Field name made lowercase.
    endtext_loc2 = models.TextField(db_column='EndText_loc2', blank=True, null=True)  # Field name made lowercase.
    endtext_loc3 = models.TextField(db_column='EndText_loc3', blank=True, null=True)  # Field name made lowercase.
    endtext_loc4 = models.TextField(db_column='EndText_loc4', blank=True, null=True)  # Field name made lowercase.
    endtext_loc5 = models.TextField(db_column='EndText_loc5', blank=True, null=True)  # Field name made lowercase.
    endtext_loc6 = models.TextField(db_column='EndText_loc6', blank=True, null=True)  # Field name made lowercase.
    endtext_loc7 = models.TextField(db_column='EndText_loc7', blank=True, null=True)  # Field name made lowercase.
    endtext_loc8 = models.TextField(db_column='EndText_loc8', blank=True, null=True)  # Field name made lowercase.
    completedtext_loc1 = models.TextField(db_column='CompletedText_loc1', blank=True, null=True)  # Field name made lowercase.
    completedtext_loc2 = models.TextField(db_column='CompletedText_loc2', blank=True, null=True)  # Field name made lowercase.
    completedtext_loc3 = models.TextField(db_column='CompletedText_loc3', blank=True, null=True)  # Field name made lowercase.
    completedtext_loc4 = models.TextField(db_column='CompletedText_loc4', blank=True, null=True)  # Field name made lowercase.
    completedtext_loc5 = models.TextField(db_column='CompletedText_loc5', blank=True, null=True)  # Field name made lowercase.
    completedtext_loc6 = models.TextField(db_column='CompletedText_loc6', blank=True, null=True)  # Field name made lowercase.
    completedtext_loc7 = models.TextField(db_column='CompletedText_loc7', blank=True, null=True)  # Field name made lowercase.
    completedtext_loc8 = models.TextField(db_column='CompletedText_loc8', blank=True, null=True)  # Field name made lowercase.
    objectivetext1_loc1 = models.TextField(db_column='ObjectiveText1_loc1', blank=True, null=True)  # Field name made lowercase.
    objectivetext1_loc2 = models.TextField(db_column='ObjectiveText1_loc2', blank=True, null=True)  # Field name made lowercase.
    objectivetext1_loc3 = models.TextField(db_column='ObjectiveText1_loc3', blank=True, null=True)  # Field name made lowercase.
    objectivetext1_loc4 = models.TextField(db_column='ObjectiveText1_loc4', blank=True, null=True)  # Field name made lowercase.
    objectivetext1_loc5 = models.TextField(db_column='ObjectiveText1_loc5', blank=True, null=True)  # Field name made lowercase.
    objectivetext1_loc6 = models.TextField(db_column='ObjectiveText1_loc6', blank=True, null=True)  # Field name made lowercase.
    objectivetext1_loc7 = models.TextField(db_column='ObjectiveText1_loc7', blank=True, null=True)  # Field name made lowercase.
    objectivetext1_loc8 = models.TextField(db_column='ObjectiveText1_loc8', blank=True, null=True)  # Field name made lowercase.
    objectivetext2_loc1 = models.TextField(db_column='ObjectiveText2_loc1', blank=True, null=True)  # Field name made lowercase.
    objectivetext2_loc2 = models.TextField(db_column='ObjectiveText2_loc2', blank=True, null=True)  # Field name made lowercase.
    objectivetext2_loc3 = models.TextField(db_column='ObjectiveText2_loc3', blank=True, null=True)  # Field name made lowercase.
    objectivetext2_loc4 = models.TextField(db_column='ObjectiveText2_loc4', blank=True, null=True)  # Field name made lowercase.
    objectivetext2_loc5 = models.TextField(db_column='ObjectiveText2_loc5', blank=True, null=True)  # Field name made lowercase.
    objectivetext2_loc6 = models.TextField(db_column='ObjectiveText2_loc6', blank=True, null=True)  # Field name made lowercase.
    objectivetext2_loc7 = models.TextField(db_column='ObjectiveText2_loc7', blank=True, null=True)  # Field name made lowercase.
    objectivetext2_loc8 = models.TextField(db_column='ObjectiveText2_loc8', blank=True, null=True)  # Field name made lowercase.
    objectivetext3_loc1 = models.TextField(db_column='ObjectiveText3_loc1', blank=True, null=True)  # Field name made lowercase.
    objectivetext3_loc2 = models.TextField(db_column='ObjectiveText3_loc2', blank=True, null=True)  # Field name made lowercase.
    objectivetext3_loc3 = models.TextField(db_column='ObjectiveText3_loc3', blank=True, null=True)  # Field name made lowercase.
    objectivetext3_loc4 = models.TextField(db_column='ObjectiveText3_loc4', blank=True, null=True)  # Field name made lowercase.
    objectivetext3_loc5 = models.TextField(db_column='ObjectiveText3_loc5', blank=True, null=True)  # Field name made lowercase.
    objectivetext3_loc6 = models.TextField(db_column='ObjectiveText3_loc6', blank=True, null=True)  # Field name made lowercase.
    objectivetext3_loc7 = models.TextField(db_column='ObjectiveText3_loc7', blank=True, null=True)  # Field name made lowercase.
    objectivetext3_loc8 = models.TextField(db_column='ObjectiveText3_loc8', blank=True, null=True)  # Field name made lowercase.
    objectivetext4_loc1 = models.TextField(db_column='ObjectiveText4_loc1', blank=True, null=True)  # Field name made lowercase.
    objectivetext4_loc2 = models.TextField(db_column='ObjectiveText4_loc2', blank=True, null=True)  # Field name made lowercase.
    objectivetext4_loc3 = models.TextField(db_column='ObjectiveText4_loc3', blank=True, null=True)  # Field name made lowercase.
    objectivetext4_loc4 = models.TextField(db_column='ObjectiveText4_loc4', blank=True, null=True)  # Field name made lowercase.
    objectivetext4_loc5 = models.TextField(db_column='ObjectiveText4_loc5', blank=True, null=True)  # Field name made lowercase.
    objectivetext4_loc6 = models.TextField(db_column='ObjectiveText4_loc6', blank=True, null=True)  # Field name made lowercase.
    objectivetext4_loc7 = models.TextField(db_column='ObjectiveText4_loc7', blank=True, null=True)  # Field name made lowercase.
    objectivetext4_loc8 = models.TextField(db_column='ObjectiveText4_loc8', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'locales_quest'


class LocalesQuestgiverGreeting(models.Model):
    entry = models.PositiveIntegerField(db_column='Entry', primary_key=True)  # Field name made lowercase.
    type = models.PositiveIntegerField(db_column='Type')  # Field name made lowercase.
    text_loc1 = models.TextField(db_column='Text_loc1', blank=True, null=True)  # Field name made lowercase.
    text_loc2 = models.TextField(db_column='Text_loc2', blank=True, null=True)  # Field name made lowercase.
    text_loc3 = models.TextField(db_column='Text_loc3', blank=True, null=True)  # Field name made lowercase.
    text_loc4 = models.TextField(db_column='Text_loc4', blank=True, null=True)  # Field name made lowercase.
    text_loc5 = models.TextField(db_column='Text_loc5', blank=True, null=True)  # Field name made lowercase.
    text_loc6 = models.TextField(db_column='Text_loc6', blank=True, null=True)  # Field name made lowercase.
    text_loc7 = models.TextField(db_column='Text_loc7', blank=True, null=True)  # Field name made lowercase.
    text_loc8 = models.TextField(db_column='Text_loc8', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'locales_questgiver_greeting'
        unique_together = (('entry', 'type'),)


class LocalesTrainerGreeting(models.Model):
    entry = models.PositiveIntegerField(db_column='Entry', primary_key=True)  # Field name made lowercase.
    text_loc1 = models.TextField(db_column='Text_loc1', blank=True, null=True)  # Field name made lowercase.
    text_loc2 = models.TextField(db_column='Text_loc2', blank=True, null=True)  # Field name made lowercase.
    text_loc3 = models.TextField(db_column='Text_loc3', blank=True, null=True)  # Field name made lowercase.
    text_loc4 = models.TextField(db_column='Text_loc4', blank=True, null=True)  # Field name made lowercase.
    text_loc5 = models.TextField(db_column='Text_loc5', blank=True, null=True)  # Field name made lowercase.
    text_loc6 = models.TextField(db_column='Text_loc6', blank=True, null=True)  # Field name made lowercase.
    text_loc7 = models.TextField(db_column='Text_loc7', blank=True, null=True)  # Field name made lowercase.
    text_loc8 = models.TextField(db_column='Text_loc8', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'locales_trainer_greeting'


class MailLevelReward(models.Model):
    level = models.PositiveIntegerField(primary_key=True)
    racemask = models.PositiveIntegerField(db_column='raceMask')  # Field name made lowercase.
    mailtemplateid = models.PositiveIntegerField(db_column='mailTemplateId')  # Field name made lowercase.
    senderentry = models.PositiveIntegerField(db_column='senderEntry')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'mail_level_reward'
        unique_together = (('level', 'racemask'),)


class MailLootTemplate(models.Model):
    entry = models.PositiveIntegerField(primary_key=True)
    item = models.PositiveIntegerField()
    chanceorquestchance = models.FloatField(db_column='ChanceOrQuestChance')  # Field name made lowercase.
    groupid = models.PositiveIntegerField()
    mincountorref = models.IntegerField(db_column='mincountOrRef')  # Field name made lowercase.
    maxcount = models.PositiveIntegerField()
    condition_id = models.PositiveIntegerField()
    comments = models.CharField(max_length=300, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'mail_loot_template'
        unique_together = (('entry', 'item'),)


class MangosString(models.Model):
    entry = models.PositiveIntegerField(primary_key=True)
    content_default = models.TextField()
    content_loc1 = models.TextField(blank=True, null=True)
    content_loc2 = models.TextField(blank=True, null=True)
    content_loc3 = models.TextField(blank=True, null=True)
    content_loc4 = models.TextField(blank=True, null=True)
    content_loc5 = models.TextField(blank=True, null=True)
    content_loc6 = models.TextField(blank=True, null=True)
    content_loc7 = models.TextField(blank=True, null=True)
    content_loc8 = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'mangos_string'


class NpcGossip(models.Model):
    npc_guid = models.PositiveIntegerField(primary_key=True)
    textid = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'npc_gossip'


class NpcSpellclickSpells(models.Model):
    npc_entry = models.PositiveIntegerField()
    spell_id = models.PositiveIntegerField()
    quest_start = models.PositiveIntegerField()
    quest_start_active = models.PositiveIntegerField()
    quest_end = models.PositiveIntegerField()
    cast_flags = models.PositiveIntegerField()
    condition_id = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'npc_spellclick_spells'


class NpcText(models.Model):
    id = models.PositiveIntegerField(db_column='ID', primary_key=True)  # Field name made lowercase.
    text0_0 = models.TextField(blank=True, null=True)
    text0_1 = models.TextField(blank=True, null=True)
    lang0 = models.PositiveIntegerField()
    prob0 = models.FloatField()
    em0_0 = models.PositiveSmallIntegerField()
    em0_1 = models.PositiveSmallIntegerField()
    em0_2 = models.PositiveSmallIntegerField()
    em0_3 = models.PositiveSmallIntegerField()
    em0_4 = models.PositiveSmallIntegerField()
    em0_5 = models.PositiveSmallIntegerField()
    text1_0 = models.TextField(blank=True, null=True)
    text1_1 = models.TextField(blank=True, null=True)
    lang1 = models.PositiveIntegerField()
    prob1 = models.FloatField()
    em1_0 = models.PositiveSmallIntegerField()
    em1_1 = models.PositiveSmallIntegerField()
    em1_2 = models.PositiveSmallIntegerField()
    em1_3 = models.PositiveSmallIntegerField()
    em1_4 = models.PositiveSmallIntegerField()
    em1_5 = models.PositiveSmallIntegerField()
    text2_0 = models.TextField(blank=True, null=True)
    text2_1 = models.TextField(blank=True, null=True)
    lang2 = models.PositiveIntegerField()
    prob2 = models.FloatField()
    em2_0 = models.PositiveSmallIntegerField()
    em2_1 = models.PositiveSmallIntegerField()
    em2_2 = models.PositiveSmallIntegerField()
    em2_3 = models.PositiveSmallIntegerField()
    em2_4 = models.PositiveSmallIntegerField()
    em2_5 = models.PositiveSmallIntegerField()
    text3_0 = models.TextField(blank=True, null=True)
    text3_1 = models.TextField(blank=True, null=True)
    lang3 = models.PositiveIntegerField()
    prob3 = models.FloatField()
    em3_0 = models.PositiveSmallIntegerField()
    em3_1 = models.PositiveSmallIntegerField()
    em3_2 = models.PositiveSmallIntegerField()
    em3_3 = models.PositiveSmallIntegerField()
    em3_4 = models.PositiveSmallIntegerField()
    em3_5 = models.PositiveSmallIntegerField()
    text4_0 = models.TextField(blank=True, null=True)
    text4_1 = models.TextField(blank=True, null=True)
    lang4 = models.PositiveIntegerField()
    prob4 = models.FloatField()
    em4_0 = models.PositiveSmallIntegerField()
    em4_1 = models.PositiveSmallIntegerField()
    em4_2 = models.PositiveSmallIntegerField()
    em4_3 = models.PositiveSmallIntegerField()
    em4_4 = models.PositiveSmallIntegerField()
    em4_5 = models.PositiveSmallIntegerField()
    text5_0 = models.TextField(blank=True, null=True)
    text5_1 = models.TextField(blank=True, null=True)
    lang5 = models.PositiveIntegerField()
    prob5 = models.FloatField()
    em5_0 = models.PositiveSmallIntegerField()
    em5_1 = models.PositiveSmallIntegerField()
    em5_2 = models.PositiveSmallIntegerField()
    em5_3 = models.PositiveSmallIntegerField()
    em5_4 = models.PositiveSmallIntegerField()
    em5_5 = models.PositiveSmallIntegerField()
    text6_0 = models.TextField(blank=True, null=True)
    text6_1 = models.TextField(blank=True, null=True)
    lang6 = models.PositiveIntegerField()
    prob6 = models.FloatField()
    em6_0 = models.PositiveSmallIntegerField()
    em6_1 = models.PositiveSmallIntegerField()
    em6_2 = models.PositiveSmallIntegerField()
    em6_3 = models.PositiveSmallIntegerField()
    em6_4 = models.PositiveSmallIntegerField()
    em6_5 = models.PositiveSmallIntegerField()
    text7_0 = models.TextField(blank=True, null=True)
    text7_1 = models.TextField(blank=True, null=True)
    lang7 = models.PositiveIntegerField()
    prob7 = models.FloatField()
    em7_0 = models.PositiveSmallIntegerField()
    em7_1 = models.PositiveSmallIntegerField()
    em7_2 = models.PositiveSmallIntegerField()
    em7_3 = models.PositiveSmallIntegerField()
    em7_4 = models.PositiveSmallIntegerField()
    em7_5 = models.PositiveSmallIntegerField()

    class Meta:
        managed = False
        db_table = 'npc_text'


class NpcTextBroadcastText(models.Model):
    id = models.PositiveIntegerField(db_column='Id', primary_key=True)  # Field name made lowercase.
    prob0 = models.FloatField(db_column='Prob0')  # Field name made lowercase.
    prob1 = models.FloatField(db_column='Prob1')  # Field name made lowercase.
    prob2 = models.FloatField(db_column='Prob2')  # Field name made lowercase.
    prob3 = models.FloatField(db_column='Prob3')  # Field name made lowercase.
    prob4 = models.FloatField(db_column='Prob4')  # Field name made lowercase.
    prob5 = models.FloatField(db_column='Prob5')  # Field name made lowercase.
    prob6 = models.FloatField(db_column='Prob6')  # Field name made lowercase.
    prob7 = models.FloatField(db_column='Prob7')  # Field name made lowercase.
    broadcasttextid0 = models.IntegerField(db_column='BroadcastTextId0')  # Field name made lowercase.
    broadcasttextid1 = models.IntegerField(db_column='BroadcastTextId1')  # Field name made lowercase.
    broadcasttextid2 = models.IntegerField(db_column='BroadcastTextId2')  # Field name made lowercase.
    broadcasttextid3 = models.IntegerField(db_column='BroadcastTextId3')  # Field name made lowercase.
    broadcasttextid4 = models.IntegerField(db_column='BroadcastTextId4')  # Field name made lowercase.
    broadcasttextid5 = models.IntegerField(db_column='BroadcastTextId5')  # Field name made lowercase.
    broadcasttextid6 = models.IntegerField(db_column='BroadcastTextId6')  # Field name made lowercase.
    broadcasttextid7 = models.IntegerField(db_column='BroadcastTextId7')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'npc_text_broadcast_text'


class NpcTrainer(models.Model):
    entry = models.PositiveIntegerField()
    spell = models.PositiveIntegerField()
    spellcost = models.PositiveIntegerField()
    reqskill = models.PositiveSmallIntegerField()
    reqskillvalue = models.PositiveSmallIntegerField()
    reqlevel = models.PositiveIntegerField()
    condition_id = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'npc_trainer'
        unique_together = (('entry', 'spell'),)


class NpcTrainerTemplate(models.Model):
    entry = models.PositiveIntegerField()
    spell = models.PositiveIntegerField()
    spellcost = models.PositiveIntegerField()
    reqskill = models.PositiveSmallIntegerField()
    reqskillvalue = models.PositiveSmallIntegerField()
    reqlevel = models.PositiveIntegerField()
    condition_id = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'npc_trainer_template'
        unique_together = (('entry', 'spell'),)


class NpcVendor(models.Model):
    entry = models.PositiveIntegerField(primary_key=True)
    item = models.PositiveIntegerField()
    maxcount = models.PositiveIntegerField()
    incrtime = models.PositiveIntegerField()
    slot = models.PositiveIntegerField()
    condition_id = models.PositiveIntegerField()
    comments = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'npc_vendor'
        unique_together = (('entry', 'item'),)


class NpcVendorTemplate(models.Model):
    entry = models.PositiveIntegerField(primary_key=True)
    item = models.PositiveIntegerField()
    maxcount = models.PositiveIntegerField()
    incrtime = models.PositiveIntegerField()
    slot = models.PositiveIntegerField()
    condition_id = models.PositiveIntegerField()
    comments = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'npc_vendor_template'
        unique_together = (('entry', 'item'),)


class PageText(models.Model):
    entry = models.PositiveIntegerField(primary_key=True)
    text = models.TextField()
    next_page = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'page_text'


class PetFamilystats(models.Model):
    family = models.PositiveIntegerField(primary_key=True)
    healthmodifier = models.FloatField(db_column='healthModifier')  # Field name made lowercase.
    damagemodifier = models.FloatField(db_column='damageModifier')  # Field name made lowercase.
    armormodifier = models.FloatField(db_column='armorModifier')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'pet_familystats'


class PetLevelstats(models.Model):
    creature_entry = models.PositiveIntegerField(primary_key=True)
    level = models.PositiveIntegerField()
    hp = models.PositiveSmallIntegerField()
    mana = models.PositiveSmallIntegerField()
    armor = models.PositiveIntegerField()
    str = models.PositiveSmallIntegerField()
    agi = models.PositiveSmallIntegerField()
    sta = models.PositiveSmallIntegerField()
    inte = models.PositiveSmallIntegerField()
    spi = models.PositiveSmallIntegerField()

    class Meta:
        managed = False
        db_table = 'pet_levelstats'
        unique_together = (('creature_entry', 'level'),)


class PetLevelstatsCopy(models.Model):
    creature_entry = models.PositiveIntegerField(primary_key=True)
    level = models.PositiveIntegerField()
    hp = models.PositiveSmallIntegerField()
    mana = models.PositiveSmallIntegerField()
    armor = models.PositiveIntegerField()
    str = models.PositiveSmallIntegerField()
    agi = models.PositiveSmallIntegerField()
    sta = models.PositiveSmallIntegerField()
    inte = models.PositiveSmallIntegerField()
    spi = models.PositiveSmallIntegerField()

    class Meta:
        managed = False
        db_table = 'pet_levelstats_copy'
        unique_together = (('creature_entry', 'level'),)


class PetNameGeneration(models.Model):
    word = models.TextField()
    entry = models.PositiveIntegerField()
    half = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'pet_name_generation'


class PetcreateinfoSpell(models.Model):
    entry = models.PositiveIntegerField(primary_key=True)
    spell1 = models.PositiveIntegerField(db_column='Spell1')  # Field name made lowercase.
    spell2 = models.PositiveIntegerField(db_column='Spell2')  # Field name made lowercase.
    spell3 = models.PositiveIntegerField(db_column='Spell3')  # Field name made lowercase.
    spell4 = models.PositiveIntegerField(db_column='Spell4')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'petcreateinfo_spell'


class PickpocketingLootTemplate(models.Model):
    entry = models.PositiveIntegerField(primary_key=True)
    item = models.PositiveIntegerField()
    chanceorquestchance = models.FloatField(db_column='ChanceOrQuestChance')  # Field name made lowercase.
    groupid = models.PositiveIntegerField()
    mincountorref = models.IntegerField(db_column='mincountOrRef')  # Field name made lowercase.
    maxcount = models.PositiveIntegerField()
    condition_id = models.PositiveIntegerField()
    comments = models.CharField(max_length=300, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'pickpocketing_loot_template'
        unique_together = (('entry', 'item'),)


class PlayerClasslevelstats(models.Model):
    class_field = models.PositiveIntegerField(db_column='class', primary_key=True)  # Field renamed because it was a Python reserved word.
    level = models.PositiveIntegerField()
    basehp = models.PositiveSmallIntegerField()
    basemana = models.PositiveSmallIntegerField()

    class Meta:
        managed = False
        db_table = 'player_classlevelstats'
        unique_together = (('class_field', 'level'),)


class PlayerLevelstats(models.Model):
    race = models.PositiveIntegerField(primary_key=True)
    class_field = models.PositiveIntegerField(db_column='class')  # Field renamed because it was a Python reserved word.
    level = models.PositiveIntegerField()
    str = models.PositiveIntegerField()
    agi = models.PositiveIntegerField()
    sta = models.PositiveIntegerField()
    inte = models.PositiveIntegerField()
    spi = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'player_levelstats'
        unique_together = (('race', 'class_field', 'level'),)


class PlayerXpForLevel(models.Model):
    lvl = models.PositiveIntegerField(primary_key=True)
    xp_for_next_level = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'player_xp_for_level'


class Playercreateinfo(models.Model):
    race = models.PositiveIntegerField(primary_key=True)
    class_field = models.PositiveIntegerField(db_column='class')  # Field renamed because it was a Python reserved word.
    map = models.PositiveSmallIntegerField()
    zone = models.PositiveIntegerField()
    position_x = models.FloatField()
    position_y = models.FloatField()
    position_z = models.FloatField()
    orientation = models.FloatField()

    class Meta:
        managed = False
        db_table = 'playercreateinfo'
        unique_together = (('race', 'class_field'),)


class PlayercreateinfoAction(models.Model):
    race = models.PositiveIntegerField(primary_key=True)
    class_field = models.PositiveIntegerField(db_column='class')  # Field renamed because it was a Python reserved word.
    button = models.PositiveSmallIntegerField()
    action = models.PositiveIntegerField()
    type = models.PositiveSmallIntegerField()

    class Meta:
        managed = False
        db_table = 'playercreateinfo_action'
        unique_together = (('race', 'class_field', 'button'),)


class PlayercreateinfoItem(models.Model):
    race = models.PositiveIntegerField()
    class_field = models.PositiveIntegerField(db_column='class')  # Field renamed because it was a Python reserved word.
    itemid = models.PositiveIntegerField()
    amount = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'playercreateinfo_item'


class PlayercreateinfoSkills(models.Model):
    racemask = models.PositiveIntegerField(db_column='raceMask', primary_key=True)  # Field name made lowercase.
    classmask = models.PositiveIntegerField(db_column='classMask')  # Field name made lowercase.
    skill = models.PositiveSmallIntegerField()
    step = models.PositiveSmallIntegerField()
    note = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'playercreateinfo_skills'
        unique_together = (('racemask', 'classmask', 'skill'),)


class PlayercreateinfoSpell(models.Model):
    race = models.PositiveIntegerField(primary_key=True)
    class_field = models.PositiveIntegerField(db_column='class')  # Field renamed because it was a Python reserved word.
    spell = models.PositiveIntegerField(db_column='Spell')  # Field name made lowercase.
    note = models.CharField(db_column='Note', max_length=255, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'playercreateinfo_spell'
        unique_together = (('race', 'class_field', 'spell'),)


class PointsOfInterest(models.Model):
    entry = models.PositiveIntegerField(primary_key=True)
    x = models.FloatField()
    y = models.FloatField()
    icon = models.PositiveIntegerField()
    flags = models.PositiveIntegerField()
    data = models.PositiveIntegerField()
    icon_name = models.TextField()

    class Meta:
        managed = False
        db_table = 'points_of_interest'


class PoolCreature(models.Model):
    guid = models.PositiveIntegerField(primary_key=True)
    pool_entry = models.PositiveIntegerField()
    chance = models.FloatField()
    description = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'pool_creature'


class PoolCreatureTemplate(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    pool_entry = models.PositiveIntegerField()
    chance = models.FloatField()
    description = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'pool_creature_template'


class PoolGameobject(models.Model):
    guid = models.PositiveIntegerField(primary_key=True)
    pool_entry = models.PositiveIntegerField()
    chance = models.FloatField()
    description = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'pool_gameobject'


class PoolGameobjectTemplate(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    pool_entry = models.PositiveIntegerField()
    chance = models.FloatField()
    description = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'pool_gameobject_template'


class PoolPool(models.Model):
    pool_id = models.PositiveIntegerField(primary_key=True)
    mother_pool = models.PositiveIntegerField()
    chance = models.FloatField()
    description = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'pool_pool'


class PoolTemplate(models.Model):
    entry = models.PositiveIntegerField(primary_key=True)
    max_limit = models.PositiveIntegerField()
    description = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'pool_template'


class ProspectingLootTemplate(models.Model):
    entry = models.PositiveIntegerField(primary_key=True)
    item = models.PositiveIntegerField()
    chanceorquestchance = models.FloatField(db_column='ChanceOrQuestChance')  # Field name made lowercase.
    groupid = models.PositiveIntegerField()
    mincountorref = models.IntegerField(db_column='mincountOrRef')  # Field name made lowercase.
    maxcount = models.PositiveIntegerField()
    condition_id = models.PositiveIntegerField()
    comments = models.CharField(max_length=300, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'prospecting_loot_template'
        unique_together = (('entry', 'item'),)


class QuestPoi(models.Model):
    questid = models.PositiveIntegerField(db_column='questId', primary_key=True)  # Field name made lowercase.
    poiid = models.PositiveIntegerField(db_column='poiId')  # Field name made lowercase.
    objindex = models.IntegerField(db_column='objIndex')  # Field name made lowercase.
    mapid = models.PositiveIntegerField(db_column='mapId')  # Field name made lowercase.
    mapareaid = models.PositiveIntegerField(db_column='mapAreaId')  # Field name made lowercase.
    floorid = models.PositiveIntegerField(db_column='floorId')  # Field name made lowercase.
    unk3 = models.PositiveIntegerField()
    unk4 = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'quest_poi'
        unique_together = (('questid', 'poiid'),)


class QuestPoiPoints(models.Model):
    questid = models.PositiveIntegerField(db_column='questId')  # Field name made lowercase.
    poiid = models.PositiveIntegerField(db_column='poiId')  # Field name made lowercase.
    x = models.IntegerField()
    y = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'quest_poi_points'


class QuestTemplate(models.Model):
    entry = models.PositiveIntegerField(primary_key=True)
    method = models.PositiveIntegerField(db_column='Method')  # Field name made lowercase.
    zoneorsort = models.SmallIntegerField(db_column='ZoneOrSort')  # Field name made lowercase.
    minlevel = models.PositiveIntegerField(db_column='MinLevel')  # Field name made lowercase.
    maxlevel = models.PositiveIntegerField(db_column='MaxLevel')  # Field name made lowercase.
    questlevel = models.SmallIntegerField(db_column='QuestLevel')  # Field name made lowercase.
    type = models.PositiveSmallIntegerField(db_column='Type')  # Field name made lowercase.
    requiredclasses = models.PositiveSmallIntegerField(db_column='RequiredClasses')  # Field name made lowercase.
    requiredraces = models.PositiveSmallIntegerField(db_column='RequiredRaces')  # Field name made lowercase.
    requiredskill = models.PositiveSmallIntegerField(db_column='RequiredSkill')  # Field name made lowercase.
    requiredskillvalue = models.PositiveSmallIntegerField(db_column='RequiredSkillValue')  # Field name made lowercase.
    requiredcondition = models.PositiveIntegerField(db_column='RequiredCondition')  # Field name made lowercase.
    repobjectivefaction = models.PositiveSmallIntegerField(db_column='RepObjectiveFaction')  # Field name made lowercase.
    repobjectivevalue = models.IntegerField(db_column='RepObjectiveValue')  # Field name made lowercase.
    requiredminrepfaction = models.PositiveSmallIntegerField(db_column='RequiredMinRepFaction')  # Field name made lowercase.
    requiredminrepvalue = models.IntegerField(db_column='RequiredMinRepValue')  # Field name made lowercase.
    requiredmaxrepfaction = models.PositiveSmallIntegerField(db_column='RequiredMaxRepFaction')  # Field name made lowercase.
    requiredmaxrepvalue = models.IntegerField(db_column='RequiredMaxRepValue')  # Field name made lowercase.
    suggestedplayers = models.PositiveIntegerField(db_column='SuggestedPlayers')  # Field name made lowercase.
    limittime = models.PositiveIntegerField(db_column='LimitTime')  # Field name made lowercase.
    questflags = models.PositiveSmallIntegerField(db_column='QuestFlags')  # Field name made lowercase.
    specialflags = models.PositiveIntegerField(db_column='SpecialFlags')  # Field name made lowercase.
    prevquestid = models.IntegerField(db_column='PrevQuestId')  # Field name made lowercase.
    nextquestid = models.IntegerField(db_column='NextQuestId')  # Field name made lowercase.
    exclusivegroup = models.IntegerField(db_column='ExclusiveGroup')  # Field name made lowercase.
    breadcrumbforquestid = models.PositiveIntegerField(db_column='BreadcrumbForQuestId')  # Field name made lowercase.
    nextquestinchain = models.PositiveIntegerField(db_column='NextQuestInChain')  # Field name made lowercase.
    srcitemid = models.PositiveIntegerField(db_column='SrcItemId')  # Field name made lowercase.
    srcitemcount = models.PositiveIntegerField(db_column='SrcItemCount')  # Field name made lowercase.
    srcspell = models.PositiveIntegerField(db_column='SrcSpell')  # Field name made lowercase.
    title = models.TextField(db_column='Title', blank=True, null=True)  # Field name made lowercase.
    details = models.TextField(db_column='Details', blank=True, null=True)  # Field name made lowercase.
    objectives = models.TextField(db_column='Objectives', blank=True, null=True)  # Field name made lowercase.
    offerrewardtext = models.TextField(db_column='OfferRewardText', blank=True, null=True)  # Field name made lowercase.
    requestitemstext = models.TextField(db_column='RequestItemsText', blank=True, null=True)  # Field name made lowercase.
    endtext = models.TextField(db_column='EndText', blank=True, null=True)  # Field name made lowercase.
    objectivetext1 = models.TextField(db_column='ObjectiveText1', blank=True, null=True)  # Field name made lowercase.
    objectivetext2 = models.TextField(db_column='ObjectiveText2', blank=True, null=True)  # Field name made lowercase.
    objectivetext3 = models.TextField(db_column='ObjectiveText3', blank=True, null=True)  # Field name made lowercase.
    objectivetext4 = models.TextField(db_column='ObjectiveText4', blank=True, null=True)  # Field name made lowercase.
    reqitemid1 = models.PositiveIntegerField(db_column='ReqItemId1')  # Field name made lowercase.
    reqitemid2 = models.PositiveIntegerField(db_column='ReqItemId2')  # Field name made lowercase.
    reqitemid3 = models.PositiveIntegerField(db_column='ReqItemId3')  # Field name made lowercase.
    reqitemid4 = models.PositiveIntegerField(db_column='ReqItemId4')  # Field name made lowercase.
    reqitemcount1 = models.PositiveSmallIntegerField(db_column='ReqItemCount1')  # Field name made lowercase.
    reqitemcount2 = models.PositiveSmallIntegerField(db_column='ReqItemCount2')  # Field name made lowercase.
    reqitemcount3 = models.PositiveSmallIntegerField(db_column='ReqItemCount3')  # Field name made lowercase.
    reqitemcount4 = models.PositiveSmallIntegerField(db_column='ReqItemCount4')  # Field name made lowercase.
    reqsourceid1 = models.PositiveIntegerField(db_column='ReqSourceId1')  # Field name made lowercase.
    reqsourceid2 = models.PositiveIntegerField(db_column='ReqSourceId2')  # Field name made lowercase.
    reqsourceid3 = models.PositiveIntegerField(db_column='ReqSourceId3')  # Field name made lowercase.
    reqsourceid4 = models.PositiveIntegerField(db_column='ReqSourceId4')  # Field name made lowercase.
    reqsourcecount1 = models.PositiveSmallIntegerField(db_column='ReqSourceCount1')  # Field name made lowercase.
    reqsourcecount2 = models.PositiveSmallIntegerField(db_column='ReqSourceCount2')  # Field name made lowercase.
    reqsourcecount3 = models.PositiveSmallIntegerField(db_column='ReqSourceCount3')  # Field name made lowercase.
    reqsourcecount4 = models.PositiveSmallIntegerField(db_column='ReqSourceCount4')  # Field name made lowercase.
    reqcreatureorgoid1 = models.IntegerField(db_column='ReqCreatureOrGOId1')  # Field name made lowercase.
    reqcreatureorgoid2 = models.IntegerField(db_column='ReqCreatureOrGOId2')  # Field name made lowercase.
    reqcreatureorgoid3 = models.IntegerField(db_column='ReqCreatureOrGOId3')  # Field name made lowercase.
    reqcreatureorgoid4 = models.IntegerField(db_column='ReqCreatureOrGOId4')  # Field name made lowercase.
    reqcreatureorgocount1 = models.PositiveSmallIntegerField(db_column='ReqCreatureOrGOCount1')  # Field name made lowercase.
    reqcreatureorgocount2 = models.PositiveSmallIntegerField(db_column='ReqCreatureOrGOCount2')  # Field name made lowercase.
    reqcreatureorgocount3 = models.PositiveSmallIntegerField(db_column='ReqCreatureOrGOCount3')  # Field name made lowercase.
    reqcreatureorgocount4 = models.PositiveSmallIntegerField(db_column='ReqCreatureOrGOCount4')  # Field name made lowercase.
    reqspellcast1 = models.PositiveIntegerField(db_column='ReqSpellCast1')  # Field name made lowercase.
    reqspellcast2 = models.PositiveIntegerField(db_column='ReqSpellCast2')  # Field name made lowercase.
    reqspellcast3 = models.PositiveIntegerField(db_column='ReqSpellCast3')  # Field name made lowercase.
    reqspellcast4 = models.PositiveIntegerField(db_column='ReqSpellCast4')  # Field name made lowercase.
    rewchoiceitemid1 = models.PositiveIntegerField(db_column='RewChoiceItemId1')  # Field name made lowercase.
    rewchoiceitemid2 = models.PositiveIntegerField(db_column='RewChoiceItemId2')  # Field name made lowercase.
    rewchoiceitemid3 = models.PositiveIntegerField(db_column='RewChoiceItemId3')  # Field name made lowercase.
    rewchoiceitemid4 = models.PositiveIntegerField(db_column='RewChoiceItemId4')  # Field name made lowercase.
    rewchoiceitemid5 = models.PositiveIntegerField(db_column='RewChoiceItemId5')  # Field name made lowercase.
    rewchoiceitemid6 = models.PositiveIntegerField(db_column='RewChoiceItemId6')  # Field name made lowercase.
    rewchoiceitemcount1 = models.PositiveSmallIntegerField(db_column='RewChoiceItemCount1')  # Field name made lowercase.
    rewchoiceitemcount2 = models.PositiveSmallIntegerField(db_column='RewChoiceItemCount2')  # Field name made lowercase.
    rewchoiceitemcount3 = models.PositiveSmallIntegerField(db_column='RewChoiceItemCount3')  # Field name made lowercase.
    rewchoiceitemcount4 = models.PositiveSmallIntegerField(db_column='RewChoiceItemCount4')  # Field name made lowercase.
    rewchoiceitemcount5 = models.PositiveSmallIntegerField(db_column='RewChoiceItemCount5')  # Field name made lowercase.
    rewchoiceitemcount6 = models.PositiveSmallIntegerField(db_column='RewChoiceItemCount6')  # Field name made lowercase.
    rewitemid1 = models.PositiveIntegerField(db_column='RewItemId1')  # Field name made lowercase.
    rewitemid2 = models.PositiveIntegerField(db_column='RewItemId2')  # Field name made lowercase.
    rewitemid3 = models.PositiveIntegerField(db_column='RewItemId3')  # Field name made lowercase.
    rewitemid4 = models.PositiveIntegerField(db_column='RewItemId4')  # Field name made lowercase.
    rewitemcount1 = models.PositiveSmallIntegerField(db_column='RewItemCount1')  # Field name made lowercase.
    rewitemcount2 = models.PositiveSmallIntegerField(db_column='RewItemCount2')  # Field name made lowercase.
    rewitemcount3 = models.PositiveSmallIntegerField(db_column='RewItemCount3')  # Field name made lowercase.
    rewitemcount4 = models.PositiveSmallIntegerField(db_column='RewItemCount4')  # Field name made lowercase.
    rewrepfaction1 = models.PositiveSmallIntegerField(db_column='RewRepFaction1')  # Field name made lowercase.
    rewrepfaction2 = models.PositiveSmallIntegerField(db_column='RewRepFaction2')  # Field name made lowercase.
    rewrepfaction3 = models.PositiveSmallIntegerField(db_column='RewRepFaction3')  # Field name made lowercase.
    rewrepfaction4 = models.PositiveSmallIntegerField(db_column='RewRepFaction4')  # Field name made lowercase.
    rewrepfaction5 = models.PositiveSmallIntegerField(db_column='RewRepFaction5')  # Field name made lowercase.
    rewrepvalue1 = models.IntegerField(db_column='RewRepValue1')  # Field name made lowercase.
    rewrepvalue2 = models.IntegerField(db_column='RewRepValue2')  # Field name made lowercase.
    rewrepvalue3 = models.IntegerField(db_column='RewRepValue3')  # Field name made lowercase.
    rewrepvalue4 = models.IntegerField(db_column='RewRepValue4')  # Field name made lowercase.
    rewrepvalue5 = models.IntegerField(db_column='RewRepValue5')  # Field name made lowercase.
    reworreqmoney = models.IntegerField(db_column='RewOrReqMoney')  # Field name made lowercase.
    rewmoneymaxlevel = models.PositiveIntegerField(db_column='RewMoneyMaxLevel')  # Field name made lowercase.
    rewspell = models.PositiveIntegerField(db_column='RewSpell')  # Field name made lowercase.
    rewspellcast = models.PositiveIntegerField(db_column='RewSpellCast')  # Field name made lowercase.
    rewmailtemplateid = models.PositiveIntegerField(db_column='RewMailTemplateId')  # Field name made lowercase.
    rewmaildelaysecs = models.PositiveIntegerField(db_column='RewMailDelaySecs')  # Field name made lowercase.
    pointmapid = models.PositiveSmallIntegerField(db_column='PointMapId')  # Field name made lowercase.
    pointx = models.FloatField(db_column='PointX')  # Field name made lowercase.
    pointy = models.FloatField(db_column='PointY')  # Field name made lowercase.
    pointopt = models.PositiveIntegerField(db_column='PointOpt')  # Field name made lowercase.
    detailsemote1 = models.PositiveSmallIntegerField(db_column='DetailsEmote1')  # Field name made lowercase.
    detailsemote2 = models.PositiveSmallIntegerField(db_column='DetailsEmote2')  # Field name made lowercase.
    detailsemote3 = models.PositiveSmallIntegerField(db_column='DetailsEmote3')  # Field name made lowercase.
    detailsemote4 = models.PositiveSmallIntegerField(db_column='DetailsEmote4')  # Field name made lowercase.
    detailsemotedelay1 = models.PositiveIntegerField(db_column='DetailsEmoteDelay1')  # Field name made lowercase.
    detailsemotedelay2 = models.PositiveIntegerField(db_column='DetailsEmoteDelay2')  # Field name made lowercase.
    detailsemotedelay3 = models.PositiveIntegerField(db_column='DetailsEmoteDelay3')  # Field name made lowercase.
    detailsemotedelay4 = models.PositiveIntegerField(db_column='DetailsEmoteDelay4')  # Field name made lowercase.
    incompleteemote = models.PositiveSmallIntegerField(db_column='IncompleteEmote')  # Field name made lowercase.
    incompleteemotedelay = models.PositiveIntegerField(db_column='IncompleteEmoteDelay')  # Field name made lowercase.
    completeemote = models.PositiveSmallIntegerField(db_column='CompleteEmote')  # Field name made lowercase.
    completeemotedelay = models.PositiveIntegerField(db_column='CompleteEmoteDelay')  # Field name made lowercase.
    offerrewardemote1 = models.PositiveSmallIntegerField(db_column='OfferRewardEmote1')  # Field name made lowercase.
    offerrewardemote2 = models.PositiveSmallIntegerField(db_column='OfferRewardEmote2')  # Field name made lowercase.
    offerrewardemote3 = models.PositiveSmallIntegerField(db_column='OfferRewardEmote3')  # Field name made lowercase.
    offerrewardemote4 = models.PositiveSmallIntegerField(db_column='OfferRewardEmote4')  # Field name made lowercase.
    offerrewardemotedelay1 = models.PositiveIntegerField(db_column='OfferRewardEmoteDelay1')  # Field name made lowercase.
    offerrewardemotedelay2 = models.PositiveIntegerField(db_column='OfferRewardEmoteDelay2')  # Field name made lowercase.
    offerrewardemotedelay3 = models.PositiveIntegerField(db_column='OfferRewardEmoteDelay3')  # Field name made lowercase.
    offerrewardemotedelay4 = models.PositiveIntegerField(db_column='OfferRewardEmoteDelay4')  # Field name made lowercase.
    startscript = models.PositiveIntegerField(db_column='StartScript')  # Field name made lowercase.
    completescript = models.PositiveIntegerField(db_column='CompleteScript')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'quest_template'


class QuestgiverGreeting(models.Model):
    entry = models.PositiveIntegerField(db_column='Entry', primary_key=True)  # Field name made lowercase.
    type = models.PositiveIntegerField(db_column='Type')  # Field name made lowercase.
    text = models.TextField(db_column='Text', blank=True, null=True)  # Field name made lowercase.
    emoteid = models.PositiveIntegerField(db_column='EmoteId')  # Field name made lowercase.
    emotedelay = models.PositiveIntegerField(db_column='EmoteDelay')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'questgiver_greeting'
        unique_together = (('entry', 'type'),)


class ReferenceLootTemplate(models.Model):
    entry = models.PositiveIntegerField(primary_key=True)
    item = models.PositiveIntegerField()
    chanceorquestchance = models.FloatField(db_column='ChanceOrQuestChance')  # Field name made lowercase.
    groupid = models.PositiveIntegerField()
    mincountorref = models.IntegerField(db_column='mincountOrRef')  # Field name made lowercase.
    maxcount = models.PositiveIntegerField()
    condition_id = models.PositiveIntegerField()
    comments = models.CharField(max_length=300, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'reference_loot_template'
        unique_together = (('entry', 'item'),)


class ReferenceLootTemplateNames(models.Model):
    entry = models.PositiveIntegerField(primary_key=True)
    name = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'reference_loot_template_names'


class ReputationRewardRate(models.Model):
    faction = models.PositiveIntegerField(primary_key=True)
    quest_rate = models.FloatField()
    creature_rate = models.FloatField()
    spell_rate = models.FloatField()

    class Meta:
        managed = False
        db_table = 'reputation_reward_rate'


class ReputationSpilloverTemplate(models.Model):
    faction = models.PositiveSmallIntegerField(primary_key=True)
    faction1 = models.PositiveSmallIntegerField()
    rate_1 = models.FloatField()
    rank_1 = models.PositiveIntegerField()
    faction2 = models.PositiveSmallIntegerField()
    rate_2 = models.FloatField()
    rank_2 = models.PositiveIntegerField()
    faction3 = models.PositiveSmallIntegerField()
    rate_3 = models.FloatField()
    rank_3 = models.PositiveIntegerField()
    faction4 = models.PositiveSmallIntegerField()
    rate_4 = models.FloatField()
    rank_4 = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'reputation_spillover_template'


class ReservedName(models.Model):
    name = models.CharField(primary_key=True, max_length=12)

    class Meta:
        managed = False
        db_table = 'reserved_name'


class ScriptTexts(models.Model):
    entry = models.IntegerField(primary_key=True)
    content_default = models.TextField()
    content_loc1 = models.TextField(blank=True, null=True)
    content_loc2 = models.TextField(blank=True, null=True)
    content_loc3 = models.TextField(blank=True, null=True)
    content_loc4 = models.TextField(blank=True, null=True)
    content_loc5 = models.TextField(blank=True, null=True)
    content_loc6 = models.TextField(blank=True, null=True)
    content_loc7 = models.TextField(blank=True, null=True)
    content_loc8 = models.TextField(blank=True, null=True)
    sound = models.PositiveIntegerField()
    type = models.PositiveIntegerField()
    language = models.PositiveIntegerField()
    emote = models.PositiveSmallIntegerField()
    broadcast_text_id = models.IntegerField()
    comment = models.TextField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'script_texts'


class ScriptWaypoint(models.Model):
    entry = models.PositiveIntegerField(db_column='Entry', primary_key=True)  # Field name made lowercase.
    pathid = models.PositiveIntegerField(db_column='PathId')  # Field name made lowercase.
    point = models.PositiveIntegerField(db_column='Point')  # Field name made lowercase.
    positionx = models.FloatField(db_column='PositionX')  # Field name made lowercase.
    positiony = models.FloatField(db_column='PositionY')  # Field name made lowercase.
    positionz = models.FloatField(db_column='PositionZ')  # Field name made lowercase.
    orientation = models.FloatField(db_column='Orientation')  # Field name made lowercase.
    waittime = models.PositiveIntegerField(db_column='WaitTime')  # Field name made lowercase.
    scriptid = models.PositiveIntegerField(db_column='ScriptId')  # Field name made lowercase.
    comment = models.TextField(db_column='Comment', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'script_waypoint'
        unique_together = (('entry', 'pathid', 'point'),)


class ScriptedAreatrigger(models.Model):
    entry = models.IntegerField(primary_key=True)
    scriptname = models.CharField(db_column='ScriptName', max_length=64)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'scripted_areatrigger'


class ScriptedEventId(models.Model):
    id = models.IntegerField(primary_key=True)
    scriptname = models.CharField(db_column='ScriptName', max_length=64)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'scripted_event_id'


class SkillDiscoveryTemplate(models.Model):
    spellid = models.PositiveIntegerField(db_column='spellId', primary_key=True)  # Field name made lowercase.
    reqspell = models.PositiveIntegerField(db_column='reqSpell')  # Field name made lowercase.
    reqskillvalue = models.PositiveSmallIntegerField(db_column='reqSkillValue')  # Field name made lowercase.
    chance = models.FloatField()

    class Meta:
        managed = False
        db_table = 'skill_discovery_template'
        unique_together = (('spellid', 'reqspell'),)


class SkillExtraItemTemplate(models.Model):
    spellid = models.PositiveIntegerField(db_column='spellId', primary_key=True)  # Field name made lowercase.
    requiredspecialization = models.PositiveIntegerField(db_column='requiredSpecialization')  # Field name made lowercase.
    additionalcreatechance = models.FloatField(db_column='additionalCreateChance')  # Field name made lowercase.
    additionalmaxnum = models.PositiveIntegerField(db_column='additionalMaxNum')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'skill_extra_item_template'


class SkillFishingBaseLevel(models.Model):
    entry = models.PositiveIntegerField(primary_key=True)
    skill = models.SmallIntegerField()

    class Meta:
        managed = False
        db_table = 'skill_fishing_base_level'


class SkinningLootTemplate(models.Model):
    entry = models.PositiveIntegerField(primary_key=True)
    item = models.PositiveIntegerField()
    chanceorquestchance = models.FloatField(db_column='ChanceOrQuestChance')  # Field name made lowercase.
    groupid = models.PositiveIntegerField()
    mincountorref = models.IntegerField(db_column='mincountOrRef')  # Field name made lowercase.
    maxcount = models.PositiveIntegerField()
    condition_id = models.PositiveIntegerField()
    comments = models.CharField(max_length=300, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'skinning_loot_template'
        unique_together = (('entry', 'item'),)


class SpamRecords(models.Model):
    record = models.CharField(max_length=512)

    class Meta:
        managed = False
        db_table = 'spam_records'


class SpawnGroup(models.Model):
    id = models.IntegerField(db_column='Id', primary_key=True)  # Field name made lowercase.
    name = models.CharField(db_column='Name', max_length=200)  # Field name made lowercase.
    type = models.IntegerField(db_column='Type')  # Field name made lowercase.
    maxcount = models.IntegerField(db_column='MaxCount')  # Field name made lowercase.
    worldstate = models.IntegerField(db_column='WorldState')  # Field name made lowercase.
    flags = models.PositiveIntegerField(db_column='Flags')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'spawn_group'


class SpawnGroupEntry(models.Model):
    id = models.IntegerField(db_column='Id', primary_key=True)  # Field name made lowercase.
    entry = models.IntegerField(db_column='Entry')  # Field name made lowercase.
    mincount = models.IntegerField(db_column='MinCount')  # Field name made lowercase.
    maxcount = models.IntegerField(db_column='MaxCount')  # Field name made lowercase.
    chance = models.IntegerField(db_column='Chance')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'spawn_group_entry'
        unique_together = (('id', 'entry'),)


class SpawnGroupFormation(models.Model):
    id = models.IntegerField(db_column='Id', primary_key=True)  # Field name made lowercase.
    formationtype = models.IntegerField(db_column='FormationType')  # Field name made lowercase.
    formationspread = models.FloatField(db_column='FormationSpread')  # Field name made lowercase.
    formationoptions = models.IntegerField(db_column='FormationOptions')  # Field name made lowercase.
    pathid = models.IntegerField(db_column='PathId')  # Field name made lowercase.
    movementtype = models.IntegerField(db_column='MovementType')  # Field name made lowercase.
    comment = models.CharField(db_column='Comment', max_length=255, blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'spawn_group_formation'


class SpawnGroupLinkedGroup(models.Model):
    id = models.IntegerField(db_column='Id', primary_key=True)  # Field name made lowercase.
    linkedid = models.IntegerField(db_column='LinkedId')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'spawn_group_linked_group'
        unique_together = (('id', 'linkedid'),)


class SpawnGroupSpawn(models.Model):
    id = models.IntegerField(db_column='Id', primary_key=True)  # Field name made lowercase.
    guid = models.IntegerField(db_column='Guid')  # Field name made lowercase.
    slotid = models.IntegerField(db_column='SlotId')  # Field name made lowercase.
    chance = models.PositiveIntegerField(db_column='Chance')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'spawn_group_spawn'
        unique_together = (('id', 'guid'),)


class SpellAffect(models.Model):
    entry = models.PositiveSmallIntegerField(primary_key=True)
    effectid = models.PositiveIntegerField(db_column='effectId')  # Field name made lowercase.
    spellfamilymask = models.PositiveBigIntegerField(db_column='SpellFamilyMask')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'spell_affect'
        unique_together = (('entry', 'effectid'),)


class SpellArea(models.Model):
    spell = models.PositiveIntegerField(primary_key=True)
    area = models.PositiveIntegerField()
    quest_start = models.PositiveIntegerField()
    quest_start_active = models.PositiveIntegerField()
    quest_end = models.PositiveIntegerField()
    condition_id = models.PositiveIntegerField()
    aura_spell = models.IntegerField()
    racemask = models.PositiveIntegerField()
    gender = models.PositiveIntegerField()
    autocast = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'spell_area'
        unique_together = (('spell', 'area', 'quest_start', 'quest_start_active', 'aura_spell', 'racemask', 'gender'),)


class SpellBonusData(models.Model):
    entry = models.PositiveSmallIntegerField(primary_key=True)
    direct_bonus = models.FloatField()
    dot_bonus = models.FloatField()
    ap_bonus = models.FloatField()
    ap_dot_bonus = models.FloatField()
    comments = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'spell_bonus_data'


class SpellChain(models.Model):
    spell_id = models.IntegerField(primary_key=True)
    prev_spell = models.IntegerField()
    first_spell = models.IntegerField()
    rank = models.IntegerField()
    req_spell = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'spell_chain'


class SpellCone(models.Model):
    id = models.PositiveIntegerField(db_column='Id', primary_key=True)  # Field name made lowercase.
    conedegrees = models.IntegerField(db_column='ConeDegrees')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'spell_cone'


class SpellElixir(models.Model):
    entry = models.PositiveIntegerField(primary_key=True)
    mask = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'spell_elixir'


class SpellFacing(models.Model):
    entry = models.PositiveIntegerField(primary_key=True)
    facingcasterflag = models.IntegerField()

    class Meta:
        managed = False
        db_table = 'spell_facing'


class SpellLearnSpell(models.Model):
    entry = models.PositiveSmallIntegerField(primary_key=True)
    spellid = models.PositiveSmallIntegerField(db_column='SpellID')  # Field name made lowercase.
    active = models.PositiveIntegerField(db_column='Active')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'spell_learn_spell'
        unique_together = (('entry', 'spellid'),)


class SpellLootTemplate(models.Model):
    entry = models.PositiveIntegerField(primary_key=True)
    item = models.PositiveIntegerField()
    chanceorquestchance = models.FloatField(db_column='ChanceOrQuestChance')  # Field name made lowercase.
    groupid = models.PositiveIntegerField()
    mincountorref = models.IntegerField(db_column='mincountOrRef')  # Field name made lowercase.
    maxcount = models.PositiveIntegerField()
    condition_id = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'spell_loot_template'
        unique_together = (('entry', 'item'),)


class SpellPetAuras(models.Model):
    spell = models.PositiveIntegerField(primary_key=True)
    pet = models.PositiveIntegerField()
    aura = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'spell_pet_auras'
        unique_together = (('spell', 'pet'),)


class SpellProcEvent(models.Model):
    entry = models.PositiveIntegerField(primary_key=True)
    schoolmask = models.PositiveIntegerField(db_column='SchoolMask')  # Field name made lowercase.
    spellfamilyname = models.PositiveSmallIntegerField(db_column='SpellFamilyName')  # Field name made lowercase.
    spellfamilymask0 = models.PositiveBigIntegerField(db_column='SpellFamilyMask0')  # Field name made lowercase.
    spellfamilymask1 = models.PositiveBigIntegerField(db_column='SpellFamilyMask1')  # Field name made lowercase.
    spellfamilymask2 = models.PositiveBigIntegerField(db_column='SpellFamilyMask2')  # Field name made lowercase.
    procflags = models.PositiveIntegerField(db_column='procFlags')  # Field name made lowercase.
    procex = models.PositiveIntegerField(db_column='procEx')  # Field name made lowercase.
    ppmrate = models.FloatField(db_column='ppmRate')  # Field name made lowercase.
    customchance = models.FloatField(db_column='CustomChance')  # Field name made lowercase.
    cooldown = models.PositiveIntegerField(db_column='Cooldown')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'spell_proc_event'


class SpellProcItemEnchant(models.Model):
    entry = models.PositiveIntegerField(primary_key=True)
    ppmrate = models.FloatField(db_column='ppmRate')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'spell_proc_item_enchant'


class SpellScriptTarget(models.Model):
    entry = models.PositiveIntegerField()
    type = models.PositiveIntegerField()
    targetentry = models.PositiveIntegerField(db_column='targetEntry')  # Field name made lowercase.
    inverseeffectmask = models.PositiveIntegerField(db_column='inverseEffectMask')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'spell_script_target'
        unique_together = (('entry', 'type', 'targetentry'),)


class SpellScripts(models.Model):
    id = models.IntegerField(db_column='Id', primary_key=True)  # Field name made lowercase.
    scriptname = models.CharField(db_column='ScriptName', max_length=64)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'spell_scripts'


class SpellTargetPosition(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    target_map = models.PositiveSmallIntegerField()
    target_position_x = models.FloatField()
    target_position_y = models.FloatField()
    target_position_z = models.FloatField()
    target_orientation = models.FloatField()

    class Meta:
        managed = False
        db_table = 'spell_target_position'


class SpellTemplate(models.Model):
    id = models.PositiveIntegerField(db_column='Id', primary_key=True)  # Field name made lowercase.
    school = models.PositiveIntegerField(db_column='School')  # Field name made lowercase.
    category = models.PositiveIntegerField(db_column='Category')  # Field name made lowercase.
    castui = models.PositiveIntegerField(db_column='CastUI')  # Field name made lowercase.
    dispel = models.PositiveIntegerField(db_column='Dispel')  # Field name made lowercase.
    mechanic = models.PositiveIntegerField(db_column='Mechanic')  # Field name made lowercase.
    attributes = models.PositiveIntegerField(db_column='Attributes')  # Field name made lowercase.
    attributesex = models.PositiveIntegerField(db_column='AttributesEx')  # Field name made lowercase.
    attributesex2 = models.PositiveIntegerField(db_column='AttributesEx2')  # Field name made lowercase.
    attributesex3 = models.PositiveIntegerField(db_column='AttributesEx3')  # Field name made lowercase.
    attributesex4 = models.PositiveIntegerField(db_column='AttributesEx4')  # Field name made lowercase.
    stances = models.PositiveIntegerField(db_column='Stances')  # Field name made lowercase.
    stancesnot = models.PositiveIntegerField(db_column='StancesNot')  # Field name made lowercase.
    targets = models.PositiveIntegerField(db_column='Targets')  # Field name made lowercase.
    targetcreaturetype = models.PositiveIntegerField(db_column='TargetCreatureType')  # Field name made lowercase.
    requiresspellfocus = models.PositiveIntegerField(db_column='RequiresSpellFocus')  # Field name made lowercase.
    casteraurastate = models.PositiveIntegerField(db_column='CasterAuraState')  # Field name made lowercase.
    targetaurastate = models.PositiveIntegerField(db_column='TargetAuraState')  # Field name made lowercase.
    castingtimeindex = models.PositiveIntegerField(db_column='CastingTimeIndex')  # Field name made lowercase.
    recoverytime = models.PositiveIntegerField(db_column='RecoveryTime')  # Field name made lowercase.
    categoryrecoverytime = models.PositiveIntegerField(db_column='CategoryRecoveryTime')  # Field name made lowercase.
    interruptflags = models.PositiveIntegerField(db_column='InterruptFlags')  # Field name made lowercase.
    aurainterruptflags = models.PositiveIntegerField(db_column='AuraInterruptFlags')  # Field name made lowercase.
    channelinterruptflags = models.PositiveIntegerField(db_column='ChannelInterruptFlags')  # Field name made lowercase.
    procflags = models.PositiveIntegerField(db_column='ProcFlags')  # Field name made lowercase.
    procchance = models.PositiveIntegerField(db_column='ProcChance')  # Field name made lowercase.
    proccharges = models.PositiveIntegerField(db_column='ProcCharges')  # Field name made lowercase.
    maxlevel = models.PositiveIntegerField(db_column='MaxLevel')  # Field name made lowercase.
    baselevel = models.PositiveIntegerField(db_column='BaseLevel')  # Field name made lowercase.
    spelllevel = models.PositiveIntegerField(db_column='SpellLevel')  # Field name made lowercase.
    durationindex = models.PositiveIntegerField(db_column='DurationIndex')  # Field name made lowercase.
    powertype = models.PositiveIntegerField(db_column='PowerType')  # Field name made lowercase.
    manacost = models.PositiveIntegerField(db_column='ManaCost')  # Field name made lowercase.
    manacostperlevel = models.PositiveIntegerField(db_column='ManaCostPerlevel')  # Field name made lowercase.
    manapersecond = models.PositiveIntegerField(db_column='ManaPerSecond')  # Field name made lowercase.
    manapersecondperlevel = models.PositiveIntegerField(db_column='ManaPerSecondPerLevel')  # Field name made lowercase.
    rangeindex = models.PositiveIntegerField(db_column='RangeIndex')  # Field name made lowercase.
    speed = models.FloatField(db_column='Speed')  # Field name made lowercase.
    modalnextspell = models.PositiveIntegerField(db_column='ModalNextSpell')  # Field name made lowercase.
    stackamount = models.PositiveIntegerField(db_column='StackAmount')  # Field name made lowercase.
    totem1 = models.PositiveIntegerField(db_column='Totem1')  # Field name made lowercase.
    totem2 = models.PositiveIntegerField(db_column='Totem2')  # Field name made lowercase.
    reagent1 = models.IntegerField(db_column='Reagent1')  # Field name made lowercase.
    reagent2 = models.IntegerField(db_column='Reagent2')  # Field name made lowercase.
    reagent3 = models.IntegerField(db_column='Reagent3')  # Field name made lowercase.
    reagent4 = models.IntegerField(db_column='Reagent4')  # Field name made lowercase.
    reagent5 = models.IntegerField(db_column='Reagent5')  # Field name made lowercase.
    reagent6 = models.IntegerField(db_column='Reagent6')  # Field name made lowercase.
    reagent7 = models.IntegerField(db_column='Reagent7')  # Field name made lowercase.
    reagent8 = models.IntegerField(db_column='Reagent8')  # Field name made lowercase.
    reagentcount1 = models.PositiveIntegerField(db_column='ReagentCount1')  # Field name made lowercase.
    reagentcount2 = models.PositiveIntegerField(db_column='ReagentCount2')  # Field name made lowercase.
    reagentcount3 = models.PositiveIntegerField(db_column='ReagentCount3')  # Field name made lowercase.
    reagentcount4 = models.PositiveIntegerField(db_column='ReagentCount4')  # Field name made lowercase.
    reagentcount5 = models.PositiveIntegerField(db_column='ReagentCount5')  # Field name made lowercase.
    reagentcount6 = models.PositiveIntegerField(db_column='ReagentCount6')  # Field name made lowercase.
    reagentcount7 = models.PositiveIntegerField(db_column='ReagentCount7')  # Field name made lowercase.
    reagentcount8 = models.PositiveIntegerField(db_column='ReagentCount8')  # Field name made lowercase.
    equippeditemclass = models.IntegerField(db_column='EquippedItemClass')  # Field name made lowercase.
    equippeditemsubclassmask = models.IntegerField(db_column='EquippedItemSubClassMask')  # Field name made lowercase.
    equippediteminventorytypemask = models.IntegerField(db_column='EquippedItemInventoryTypeMask')  # Field name made lowercase.
    effect1 = models.PositiveIntegerField(db_column='Effect1')  # Field name made lowercase.
    effect2 = models.PositiveIntegerField(db_column='Effect2')  # Field name made lowercase.
    effect3 = models.PositiveIntegerField(db_column='Effect3')  # Field name made lowercase.
    effectdiesides1 = models.IntegerField(db_column='EffectDieSides1')  # Field name made lowercase.
    effectdiesides2 = models.IntegerField(db_column='EffectDieSides2')  # Field name made lowercase.
    effectdiesides3 = models.IntegerField(db_column='EffectDieSides3')  # Field name made lowercase.
    effectbasedice1 = models.PositiveIntegerField(db_column='EffectBaseDice1')  # Field name made lowercase.
    effectbasedice2 = models.PositiveIntegerField(db_column='EffectBaseDice2')  # Field name made lowercase.
    effectbasedice3 = models.PositiveIntegerField(db_column='EffectBaseDice3')  # Field name made lowercase.
    effectdiceperlevel1 = models.FloatField(db_column='EffectDicePerLevel1')  # Field name made lowercase.
    effectdiceperlevel2 = models.FloatField(db_column='EffectDicePerLevel2')  # Field name made lowercase.
    effectdiceperlevel3 = models.FloatField(db_column='EffectDicePerLevel3')  # Field name made lowercase.
    effectrealpointsperlevel1 = models.FloatField(db_column='EffectRealPointsPerLevel1')  # Field name made lowercase.
    effectrealpointsperlevel2 = models.FloatField(db_column='EffectRealPointsPerLevel2')  # Field name made lowercase.
    effectrealpointsperlevel3 = models.FloatField(db_column='EffectRealPointsPerLevel3')  # Field name made lowercase.
    effectbasepoints1 = models.IntegerField(db_column='EffectBasePoints1')  # Field name made lowercase.
    effectbasepoints2 = models.IntegerField(db_column='EffectBasePoints2')  # Field name made lowercase.
    effectbasepoints3 = models.IntegerField(db_column='EffectBasePoints3')  # Field name made lowercase.
    effectmechanic1 = models.PositiveIntegerField(db_column='EffectMechanic1')  # Field name made lowercase.
    effectmechanic2 = models.PositiveIntegerField(db_column='EffectMechanic2')  # Field name made lowercase.
    effectmechanic3 = models.PositiveIntegerField(db_column='EffectMechanic3')  # Field name made lowercase.
    effectimplicittargeta1 = models.PositiveIntegerField(db_column='EffectImplicitTargetA1')  # Field name made lowercase.
    effectimplicittargeta2 = models.PositiveIntegerField(db_column='EffectImplicitTargetA2')  # Field name made lowercase.
    effectimplicittargeta3 = models.PositiveIntegerField(db_column='EffectImplicitTargetA3')  # Field name made lowercase.
    effectimplicittargetb1 = models.PositiveIntegerField(db_column='EffectImplicitTargetB1')  # Field name made lowercase.
    effectimplicittargetb2 = models.PositiveIntegerField(db_column='EffectImplicitTargetB2')  # Field name made lowercase.
    effectimplicittargetb3 = models.PositiveIntegerField(db_column='EffectImplicitTargetB3')  # Field name made lowercase.
    effectradiusindex1 = models.PositiveIntegerField(db_column='EffectRadiusIndex1')  # Field name made lowercase.
    effectradiusindex2 = models.PositiveIntegerField(db_column='EffectRadiusIndex2')  # Field name made lowercase.
    effectradiusindex3 = models.PositiveIntegerField(db_column='EffectRadiusIndex3')  # Field name made lowercase.
    effectapplyauraname1 = models.PositiveIntegerField(db_column='EffectApplyAuraName1')  # Field name made lowercase.
    effectapplyauraname2 = models.PositiveIntegerField(db_column='EffectApplyAuraName2')  # Field name made lowercase.
    effectapplyauraname3 = models.PositiveIntegerField(db_column='EffectApplyAuraName3')  # Field name made lowercase.
    effectamplitude1 = models.PositiveIntegerField(db_column='EffectAmplitude1')  # Field name made lowercase.
    effectamplitude2 = models.PositiveIntegerField(db_column='EffectAmplitude2')  # Field name made lowercase.
    effectamplitude3 = models.PositiveIntegerField(db_column='EffectAmplitude3')  # Field name made lowercase.
    effectmultiplevalue1 = models.FloatField(db_column='EffectMultipleValue1')  # Field name made lowercase.
    effectmultiplevalue2 = models.FloatField(db_column='EffectMultipleValue2')  # Field name made lowercase.
    effectmultiplevalue3 = models.FloatField(db_column='EffectMultipleValue3')  # Field name made lowercase.
    effectchaintarget1 = models.PositiveIntegerField(db_column='EffectChainTarget1')  # Field name made lowercase.
    effectchaintarget2 = models.PositiveIntegerField(db_column='EffectChainTarget2')  # Field name made lowercase.
    effectchaintarget3 = models.PositiveIntegerField(db_column='EffectChainTarget3')  # Field name made lowercase.
    effectitemtype1 = models.PositiveIntegerField(db_column='EffectItemType1')  # Field name made lowercase.
    effectitemtype2 = models.PositiveIntegerField(db_column='EffectItemType2')  # Field name made lowercase.
    effectitemtype3 = models.PositiveIntegerField(db_column='EffectItemType3')  # Field name made lowercase.
    effectmiscvalue1 = models.IntegerField(db_column='EffectMiscValue1')  # Field name made lowercase.
    effectmiscvalue2 = models.IntegerField(db_column='EffectMiscValue2')  # Field name made lowercase.
    effectmiscvalue3 = models.IntegerField(db_column='EffectMiscValue3')  # Field name made lowercase.
    effecttriggerspell1 = models.PositiveIntegerField(db_column='EffectTriggerSpell1')  # Field name made lowercase.
    effecttriggerspell2 = models.PositiveIntegerField(db_column='EffectTriggerSpell2')  # Field name made lowercase.
    effecttriggerspell3 = models.PositiveIntegerField(db_column='EffectTriggerSpell3')  # Field name made lowercase.
    effectpointspercombopoint1 = models.FloatField(db_column='EffectPointsPerComboPoint1')  # Field name made lowercase.
    effectpointspercombopoint2 = models.FloatField(db_column='EffectPointsPerComboPoint2')  # Field name made lowercase.
    effectpointspercombopoint3 = models.FloatField(db_column='EffectPointsPerComboPoint3')  # Field name made lowercase.
    spellvisual = models.PositiveIntegerField(db_column='SpellVisual')  # Field name made lowercase.
    spelliconid = models.PositiveIntegerField(db_column='SpellIconID')  # Field name made lowercase.
    activeiconid = models.PositiveIntegerField(db_column='ActiveIconID')  # Field name made lowercase.
    spellpriority = models.PositiveIntegerField(db_column='SpellPriority')  # Field name made lowercase.
    spellname = models.TextField(db_column='SpellName')  # Field name made lowercase.
    spellname2 = models.TextField(db_column='SpellName2', blank=True, null=True)  # Field name made lowercase.
    spellname3 = models.TextField(db_column='SpellName3', blank=True, null=True)  # Field name made lowercase.
    spellname4 = models.TextField(db_column='SpellName4', blank=True, null=True)  # Field name made lowercase.
    spellname5 = models.TextField(db_column='SpellName5', blank=True, null=True)  # Field name made lowercase.
    spellname6 = models.TextField(db_column='SpellName6', blank=True, null=True)  # Field name made lowercase.
    spellname7 = models.TextField(db_column='SpellName7', blank=True, null=True)  # Field name made lowercase.
    spellname8 = models.TextField(db_column='SpellName8', blank=True, null=True)  # Field name made lowercase.
    rank1 = models.TextField(db_column='Rank1', blank=True, null=True)  # Field name made lowercase.
    rank2 = models.TextField(db_column='Rank2', blank=True, null=True)  # Field name made lowercase.
    rank3 = models.TextField(db_column='Rank3', blank=True, null=True)  # Field name made lowercase.
    rank4 = models.TextField(db_column='Rank4', blank=True, null=True)  # Field name made lowercase.
    rank5 = models.TextField(db_column='Rank5', blank=True, null=True)  # Field name made lowercase.
    rank6 = models.TextField(db_column='Rank6', blank=True, null=True)  # Field name made lowercase.
    rank7 = models.TextField(db_column='Rank7', blank=True, null=True)  # Field name made lowercase.
    rank8 = models.TextField(db_column='Rank8', blank=True, null=True)  # Field name made lowercase.
    manacostpercentage = models.PositiveIntegerField(db_column='ManaCostPercentage')  # Field name made lowercase.
    startrecoverycategory = models.PositiveIntegerField(db_column='StartRecoveryCategory')  # Field name made lowercase.
    startrecoverytime = models.PositiveIntegerField(db_column='StartRecoveryTime')  # Field name made lowercase.
    maxtargetlevel = models.PositiveIntegerField(db_column='MaxTargetLevel')  # Field name made lowercase.
    spellfamilyname = models.PositiveIntegerField(db_column='SpellFamilyName')  # Field name made lowercase.
    spellfamilyflags = models.PositiveBigIntegerField(db_column='SpellFamilyFlags')  # Field name made lowercase.
    maxaffectedtargets = models.PositiveIntegerField(db_column='MaxAffectedTargets')  # Field name made lowercase.
    dmgclass = models.PositiveIntegerField(db_column='DmgClass')  # Field name made lowercase.
    preventiontype = models.PositiveIntegerField(db_column='PreventionType')  # Field name made lowercase.
    stancebarorder = models.IntegerField(db_column='StanceBarOrder')  # Field name made lowercase.
    dmgmultiplier1 = models.FloatField(db_column='DmgMultiplier1')  # Field name made lowercase.
    dmgmultiplier2 = models.FloatField(db_column='DmgMultiplier2')  # Field name made lowercase.
    dmgmultiplier3 = models.FloatField(db_column='DmgMultiplier3')  # Field name made lowercase.
    minfactionid = models.PositiveIntegerField(db_column='MinFactionId')  # Field name made lowercase.
    minreputation = models.PositiveIntegerField(db_column='MinReputation')  # Field name made lowercase.
    requiredauravision = models.PositiveIntegerField(db_column='RequiredAuraVision')  # Field name made lowercase.
    isserverside = models.PositiveIntegerField(db_column='IsServerSide')  # Field name made lowercase.
    attributesserverside = models.PositiveIntegerField(db_column='AttributesServerside')  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'spell_template'


class SpellThreat(models.Model):
    entry = models.PositiveIntegerField(primary_key=True)
    threat = models.SmallIntegerField(db_column='Threat')  # Field name made lowercase.
    multiplier = models.FloatField()
    ap_bonus = models.FloatField()

    class Meta:
        managed = False
        db_table = 'spell_threat'


class TaxiShortcuts(models.Model):
    pathid = models.PositiveIntegerField(primary_key=True)
    takeoff = models.PositiveIntegerField()
    landing = models.PositiveIntegerField()
    comments = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'taxi_shortcuts'


class TrainerGreeting(models.Model):
    entry = models.PositiveIntegerField(db_column='Entry', primary_key=True)  # Field name made lowercase.
    text = models.TextField(db_column='Text', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'trainer_greeting'


class Transports(models.Model):
    entry = models.PositiveIntegerField(primary_key=True)
    name = models.TextField(blank=True, null=True)
    period = models.PositiveIntegerField()

    class Meta:
        managed = False
        db_table = 'transports'


class VehicleAccessory(models.Model):
    vehicle_entry = models.PositiveIntegerField(primary_key=True)
    seat = models.PositiveIntegerField()
    accessory_entry = models.PositiveIntegerField()
    comment = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'vehicle_accessory'
        unique_together = (('vehicle_entry', 'seat'),)


class WardenScans(models.Model):
    id = models.SmallAutoField(unique=True)
    type = models.IntegerField(blank=True, null=True)
    str = models.TextField(blank=True, null=True)
    data = models.TextField(blank=True, null=True)
    address = models.IntegerField(blank=True, null=True)
    length = models.IntegerField(blank=True, null=True)
    result = models.TextField()
    flags = models.PositiveSmallIntegerField()
    comment = models.TextField()

    class Meta:
        managed = False
        db_table = 'warden_scans'


class WaypointPath(models.Model):
    pathid = models.PositiveIntegerField(db_column='PathId', primary_key=True)  # Field name made lowercase.
    point = models.PositiveIntegerField(db_column='Point')  # Field name made lowercase.
    positionx = models.FloatField(db_column='PositionX')  # Field name made lowercase.
    positiony = models.FloatField(db_column='PositionY')  # Field name made lowercase.
    positionz = models.FloatField(db_column='PositionZ')  # Field name made lowercase.
    orientation = models.FloatField(db_column='Orientation')  # Field name made lowercase.
    waittime = models.PositiveIntegerField(db_column='WaitTime')  # Field name made lowercase.
    scriptid = models.PositiveIntegerField(db_column='ScriptId')  # Field name made lowercase.
    comment = models.TextField(db_column='Comment', blank=True, null=True)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'waypoint_path'
        unique_together = (('pathid', 'point'),)


class WaypointPathName(models.Model):
    pathid = models.PositiveIntegerField(db_column='PathId', primary_key=True)  # Field name made lowercase.
    name = models.CharField(db_column='Name', max_length=300)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'waypoint_path_name'


class WorldSafeLocs(models.Model):
    id = models.PositiveIntegerField(primary_key=True)
    map = models.PositiveIntegerField()
    x = models.FloatField()
    y = models.FloatField()
    z = models.FloatField()
    o = models.FloatField()
    name = models.CharField(max_length=50)

    class Meta:
        managed = False
        db_table = 'world_safe_locs'


class WorldTemplate(models.Model):
    map = models.PositiveSmallIntegerField(primary_key=True)
    scriptname = models.CharField(db_column='ScriptName', max_length=128)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'world_template'


class WorldstateName(models.Model):
    id = models.IntegerField(db_column='Id', primary_key=True)  # Field name made lowercase.
    name = models.CharField(db_column='Name', max_length=200)  # Field name made lowercase.

    class Meta:
        managed = False
        db_table = 'worldstate_name'
