from .characters import check_faction


# Organize and assign factions to each pet and mount spell
def format_pet_mount_item_data(items):
    all = {}
    for item in items:
        spell_id = item['spellid_2']
        all[str(spell_id)] = item

    return all


# Organize known pet and mount spells by character
def format_char_spell_data(spells):
    all = {}
    for spell in spells:
        guid = str(spell['guid'])
        spell_id = spell['spell']
        if guid not in all:
            all[guid] = [spell_id]
        else:
            all[guid].append(spell_id)

    return all


# Organize riding skills by character
def format_char_skill_data(skills):
    all = {}
    for skill in skills:
        guid = str(skill['guid'])
        value = skill['value']
        all[guid] = value

    return all


# Share pet and mount spells between all characters
def transfer_pet_mount_spells(pet_mount_items, merged_chars, known_spells, char_riding_skills):
    args = []

    # Find all known mounts and sort by faction
    faction_items = {'alliance': {}, 'horde': {}, 'neutral': {}}
    for char in known_spells:
        spells = known_spells[char]
        for s_id in spells:
            spell_id = str(s_id)
            if spell_id in pet_mount_items:
                spell_item = pet_mount_items[spell_id]
                race = spell_item['allowablerace']
                if race == 1101:  # Alliance
                    faction_items['alliance'][spell_id] = spell_item
                if race == 690:  # Horde
                    faction_items['horde'][spell_id] = spell_item
                if race == 0:  # Neutral
                    faction_items['neutral'][spell_id] = spell_item

    # Add pets and mounts for chars that don't already have them and can use them
    for c in merged_chars:
        char = merged_chars[c]
        race = char['race']
        faction = check_faction(race)
        items = {**faction_items[faction], **faction_items['neutral']}
        for s_id in items:
            item = items[s_id]
            req_skill = item['requiredskillrank']
            char_skill = char_riding_skills[c] or 0
            can_use = char_skill >= req_skill
            already_known = c in known_spells and s_id in known_spells[c]
            if can_use and not already_known:
                args.append({
                    'guid': c,
                    'spell_id': s_id
                })

    return args
