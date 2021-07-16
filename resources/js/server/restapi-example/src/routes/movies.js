const { Router } = require('express');
const router = new Router();

const movies = require('../sample.json');
console.log(movies)

router.get('/', (req, res) => {
    res.json(movies)
})

router.post('/', (req, res) => {
    console.log(req.body);
    res.send('OK')
})

module.exports = router;