const express = require('express');
const cors = require("cors");
const monksealRoutes = require('./src/monkseal/routes');""

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors({ origin: true }));

app.get('/products/:id', function (req, res, next) {
    res.json({msg: 'This is CORS-enabled for all origins!'})
  })



app.get("/", (req, res) => {
    res.send('Hello World!!');
});

app.use('/api/v1/monkseals', monksealRoutes);

app.listen(port, () => console.log(`app listening on port ${port}`));