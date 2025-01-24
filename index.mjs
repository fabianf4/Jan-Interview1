import fs from "node:fs";

const DATA = fs.readFileSync("./data-test.txt", "utf-8");

let dataSplit = DATA.split("\n").map((value) => value.split(" "));

let addressTxt = {
    1: "Horizontal (➡️)",
    2: "Vertical (⬇️)",
    3: "Diagonal (↘️)",
    4: "Reverse-Diagonal (↙️)",
};

let bigger = {
    num: 0,
    position: {
        i: -1,
        j: -1,
    },
    address: "",
};

function saveBigger(num, i, j, address) {
    if (num > bigger.num) {
        bigger.num = num;
        bigger.position.i = i + 1;
        bigger.position.j = j + 1;
        bigger.address = addressTxt[address];
    }
}

function findBigNumberLine(matrix) {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length - 3; j++) {
            let aux =
                matrix[i][j] *
                matrix[i][j + 1] *
                matrix[i][j + 2] *
                matrix[i][j + 3];

            saveBigger(aux, i, j, 1);

            let aux2 =
                matrix[j][i] *
                matrix[j + 1][i] *
                matrix[j + 2][i] *
                matrix[j + 3][i];

            saveBigger(aux2, j, i, 2);
        }
    }

    return bigger;
}

function findBigNumberDiagonal(matrix) {
    let bigger = 0;

    for (let i = 0; i < matrix.length - 3; i++) {
        for (let j = 0; j < matrix[i].length - 3; j++) {
            let aux =
                matrix[i][j] *
                matrix[i + 1][j + 1] *
                matrix[i + 2][j + 2] *
                matrix[i + 3][j + 3];

            saveBigger(aux, i, j, 3);

            let aux2 =
                matrix[i][j + 3] *
                matrix[i + 1][j + 2] *
                matrix[i + 2][j + 1] *
                matrix[i + 3][j];

            saveBigger(aux2, i, j + 3, 4);
        }
    }

    return bigger;
}

function result() {
    findBigNumberLine(dataSplit);
    findBigNumberDiagonal(dataSplit);

    console.log(
        "The largest product is:" +
            bigger.num +
            "\n" +
            "The position is: (" +
            bigger.position.i +
            "," +
            bigger.position.j +
            ") = " +
            dataSplit[bigger.position.i][bigger.position.j] +
            "\n" +
            "The address is: " +
            bigger.address
    );
}

result();
