var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

var client = mysql.createConnection({
    user : 'root',
    password : '1234',
    database : 'company'
});

var app = express();
app.use(express.static('product'));
app.use(bodyParser.urlencoded({ extends: false }));

app.get('/products', function(req, res){
    client.query('SELECT * FROM products', function(error, data){
        console.log(data);
        res.send(data);
    });
});

app.get('/products/:id', function(req, res){
    var id = Number(req.body.id);

    client.query('SELECT * FROM products WHERE id = ?', [
        id
    ], function(error, data){
        res.send(data);
    })
});

app.post('/products', function(req, res){
    var name = req.body.name;
    var modelnumber = req.body.modelnumber;
    var series = req.body.series;

    client.query('INSERT INTO products (name, modelnumber, series) VALUES(?, ?, ?)', [
        name, modelnumber, series
    ], function(error, data){
        console.log(data);
        res.send(data);
    });
});

app.put('/products/:id', function(req, res){
    var name = req.body.name; 
    var modelnumber = req.body.modelnumber;
    var series = req.body.series;
    var query = 'UPDATE products SET';

    if (name) query += 'name="' + name + '" ';
    if (modelnumber) query += 'modelnumber"' + modelnumber + '" ';
    if (series) query += 'series"' + series + '" ';

    client.query(query, function(error, data){
        res.send(data);
    });
});

app.delete('/products/:id', function(req, res){
    var id = Number(req.params.id);

    // 삭제되는 id의 값을 가져온다.
    console.log(id);

    client.query('DELETE FROM products WHERE id=?', [
        id
    ], function(error, data){
        res.send(data);
    });
});

app.listen(52273, function () {
    console.log('Server Running at http://127.0.0.1:52273');
});
