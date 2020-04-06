import {Router} from 'express';
import { listarRoles, crearRol, actualizarRol, eliminarRol } from '../controllers/rol.controller';
import { verificarToken } from '../config/verificarToken';
import { verificarRol } from '../config/verificarRol';

const app = Router();

app.get('/', [verificarToken, verificarRol] ,listarRoles);
app.post('/', [verificarToken, verificarRol], crearRol);
app.put('/:id',[verificarToken, verificarRol] , actualizarRol);
app.delete('/:id',[verificarToken, verificarRol] , eliminarRol);


export default app;