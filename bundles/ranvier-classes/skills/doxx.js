'use strict';

/**
 * Basic mage spell
 */
module.exports = (srcPath) => {
  const Broadcast = require(srcPath + 'Broadcast');
  const SkillType = require(srcPath + 'SkillType');

  const manaCost = 0;

  return {
    name: 'Doxx',
    type: SkillType.SPELL,
    requiresTarget: true,
    initiatesCombat: false,
    resource: {
      attribute: 'mana',
      cost: manaCost,
    },
    cooldown: 1,

    run: state => function (args, player, target) {
      console.log(target);
      Broadcast.sayAt(player, '<bold>We be doxxin</bold>');
    },

    info: (player) => {
      return `Doxxes a target`;
    }
  };
};
