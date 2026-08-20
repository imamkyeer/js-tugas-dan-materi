console.log("===========================================")
console.log("MATERI 3 PART 1- DATA MANIPULATION");
console.log("===========================================")
// Stirng manipulation
const namaSultan = " Sri Sultan Hamengku BUwono X";
const hurufKecil = namaSultan.toLowerCase();
const hurufBesar = namaSultan.toUpperCase();
console.log({namaSultan});
console.log({hurufKecil, hurufBesar});
const gelar = namaSultan.slice(11, 28); // index awal, index akhir
console.log({gelar});
const nomorGelar = namaSultan.replace("x", "XII"); // target, timpaan
console.log({gelar, nomorGelar});
const cekSultan = namaSultan.includes("Sultan");
if (cekSultan) {
    console.log(">> nama sultan valid")
} else {
    console.log(">> tidak ditemukan nama sultan")
} 

// mumber manipulation
const hartaSultan = "5500000";
const konversiHarta = Number(hartaSultan); // string number
console.log({ hartaSultan, konversiHarta} );
const utangSulatan = "25000.678"; // string desimal
const konversiUtang = Number(utangSulatan);
const konversiUtangDuaKoma = konversiUtang.toFixed(2); // jadi string
console.log({ konversiUtang, konversiUtangDuaKoma });
// math uncition untuk perhitungan angka 
// round() florr() ceil()
const konversiUtangPembulatan = Math.ceil(konversiUtang);
console.log({ konversiUtangPembulatan });
const tebakDadu = Math.floor

// data manipulation

const saiki = new Date();
console.log({ saiki });
const tahunIni = saiki.getFullYear();
const hariIni = saiki.getDay();
const bulanIni = saiki.getMonth();
const ttanggalIni = saiki.getDate();
console.log({ ttanggalIni, bulanIni, hariIni, tahunIni });