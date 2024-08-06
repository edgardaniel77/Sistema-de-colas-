import express from 'express'
import { getallusuarios, getusuario, createusuario, updateusuario, deleteusuario } from '../ProyectoColas/CONEXION_DB/controllers/ControllersDB.js'

const router = express.Router()

router.get('/', getallusuarios)
router.get('/:id', getusuario,)
router.post('/', createusuario)
router.put('/:id', updateusuario)
router.delete('/:id', deleteusuario)

export default router
