import { ClassicListenersCollector } from "@empirica/core/admin/classic";
export const Empirica = new ClassicListenersCollector();

Empirica.onGameStart(({ game }) => {
  const postLength = 3

  // Create an array of paired data
  const contentPairs = [
    { fileId: 1, name: 'oats' },
    { fileId: 0, name: 'cats' },
    { fileId: 2, name: 'politics' }
  ]

  // Store the shuffled sequence in the game. This is used later - very practical.
  game.set('contentOrder', contentPairs.map((pair, index) => ({
    position: index,
    fileId: pair.fileId,
    name: pair.name
  })));

  for (let i = 0; i < postLength; i++) {
    const round = game.addRound({
      name: contentPairs[i].fileId,
      roundId: i,
      contentName: contentPairs[i].name,
      createdAt: new Date().toISOString()
    });
    round.addStage({
      name: 'media', duration: 6000
    });
  }

});


Empirica.onRoundStart(({ round }) => { });

Empirica.onStageStart(({ stage }) => { });

Empirica.onStageEnded(({ stage }) => { });

Empirica.onRoundEnded(({ round }) => { });

Empirica.onGameEnded(({ game }) => { });