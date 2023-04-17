const db = require('../../DB/mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tabla = 'empleados';
const keys = require('../../sec/keys')

async function login(body){
    const data = await db.queryMultiple(tabla, {Usuario: body.Usuario}, {EstatusActividad_idEstatusActividad:1});
    //const data = await db.query(tabla, `Usuario=${body.Usuario} AND EstatusActividad_idEstatusActividad=1`);
    console.log(data[0])
  
    if (data[0]==undefined) {
        return {
            token: null
        }
    }
    
     const valido = await bcrypt.compare(body.Contrasena,data[0].Contrasena) 
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
            return {
                token: null
            }
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

    return db.query(tabla,{EstatusActividad_idEstatusActividad: 1});
}

function uno(id){

    return db.uno(tabla, id);
}

function nicks(){
    return db.column(tabla,'Usuario');
}

async function agregar(body) {
    if(body.Contrasena){
        body.Contrasena = await bcrypt.hash(body.Contrasena.toString(), 5);
    }
    return db.agregar(tabla, body);
}

function eliminar(body){

    return db.eliminar(tabla, body);
}

module.exports = {
    todos,uno,agregar,eliminar, login, verificacion, nicks
}