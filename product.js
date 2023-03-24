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

/* Fungsi untuk menghasilkan 100 data product fake dengan parameter connection untuk pemanggilan database */
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

//Panggil fungsi createConnection untuk membuat koneksi ke database MYSQL
const connection = createConnection();

//Panggil fungsi dataProduct dan otomatis menginputkan 100 baris data kedalam database MYSQL
dataProduct(connection);

//Tutup koneksi database
connection.end();

