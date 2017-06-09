'use strict';

/**
 * Basic manager passive
 */
module.exports = (srcPath) => {

  const SkillType = require(srcPath + 'SkillType');
  const SkillFlag = require(srcPath + 'SkillFlag');

  const interval = 2 * 60;
  const threshold = 30;
  const restorePercent = 50;

  return {
    name: 'Lie',
    type: SkillType.SKILL,
    flags: [SkillFlag.PASSIVE],
    effect: "skill.lie",
    cooldown: interval,

    configureEffect: effect => {
      effect.state = Object.assign(effect.state, {
        threshold: threshold,
        restorePercent: restorePercent,
      });

      return effect;
    },

    info: function (player) {
      return `Once every ${interval / 60} minutes, when dropping below ${threshold} influence, restore ${restorePercent}% of your max influence.`;
    }
  };
};
