const { faker } = require('@faker-js/faker/locale/id_ID');
const mysql = require('mysql');
const accounting = require('accounting');

/*Fungsi untuk koneksi kedalam database */
function createConnection() {
    const connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'supermarket'
    });
     return connection;
}

/* Fungsi untuk menghasilkan 50 data emplooyes (karyawan) fake dengan parameter connection untuk pemanggilan database */
function dataEmployees(connection){
    for (let i = 1; i <= 50; i++){
        const idKaryawan = i;
        const namaKaryawan = faker.name.fullName();
        const jabatan = faker.name.jobTitle();
        const email =faker.internet.email();
        const address = {
                       street: faker.address.street(),
                       buildingNumber: faker.address.buildingNumber(),
                       city: faker.address.city(),
                       province: faker.address.state(),
                       zipCode: faker.address.zipCode()
        };
        const fixaddress = `${address.street}${address.buildingNumber},${address.city},${address.province} ${address.zipCode} `;
        const phoneNumber =faker.phone.number('+62 ###-####-####');
        //const queryKaryawan = `INSERT INTO supermarket.karyawan (alamat) VALUES ('${fixaddress}')`;
        const queryKaryawan = `INSERT INTO supermarket.karyawan (idkaryawan,nama_karyawan,jabatan,email,alamat,no_telp) VALUES (${idKaryawan},'${namaKaryawan}','${jabatan}','${email}','${fixaddress}','${phoneNumber}')`;
    
        connection.query(queryKaryawan,(err,result)=>{
            if (err && result) throw err;
            console.log(`inserted row ${idKaryawan} into employees table`)
        });
    }
}

//Panggil fungsi createConnection untuk membuat koneksi ke database MYSQL
const connection = createConnection();

//Panggil fungsi dataEmployees dan otomatis menginputkan 100 baris data kedalam database MYSQL
dataEmployees(connection);

//Tutup koneksi database
connection.end();