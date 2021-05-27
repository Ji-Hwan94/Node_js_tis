var express = require('express');
var bodyParser = require('body-parser');
const { response } = require('express');

var items = [{
    name: '우유',
    price: '2000'
}, {
    name: '홍차',
    price: '5000'
}, {
    name: '커피',
    price: '5000'
}];

// Express Routing 
// Roution은 서버에서 주소를 설정하는 과정을 의미한다.(경로 선택)
var app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extends: false }));
//all은 get, post 방식 모두 다 가능
app.all('/data.html', function(req, res){
    var output = '';
    output += '<!DOCTYPE html>';
    output += '<html>';
    output += '<head>';
    output += '     <title>Data HTML</title>';
    output += '</head>';
    output += '<body>';
    items.forEach(item => {
        output += '<div>';
        output += '     <h1>'+item.name+'</h1>';
        output += '     <h2>'+item.price+'</h2>';
        output += '</div>';
    });
    output += '</body>';
    output += '</html>';
    res.send(output);
});

// json 방식으로 서버에 items를 전달 한다.
app.all('/data.json', function(req, res){
    res.send(items);
});

// php 방식으로 서버에 items를 전달한다.
app.all('/data.xml', function(req, res){
    var output = '';
    output += '<?xml version="1.0" encoding="UTF-8" ?>';
    output += '<products>';
    items.forEach(function (item) {
        output += '<product>';
        output += '    <name>' + item.name + '</name>';
        output += '    <price>' + item.price + '</price>';
        output += '</product>';
    });
    output += '</products>';
    res.send(output);
});

// 기존방식 <a href="parameter?id=hkd">
// 동적 parameter <a href="parameter/hkd"> => node.js express (hkd 부분(parameter)이 바뀐다.)
// 동적 parameter로 아이디랑 이름을 보내는 경우 <a href="/parameter/hkd/홍길동">
app.all('/parameter', function(req, res){
    var name = req.query.name;
    var region = req.query.region;
    
    res.send('<h1>' + name + ':' + region + '</h1>');
});
app.all('/parameter/:name/:region', function(req, res){
    var name = req.params.name;
    var region = req.params.region;

    res.send('<h1>' + name + ':' + region + '</h1>');
});


app.listen(52273, function(){
    console.log('Server Running at http://127.0.0.1:52273');
});