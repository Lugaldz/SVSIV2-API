const db = require('../../DB/mysql');
const tabla = 'cotizaciones_has_moto';

function todos(idCotizacion) {

    return db.query(tabla, idCotizacion);
}

function uno(id) {

    return db.uno(tabla, id);
}

function nicks() {
    return db.column(tabla, 'Usuario');
}

async function agregar(body) {
    if (body.Contrasena) {
        body.Contrasena = await bcrypt.hash(body.Contrasena.toString(), 5);
    }
    return db.agregar(tabla, body);
}

function eliminar(body) {

    return db.eliminar(tabla, body);
}

module.exports = {
    todos
}