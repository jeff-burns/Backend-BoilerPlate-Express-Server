const express = require('express');

const router = express.Router();

const queries = require('../db/queries');

router.get('/', async (req, res) => {
    const headlines = await queries.getAll();
    res.json(headlines);
    //
    // THE .THEN VERSION
    // queries.getAll()
    // .then(dogs => {
    //  res.json(headlines);
    //});
})

module.exports = router; 