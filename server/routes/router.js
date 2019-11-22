const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

router.get(`/`, (req, res)=>{
    console.log('in / GET');
    let query = `SELECT * FROM "to-do";`;
    pool.query(query).then(result=>{
        res.send(result.rows);
    }).catch(error=>{
        console.log('ERROR GETTING TASK ON SERVER ------------------------->', error);
        res.sendStatus(500);
    });
})

router.post('/', (req, res)=>{
    console.log('in / POST');
    let id = [req.body.task]
    let query = `INSERT INTO "to-do" (task) VALUES($1);`;
    pool.query(query, id).then(result => {
        res.sendStatus(201);
    })
    .catch(error => {
        console.log(`ERROR POSTING TASK ON SERVER ------------------------->`, error);
        res.sendStatus(500);
      });
  });

// PUT
router.put('/:id', (req, res)=>{
    let id = [req.params.id];
    let query = `UPDATE "to-do" SET completed = 'Y' WHERE id= $1`;
    pool.query(query, id).then( result => {
        res.sendStatus(201);
    }).catch(error => {
        console.log(`ERROR PUTTING TASK ON SERVER ------------------------->`, id);
        res.sendStatus(500);
    });
});

// DELETE

module.exports = router;