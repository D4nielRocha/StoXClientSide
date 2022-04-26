const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
// const HOST = "127.0.0.1";



app.use(express.static('public'));



app.listen(PORT, () => {
    console.log(`Client Side connected at localhost:${PORT}`);
})