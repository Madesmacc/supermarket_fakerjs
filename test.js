
const { faker } = require('@faker-js/faker/locale/id_ID');
const mysql = require('mysql');
const accounting = require('accounting');

/*Fungsi untuk koneksi kedalam database */
function createConnection() {
    const connection = mysql.createConnection({
   host: 'localhost',
   user: 'root',
   password: '',
   database: 'your_database'
    });
     return connection;
}

/* Fungsi untuk menghasilkan data fake dengan parameter connection untuk pemanggilan database */
function dataEmployees(connection){
    for (let i = 1; i <= 50; i++){
        //....Tulis Code Anda Disini....//
        //Query SQL untuk menginsert data
        const queryKaryawan = `INSERT INTO database.your_table (column 1,column 2,column 3....) VALUES (${Value})`;
    
        connection.query(queryKaryawan,(err,result)=>{
            if (err && result) throw err;
            console.log(`inserted row ${id} into your_table`)
        });
    }
}

//Panggil fungsi createConnection untuk membuat koneksi ke database MYSQL
const connection = createConnection();

//Panggil fungsi dataPenjualan dan otomatis menginputkan 100 baris data kedalam database MYSQL
//.....Tulis Fungsi Anda Disini!.....//

//Tutup koneksi database
connection.end();