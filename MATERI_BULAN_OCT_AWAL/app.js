console.log("bismillah, hello word")
const fullName = 'muhammad budi';
console.log(fullName);
// const = variabel yg tidak bisa diubah
// let = variabel yg bisa diubah
let firstName = 'bagus';
firstName = ' ABDULLOH';
firstName = 10000;
console.log(firstName);
const attendStatus = true;
console.log(attendStatus);
// OPERATOR ANTIMETIC
const totalScoreA = 10 + 20;
const accumulatedScoreA = totalScoreA * 10;
let rendomScore = 50;
const newScore = rendomScore + 10;
rendomScore += 10; // rendomScore = rendomScore + 10
rendomScore *= 10; // rendomScore = rendomScore x 10
console.log({ totalScoreA, accumulatedScoreA, newScore, rendomScore });

let helloMesage = 'welcome team...';
const newMesage = helloMesage + 'to yhe galaxy';
helloMesage += "to the world of code !";
console.log({ newMesage, helloMesage });

// OPERATOR PERBANDINGAN

const ujangAge = 15;
const bagusAge = 19;
const isUjangOlder = ujangAge > bagusAge;
if (isUjangOlder) {
    console.log('ujang is oldet then bagus');
} else {
    console.log('ujang is yuonger then bagus');
}

const isNotEqualAge = ujangAge !== bagusAge;
const isEqualAge = ujangAge === bagusAge;
console.log({ isEqualAge, isNotEqualAge });

// OPERARTOT LOGICAL
const ageStatus = ujangAge > 13;
// const dsas = a ;