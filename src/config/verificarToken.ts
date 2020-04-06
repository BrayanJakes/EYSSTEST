import {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import { SEED } from './SEED';

export const verificarToken = (req: Request, res: Response, next: any) => {
    const {token} = req.query;
    jwt.verify(token, SEED, (err: any, decoded: any) => {
        if (err){
            return res.json({
              ok: false,
              message: "Token incorrecto!",
              err
            });
            }
        
        return next();
        
    })
}