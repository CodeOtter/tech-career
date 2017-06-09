'use strict';

/**
 * Implementation effect for a Rend damage over time skill
 */
module.exports = srcPath => {
  const Broadcast = require(srcPath + 'Broadcast');
  const Damage = require(srcPath + 'Damage');
  const Flag = require(srcPath + 'EffectFlag');

  return {
    config: {
      name: 'Overpromise',
      type: 'skill:overpromise',
    },
    flags: [Flag.DEBUFF],
    listeners: {
      effectActivated: function () {
        Broadcast.sayAt(this.target, "<bold><red>You've suffered technical debt, it's bleeding profusely</red></bold>");
      },

      effectDeactivated: function () {
        Broadcast.sayAt(this.target, "You've gotten over the technical debt.");
      },

      updateTick: function () {
        const amount = Math.round(this.state.totalDamage / Math.round((this.config.duration / 1000) / this.config.tickInterval));

        const damage = new Damage({
          attribute: "health",
          amount,
          attacker: this.attacker,
          source: this
        });
        damage.commit(this.target);
      },

      killed: function () {
        this.remove();
      }
    }
  };
};
