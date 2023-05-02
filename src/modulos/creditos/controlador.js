const db = require('../../DB/mysql');

const tabla = 'tipos_de_creditos';

function todos(){

    return db.query(tabla,{ idEstatusActividad: 1 });
}

function nombres(id){

    return db.column(tabla, 'Descripcion');
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
    todos,uno,agregar,eliminar,nombres
}