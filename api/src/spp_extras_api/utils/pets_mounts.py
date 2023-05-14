# Organize and assign factions to each pet and mount spell
def format_pet_mount_item_data(items):
    all = {}
    for item in items:
        entry = item['entry']
        all[str(entry)] = item

    return all


# Organize known pet and mount spells by character
def format_char_spell_data(spells):
    all = {}
    for _spell in spells:
        guid = str(_spell['guid'])
        spell = _spell['spell']
        if guid not in all:
            all[guid] = [spell]
        else:
            all[guid].append(spell)

    return all


# Organize riding skills by character
def format_char_skill_data(skills):
    all = {}
    for skill in skills:
        guid = str(skill['guid'])
        value = str(skill['value'])
        all[guid] = value

    return all


def transfer_pet_mount_spells(item_template, known_spells, char_riding_skills):
    args = []
    all = {
        'alliance': {'pets': {}, 'mounts': {}},
        'horde': {'pets': {}, 'mounts': {}},
        'neutral': {'pets': {}, 'mounts': {}}
    }

    

    return
