/**
 * Created by saba on 9/9/16.
 */


var alphabet =
{
    "ა": 1,
    "ბ": 2,
    "გ": 3,
    "დ": 3,
    "ე": 1,
    "ვ": 4,
    "ზ": 6,
    "თ": 4,
    "ი": 1,
    "კ": 4,
    "ლ": 2,
    "მ": 2,
    "ნ": 3,
    "ო": 1,
    "პ": 6,
    "ჟ": 9,
    "რ": 2,
    "ს": 2,
    "ტ": 4,
    "უ": 2,
    "ფ": 4,
    "ქ": 5,
    "ღ": 6,
    "ყ": 6,
    "შ": 4,
    "ჩ": 5,
    "ც": 4,
    "ძ": 7,
    "წ": 4,
    "ჭ": 7,
    "ხ": 4,
    "ჯ": 8,
    "ჰ": 10,
    "*": 0
};

var vowels = ["ა", "ე", "ი", "ო", "უ"];
var consonants = ["ბ", "გ", "დ", "ვ", "ზ", "თ", "კ", "ლ", "მ", "ნ", "პ", "ჟ", "რ", "ს", "ტ", "ფ", "ქ", "ღ", "ყ", "შ",
    "ჩ", "ც", "ძ", "წ", "ჭ", "ხ", "ჯ", "ჰ", '*'];


var cards = {};
var currentCardInDeck = 0;
var vowelChance = 0.4;
var player0 = [];   // human player
var player1 = [];
var players = [player0, player1];
var board = [];
var difficultyLevel = 0.7;
var player0Score = 0;
var player1Score = 0;


generateCards();
for (var i = 0; i < 3; i++) {
    dealCards();
    showCards();
    playerMove();
    computerMove();

}


function generateCards() {
    for (var i = 0; i < 85; i++) {
        cards[i] = generateLetter();
    }
}

function generateLetter() {
    if (Math.random() < vowelChance) {
        return getRandomVowel();
    }
    else return getRandomConsonant();
}

function getRandomVowel() {
    return vowels[Math.floor(Math.random() * 5)];
}

function getRandomConsonant() {
    return consonants [Math.floor(Math.random() * 29)]
}

function dealCards() {
    for (var i = 0; i < players.length; i++) {
        dealCardsToPlayer(players[i]);
    }
    dealCardsToBoard();
}

function dealCardsToPlayer(player) {
    for (var i = 0; i < 2; i++) {
        player[i] = cards[currentCardInDeck];
        currentCardInDeck++;
    }
}

function dealCardsToBoard() {
    for (var i = 0; i < 7; i++) {
        board[i] = cards[currentCardInDeck];
        currentCardInDeck++;
    }
}

function showCards() {
    showPlayerCards();
    showBoardCards();
    //document.getElementById("boardCard1Upper").innerHTML = "<p>" + board[1] + "</p>";
}

function showPlayerCards() {
    document.getElementById("humanPlayerCard1Upper").innerHTML = "<p>" + player1[0] + "</p>";
    document.getElementById("humanPlayerCard2Upper").innerHTML = "<p>" + player1[1] + "</p>";
}

function showBoardCards() {
    var tmp;
    for (var i = 0; i < 7; i++) {
        tmp = i + 1;
        document.getElementById("boardCard" + tmp + "Upper").innerHTML = "<p>" + board[i] + "</p>";
    }
}

function playerMove() {
    var response = document.getElementById("humanResponse").value;
    var score;
    if (responseIsValid(response) && responseIsAWord(response)) {
        score = calculateScoreForWord(response);
        player0Score += score;
    }
    document.getElementById("humanScore").innerHTML = "<p> <br>" + player0Score + "</p>";

}

function responseIsAWord(response) {
    var x = words.indexOf(response);
    if (x == -1) return false;
    else return true;
}

function responseIsValid(response) {
    var isValid = true;
    var flag = false;
    var chars = [];
    for (var i = 0; i < 7; i++) {
        chars[i] = board[i];
    }
    chars[8] = player0[0];
    chars[9] = player0[1];

    for (var i = 0; i < response.length; i++) {
        flag = false;
        for (var j = 0; j < chars.length; i++) {
            if (response[i] == chars[j]) {
                chars[j] = "1";
                flag = true;
            }
        }
        if (!flag) {
            isValid = false;
            break;
        }
    }
    return isValid;
}

function computerMove() {
    var answers;
    var bestScore = 0;
    var bestWord = 0;
    var chars = [];
    for (var i = 0; i < 7; i++) {
        chars[i] = board[i];
    }
    chars[8] = player1[0];
    chars[9] = player1[1];

    answers = getPossibleWords(difficultyLevel, chars);

    for (var i = 0; i < answers.length; i++) {
        if (calculateScoreForWord(answers[i]) > bestScore) {
            bestScore = calculateScoreForWord(answers[i]);
            bestWord = answers[i];
            //bestIndex = i;
        }
    }
    alert("Player1's word is " + bestWord + " and score is " + bestScore);
    player1Score += bestScore;
    document.getElementById("player1Score").innerHTML = "<p> <br>" + player1Score + "</p>";


}

function calculateScoreForWord(word) {
    var ans = 0;
    for (var i = 0; i < word.length; i++) {
        ans = ans + alphabet[word[i]];
    }
    return ans;
}

function getPossibleWords(difficultyLevel, chars) {
    var result = [];
    var starCount = 0;
    for (var i = 0; i < chars.length; i++) {
        if (chars[i] == "*") starCount++;
    }
    for (var i = 0; i < words.length; i++) {
        if (Math.random() < difficultyLevel) {
            if (wordCanBeMade(words[i], chars, starCount)) {
                result.push(words[i]);
            }
        }
    }
}

function wordCanBeMade(word, chars, starCount) {
    var curStarCount = starCount;
    for (var i = 0; word.length; i++) {
        if (chars.indexOf(word[i]) == -1) {
            if (curStarCount == 0) {
                return false;
            } else {
                curStarCount--;
                continue;
            }
        }
    }
    return true;
}


