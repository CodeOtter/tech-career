'use strict';

/**
 * Implementation effect for second wind skill
 */
module.exports = srcPath => {
  const Broadcast = require(srcPath + 'Broadcast');
  const Heal = require(srcPath + 'Heal');
  const Flag = require(srcPath + 'EffectFlag');

  return {
    config: {
      name: 'Lie',
      type: 'skill:lie'
    },
    flags: [Flag.BUFF],
    listeners: {
      damaged: function (damage) {
        if (damage.attribute !== 'energy') {
          return;
        }

        if (this.skill.onCooldown(this.target)) {
          return;
        }

        if ((this.target.getAttribute('energy') / this.target.getMaxAttribute('energy')) * 100 > this.state.threshold) {
          return;
        }

        Broadcast.sayAt(this.target, "<bold><yellow>You lie!</bold></yellow>");
        const heal = new Heal({
          amount: Math.floor(this.target.getMaxAttribute('energy') * (this.state.restorePercent / 100)),
          attacker: this.target,
          attribute: 'energy',
          source: this.skill
        });
        heal.commit(this.target);

        this.skill.cooldown(this.target);
      }
    }
  };
};
