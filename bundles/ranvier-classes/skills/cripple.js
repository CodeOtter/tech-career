'use strict';

/**
 * DoT (Damage over time) skill
 */
module.exports = (srcPath) => {
  const Broadcast = require(srcPath + "Broadcast");
  const SkillType = require(srcPath + "SkillType");

  // config placed here just for easy copy/paste of this skill later on
  const cooldown = 20;
  const cost = 50;
  const duration = 15 * 1000;
  const tickInterval = 3;
  
  return {
    name: "CSripple",
    type: SkillType.SKILL,
    requiresTarget: true,
    initiatesCombat: true,
    resource: {
      attribute: "energy",
      cost
    },
    cooldown,

    run: state => function (args, player, target) {
      const effect = state.EffectFactory.create(
        "skill.cripple",
        target,
        {
          duration,
          description: this.info(player),
          tickInterval
        },
        {
          totalDamage: 0
        }
      );
      effect.skill = this;
      effect.attacker = player;

      Broadcast.sayAt(player, `<red>You are crippling the shit out of <bold>${target.name}</bold>!</red>`);
      Broadcast.sayAtExcept(player.room, `<red>${player.name} cripples the shit out of ${target.name}.</red>`, [target, player]);
      Broadcast.sayAt(target, `<red>${player.name} fucked up your whole day with cripple!</red>`);
      target.addEffect(effect);
    },

    info: () => {
      return `Cripple the target for <bold>${duration / 1000}</bold> seconds.`;
    }
  };
};
