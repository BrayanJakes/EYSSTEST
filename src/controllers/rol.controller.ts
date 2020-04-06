import {Request, Response} from 'express';
import rolModel from '../models/rol.model';
import { Roles } from '../interfaces/roles.interfaces';

export const listarRoles = async (req: Request, res: Response) => {
       
       
        await rolModel.find((err, resp) => {

            if(err){
                return res.status(500).json({
                    ok: false,

                    mensage: 'Error en DB'
                })
            }

            return res.json({
                ok: true,
                mensage: 'Roles en DB activos',
                roles: resp
            })

        }) 
}


export const crearRol = async (req: Request, res: Response) => {
       
   const {name, level} = req.body; 
   const newRol = new rolModel({name, level});
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
        mensage: 'Rol Guardado',
        roles: save
    })
   })
   
}


export const actualizarRol = async (req: Request, res: Response) => {
    const {id} = req.params;    
    const {name, level} = req.body; 
    await rolModel.findByIdAndUpdate(id, {name, level} ,(err, update) => {
     if(err){
         return res.status(500).json({
             ok: false,
             mensage: 'Error en DB',
             err
         })
     }
 
      res.json({
         ok: true,
         mensage: 'Rol Actualizado',
         roles: update
     })
    })
    
 }


 export const eliminarRol = async (req: Request, res: Response) => {
    const {id} = req.params;    
    await rolModel.findByIdAndRemove(id ,(err, eliminado) => {
     if(err){
         return res.status(500).json({
             ok: false,
             mensage: 'Error en DB',
             err
         })
     }
 
      res.json({
         ok: true,
         mensage: 'Rol Eliminado',
         roles: eliminado
     })
    })
    
 }