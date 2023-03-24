/*Variabel untuk menggunakan library yang dibutuhkan agar menghasilkan data fake sesuai dengan kebutuhan
Terdiri dari 3 Library yaitu :
-Faker => Untuk menghasilkan data fake 
Note: Lihat dokumentasi terlebih dahulu sebelum penggunaan untuk melihat data fake apa saja yang bisa ditampilkan
-Mysql => Untuk terhubung kedalam database local server dan berinteraksi dengan database
-Accounting => Untuk membuat format mata uang 
*/
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
/* Fungsi untuk menghasilkan data product fake dengan parameter connection untuk pemanggilan database */
function dataProduct(connection){
    for (let i = 1; i <= 100; i++){
        const idproduct = i;
        const idsupplier = i;
        const product_name = faker.commerce.productName();
        const merk = ['Bloc Market',
        'Excelso ID',
        'Unilever','Wings',
        'Kalla Group',
        'Branstoria',
        'JCO',
        'IndoMarket',
        'HighScope ID',
        'Revlon'];
        const brand = merk[Math.floor(Math.random()*merk.length)];
        const price = faker.finance.amount(10000, 350000);
        const fixprice = accounting.formatMoney(price,"Rp.", 0, ".", ",");
        const stock = faker.datatype.number({min:30, max:100});
        const queryProduct = `INSERT INTO supermarket.product (idsupplyer,nama_product,merk,harga,stock) VALUES (${idsupplier},'${product_name}','${brand}','${fixprice}','${stock}')`;
    
       connection.query(queryProduct,(err,result)=>{
           if (err && result) throw err;
        console.log(`inserted row ${idproduct} into product table`)
       });
    }

}
function dataOrder(connection){
    for (let i = 1; i <= 100; i++){
        const idorder = i;
        const idsupplier =i;
        const recentOrder = faker.date.past()
        const stock = faker.datatype.number({min:30, max:100});
        //const queryOrder = `INSERT INTO supermarket.orderproduct (idsupplyer) VALUE (${idsupplier})`;
        const queryOrder = `INSERT INTO supermarket.orderproduct (idorder,idsupplyer,waktu_order,stock) VALUES (${idorder},${idsupplier},'${recentOrder}','${stock}')`;
    
        connection.query(queryOrder,(err,result)=>{
            if (err && result) throw err;
            console.log(`inserted row ${idorder} into order table`)
        });
    }
}
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

//Panggil fungsi dataProduct dan otomatis menginputkan 100 baris data kedalam database MYSQL
//dataProduct(connection);
//Panggil fungsi dataOrder dan otomatis menginputkan 100 baris data kedalam database MYSQL
//dataOrder(connection);
//Panggil fungsi dataSupplyer dan otomatis menginputkan 100 baris data kedalam database MYSQL
//dataSupplyer(connection);
//Panggil fungsi dataPenjualan dan otomatis menginputkan 100 baris data kedalam database MYSQL
//dataPenjualan(connection);
//Panggil fungsi dataEmployees dan otomatis menginputkan 100 baris data kedalam database MYSQL
dataEmployees(connection);

//Tutup koneksi database
connection.end();
