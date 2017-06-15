
module.exports = srcPath => {
  const Broadcast = require(srcPath + "Broadcast");
  const Flag = require(srcPath + "EffectFlag");

  return {
    config: {
      name: "crippled",
      type: "skill.cripple"
    },
    flags: [Flag.DEBUFF],
    state: {
      stat: "strength",
      magnitude: 1
    },
    modifiers: {
      attributes: function (attribute, current) {
        if (attribute !== this.state.stat) {
          return current;
        }

        return current - this.state.magnitude;
      }
    },
    listeners: {
      effectActivated: function () {
        Broadcast.sayAt(this.target, "You are crippled bitch!");
      },

      effectDeactivated: function () {
        Broadcast.sayAt(this.target, "Cripple over...everyone go home.");
      }
    }
  };
};

