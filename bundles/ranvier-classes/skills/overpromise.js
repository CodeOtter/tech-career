'use strict';

/**
 * DoT (Damage over time) skill
 */
module.exports = (srcPath) => {
  const Broadcast = require(srcPath + 'Broadcast');
  const SkillType = require(srcPath + 'SkillType');

  // config placed here just for easy copy/paste of this skill later on
  const attribute = 'strength';
  const cooldown = 20;
  const cost = 50;
  const duration = 15 * 1000;
  const tickInterval = 3;
  const damagePercent = 400;

  const totalDamage = player => {
    return player.calculateWeaponDamage() * (damagePercent / 100);
  };

  return {
    name: 'Overpromise',
    type: SkillType.SKILL,
    requiresTarget: true,
    initiatesCombat: true,
    resource: {
      attribute: 'energy',
      cost,
    },
    cooldown,

    run: state => function (args, player, target) {
      const effect = state.EffectFactory.create(
        'skill.overpromise',
        target,
        {
          duration,
          description: this.info(player),
          tickInterval,
        },
        {
          totalDamage: totalDamage(player),
        }
      );
      effect.skill = this;
      effect.attacker = player;

      Broadcast.sayAt(player, `<red>With a flash of inspiration, you create technical debt against <bold>${target.name}</bold>!</red>`);
      Broadcast.sayAtExcept(player.room, `<red>${player.name} creates technical debt against ${target.name}.</red>`, [target, player]);
      Broadcast.sayAt(target, `<red>${player.name} burdens you with technical debt!</red>`);
      target.addEffect(effect);
    },

    info: (player) => {
      return `Saddle a target with technical debt, dealing <bold>${damagePercent}%</bold> weapon damage over <bold>${duration / 1000}</bold> seconds.`;
    }
  };
};
