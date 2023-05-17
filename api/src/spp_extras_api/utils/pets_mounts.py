import json
from from_root import from_root
from .characters import check_faction
with open(from_root('data/petsAndMounts/factionSpells.json'), 'r') as json_file:
    faction_spells = json.load(json_file)
with open(from_root('data/petsAndMounts/professionSpells.json'), 'r') as json_file:
    profession_spells = json.load(json_file)


# Organize pet and mount items by spell ID
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
def create_pet_mount_spell_args(pet_mount_items, accounts, known_spells, char_riding_skills):
    args = []
    for acct_id in accounts:
        account = accounts[acct_id]
        characters = account['characters']
        merged_chars = {**characters['alliance'], **characters['horde']}
        
        # Get all known pets and mounts on account level
        account_items = {}
        for char_id in merged_chars:
            if char_id in known_spells:
                spells = known_spells[char_id]
                for s_id in spells:
                    spell_id = str(s_id)
                    if spell_id in pet_mount_items:
                        spell_item = pet_mount_items[spell_id]
                        account_items[spell_id] = spell_item

        # Add pets and mounts for chars that don't already have them and can use them
        for char_id in merged_chars:
            char = merged_chars[char_id]
            char_faction = check_faction(char['race'])
            for s_id in account_items:
                item = account_items[s_id]

                # Change to opposing faction pet/mount if faction equivalents exist
                if s_id in faction_spells:
                    faction_spell = faction_spells[s_id]
                    faction_spell_faction = faction_spell['faction']
                    faction_match = char_faction == faction_spell_faction
                    opp_faction_spell = str(faction_spell['oppFactionSpell'])
                    opp_faction_spell_known = opp_faction_spell in account_items

                    # Skip if opposing faction spell already known on account level
                    if not faction_match and opp_faction_spell_known:
                        continue
                    # Change ID/item data if opp faction spell not known on account level
                    elif not faction_match and not opp_faction_spell_known:
                        s_id = opp_faction_spell
                        item = pet_mount_items[s_id]

                # Check to see if character has high enough riding skill
                skill_exists = char_id in char_riding_skills
                char_skill = char_riding_skills[char_id] if skill_exists else 0
                # Switch required profession skill for riding skill with eng/tailoring mounts
                # This allows any character to use these mounts without the professions
                profession_spell = s_id in profession_spells
                skill_rank = item['requiredskillrank']
                req_skill = profession_spells[s_id] if profession_spell else skill_rank
                skill_match = char_skill >= req_skill

                # Check to see if character and pet/mount factions match
                req_faction = item['allowablerace']
                spell_is_alliance = req_faction == 68 or req_faction == 1101
                char_is_alliance = char_faction == 'alliance'
                alliance_match = spell_is_alliance and char_is_alliance
                spell_is_horde = req_faction == 690
                char_is_horde = char_faction == 'horde'
                horde_match = spell_is_horde and char_is_horde
                neutral_match = req_faction == -1 or req_faction == 32767
                faction_match = alliance_match or horde_match or neutral_match

                # Check to see if character meets all requirements
                char_can_use = skill_match and faction_match
                already_known = char_id in known_spells and int(s_id) in known_spells[char_id]
                if char_can_use and not already_known:
                    args.append({
                        'guid': char_id,
                        'spell_id': s_id
                    })

    return args
