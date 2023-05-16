const db = require('../../DB/mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const tabla = 'empleados';
const keys = require('../../sec/keys')

async function login(body) {
    const data = await db.queryMultiple(tabla, { Usuario: body.Usuario }, { EstatusActividad_idEstatusActividad: 1 });
    //const data = await db.query(tabla, `Usuario=${body.Usuario} AND EstatusActividad_idEstatusActividad=1`);
    console.log(data[0])

    if (data[0] == undefined) {
        return {
            token: null
        }
    }

    const valido = await bcrypt.compare(body.Contrasena, data[0].Contrasena)
    console.log(valido)
    if (valido) {
        //generar un token
        const payload = {
            user: data[0].Usuario
        };
        const token = jwt.sign(payload, keys.key, {
            expiresIn: '1d'
        });
        return {
            token: token
        }
    } else {
        return {
            token: null
        }
    }

}

async function verificacion(req) {
    let valido = false;
    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (!token) {
        return false;
    }
    if (token.startsWith('Bearer ')) {
        token = token.slice(7, token.lenght);
        console.log('token' + token)
    }
    if (token) {
        valido = jwt.verify(token, keys.key, async (error, decoded) => {
            if (error) {
                console.log("error")
                return false;

            } else {

                //console.log(req.body);
                //console.log(req.body.IdInterfaz);
                req.decoded = decoded;
                console.log(decoded);
                console.log(req.body.Usuario)
                const datosUser = await db.query("Empleados", { Usuario: decoded.user });
                console.log(datosUser[0].Roles_idRoles)
                const permisos = await db.unoCompuesto("permisos_has_roles", datosUser[0].Roles_idRoles);

                if (req.body.IdInterfaz == 0) {
                    return { estado: true, user: decoded.user } 
                } else {
                    return { estado: permisos.find(element => element.idPermisos == req.body.IdInterfaz), user: decoded.user } 
                }
            }
        })
    }
    console.log(valido)
    return valido;
}

function todos() {

    return db.query(tabla, { EstatusActividad_idEstatusActividad: 1 });
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
    todos, uno, agregar, eliminar, login, verificacion, nicks
}