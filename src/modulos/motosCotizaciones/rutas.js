const express = require('express');
const respuesta = require('../../red/respuestas')
const controlador = require('./controlador')


const router = express.Router();

router.post('/', uno);
router.get('/', todos);

async function todos(req, res, next) {

    try {
        console.log("imprimiendo req")
        console.log(req.body)
        const items = await controlador.todos(req.body);
        respuesta.success(req, res, items, 200);
    } catch (error) {
        next(error);
    }
};
async function uno(req, res, next) {

    try {
        console.log(req.body)
        const items = await controlador.uno(req.body);
        respuesta.success(req, res, items, 200);
    } catch (error) {
        next(error);
    }
};





module.exports = router;