function countOccurrences(INPUT, QUERY) {
    let wordCount = {};
    
    INPUT.forEach(word => {
        if (wordCount[word] === undefined) {
            wordCount[word] = 0;
        }
        wordCount[word]++;
    });
    
    let result = [];
    
    QUERY.forEach(word => {
        if (wordCount[word] === undefined) {
            result.push(0);
        } else {
            result.push(wordCount[word]);
        }
    });
    
    return result;
}

const INPUT = ['xc', 'dz', 'bbb', 'dz'];
const QUERY = ['bbb', 'ac', 'dz'];

let output = countOccurrences(INPUT, QUERY);
console.log(output);
