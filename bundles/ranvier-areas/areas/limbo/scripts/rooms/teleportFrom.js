'use strict';

module.exports = (srcPath) => {
  const Broadcast = require(srcPath + 'Broadcast');
  return {
    listeners: {
      command: state => function(player, commandName, arg) {
        if(commandName === 'portal') {
          var oldRoom = player.room;
          var targetRoom = state.RoomManager.getRoom('limbo:23');
          player.moveTo(targetRoom, () => {
            Broadcast.sayAt(player, `You are instantly teleported elsewhere`);
            Broadcast.sayAt(oldRoom, `${player.name} teleported away.`);
            Broadcast.sayAtExcept(targetRoom, `${player.name} teleported here.`, player);
            state.CommandManager.get('look').execute('', player);
          });
        }
      }
    }
  };
};
