import {Request, Response} from 'express';
import userModel from '../models/user.model';
import bcrypt from 'bcryptjs';
import { User } from '../interfaces/user.interface';

export const listarUsuario = async (req: Request, res: Response) => {
       
       
        await userModel.find((err, resp: User) => {

            if(err){
                return res.status(500).json({
                    ok: false,
                    mensage: 'Error en DB',
                    err
                })
            }
            return res.json({
                ok: true,
                mensage: 'Usuarios en DB activos',
                users: resp
            })

        }) 
}


export const crearUsuario = async (req: Request, res: Response) => {
       
   const user: User = req.body;
   user.password = bcrypt.hashSync(user.password, 12); 
   user.status = true;
   const newRol = new userModel(user);
   await newRol.save((err, save) => {
    if(err){
        return res.status(500).json({
            ok: false,
            mensage: 'Error en DB',
            err
        })
    }

     res.json({
        ok: true,
        mensage: 'Usuario Guardado',
        users: save
    })
   })
   
}


export const actualizarUsuario = async (req: Request, res: Response) => {
    const {id} = req.params;    
    const user = req.body; 
    user.password = bcrypt.hashSync(user.password, 12);
    await userModel.findByIdAndUpdate(id, user ,(err, update) => {
     if(err){
         return res.status(500).json({
             ok: false,
             mensage: 'Error en DB',
             err
         })
     }
 
      res.json({
         ok: true,
         mensage: 'Usuario Actualizado',
         users: update
     })
    })
    
 }


 export const eliminarUsuario = async (req: Request, res: Response) => {
    const {id} = req.params;    
    await userModel.findByIdAndRemove(id ,(err, eliminado) => {
     if(err){
         return res.status(500).json({
             ok: false,
             mensage: 'Error en DB',
             err
         })
     }
 
      res.json({
         ok: true,
         mensage: 'Usuario Eliminado',
         users: eliminado
     })
    })
    
 }