import express from 'express';
import conexion from './conexion';
require('dotenv').config();

import rolRoutes from './routes/roles.route';
import usuarioRoutes from './routes/user.route';
import loginRoutes from './routes/login.route';



export default class Server{

    private app: express.Application;
    private puerto: number;

    constructor(){
        this.app = express();
        this.puerto = Number(process.env.PORT) || Number(process.env.LOCAL);
        this.config()
        this.conexionDB();
        this.routes();
    }


    //Configuraciones
    private config(){
        this.app.use((req, res, next) => {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
            res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
            next();
        });
        this.app.use(express.json());
        this.app.use(express.urlencoded({extended: true}));
    }

    //Conexion a la base de datos
    private conexionDB() {
        conexion()
    }

    //Rutas
    private routes(){
        this.app.use('/api/roles', rolRoutes);
        this.app.use('/api/users', usuarioRoutes);
        this.app.use('/api/login', loginRoutes);
    }

    //Inicia El server
    public start(){
        this.app.listen(this.puerto, () => console.log('Server en el puerto', this.puerto));
    }

}