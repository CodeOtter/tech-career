
module.exports = () => {
  return {
    name: "Programmer",
    description: "Programmer spend years learning to harness digital forces to impose their will on the world around them. As techies, they tend to be less influential than Managers and less stout than Support. Their powerful scripts keep them alive and allow them to wreak havoc... as long as they have the focus to write them.",
    abilityTable: {
      1: { spells: ["doxx"]},
      2: { spells: ["cripple"]},
      5: { spells: ["hack"] }
    },

    setupPlayer: player => {
      player.addAttribute("mana", 100);
      player.prompt = "[ %health.current%/%health.max% <b>hp</b> %mana.current%/%mana.max% <b>focus</b> ]";
    }
  };
};
