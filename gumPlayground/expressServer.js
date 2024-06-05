// 파일 대신 로컬 호스트 컨텍스트에서 실행해야함
// enemerate devices 를 실행할 수 있도록 (보안 컨텍스트에서 실행해야 함).
// 로컬호스트 카운트

const path = require('path');
const express = require('express');
const app = express();
app.use(express.static(path.join(__dirname)))
app.listen(3000)

//