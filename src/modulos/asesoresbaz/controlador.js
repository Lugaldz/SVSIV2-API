const db = require('../../DB/mysql');

const tabla = 'asesoresbaz';

function todos(){

    return db.query(tabla,{EstatusActividad_idEstatusActividad:1});
}

function historial(){

    return db.todos(tabla);
}

function uno(id){

    return db.uno(tabla, id);
}

function agregar(body) {
    console.log(body);
    return db.agregar(tabla, body);
}

function eliminar(body){

    return db.eliminar(tabla, body);
}

module.exports = {
    todos,uno,agregar,eliminar,historial
}
