const db = require('../../DB/mysql');

const tabla = 'servicios';

async function existe(servicios){
    const result = await db.queryFlex(tabla,servicios); 
    console.log(result)
    console.log(result.length!=0)
    return result.length!=0;
}

function todos(){

    return db.query(tabla,{ idEstatusActividad: 1 });
}

function activas(){

    return db.query(tabla,{EstatusActividad:1});
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
    todos,uno,agregar,eliminar,existe,activas//,historial
}