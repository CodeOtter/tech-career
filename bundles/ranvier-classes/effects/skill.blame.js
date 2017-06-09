'use strict';

module.exports = srcPath => {
  const Broadcast = require(srcPath + 'Broadcast');
  const Heal = require(srcPath + 'Heal');
  const Player = require(srcPath + 'Player');
  const Flag = require(srcPath + 'EffectFlag');

  return {
    config: {
      name: 'Blaming',
      description: "You are blaming subordinates for everything!",
      type: 'skill:blame',
    },
    flags: [Flag.BUFF],
    state: {
      magnitude: 1,
      type: "physical"
    },
    modifiers: {
      outgoingDamage: (damage, current) => current,
      incomingDamage: function (damage, currentAmount) {
        if (damage instanceof Heal || damage.attribute !== 'health') {
          return currentAmount;
        }

        const absorbed = Math.min(this.state.remaining, currentAmount);
        const partial = this.state.remaining < currentAmount ? ' partially' : '';
        this.state.remaining -= absorbed;
        currentAmount -= absorbed;

        Broadcast.sayAt(this.target, `You${partial} blame the subordinate, preventing <bold>${absorbed}</bold> damage!`);
        if (!this.state.remaining) {
          this.remove();
        }

        return currentAmount;
      }
    },
    listeners: {
      effectActivated: function () {
        this.state.remaining = this.state.magnitude;

        if (this.target instanceof Player) {
          this.target.addPrompt('shieldblock', () => {
            const width = 60 - "Shield ".length;
            const remaining = `<b>${this.state.remaining}/${this.state.magnitude}</b>`;
            return "<b>Subordinate patience</b> " + Broadcast.progress(width, (this.state.remaining / this.state.magnitude) * 100, "white") + ` ${remaining}`;
          });
        }
      },

      effectDeactivated: function () {
        Broadcast.sayAt(this.target, 'Your subordinate submits, unable to take any more blame.');
        if (this.target instanceof Player) {
          this.target.removePrompt('shieldblock');
        }
      }
    }
  };
};
