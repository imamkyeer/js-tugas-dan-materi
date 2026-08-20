//const firsthobby = 'IMAM';
//const middhobby = 'GANTENG';
//const lasthobby = 'BANGET';
//const endhobby = 'SUMPAH';
//const fullhobby = firsthobby  + ' ' +  middhobby +  ' '  + lasthobby + ' ' + endhobby;

//console.log(firsthobby);
//console.log(middhobby);
//console.log(lasthobby);
//console.log(endhobby);
//console.log(fullhobby);


console.log("Bismillah,heloo broo")
console.log("------------------------------------")
// membuat komentar per baris
// setiap deklarasi itu diberi titik koma;

let namaStasiun = "St. kutuarjo"; // string
let nomorGerbong = 4; // integer atau number
let statusKeberangkatan = false; // boolean 
console.log(namaStasiun)  // print value-nya 
// {} <- debug variabel jadi object
console.log({ nomorGerbong, statusKeberangkatan }); 

// var => mutable = boleh di ubah -VERSI JADUL
// let => mutable = boleh di ubah
// const => constant = gak bisa di ubah atau di timpa

const jumlahKursi = 50; 
// ganti nomor gerbong
nomorGerbong = 6;
console.log({ nomorGerbong, jumlahKursi });

// TEMPLATE LITERAL = cara ngeformat string
// const infoKereta = "Stasiun" + namaStasiun + "\n Nomor Gerbong: " + nomorGerbong ;
// versi lebih clean pakai (backtick)

const infoKereta =`تسانايتاشانايتتي
    Stasiun: ${namaStasiun}
    Nomor Gerbong: ${nomorGerbong}
    Madw with \u2665
`;
console.log(infoKereta)
nilaiA = 10;
nilaiB = 5;
fromulaX = nilaiA + nilaiB;
console.log({ nilaiA, nilaiB, fromulaX})
nilaiA = "15" // string
const formulaZ = nilaiA + nilaiB; // "15" + 5 = "155"
console.log({ nilaiA, nilaiB, formulaZ })
nilaiA = 20;
nilaiB = "30";
const formulaSSS = nilaiB - nilaiA; // "30" - 20 = 10
console.log({ nilaiA, nilaiB, formulaSSS })

// typeof = pengecekan tipe data
const checkNilai = typeof nilaiA;
console.log({ checkNilai })
if (checkNilai === 'number') {
    console.log(' INI BARU BENAR NUMBER TOLOL ')
} else {
    console.log(' KLO YG INI BUKAN NUMBER BEGO ')
}

// LANJUTAN YANG KEMARIN HERI KE: 2  BELAJAR JAVASCRIPT

// OPERATOR PERBANDINGAN
const umurUjang = 19; // integer
const umurAsep = "19"; // string
// == : membandingkan data tidak dengan tipenya
// === : membandingkan data dengan tipenya juga
const cekUmur = umurUjang == umurAsep;
// Cek Umur Sama Enggak
if (cekUmur) {
    console.log("Umur Ujang Sama Asep Sama")
} else {
    console.log("Umur Mereka Gak samaan Woi")
}
// > = lebih dari, < : kurang, : tidak sama dengan
const umurSumanto = 25;
if (umurSumanto > umurAsep) {
    console.log("Najis DAh BAu Tanah")
} else {
    console.log("sumanto masih muda ternyata")
}

// tidak sma dengan !== dan !=== berbeda

const umurCahyono = "23";
if (umurSumanto !== umurCahyono) {
    console.log("umur mereka beda")
} else {
    console.log("seumuran ternyata mrk berdua")
}


// aray = list data dalam satiu variabel, dimulai dari index 0
const daftarKereta = ["bengawan",
    "prameks", 
    "logawa", 
    "singkangsen", 
    "panda lungan", 
    "joglosemar"];

console.log(daftarKereta); // tampil semua array item
console.log(daftarKereta[0]); // data ke 1
console.log(daftarKereta[1]); // data ke 2
console.log(daftarKereta[2]);// data ke 3

// looping atau perulangan
// for (let i = 1; i <= 5; i++) 
for (let i = 5; i >= 1; i--) {
    console.log(`halo kak ke-${i}`);
}

// cek jumlah data 
const jumlahKereta = daftarKereta.length;
console.log({ jumlahKereta });
for (let x = 0; x < jumlahKereta; x++) {
    const namaKereta = daftarKereta[x];
    console.log(`kereta ${namaKereta}`);
}

// object di js, mirip array tapi ada nama key nya 
const profilSantri = {
    nama: "gojek subaru",
    kelas: 11,
    status: true,
    asrama: "ibnu nya ibnu",
    Alamat: {
        //kelurahan: "krajan",
        //kecamatan: "baledono",
        //kabupaten: "purworejo",
        //provinsi: "Jawa Tengah",
        detail: "Jl. krajan RT 002"
    }
};
console.log(profilSantri);
console.log(`INFO SANTRI`);
console.log(`-----------------`);
console.log(`NAMA LENGKAP: ${profilSantri.nama}`);
console.log(`Nama Kelas: ${profilSantri.kelas}`);
console.log(`Status Aktif: ${profilSantri.status}`);
console.log(`Asrama: ${profilSantri.asrama}`);
console.log(`Alamat Lengkap: ${profilSantri.Alamat.detail}`);


// Date = fitur object pengolahan waktu
const tanggalBaru = new Date();
console.log({tanggalBaru});
console.log(tanggalBaru.toString());
console.log(tanggalBaru.toLocaleString());
