function diagonalDifference(matrix) {
    let n = matrix.length;
    let primaryDiagonalSum = 0;
    let secondaryDiagonalSum = 0;

    for (let i = 0; i < n; i++) {
        primaryDiagonalSum += matrix[i][i];
    }

    for (let i = 0; i < n; i++) {
        secondaryDiagonalSum += matrix[i][n - 1 - i];
    }

    let difference = Math.abs(primaryDiagonalSum - secondaryDiagonalSum);

    return difference;
}

const matrix = [
    [1, 2, 0],
    [4, 5, 6],
    [7, 8, 9]
];

let result = diagonalDifference(matrix);
console.log(result); 
