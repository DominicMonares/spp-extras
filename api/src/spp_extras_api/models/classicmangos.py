# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


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