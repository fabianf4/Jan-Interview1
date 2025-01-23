const nStart = 100;
const nEnd = 999;
let bigger = 0;
let numOne = 0;
let numTwo = 0;

for (let i = nStart; i <= nEnd; i++) {
    for (let j = i; j <= nEnd; j++) {
        if (isPalindrome(i * j)) {
            if (bigger < i * j) {
                bigger = i * j;
                numOne = i;
                numTwo = j;
            }
        }
    }
}

function isPalindrome(num) {
    num = String(num);

    let numReverse = num.split("").reverse().join("");

    if (num == numReverse) {
        return true;
    } else {
        return false;
    }
}

console.log(numOne + " x " + numTwo + " = " + bigger);
