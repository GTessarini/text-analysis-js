if(process.argv.length !== 3){
  console.error('Only file directory expected as argument!');
  process.exit(1);
}
const fileDirectory = process.argv[2];
const fs = require("fs");
const characterPattern = /[A-Z]/gi;
const wordPattern = /\w+/g;

const sanitizeText = (text) => {
  return text.trim().normalize('NFD').replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

const getCharacters = (text) => {
  return text.match(characterPattern);
}

const getWords = (text) => {
  return text.match(wordPattern);
}

const countCharacters = (text) => {
  return getCharacters(text).length;
}

const countWords = (text) => {
  return getWords(text).length;
}

const getCharacterOccurence = (text) => {
  const characters = getCharacters(text);
  let charactersOccurence = {};
  characters.forEach(character => {
    if(charactersOccurence[character]){
      charactersOccurence[character]++; 
    }else{
        charactersOccurence[character] = 1;
    }
  });
  return charactersOccurence;
}

const getWordOccurence = (text) => {
  const words = getWords(text);
  let wordsOccurence = {};
  words.forEach(word => {
    if(wordsOccurence[word]){
      wordsOccurence[word]++; 
    }else{
      wordsOccurence[word] = 1;
    }
  });
  return wordsOccurence;
}

const getCharacterFrequency = (text) => {
  const getCharactersSum = (charactersOccurence) => {
    let charactersSum = 0;
    for(characterKey in charactersOccurence){
      charactersSum += charactersOccurence[characterKey];
    }
    return charactersSum;
  }
  const getCharacterPercentage = (charactersOccurence, charactersSum) => {
    let charactersFrequencyList = {};
    for(characterKey in charactersOccurence){
      charactersFrequencyList[characterKey] = `${(charactersOccurence[characterKey]*100/charactersSum).toFixed(2)}%`;
    }
    return charactersFrequencyList;
  }
  const charactersOccurence = getCharacterOccurence(text);
  const charactersSum = getCharactersSum(charactersOccurence);
  return getCharacterPercentage(charactersOccurence, charactersSum);
}

const getWordFrequency = (text) => {
  const getWordsSum = (wordsOccurence) => {
    let wordsSum = 0;
    for(wordKey in wordsOccurence){
      wordsSum += wordsOccurence[wordKey];
    }
    return wordsSum;
  }
  const getWordPercentage = (wordsOccurence, wordsSum) => {
    let wordsFrequencyList = {};
    for(wordKey in wordsOccurence){
      wordsFrequencyList[wordKey] = `${(wordsOccurence[wordKey]*100/wordsSum).toFixed(2)}%` ;
    }
    return wordsFrequencyList;
  }
  const wordsOccurence = getWordOccurence(text);
  const wordsSum = getWordsSum(wordsOccurence);
  return getWordPercentage(wordsOccurence, wordsSum);
}

const getMostCommonWord = (text) => {
  const wordOccurence = getWordOccurence(text);
  return Object.keys(wordOccurence).reduce((firstKey, nextKey) => wordOccurence[firstKey] > wordOccurence[nextKey] ? firstKey : nextKey);
}

const getLeastCommonWord = (text) => {
  const wordOccurence = getWordOccurence(text);
  return Object.keys(wordOccurence).reduce((firstKey, nextKey) => wordOccurence[firstKey] < wordOccurence[nextKey] ? firstKey : nextKey);
}

const readFile = (fileDirectory) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileDirectory, 'utf8', ((error, data) => {
      if (data) {
        console.log('File found properly.');
        resolve(data);
      } else {
        console.error('File not found!');
        reject(new Error(error));
      }
    }));
  });
};

Promise.resolve(readFile(fileDirectory))
  .then((dataFile) => {
    const text = sanitizeText(dataFile);
    console.log("\n ---------------------------------------- \n");
    console.log(`>> Alphabetic characters count: ${countCharacters(text)} \n`);
    console.log(`>> Words count: ${countWords(text)} \n`);
    console.log(">> Alphabetic characters frequency:");
    console.log(getCharacterFrequency(text));
    console.log("\n>> Words frequency:");
    console.log(getWordFrequency(text));    
    console.log(`\n>> Most common word: ${getMostCommonWord(text)} \n`);
    console.log(`>> Least common word: ${getLeastCommonWord(text)} \n`);
    console.log("\n ---------------------------------------- \n");
  })
  .catch(error => {
    throw new Error(error);
  });

/* Gabriel Tessarini - 03/2019 */