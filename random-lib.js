const { random, floor, ceil } = Math


/**
 * The maximum is exclusive and the minimum is inclusive
 * @param {number} min 
 * @param {number} max 
 */
function randomFloat(min, max) {
  return random() * (max - min) + min
}


function randomInt(min, max) {
  return floor(randomFloat(min, max))
}


function pick(array) {
  return array[randomInt(0, array.length)]
}


function rollDice(diceValue) {
  return randomInt(0, diceValue) + 1
}


function shuffleArray(array) {
  for (let i = 0; i < array.length; i++) {
    const swapIndex = randomInt(0, array.length)
    const tempItem = array[swapIndex]
    array[swapIndex] = array[i]
    array[i] = tempItem
  }
  return array
}


/**
 * Picks the random item based on its weight.
 * The items with higher weight will be picked more often (with a higher probability).
 * @param {any[]} items
 * @param {number[]} weights
 */
function weightedRandom(items, weights) {
  if (items.length !== weights.length) {
    throw new Error('Items and weights must be of the same size')
  }

  if (!items.length) {
    throw new Error('Items must not be empty')
  }

  // Preparing the cumulative weights array.
  const cumulativeWeights = []
  for (let i = 0; i < weights.length; i += 1) {
    cumulativeWeights[i] = weights[i] + (cumulativeWeights[i - 1] || 0)
  }

  // Getting the random number in a range of [0...sum(weights)]
  const maxCumulativeWeight = cumulativeWeights[weights.length - 1]
  const randomNumber = maxCumulativeWeight * random()

  // Picking the random item based on its weight.
  // The items with higher weight will be picked more often.
  for (let i = 0; i < items.length; i += 1) {
    if (randomNumber < cumulativeWeights[i]) {
      return items[i]
    }
  }
}


/**
 * Randomly select n elements from an array without repetition.
 * The number of elements must be greater than 0.
 * @param {array} array 
 * @param {number} n 
 */
function pickN(array, n = 1) {
  if (n <= 0) {
    return []
  }

  const amountOfElementsToLeave = array.length - n
  let resultArray = [...array]
  for (let i = 0; i < amountOfElementsToLeave; i += 1) {
    resultArray.splice(randomInt(0, resultArray.length), 1)
  }
  return resultArray
}