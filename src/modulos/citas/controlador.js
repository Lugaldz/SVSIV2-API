const db = require('../../DB/mysql');
const usContr = require('../usuarios/controlador');
const tabla = 'citas';

function todos(){

    return db.todos(tabla);
}

function uno(id){

    return db.uno(tabla, id);
}

function agregar(body) {
    return db.agregar(tabla, body);
}

function eliminar(body){

    return db.eliminar(tabla, body);
}

async function citasProximas(user){
    const usuario = await usContr.unoPorUser(user);
    const idUser = usuario.idEmpleados;

    const citas = await db.query('citas',{Empleados_idEmpleados:idUser});
}

module.exports = {
    todos,uno,agregar,eliminar
}