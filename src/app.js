const express = require('express');
const morgan = require('morgan');
const config = require('./config');
const cors = require('cors');


const roles = require('./modulos/roles/rutas');
const permisos = require('./modulos/permisos/rutas');
const permisosRoles = require('./modulos/permisosRoles/rutas');
const usuarios = require('./modulos/usuarios/rutas');
const motos = require('./modulos/motos/rutas');
const creditos = require('./modulos/creditos/rutas');
const estatusCot = require('./modulos/estatusCotizacion/rutas');
const asesoresbaz = require('./modulos/asesoresbaz/rutas');
const mediosContacto = require('./modulos/mediosContacto/rutas');
const clientes = require('./modulos/clientes/rutas');
const prospectos = require('./modulos/prospectos/rutas');
const cotizaciones = require('./modulos/cotizaciones/rutas');
const citas = require('./modulos/citas/rutas');
const cotizacionesMoto = require('./modulos/motosCotizaciones/rutas');
const metaVentas = require('./modulos/metaVentas/rutas');
const estatusServicio = require('./modulos/estatusServicio/rutas');
const servicios = require('./modulos/servicios/rutas');
const motosTaller = require('./modulos/motosTaller/rutas');

const error = require('./red/errors');

const app = express();

//middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
/*app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    next();
});*/

//uso de clave

//configuracion
app.set('port',config.app.port);

const whiteList = [process.env.ORIGIN1];
app.use(cors({
    origin: function(origin, callback){
        if(!origin || whiteList.includes(origin)){
            return callback(null, origin);
        }
        return callback("Error de CORS origin: " + origin + " NO AUTORIZADO!")
    },
    //Habilitamos el uso de credenciales
    //credentials: true
}));

//rutas
app.use('/api/roles',roles);
app.use('/api/permisos',permisos);
app.use('/api/permisosRoles',permisosRoles);
app.use('/api/usuarios',usuarios);
app.use('/api/motos',motos);
app.use('/api/creditos',creditos);
app.use('/api/estatusCotizacion',estatusCot);
app.use('/api/asesoresbaz',asesoresbaz);
app.use('/api/mediosContacto',mediosContacto);
app.use('/api/clientes',clientes);
app.use('/api/prospectos',prospectos);
app.use('/api/cotizaciones',cotizaciones);
app.use('/api/citas',citas);
app.use('/api/cotizacionesMoto',cotizacionesMoto);
app.use('/api/metaVentas',metaVentas);
app.use('/api/estatusServicio',estatusServicio);
app.use('/api/servicios',servicios);
app.use('/api/motosTaller',motosTaller);
app.use(error);


module.exports = app;