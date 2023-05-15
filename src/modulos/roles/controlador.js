const db = require('../../DB/mysql');

const tabla = 'roles';

function todos(){

    return db.query(tabla,{ idEstatusActividad: 1 });
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

module.exports = {
    todos,uno,agregar,eliminar
}