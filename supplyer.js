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

/* Fungsi untuk menghasilkan 100 data supplyers fake dengan parameter connection untuk pemanggilan database */
function dataSupplyer(connection){
    for (let i = 1; i <= 100; i++){
        const idsupplyer = i;
        const idproduct = i;
        const namaSupplyer= faker.name.fullName();
        const email =faker.internet.email();
        const alamat = faker.address.city();
        const phoneNumber =faker.phone.number('+62 ###-####-####');
        const queryOrder = `INSERT INTO supermarket.supplyers (idsupplyer,idproduct,nama_supplyer,email,alamat,no_telp) VALUES (${idsupplyer},${idproduct},'${namaSupplyer}','${email}','${alamat}','${phoneNumber}')`;

        connection.query(queryOrder,(err,result)=>{
            if (err && result) throw err;
            console.log(`inserted row ${idsupplyer} into supplyers table`)
        });
    }
}

//Panggil fungsi createConnection untuk membuat koneksi ke database MYSQL
const connection = createConnection();


//Panggil fungsi dataSupplyer dan otomatis menginputkan 100 baris data kedalam database MYSQL
dataSupplyer(connection);


//Tutup koneksi database
connection.end();