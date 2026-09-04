console.log("==============================")
console.log(" MATERI 3 PART 2 - DATA PROCESSING ")
console.log("==============================")

const skills = ['HTML', 'CSS', 'JAVASCRIPT', 'PYTHON'];
console.log(skills);

// push = untuk nambah di item terakhir
// unshift = nambah di item  pertama

skills.push('Tailwind');
skills.unshift('GIT');

console.log(skills);
// pop = menghapus item terakhir
// shift = menghapus item pertama
skills.pop();
skills.pop();
skills.shift();

console.log(skills);

// include = untuk mengecek apakah item ada di array atau tdk
const cekJs = skills.includes('JAVASCRIPT');
const cekReactJs = skills.includes('ReactJS');

console.log({ cekJs, cekReactJs });

// Data 

// mapping data dengan .map()
const dompetDigital = [100000, 25000000, 20000000, 1200000];
console.log(dompetDigital);
const kursUSD = 17672;

const dompetDollar = dompetDigital.map(
    duitRupiah => {
        const nilaiUSD = (duitRupiah / kursUSD).toFixed(2) ;
        return `$ ${nilaiUSD}`;
    }
);

console.log(dompetDollar);

// filter = untuk mengambil data tertentu

const filterDuit = dompetDigital.filter(
    duitRupiah => duitRupiah < 2000000

);
console.log(filterDuit);
// mengakumulasi data dengan .reduce()
const totalDompetRupiah = dompetDigital.reduce(
    (akumulator, duitRupiah) => akumulator + duitRupiah,
    0
);
console.log(totalDompetRupiah);

// metod chaining = menggabungkan method-method yg ada
const namaSiswa = ' amda supri ';


// method chaining di array
const totalMurahUSD = dompetDigital.map(rupiah => rupiah / kursUSD) 
    .filter(usd => usd <100)
    .reduce((sum, usd) => sum + usd, 0);

    const totalBAwah100Dolar = `$ ${totalMurahUSD.toFixed(2)}`;
    console.log({ totalBAwah100Dolar });

//const formatNamaSiswa = namaSiswa.trim().toUpperCase().slice(0, 4);
//console.log({ namaSiswa, formatNamaSiswa });
//const totalDompetDollarDiatasSejuta = dompetDigital.map(
//    duitRupiah => {
//        const dui
//    }
//)