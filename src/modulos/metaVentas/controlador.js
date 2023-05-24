const db = require('../../DB/mysql');

const tabla = 'Meta_De_Ventas';

async function todos() {
    const todos = await db.todos(tabla);
    todos.forEach(element => {
        const fechaObtenida = new Date(element.Fecha);
        element.NumSemana = numeroDeSemana(new Date(fechaObtenida));
        element.Fecha= element.Fecha.toISOString().split('T')[0];
    });
    return todos;
}

function uno(id) {

    return db.uno(tabla, id);
}

async function obtenerMetaActual() {
    const metas = await db.todos(tabla);
    const numSemanaActual = numeroDeSemana(new Date())

    let fechaObtenida;
    for (let item of metas) {
        fechaObtenida = new Date(item.Fecha);
        if (numSemanaActual == numeroDeSemana(new Date(fechaObtenida))) {
            item.Fecha = item.Fecha.toISOString().split('T')[0];
            return item;
        }
    }
    return false;
}

function agregar(body) {
    return db.agregar(tabla, body);
}

function eliminar(body) {

    return db.eliminar(tabla, body);
}

function numeroDeSemana(fecha) {
    const DIA_EN_MILISEGUNDOS = 1000 * 60 * 60 * 24,
        DIAS_QUE_TIENE_UNA_SEMANA = 7,
        JUEVES = 4;
    fecha = new Date(Date.UTC(fecha.getFullYear(), fecha.getMonth(), fecha.getDate()));
    let diaDeLaSemana = fecha.getUTCDay(); // Domingo es 0, sábado es 6
    if (diaDeLaSemana === 0) {
        diaDeLaSemana = 7;
    }
    fecha.setUTCDate(fecha.getUTCDate() - diaDeLaSemana + JUEVES);
    const inicioDelAño = new Date(Date.UTC(fecha.getUTCFullYear(), 0, 1));
    const diferenciaDeFechasEnMilisegundos = fecha - inicioDelAño;
    return Math.ceil(((diferenciaDeFechasEnMilisegundos / DIA_EN_MILISEGUNDOS) + 1) / DIAS_QUE_TIENE_UNA_SEMANA);
};

function convertirFecha(fecha) {
    fecha = fecha.replaceAll("/", "-");
    const ano = fecha.substring(fecha.length - 4);
    fecha = fecha.replace(ano, "");

    let dia;
    if (fecha.substring(0, 2).includes("-")) {

        dia = "0" + fecha.substring(0, 1);
        fecha = fecha.substring(1);
    } else {
        dia = fecha.substring(0, 2);
        fecha = fecha.substring(2);
    }
    if (fecha.length == 3) {
        fecha = fecha.replace("-", "-0");
    }
    fecha = ano + fecha + dia+"";
    return fecha;
}

module.exports = {
    todos, uno, agregar, eliminar, obtenerMetaActual
}