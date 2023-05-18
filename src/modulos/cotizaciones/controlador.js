const db = require('../../DB/mysql');

const tabla = 'cotizaciones';

async function existe(cotizacion){
    const result = await db.queryFlex(tabla,cotizacion); 
    console.log(result)
    console.log(result.length!=0)
    return result.length!=0;
}

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

module.exports = {
    todos,uno,agregar,eliminar,existe//,historial
}