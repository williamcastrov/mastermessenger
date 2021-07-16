const { Router } = require('express');
const router = Router();

router.get('/test', (req, res) => {
    const data = {
        "name": "Gim Cloud",
        "website": "https://gimcloud.co"
    }
    res.json(data);
});

module.exports = router;