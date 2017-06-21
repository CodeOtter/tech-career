const noop = function () {};

module.exports = (srcPath) => {
    const Broadcast = require(srcPath + 'Broadcast');

    return {
      teleport: function teleport(state, messages, player, target, done) {
        if (/^[a-zA-Z_\-0-9]+\:[0-9]+$/.test(target)) {
            return Broadcast.sayAt(player, 'No such area:room reference exists.');
        }

        var targetRoom = state.RoomManager.getRoom(target);
        if (!targetRoom) {
          return Broadcast.sayAt(player, 'That room:area doesn\'t exist');
        }

        const oldRoom = player.room;

        player.moveTo(targetRoom, () => {
          if(messages) {
            Broadcast.sayAt(player,  messages.toPlayer || '<b><green>You snap your finger and instantly appear in a new room.</green></b>\r\n');
          }
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
          
          if(messages) {
            Broadcast.sayAt(oldRoom,  messages.toRoom || `${player.name} teleported away.`);
            Broadcast.sayAtExcept(targetRoom,  messages.toTarget `${player.name} teleported here.`, player);
          }
          
          (done || noop)()
        });
      }
    };
  }
};