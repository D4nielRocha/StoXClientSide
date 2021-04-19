const express = require('express');
const app = express();
const PORT = 8000;
const HOST = "0.0.0.0";



app.use(express.static('public'));



app.listen(PORT, HOST, () => {
    console.log(`Client Side connected at localhost:${PORT}`);
})