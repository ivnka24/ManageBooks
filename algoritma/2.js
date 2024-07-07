function longestWord(sentence) {
    let words = sentence.split(" ");
    
    let longestWord = "";
    
    words.forEach(word => {
        if (word.length > longestWord.length) {
            longestWord = word;
        }
    });
    
    return longestWord;
}

const sentence = "Saya sangat senang mengerjakan soal algoritma";
let longest = longestWord(sentence);
console.log(longest);
