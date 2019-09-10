const maxProficiencyRating = 500;

const randProfRating = () => 
  Math.floor(Math.random()*(maxProficiencyRating + 1)
);

module.exports = randProfRating;