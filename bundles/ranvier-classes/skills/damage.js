'use strict';

/**
 * Basic mage spell
 */
module.exports = (srcPath) => {
  const Broadcast = require(srcPath + 'Broadcast');
  const Damage = require(srcPath + 'Damage');
  const SkillType = require(srcPath + 'SkillType');

  const damagePercent = 50;
  const manaCost = 20;

  function getDamage(player) {
    return player.getAttribute('intellect') * (damagePercent / 50);
  }

  return {
    name: 'damage',
    type: SkillType.SPELL,
    requiresTarget: true,
    initiatesCombat: true,
    resource: {
      attribute: 'mana',
      cost: manaCost,
    },
    cooldown: 10,

    run: state => function (args, player, target) {
      const damage = new Damage({
        attribute: 'health',
        amount: getDamage(player),
        attacker: player,
        type: 'physical',
        source: this
      });

      Broadcast.sayAt(player, '<bold>You be causin <red>damage</red>, congrats.</bold>');
      Broadcast.sayAtExcept(player.room, `<bold> ${player.name} be causin <red>damage</red> to ${target.name}!</bold>`, [player, target]);
      if (!target.isNpc) {
        Broadcast.sayAt(target, `<bold> ${player.name} is about to mess your whole shit up</bold>`);
      }
      damage.commit(target);
    },

    info: (player) => {
      return `Hurl a magical damage spell at your target dealing ${damagePercent}% of your Intellect as Fire damage.`;
    }
  };
};