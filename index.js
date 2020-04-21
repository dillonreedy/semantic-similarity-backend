var cors = require('cors');
var express = require('express');
var synonyms = require("synonyms");
var fs = require('fs');

require('dotenv').config();
const corsOptions = {
    origin: 'https://pipeline-semantic-274917.uc.r.appspot.com'
}
  

const port = 8080;

const app = express();
//app.use(cors());


let semanticDescriptors = {};

function putInArray(word, syns) {
    let result = [];
    Object.values(syns).forEach(value => result.push(...value));
    
    result.splice(result.indexOf(word), 1);
    return result;
}

function getWordAndSynonym() {
    let word = getRandomWord();
    let syn = undefined;
    let syns = synonyms(word);

    if (syns !== undefined)
    {
        let shuffledSyns = shuffle(putInArray(word, syns));
        shuffledSyns.forEach(synonym => {
            if (synonym in semanticDescriptors) syn = synonym;
        });
    }

    return [word, syn];
}

function cosineSimilarity(vec1, vec2) {
    let sum = 0;
    let dividendSumLeft = 0;
    let dividendSumRight = 0;
    Object.keys(vec1).forEach(key => {
        if (key in vec2) sum += vec1[key]*vec2[key];
        dividendSumLeft+=vec1[key]*vec1[key];
    });

    Object.keys(vec2).forEach(key => dividendSumRight+=vec2[key]*vec2[key]);

    return Math.floor((sum / Math.sqrt(dividendSumLeft*dividendSumRight))*100);
}

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
  
    return array;
  }

app.get('/getQuestion', cors(corsOptions), (req, res) => {

    let [word, syn] = getWordAndSynonym();

    while (syn === undefined || word === syn) {
        [word, syn] = getWordAndSynonym();
    }

    let words = [{ word, percentage: cosineSimilarity(semanticDescriptors[word], semanticDescriptors[syn]) }];

    while (words.length !== 4)
    {
        let randomWord = getRandomWord();
        if (randomWord !== syn && !words.map(elem => elem.word).includes(randomWord)) 
            words.push({ 
                word: randomWord, 
                percentage: cosineSimilarity(semanticDescriptors[randomWord], semanticDescriptors[syn]) 
            });
    }

    words = shuffle(words);
    let result = {
        synonym: syn,
        answer: word,
        words,
    }
    res.send(result);
});

function getRandomWord() {
    let numWords = Object.keys(semanticDescriptors).length;
    let randomIndex = Math.floor(Math.random()*numWords);
    return Object.keys(semanticDescriptors)[randomIndex];
}

function sanitizeSentences(sentences) {
    let result = [];
    sentences.forEach(sentence => {
        // Replace all newline, tab, and carriage return with the space character
        sentence = sentence.replace(/\n|\t|\r/g, ' ');
        // Remove all instances of digits
        sentence = sentence.replace(/[0-9]/g, '');
        // Remove all instances of puncutation in the sentences.
        sentence = sentence.replace(/[‘“”’—.,\/#!$%\^&\*;:\{\}=\-_`~\(\)\[\]"']/g,"")
        // Replace all instances of 2 or more spaces with a single space.
        sentence = sentence.replace(/  +/g, ' ');

        result.push(sentence.trim().toLowerCase().split(' '));
    });
    return result;
}

function addToSemanticDescriptors(sentences) {
    sentences.forEach(sentence => {
        
        sentence.forEach(word => {
            if (!(word in semanticDescriptors)) semanticDescriptors[word] = {};
        });

        for (let i = 0; i < sentence.length; i++)
        {
            for (let j = i+1; j < sentence.length; j++)
            {
                if (sentence[i] !== sentence[j])
                {
                    if (!(sentence[j] in semanticDescriptors[sentence[i]])) 
                        semanticDescriptors[sentence[i]][sentence[j]] = 0;
                    semanticDescriptors[sentence[i]][sentence[j]]++;

                    if (!(sentence[i] in semanticDescriptors[sentence[j]]))
                        semanticDescriptors[sentence[j]][sentence[i]] = 0;
                    semanticDescriptors[sentence[j]][sentence[i]]++;
                }
            }
        }

    });
}

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
    var files = fs.readdirSync('./books/');
    
    files.forEach(file => {
        fs.readFile(`./books/${file}`, 'utf-8', (err, data) => {
            if (err) throw err;
            sentences = data.split(/[\.!\?]/);
            sentences = sanitizeSentences(sentences);
            addToSemanticDescriptors(sentences);
        });        
    });
});