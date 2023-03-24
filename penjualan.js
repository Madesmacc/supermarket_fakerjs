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

/* Fungsi untuk menghasilkan 100 data penjualan fake dengan parameter connection untuk pemanggilan database */
function dataPenjualan(connection){
    for (let i = 1; i <= 100; i++){
        const idpenjualan = i;
        const idproduct = i;
        const date = faker.date.past();
        const namaProduct = faker.commerce.productName();
        const quantity = faker.random.numeric({min:10, max:100});
        const price = faker.finance.amount(10000, 350000);
        const fixprice = accounting.formatMoney(price,"Rp.", 0, ".", ",");
        const queryPenjualan= `INSERT INTO supermarket.penjualan (idpenjualan,idproduct,date,nama_produk,kuantitas,total_harga) VALUES (${idpenjualan},${idproduct},'${date}','${namaProduct}','${quantity}','${fixprice}')`;
    
        connection.query(queryPenjualan,(err,result)=>{
            if (err && result) throw err;
            console.log(`inserted row ${idpenjualan} into penjualan table`)
        });
    }
}

//Panggil fungsi createConnection untuk membuat koneksi ke database MYSQL
const connection = createConnection();

//Panggil fungsi dataPenjualan dan otomatis menginputkan 100 baris data kedalam database MYSQL
dataPenjualan(connection);

//Tutup koneksi database
connection.end();