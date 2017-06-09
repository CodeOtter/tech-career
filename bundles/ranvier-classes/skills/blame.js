'use strict';

/**
 * Damage mitigation skill
 */
module.exports = (srcPath) => {
  const Broadcast = require(srcPath + 'Broadcast');
  const SkillType = require(srcPath + 'SkillType');

  // config placed here just for easy configuration of this skill later on
  const attribute = 'strength';
  const cooldown = 45;
  const cost = 50;
  const healthPercent = 15;
  const duration = 20 * 1000;

  const totalDamage = player => {
    return player.calculateWeaponDamage() * (damagePercent / 100);
  };

  return {
    name: 'Blame',
    type: SkillType.SKILL,
    requiresTarget: false,
    resource: {
      attribute: 'energy',
      cost,
    },
    cooldown,

    run: state => function (args, player, target) {
      if (!player.equipment.has('shield')) {
        Broadcast.sayAt(player, "You aren't wearing a subordinate!");
        return false;
      }

      const effect = state.EffectFactory.create(
        'skill.blame',
        player,
        {
          duration,
          description: this.info(player),
        },
        {
          magnitude: Math.round(player.getMaxAttribute('health') * (healthPercent / 100))
        }
      );
      effect.skill = this;

      Broadcast.sayAt(player, `<b>You blame your subordinate, bracing for incoming layoffs!</b>`);
      Broadcast.sayAtExcept(player.room, `<b>${player.name} blames their subordinate, bracing for incoming layoffs.</b>`, [player]);
      player.addEffect(effect);
    },

    info: (player) => {
      return `Blame your subordinate up to <bold>${healthPercent}%</bold> of your maximum health for <bold>${duration / 1000}</bold> seconds. Requires a subordinate.`;
    }
  };
};

