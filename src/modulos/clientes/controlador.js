const db = require('../../DB/mysql');

const tabla = 'clientes';

async function existe(cliente){
    const result = await db.queryFlex(tabla,cliente); 
    console.log(result.length!=0)
    return result.length!=0;
}

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
    return db.agregar(tabla, body);
}

function eliminar(body){

    return db.eliminar(tabla, body);
}

module.exports = {
    todos,uno,agregar,eliminar,historial,existe
}