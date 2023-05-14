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
        value = str(skill['value'])
        all[guid] = value

    return all


def transfer_pet_mount_spells(item_template, merged_chars, known_spells, char_riding_skills):
    args = []
    faction_spells = {
        'alliance': {},
        'horde': {},
        'neutral': {}
    }

    # Sort known spells by faction using known spells and item template
    # Iterate through merged chars, determine char faction, and add spell arg if char
    # doesn't know it

    for s in known_spells:
        spell = known_spells[s]

    return args
