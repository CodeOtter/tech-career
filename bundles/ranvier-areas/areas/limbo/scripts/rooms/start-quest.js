module.exports = () => {
  return  {
    listeners: {
      // Set up a listener for when a player enters the room
      playerEnter: state => function (player) {
        // use the QuestFactory from the GameState to find quest `limbo:1` (Find a Weapon)
        let quest = state.QuestFactory.create(state, "limbo:5", player);

        if (player.questTracker.canStart(quest)) {
          player.questTracker.start(quest);
        }

        // It's as simple as that: get the quest, check if the player can start it, start it
      }
    }
  };
};
