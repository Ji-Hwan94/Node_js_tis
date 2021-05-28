// 모듈을 추출합니다.
// ejs로 만든 코드를 읽어오기 위해서 가져온다
var fs = require('fs');
// ejs 모듈을 포함한다.
var ejs = require('ejs');
var mysql = require('mysql');
var express = require('express');
var bodyParser=require('body-parser');
var path=require('path');
// 데이터베이스와 연결합니다.
var client = mysql.createConnection({
    user: 'root',
    password: '1234',
    database: 'Company'
});
// 서버를 생성합니다.
var app = express();
// engine을 ejs로 사용하겠다.
app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');
// views 폴더를 사용하기 위해 경로를 설정 해놓는다.
app.set('views', path.join(__dirname, 'views'));
app.use('/css',express.static('css'));//css폴더 사용
app.use(bodyParser.urlencoded({extended:false}));

// 서버를 실행합니다.
app.listen(52273, function () {
    console.log('server running at http://127.0.0.1:52273');
});

//글목록
app.get('/', function (request, response) {
    // 파일을 읽습니다.
    fs.readFile('views/board_list.html', 'utf8', function (error, data) {
        // 데이터베이스 쿼리를 실행합니다.
        client.query('SELECT * FROM board order by id asc', function (error, results) {

            // render를 통해서 클라이언트에게 보낸다.
            response.send(ejs.render(data, {

                // board_list로 값을 받는다.(board_list의 list가 있는 곳에 값을 전달한다.)
                list: results
            }));
        });
    });
});