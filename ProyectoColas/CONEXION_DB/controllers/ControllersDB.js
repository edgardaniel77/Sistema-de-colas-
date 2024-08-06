//Importal el Models
import models from "../ProyectoColas/CONEXION_DB/models/models.js";


////////////////////////////////////////////////////////////////////////////////
//**Metodos para el CRUD */////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////

// Mostrar usuarios ---TODOS
export const getallusuarios = async (req, res) => {
    try {
        const usuarios = await models.findAll()    
        res.json(usuarios)    
    } catch (error) {
        res.json( {message: error.message} )
    }
}


// Mostrar usuario ---SOLO UNO
export const getusuario = async (req, res) => {
    try {
        const usuario = await models.findAll({
            where:{id:req.params.id}
        })    
        res.json(usuario)    
    } catch (error) {
        res.json( {message: error.message} )
    }
}


// Crear usuario
export const createusuario = async (req, res) => {
    try {await models.create(req,body)
        res.json({
            "message":"¡Usuarios creado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}


// Actualizar usuario
export const updateusuario = async (req, res) => {
    try {
        await models.update(req.body,{
            were: {id: req.params.id}
        })
        res.json({
            "message":"¡Usuario actualizado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}


// Eliminar usuario
export const deleteusuario = async (req, res) => {
    try {
        await models.destroy({
        were: {id: req.params.id}
        })
        res.json({
            "message":"¡Usuarios eliminado correctamente!"
        })
    } catch (error) {
        res.json( {message: error.message} )
    }
}


