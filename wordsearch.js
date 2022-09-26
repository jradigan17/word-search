//----------------------------------------------------------
// Word Search
const wordSearch = (letters, word) => {
  // Error Checking
  if (letters.length === 0 || !word || !letters[0]) {
    return false;
  }

  // Check Rows
  const horizontalJoin = letters.map(ls => ls.join(''));
  const horizontalReverse = horizontalJoin.map(each => each.split("").reverse().join(""));

  // Check Columns
  const columnLetters = transpose(letters);
  const verticalJoin = columnLetters.map(ls => ls.join(''));
  const verticalReverse = verticalJoin.map(each => each.split("").reverse().join(""));

  // Check Left Diagonal
  const diagonalLeftJoin = diagonalLeft(letters);
  const diagonalLeftReverse = diagonalLeftJoin.map(each => each.split("").reverse().join(""));

  // Check Right Diagonal
  const diagonalRightJoin = diagonalRight(letters);
  const diagonalRightReverse = diagonalRightJoin.map(each => each.split("").reverse().join(""));

  // Check for Word Match
  let wordFound = lineSearch(horizontalJoin, word) ? true : lineSearch(horizontalReverse, word) ? true : lineSearch(verticalJoin, word) ? true : lineSearch(verticalReverse, word) ? true : lineSearch(diagonalLeftJoin, word) ? true : lineSearch(diagonalLeftReverse, word) ? true : lineSearch(diagonalRightJoin, word) ? true : lineSearch(diagonalRightReverse, word) ? true : false;
  return wordFound;
};
//----------------------------------------------------------

//----------------------------------------------------------
// Check Left Diagonal
const diagonalLeft = (letters) => {
  letters = letters.length > letters[0].length ? letters : transpose(letters);
  const diagonalJoin = [];
  let w = letters[0].length;
  for (let y = 0; y < letters.length - 1; y++) {
    let tmp1 = "";
    let tmp2 = "";
    let j = y;
    for (let x = 0; x < w; x++) {
      tmp1 += letters[x][j];
      tmp2 += letters[j + 1][x];
      j ++;
    }
    w--;
    diagonalJoin.push(tmp1, tmp2);
  }
  return diagonalJoin;
};
//----------------------------------------------------------

//----------------------------------------------------------
// Check Right Diagonal
const diagonalRight = (letters) => {
  letters = letters.length < letters[0].length ? letters : transpose(letters);
  const diagonalJoin = [];
  let w = letters.length - 1;
  for (let y = letters.length - 1; y >= 0; y--) {
    let tmp = "";
    let j = y;
    for (let x = 0; x <= w; x++) {
      tmp += letters[x][j];
      j --;
    }
    w--;
    diagonalJoin.push(tmp);
  }

  let q = 1;
  for (let z = letters.length - 1; z >= 0; z --) {
    let tmp = "";
    let u = letters.length - 1;
    for (let t = q; t < letters[0].length; t++) {
      tmp += letters[u][t];
      u--;
    }
    q++;
    diagonalJoin.push(tmp);
  }
  return diagonalJoin;
};
//----------------------------------------------------------

//----------------------------------------------------------
// Transpose Word Search Matrix
const transpose = (matrix) => {
  let transposedMatrix = [];
  for (let i = 0; i < matrix[0].length; i++) {
    let tmpArray = [];
    for (let j = 0; j < matrix.length; j++) {
      tmpArray.push(matrix[j][i]);
    }
    transposedMatrix.push(tmpArray);
  }
  return transposedMatrix;
};
//----------------------------------------------------------

//----------------------------------------------------------
// Search for "word"
const lineSearch = (lines, word) => {
  for (let line of lines) {
    if (line.includes(word)) {
      return true;
    }
  }
  return false;
};
//----------------------------------------------------------

//----------------------------------------------------------
//Test Code - 9 Scenarios
// const result1 = wordSearch([
//   ['A', 'W', 'C', 'F', 'Q', 'U', 'A', 'L'],
//   ['S', 'E', 'I', 'N', 'F', 'E', 'L', 'D'],
//   ['Y', 'F', 'C', 'F', 'Q', 'U', 'A', 'L'],
//   ['H', 'M', 'J', 'T', 'E', 'V', 'R', 'G'],
//   ['W', 'H', 'C', 'S', 'Y', 'E', 'R', 'L'],
//   ['B', 'F', 'R', 'E', 'N', 'E', 'Y', 'B'],
//   ['U', 'B', 'T', 'W', 'A', 'P', 'A', 'I'],
//   ['O', 'D', 'C', 'A', 'K', 'U', 'A', 'S'],
//   ['E', 'Z', 'K', 'F', 'Q', 'U', 'A', 'L'],
// ], 'FRANK'); // False

// console.log(result1); // No Results

// const result2 = wordSearch([
//   ['A', 'W', 'C', 'F', 'Q', 'U', 'A', 'L'],
//   ['S', 'E', 'I', 'N', 'F', 'E', 'L', 'D'],
//   ['Y', 'F', 'C', 'F', 'Q', 'U', 'A', 'L'],
//   ['H', 'M', 'J', 'T', 'E', 'V', 'R', 'G'],
//   ['W', 'H', 'C', 'S', 'Y', 'E', 'R', 'L'],
//   ['B', 'F', 'R', 'E', 'N', 'E', 'Y', 'B'],
//   ['U', 'B', 'T', 'W', 'A', 'P', 'A', 'I'],
//   ['O', 'D', 'C', 'A', 'K', 'U', 'A', 'S'],
//   ['E', 'Z', 'K', 'F', 'Q', 'U', 'A', 'L'],
// ], 'SEINFELD'); // True

// console.log(result2); // Row Forward

// const result3 = wordSearch([
//   ['A', 'W', 'C', 'F', 'Q', 'U', 'A', 'L'],
//   ['S', 'E', 'I', 'N', 'F', 'E', 'L', 'D'],
//   ['Y', 'F', 'C', 'F', 'Q', 'U', 'A', 'L'],
//   ['H', 'M', 'J', 'T', 'E', 'V', 'R', 'G'],
//   ['W', 'H', 'C', 'S', 'Y', 'E', 'R', 'L'],
//   ['B', 'F', 'R', 'E', 'N', 'E', 'Y', 'B'],
//   ['U', 'B', 'T', 'W', 'A', 'P', 'A', 'I'],
//   ['O', 'D', 'C', 'A', 'K', 'U', 'A', 'S'],
//   ['E', 'Z', 'K', 'F', 'Q', 'U', 'A', 'L'],
// ], 'PAWT'); // True

// console.log(result3); // Row Backward

// const result4 = wordSearch([
//   ['A', 'W', 'C', 'F', 'Q', 'U', 'A', 'L'],
//   ['S', 'E', 'I', 'N', 'F', 'E', 'L', 'D'],
//   ['Y', 'F', 'C', 'F', 'Q', 'U', 'A', 'L'],
//   ['H', 'M', 'J', 'T', 'E', 'V', 'R', 'G'],
//   ['W', 'H', 'C', 'S', 'Y', 'E', 'R', 'L'],
//   ['B', 'F', 'R', 'E', 'N', 'E', 'Y', 'B'],
//   ['U', 'B', 'T', 'W', 'A', 'P', 'A', 'I'],
//   ['O', 'D', 'C', 'A', 'K', 'U', 'A', 'S'],
//   ['E', 'Z', 'K', 'F', 'Q', 'U', 'A', 'L'],
// ], 'LARRY'); // True

// console.log(result4); // Column Forwards

// const result5 = wordSearch([
//   ['A', 'W', 'C', 'F', 'Q', 'U', 'A', 'L'],
//   ['S', 'E', 'I', 'N', 'F', 'E', 'L', 'D'],
//   ['Y', 'F', 'C', 'F', 'Q', 'U', 'A', 'L'],
//   ['H', 'M', 'J', 'T', 'E', 'V', 'R', 'G'],
//   ['W', 'H', 'C', 'S', 'Y', 'E', 'R', 'L'],
//   ['B', 'F', 'R', 'E', 'N', 'E', 'Y', 'B'],
//   ['U', 'B', 'T', 'W', 'A', 'P', 'A', 'I'],
//   ['O', 'D', 'C', 'A', 'K', 'U', 'A', 'S'],
//   ['E', 'Z', 'K', 'F', 'Q', 'U', 'A', 'L'],
// ], 'PEEVU'); // True

// console.log(result5); // Column Backwards

// const result6 = wordSearch([
//   ['A', 'W', 'C', 'F', 'Q', 'U', 'A', 'L'],
//   ['S', 'E', 'I', 'N', 'F', 'E', 'L', 'D'],
//   ['Y', 'F', 'C', 'F', 'Q', 'U', 'A', 'L'],
//   ['H', 'M', 'J', 'T', 'E', 'V', 'R', 'G'],
//   ['W', 'H', 'C', 'S', 'Y', 'E', 'R', 'L'],
//   ['B', 'F', 'R', 'E', 'N', 'E', 'Y', 'B'],
//   ['U', 'B', 'T', 'W', 'A', 'P', 'A', 'I'],
//   ['O', 'D', 'C', 'A', 'K', 'U', 'A', 'S'],
//   ['E', 'Z', 'K', 'F', 'Q', 'U', 'A', 'L'],
// ], 'HRWK'); // True

// console.log(result6); // Left Diagonal Forwards


// const result7 = wordSearch([
//   ['A', 'W', 'C', 'F', 'Q', 'U', 'A', 'L'],
//   ['S', 'E', 'I', 'N', 'F', 'E', 'L', 'D'],
//   ['Y', 'F', 'C', 'F', 'Q', 'U', 'A', 'L'],
//   ['H', 'M', 'J', 'T', 'E', 'V', 'R', 'G'],
//   ['W', 'H', 'C', 'S', 'Y', 'E', 'R', 'L'],
//   ['B', 'F', 'R', 'E', 'N', 'E', 'Y', 'B'],
//   ['U', 'B', 'T', 'W', 'A', 'P', 'A', 'I'],
//   ['O', 'D', 'C', 'A', 'K', 'U', 'A', 'S'],
//   ['E', 'Z', 'K', 'F', 'Q', 'U', 'A', 'L'],
// ], 'LAPNSJ'); // True

// console.log(result7); // Left Diagonal Backwards

// const result8 = wordSearch([
//   ['A', 'W', 'C', 'F', 'Q', 'U', 'A', 'L'],
//   ['S', 'E', 'I', 'N', 'F', 'E', 'L', 'D'],
//   ['Y', 'F', 'C', 'F', 'Q', 'U', 'A', 'L'],
//   ['H', 'M', 'J', 'T', 'E', 'V', 'R', 'G'],
//   ['W', 'H', 'C', 'S', 'Y', 'E', 'R', 'L'],
//   ['B', 'F', 'R', 'E', 'N', 'E', 'Y', 'B'],
//   ['U', 'B', 'T', 'W', 'A', 'P', 'A', 'I'],
//   ['O', 'D', 'C', 'A', 'K', 'U', 'A', 'S'],
//   ['E', 'Z', 'K', 'F', 'Q', 'U', 'A', 'L'],
// ], 'OBRSEULL'); // True

// console.log(result8); // Right Diagonal Forwards


// const result9 = wordSearch([
//   ['A', 'W', 'C', 'F', 'Q', 'U', 'A', 'L'],
//   ['S', 'E', 'I', 'N', 'F', 'E', 'L', 'D'],
//   ['Y', 'F', 'C', 'F', 'Q', 'U', 'A', 'L'],
//   ['H', 'M', 'J', 'T', 'E', 'V', 'R', 'G'],
//   ['W', 'H', 'C', 'S', 'Y', 'E', 'R', 'L'],
//   ['B', 'F', 'R', 'E', 'N', 'E', 'Y', 'B'],
//   ['U', 'B', 'T', 'W', 'A', 'P', 'A', 'I'],
//   ['O', 'D', 'C', 'A', 'K', 'U', 'A', 'S'],
//   ['E', 'Z', 'K', 'F', 'Q', 'U', 'A', 'L'],
// ], 'LYPKF'); // True

// console.log(result9); // Right Diagonal Backwards
//----------------------------------------------------------


module.exports = wordSearch;