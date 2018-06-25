import DBCEntity from '../dbc/Entity';
import { contains } from '../utils/string';

import NPCTraining from './NPCTraining';
import Quest from './Quest';
import SpellIcon from './SpellIcon';

class Spell extends DBCEntity {
  static get dbc() {
    return 'Spell';
  }

  static search(query, searchQuery) {
    query.filter(spell => contains(spell.name, searchQuery));
  }

  async icon() {
    const entry = await SpellIcon.find(this.data.iconID);
    return entry ? entry.file : null;
  }

  rewardFrom() {
    const { id } = this;
    return Quest.query
      .orWhere({ RewardSpell: id })
      .orWhere({ RewardDisplaySpell: id });
  }

  taughtBy() {
    return NPCTraining.query.where({ SpellID: this.id });
  }
}

export default Spell;
