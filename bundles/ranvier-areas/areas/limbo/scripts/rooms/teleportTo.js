'use strict';

module.exports = (srcPath) => {
  const Rules = require(srcPath + '../rules');

  return {
    listeners: {
      command: state => function(player, commandName, arg) {
        if(commandName === 'portal') {
          Rules.teleport(state, {
            toPlayer: `You are instantly teleported elsewhere`,
            toRoom: `${player.name} teleported away.`,
            toTarget: `${player.name} teleported here.`
          }, player, 'limbo:34');
        }
      }
    }
  };
};
