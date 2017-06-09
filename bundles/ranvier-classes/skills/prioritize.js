'use strict';

/**
 * Basic manager attack
 */
module.exports = (srcPath) => {
  const Broadcast = require(srcPath + 'Broadcast');
  const Damage = require(srcPath + 'Damage');
  const SkillType = require(srcPath + 'SkillType');

  const damagePercent = 250;
  const energyCost = 20;

  function getDamage(player) {
    return player.calculateWeaponDamage() * (damagePercent / 100);
  }

  return {
    name: 'Prioritize',
    type: SkillType.SKILL,
    requiresTarget: true,
    initiatesCombat: true,
    resource: {
      attribute: 'energy',
      cost: energyCost,
    },
    cooldown: 6,

    run: state => function (args, player, target) {
      const damage = new Damage({
        attribute: 'health',
        amount: getDamage(player),
        attacker: player,
        type: 'physical',
        source: this
      });

      Broadcast.sayAt(player, '<red>You shift your priorities and let loose a mighty pivot!</red>');
      Broadcast.sayAtExcept(player.room, `<red>${player.name} reprioritizes everything on ${target.name}!</red>`, [player, target]);
      if (!target.isNpc) {
        Broadcast.sayAt(target, `<red>${player.name} reprioritizes your work load!</red>`);
      }
      damage.commit(target);
    },

    info: (player) => {
      return `Reprioritize the work load of a target dealing <bold>${damagePercent}%</bold> weapon damage.`;
    }
  };
};
