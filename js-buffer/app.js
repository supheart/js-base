// var Buffer = require('Buffer');
var a = new Buffer(0);

var b = new Buffer(0);
var c = new Buffer(8);
var d = new Buffer(16);

// var a10 = new Buffer(10);
// console.log(a10);

// console.log(a);
// console.log(b);
// console.log(c);
// console.log(d);
// console.log(c.toString());

// console.log('a: ' + a);
// console.log('b: ' + b);
// console.log('c: ' + c);
// console.log('d: ' + d);

// console.log(a + ' --- ' + b + ' --- ' + c + ' --- ' + d);
// console.log(typeof a + ' --- ' + typeof b + ' --- ' + typeof c + ' --- ' + typeof d);
// console.log(a instanceof Object);

// console.log(Buffer.isEncoding('gbk'));
// console.log(Buffer.isEncoding('gb2312'));
// console.log(Buffer.isEncoding('utf-8'));
// console.log(Buffer.isEncoding('ascii'));
// console.log(Buffer.isEncoding('ucs2'));
// console.log(Buffer.isEncoding('base64'));
// console.log(Buffer.isEncoding('hex'));

// console.log(Buffer.isBuffer(a));
// console.log(Buffer.isBuffer('a'));

// var bb = new Buffer('abcd hh');
// var tt = bb.toString('ascii');
// var bb1 = new Buffer('abcd xx', 'utf-8');
// var tt1 = bb.toString('base64');
// console.log(tt);
// console.log(tt1);

var buf = new Buffer(64);
var len1 = buf.write('开始写入');

console.log(len1 + " bytes: " + buf.toString('utf-8', 0, len1));

len1 = buf.write('重新覆盖写入');
console.log(len1 + ' bytes: ' + buf.toString('utf-8', 0, len1));

//重len1位置开始写
var len2 = buf.write('\u00bd + \u00bc = \u00be', len1);
console.log(len2 + ' bytes: ' + buf.toString('utf-8', 0, len1 + len2));

var len3 = buf.write('重第30位开始写入', 30);
console.log(len3 + ' bytes: ' + buf.toString('utf-8', 0, 30 + len3));

console.log(len3 + ' bytes: ' + buf.toString('utf-8', 0, 30 + buf.length));

var len4 = buf.write('写入的数据长度超过Buffer的总长度！', 30 + len3);

console.log(buf.length + ' bytes: ' + buf.toString('utf-8', 0, buf.length));

