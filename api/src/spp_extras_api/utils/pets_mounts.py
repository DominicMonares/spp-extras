# Organize pet and mount items by faction and type
def format_pet_mount_item_data(items):
    all = {
        'alliance': {'pets': {}, 'mounts': {}}, 
        'horde': {'pets': {}, 'mounts': {}}, 
        'neutral': {'pets': {}, 'mounts': {}}
    }
    
    for item in items:
        entry = item['entry']
        faction = item['allowablerace']
        subclass = item['subclass']
        if subclass == 2: # Pets
            if faction == 1101: # Alliance
                all['alliance']['pets'][str(entry)] = item
            if faction == 690: # Horde
                all['horde']['pets'][str(entry)] = item
            elif faction == -1: # Neutral
                all['neutral']['pets'][str(entry)] = item
        elif subclass == 5: # Mounts
            if faction == 1101: # Alliance
                all['alliance']['mounts'][str(entry)] = item
            if faction == 690: # Horde
                all['horde']['mounts'][str(entry)] = item
            elif faction == -1: # Neutral
                all['neutral']['mounts'][str(entry)] = item

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
