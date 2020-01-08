const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

router.get(`/`, (req, res)=>{
    let SQLquery = `SELECT * FROM "to-do" ORDER BY lower(task);`;
    pool.query(SQLquery)
    .then(result=>{
        res.send(result.rows);
    }).catch(error=>{
        console.log('ERROR IN GET ------------------------->', error);
        res.sendStatus(500);
    });
});

router.post(`/`, (req, res)=>{
    let id = [req.body.task]
    let SQLquery = `INSERT INTO "to-do" (task) VALUES($1);`;
    pool.query(SQLquery, id)
    .then(result=>{
        res.sendStatus(201);
    }).catch(error=>{
        console.log(`ERROR IN POST ------------------------->`, error);
        res.sendStatus(500);
    });
});

router.put(`/:id`, (req, res)=>{
    let id = [req.params.id];   
    let SQLquery = `UPDATE "to-do" SET completed = not completed WHERE id= $1;`;
    pool.query(SQLquery, id)
    .then(result=>{
        res.sendStatus(201);
    }).catch(error=>{
        console.log(`ERROR IN PUT ------------------------->`, error);
        res.sendStatus(500);
    });
});

router.delete(`/:id`, (req, res)=>{
    let id = [req.params.id];
    let SQLquery = `DELETE FROM "to-do" WHERE id = $1;`;
    pool.query(SQLquery, id)
    .then(result=>{
        res.sendStatus(200)
    }).catch(error=>{
        console.log(`ERROR IN DELETE ------------------------->`, error);
        res.sendStatus(500);
    });
});

module.exports = router;