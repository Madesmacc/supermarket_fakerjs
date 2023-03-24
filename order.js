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

/* Fungsi untuk menghasilkan 100 data order fake dengan parameter connection untuk pemanggilan database */
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

//Panggil fungsi dataOrder dan otomatis menginputkan 100 baris data kedalam database MYSQL
dataOrder(connection);


//Tutup koneksi database
connection.end();