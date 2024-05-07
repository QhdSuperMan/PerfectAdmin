const express = require('express')
const multer  = require('multer')
const cors = require('cors');

const app = express()
app.use(cors());

const upload = multer({ dest: 'uploads/' })

app.post('/aaa', upload.single('aaa'), function (req, res, next) {
  console.log('req.file', req.file);
  console.log('req.body', req.body);
})


app.post('/bbb', upload.array('aaa', 2), function (req, res, next) {
  console.log('req.file', req.file);
  console.log('req.body', req.body);
})

app.listen(3333);
