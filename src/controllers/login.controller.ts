import {Request, Response} from 'express';
import bcrypt from 'bcryptjs';
import userModel from '../models/user.model';
import jwt from 'jsonwebtoken';
import { User } from '../interfaces/user.interface';
import { SEED } from '../config/SEED';

export const loginUser = async (req: Request, res: Response) => {

        const user: User = req.body;
        await userModel.findOne({username: user.username}, async (err, resp: User) => {

            if(err){
                return res.status(500).json({
                    ok: false,

                    mensage: 'Error en DB'
                })
            }

            if(resp === null){
                return res.json({
                    ok: false,
                    mensage: 'Username no esta registrado'
                })
            }

            if(!bcrypt.compareSync(user.password, resp.password)){
                return res.json({
                    ok: false,
                    mensage: 'Contraseña Incorrecta'
                })

            }
            resp.password = '';
            resp.access_token = '';
            const payload = {resp}
            const token = jwt.sign(payload, SEED, {expiresIn: 99999999})

            await userModel.findByIdAndUpdate(resp._id, {access_token: token});

            return res.json({
                ok: true,
                mensage: 'Usuario logeado',
                user: resp,
                token
            })

        })
       
       
  
}

export const salirLogin = async (req: Request, res:Response) => {
    const { id } = req.params;
    await userModel.findByIdAndUpdate(id, {access_token: ''}, (err, resp) => {
        return res.json({ok: true, message: 'User deslogeado'})
    })
}
