// 모듈 추출
var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');

// 데이터 베이스와 연결
var client = mysql.createConnection({
    user : 'root',
    password : '1234',
    database : 'company' // db이름 생성
});

// 웹 서버를 생성합니다.
var app = express();
app.use(express.static('product')); // public이라는 폴도를 생성해서 인식 시켜준다.
app.use(bodyParser.urlencoded({ extends: false }));

// get 방식만 처리한다.
app.get('/products', function(req, res){
    // 데이터베이스 요청을 수행합니다. (자바에서 ResultSet rs = pstmt.executeQuery())
    client.query('SELECT * FROM products', function(error, data){

        // 데이터베이스에 저장된 data를 확인
        console.log(data);

        // query문을 data에 저장하고 내보낸다.(query로 보낸다.)
        res.send(data);
    });
});

app.get('/products/:id', function(req, res){
    // 변수를 선언합니다.
    var id = Number(req.body.id);

    // 데이터베이스 요청을 수행합니다.
    client.query('SELECT * FROM products WHERE id = ?', [
        id
    ], function(error, data){
        res.send(data);
    })
});

app.post('/products', function(req, res){
    // 변수를 선언합니다. 
    var name = req.body.name;
    var modelnumber = req.body.modelnumber;
    var series = req.body.series;

    // 데이터베이스 요청을 수행합니다. (PreparementState)
    client.query('INSERT INTO products (name, modelnumber, series) VALUES(?, ?, ?)', [

        // insert는 배열에 저장한다.
        name, modelnumber, series
    ], function(error, data){
        console.log(data);
        res.send(data);
    });
});

app.put('/products/:id', function(req, res){
    // 변수를 선언합니다.
    var id = Number(req.params.id);
    var name = req.body.name; 
    var modelnumber = req.body.modelnumber;
    var series = req.body.series;
    var query = 'UPDATE products SET ';

    // 값이 server.js에 전달 받았는지 확인
    console.log(id);
    console.log(name);
    console.log(modelnumber);
    console.log(series);

    // 쿼리를 생성합니다.
    // 입력창에 값이 있으면, 값을 변경하게끔하는 query이다.(동적)
    if (name) query += 'name="' + name + '", ';
    if (modelnumber) query += 'modelnumber="' + modelnumber + '", ';
    if (series) query += 'series="' + series + '" ';
    query += 'WHERE id=' + id;
    
    // query 확인 (UPDATE products SET name='name', modelnumber='modelnumber', series='series' where id = id) 
    console.log(query);

    // 데이터베이스 요청을 수행합니다.
    client.query(query, function(error, data){
        res.send(data);
    });
});

app.delete('/products/:id', function(req, res){
    // 변수를 선언합니다.
    var id = Number(req.params.id);

    // 삭제되는 id의 값을 가져온다.
    // 데이터베이스 요청을 수행합니다.
    client.query('DELETE FROM products WHERE id=?', [
        id
    ], function(error, data){
        res.send(data);
    });
});

app.listen(52273, function () {
    console.log('Server Running at http://127.0.0.1:52273');
});

// rest or restful 방식
// post - insert (form 태그 사용가능)
// get - select (form 태그 사용가능)
// put or patch - update (form 태그 사용불가)
// delete - delete (form 태그 사용불가)

// Ajax로 처리할 때는 put, delete 모두 가능
// $.ajax() 함수에서는 type속성에 지정
