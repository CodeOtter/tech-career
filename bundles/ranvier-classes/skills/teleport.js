/**
 * Teleport skill
 */
module.exports = (srcPath) => {
  const Broadcast = require(srcPath + "Broadcast");
  const SkillType = require(srcPath + "SkillType");

  // config placed here just for easy copy/paste of this skill later on
  const cooldown = 20;
  const cost = 50;
  
  return {
    name: "Teleport",
    type: SkillType.SPELL,
    requiresTarget: false,
    initiatesCombat: true,
    resource: {
      attribute: "mana",
      cost
    },
    cooldown,

    run: state => function (args, player, target) {
      Rules.teleport(state, {
        toPlayer: '<b><green>You snap your finger and instantly appear in a new room.</green></b>\r\n',
        toRoom: `${player.name} teleported away.`,
        toTarget: `${player.name} teleported here.`
      }, player, target);
                               
    },


    info: () => {
      return `Teleport to room `;
    }
  };
};