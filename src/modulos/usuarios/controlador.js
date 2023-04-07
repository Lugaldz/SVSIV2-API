const db = require('../../DB/mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tabla = 'empleados';
const keys = require('../../sec/keys')

async function login(body){
    const data = await db.query(tabla, {Usuario: body.Usuario});
    if (data==undefined) {
        throw new Error('Informacion invalida')
    }
     const valido = await bcrypt.compare(body.Contrasena,data.Contrasena) 
     console.log(valido)
        if(valido){
            //generar un token
            const payload = {
                user:body.Usuario
            };
            const token = jwt.sign(payload, keys.key,{
                expiresIn: '1d'
            });
            return {
                token:token
            }
        }else{
            throw new Error('Informacion invalida');
        }
    
}

async function verificacion(req){
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if(!token){
        return false;
    }
    if(token.startsWith('Bearer ')){
        token = token.slice(7, token.lenght);
        console.log(token)
    }
    if(token){
        jwt.verify(token, keys.key, (error, decoded)=>{
            if (error) {
                console.log("error")
            }else{
                req.decoded = decoded;
                console.log(decoded);
            }
        })
    }

}

function todos(){

    return db.todos(tabla);
}

function uno(id){

    return db.uno(tabla, id);
}

async function agregar(body) {
    if(body.contrasena){
        console.log(body.contrasena);
        body.contrasena = await bcrypt.hash(body.contrasena.toString(), 5);
        console.log(body.contrasena);
    }
    return db.agregar(tabla, body);
}

function eliminar(body){

    return db.eliminar(tabla, body);
}

module.exports = {
    todos,uno,agregar,eliminar, login, verificacion
}