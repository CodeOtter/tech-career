'use strict';

module.exports = srcPath => {
  return {
    name: 'Support',
    description: 'Support relish being face-to-face with their conflict. Whether it be wielding support tickets, emails, gossip, or a batch script, Support focus on making sure Programmers and Managers reach their goals.  What they lack in the raw influential power of a Manager, or the systems prowess of a Programmer, Support make up for in their tenacity. Those choosing the more defensive path of the diplomat can outlast otherwise deadly layoffs.',

    abilityTable: {
      3: { skills: ['engage'] },
      5: { skills: ['plea'] },
      7: { skills: ['solve'] },
    },

    setupPlayer: player => {
      // Support use Favor, with a max of 10. Favor is a generated resource and returns to 0 when out of combat
      player.addAttribute('favor', 10, -10);
      player.prompt = '[ <b><red>%health.current%</red></b>/<red>%health.max%</red> <b>hp</b> <b><yellow>%favor.current%</yellow></b>/<yellow>%favor.max%</yellow> <b>favor</b> ]';
    }
  };
};
