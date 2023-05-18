const db = require('../../DB/mysql');

const tabla = 'moto';

function todos(){

    return db.todos(tabla);
}

function activas(){

    return db.query(tabla,{estatusVigencia:1});
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
    todos,uno,agregar,eliminar,activas
}