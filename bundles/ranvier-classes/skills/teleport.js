/**
 * Teleport skill
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
      if(/^[a-zA-Z_\-0-9]+\:[0-9]+$/.test(target)) {        return Broadcast.sayAt(player, 'No such area:room reference exists.');
      }
      
      var targetRoom = state.RoomManager.getRoom(target);
      if (!targetRoom) {
        return Broadcast.sayAt(player, 'That room:area doesn\'t exist');
      }
                               
      const oldRoom = player.room;
      
      player.moveTo(targetRoom, () => {
        Broadcast.sayAt(player, '<b><green>You snap your finger and instantly appear in a new room.</green></b>\r\n');
        state.CommandManager.get('look').execute('', player);
        if (player.isInCombat()) {
          player.removeFromCombat();
        }
        player.followers.forEach(follower => {
            follower.unfollow();
            if (follower instanceof Player) {
                Broadcast.sayAt(follower, `You stop following ${player.name}.`)
            }
        });
        Broadcast.sayAt(oldRoom, `${player.name} teleported away.`);
        Broadcast.sayAtExcept(targetRoom, `${player.name} teleported here.`, player);
      });
    },


    info: () => {
      return `Teleport to room `;
    }
  };
};