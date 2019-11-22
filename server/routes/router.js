const express = require('express');
const router = express.Router();

const pool = require('../modules/pool');

// GET
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

// POST
router.post('/', (req, res)=>{
    console.log('in / POST');
    let id = [task.task]
    let query = `INSERT INTO "to-do" (task) VALUES($1);`;
    pool.query(query, id)
    .then(result => {
        res.sendStatus(201);
    })
    .catch(error => {
        console.log(`ERROR POSTING TASK ON SERVER`, error);
        res.sendStatus(500);
      });
  });

// PUT
// koalaRouter.put('/:id', (req, res)=>{
//     let id = [req.params.id];
//     let queryText = `UPDATE "koala" SET "transfer"= 'Y' WHERE "id"= $1`;
//     pool.query(queryText, id).then( result => {
//         res.sendStatus(201);
//     }).catch(error => {
//         console.log(`Updating koala status ${id} with `, id);
//         res.sendStatus(500);
//     });
// });

// DELETE

module.exports = router;