import {Router} from 'express';
import { listarUsuario, crearUsuario, actualizarUsuario, eliminarUsuario } from '../controllers/user.controller';
import { verificarToken } from '../config/verificarToken';
import { verificarRol } from '../config/verificarRol';

const app = Router();

app.get('/',[verificarToken, verificarRol], listarUsuario);
app.post('/', crearUsuario);
app.put('/:id',[verificarToken, verificarRol], actualizarUsuario);
app.delete('/:id',[verificarToken, verificarRol], eliminarUsuario);


export default app;
