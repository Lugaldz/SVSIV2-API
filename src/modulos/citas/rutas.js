const express = require('express');
const respuesta = require('../../red/respuestas')
const controlador = require('./controlador')


const router = express.Router();

router.get('/', todos);
router.get('/:id', uno);
router.post('/', agregar);

router.put('/', eliminar)

async function todos(req, res, next) {

    try {
        const items = await controlador.todos();
        items.forEach(element => {
            let fecha = element.fecha.toLocaleDateString();
            fecha = fecha.replaceAll("/", "-");
            const ano = fecha.substring(fecha.length - 4);
            fecha = fecha.replace(ano, "");
        
            let dia;
            if (fecha.substring(0, 2).includes("-")) {
              
              dia = "0"+fecha.substring(0, 1);
              fecha = fecha.substring(1);
            } else {
              dia = fecha.substring(0, 2);
              fecha = fecha.substring(2);
            }
            if (fecha.length == 3) {
              fecha = fecha.replace("-", "-0");
            }
            fecha = ano + fecha + dia;
            element.fecha = fecha + " " + element.fecha.toLocaleTimeString();
            console.log(element.fecha)
        });
        respuesta.success(req, res, items, 200);
    } catch (error) {
        next(error);
    }
};


async function uno(req, res, next) {
    try {
        const items = await controlador.uno(req.params.id);
        items[0].fecha = items[0].fecha.toISOString().split('T')[0] + " " + items[0].fecha.toLocaleTimeString()
        respuesta.success(req, res, items, 200);
    } catch (error) {
        next(error);

    }
};

async function agregar(req, res, next) {
    try {
        console.log(req.body)
        const items = await controlador.agregar(req.body);

        if (req.body.idCitas == 0) {
            mensaje = 'Item guardado con exito';
        } else {
            mensaje = 'Item actualizado con exito';
        }

        respuesta.success(req, res, mensaje, 201);
    } catch (error) {
        next(error);
    }
};

async function eliminar(req, res, next) {
    try {
        const items = await controlador.eliminar(req.body);
        respuesta.success(req, res, 'Item eliminado', 200);
    } catch (error) {
        next(error);
    }
};
module.exports = router;