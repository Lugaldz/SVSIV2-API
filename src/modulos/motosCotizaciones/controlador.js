const db = require('../../DB/mysql');
const tabla = 'cotizaciones_has_moto';

function todos() {

    return db.todos(tabla);
}

function uno(id) {

    return db.uno(tabla, id);
}

function nicks() {
    return db.column(tabla, 'Usuario');
}

function agregar(body) {
    return db.agregarCompuesto(tabla, body);
}

function eliminar(body) {

    return db.eliminar(tabla, body);
}

module.exports = {
    todos,agregar
}