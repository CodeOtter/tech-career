const noop = function () {};
const AREA_REGEX = /^[a-zA-Z_\-0-9]+\:[0-9]+$/;

var loaded = false;
var Broadcast;

module.exports = {
  /**
   * [initialize description]
   * @param  {[type]} srcPath [description]
   * @return {[type]}         [description]
   */
  initialize: function initialize (srcPath) {
    if(!loaded) {
      Broadcast = require(srcPath + 'Broadcast');

      loaded = true;
    }
  },

  /**
   * [teleport description]
   * @param  {[type]}   state    [description]
   * @param  {[type]}   messages [description]
   * @param  {[type]}   player   [description]
   * @param  {[type]}   target   [description]
   * @param  {Function} done     [description]
   * @return {[type]}            [description]
   */
  teleport: function teleport(state, messages, player, target, done) {
    if (AREA_REGEX.test(target) === false) {
      return Broadcast.sayAt(player, 'No such area:room (' + target + ') reference exists.');
    }

    var targetRoom = state.RoomManager.getRoom(target);
    if (!targetRoom) {
      return Broadcast.sayAt(player, 'That room:area (' + target + ') doesn\'t exist');
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
          Broadcast.sayAt(follower, `You stop following ${player.name}.`);
        }
      });
      
      if(messages) {
        Broadcast.sayAt(oldRoom,  messages.toRoom || `${player.name} teleported away.`);
        Broadcast.sayAtExcept(targetRoom,  messages.toTarget || `${player.name} teleported here.`, player);
      }
      
      (done || noop)();
    });
  }
};
