const mysql = require('mysql');
const config = require('../config');

const dbconfig = {
    host: config.mysql.host,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
}

let conexion;

function conMysql(){
    conexion = mysql.createConnection(dbconfig);

    conexion.connect((err)=>{
        if(err){
            console.log('[db err]',err);
            setTimeout(conMysql,200);
        }else{
            console.log('DB conectada')
        }
    });
    conexion.on('error',err=>{
        console.log('[db err]',err);
        if(err.code ==='PROTOCOL_CONNECTION_LOST'){
            conMysql();
        }else{
            throw err;
        }

    })
}

conMysql();

function todos(tabla){
    return  new Promise((resolve, reject)=>{
        conexion.query(`SELECT * FROM ${tabla}`, (error,result)=>{
            return error ? reject(error) : resolve(result);
        })
    });

}

function uno(tabla, id){
    return  new Promise((resolve, reject)=>{
        conexion.query(`SELECT * FROM ${tabla} WHERE id${tabla}=${id}`, (error,result)=>{
            return error ? reject(error) : resolve(result);
        })
    });

}

function unoCompuesto(tabla, id){
    return  new Promise((resolve, reject)=>{
        conexion.query(`select idRoles, Nombre, idPermisos, Descripcion from roles,permisos, permisos_has_roles where Roles_idRoles=${id} and Roles_idRoles=idRoles and Permisos_idPermisos = idPermisos;`, (error,result)=>{
            return error ? reject(error) : resolve(result);
        })
    });

}

function insertar(tabla, data){
    return  new Promise((resolve, reject)=>{
        conexion.query(`INSERT INTO ${tabla} SET ?`,data, (error,result)=>{
            return error ? reject(error) : resolve(result);
        })
    });

}

function actualizar(tabla, data){
    let id = Object.values(data);
    return  new Promise((resolve, reject)=>{
        conexion.query(`UPDATE ${tabla} SET ? WHERE id${tabla} = ?`,[data, id[0]], (error,result)=>{
            return error ? reject(error) : resolve(result);
        })
    });

}

function agregar(tabla, data){
    let id = Object.values(data);
    if(data && id[0] == 0){
        return insertar(tabla, data);
    }else{
        return actualizar(tabla, data);
    }

}

function agregarCompuesto(tabla, data){
    return  new Promise((resolve, reject)=>{
        conexion.query(`INSERT INTO ${tabla} SET ?`,data, (error,result)=>{
            return error ? reject(error) : resolve(result);
        })
    });

}

function eliminar(tabla, data){
    let id = Object.values(data);
    return  new Promise((resolve, reject)=>{
        conexion.query(`DELETE FROM ${tabla} WHERE id${tabla}= ?`, id[0], (error,result)=>{
            return error ? reject(error) : resolve(result);
        })
    });

}

function eliminarCompuesto(tabla, id){
   
    return  new Promise((resolve, reject)=>{
        conexion.query(`DELETE FROM ${tabla} WHERE Roles_idRoles=${id}`, (error,result)=>{
            return error ? reject(error) : resolve(result);
        })
    });

}

function query(tabla, consulta){
    return  new Promise((resolve, reject)=>{
        conexion.query(`SELECT * FROM ${tabla} WHERE ?`, consulta,(error,result)=>{
            return error ? reject(error) : resolve(result[0]);
        })
    });
}

function queryMultiple(tabla, consulta){
    return  new Promise((resolve, reject)=>{
        conexion.query(`SELECT * FROM ${tabla} WHERE ?`, consulta,(error,result)=>{
            return error ? reject(error) : resolve(result);
        })
    });
}

module.exports= {
    todos,uno,agregar,eliminar,unoCompuesto,agregarCompuesto,eliminarCompuesto,query, queryMultiple
}