const express = require('express');
const respuesta = require('../../red/respuestas')
const controlador = require('./controlador')


const router = express.Router();

router.post('/', agregar);
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

async function agregar(req, res, next) {
    try {
        const items = await controlador.agregar(req.body);

        if (req.body.idRoles == 0) {
            mensaje = 'Item guardado con exito';
        } else {
            mensaje = 'Item actualizado con exito';
        }

        respuesta.success(req, res, mensaje, 201);
    } catch (error) {
        next(error);
    }
};




module.exports = router;