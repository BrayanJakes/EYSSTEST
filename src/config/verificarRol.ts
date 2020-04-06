import {Request, Response} from 'express';
import rolModel from '../models/rol.model';
import { Roles } from '../interfaces/roles.interfaces';



export const verificarRol = async (req: Request, res:Response, next: any) => {

    let {rol} = req.query;
    
    await rolModel.findById(rol, (err, resp: Roles) => {

        if(err){
            return res.status(500).json({
                ok:false,
                message: 'Error en DB'
            })
        }

        if(resp.level === 99){
            return next();
        }else{
            return res.json({message: 'No tienes privilegios de administrador'})
        }
    })


}