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


def format_char_spell_data(spells):
    all = {}
    # Sort pet and mount spells by character
    return


def format_char_skill_data(skills):
    all = {}
    # Sort riding data skills by char
    return
