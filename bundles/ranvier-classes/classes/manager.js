'use strict';

/**
 * This example definition of a class file is a guideline. The class system is
 * left intentionally vague so as to not be too opinionated. Class files are
 * assumed to be js files instead of blank yaml files just to future proof the
 * bundle-loading of class files in case someone wants extra functionality in
 * their classes.
 */
module.exports = srcPath => {
  return {
    name: 'Manager',
    description: 'Defenders of the higher-ups. Managers wield the favor of their superiors to heal the quarterlies, protect their jobs, and smite their underlings ambitions. They may not wield as much raw intellectual power as Programmers but their ability to keep themselves alive in the face of layoffs has no equal.',

    abilityTable: {
      3: { skills: ['overpromise'] },
      5: { skills: ['prioritize'] },
      7: { skills: ['blame'] },
     10: { skills: ['lie'] },
    },

    setupPlayer: player => {
      player.addAttribute('energy', 100);
      player.prompt = '[ %health.current%/%health.max% <b>hp</b> %energy.current%/%energy.max% <b>influence</b> ]';
    }
  };
};
