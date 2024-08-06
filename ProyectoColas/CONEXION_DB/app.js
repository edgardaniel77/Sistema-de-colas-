import express from 'express'
import cors from 'cors'

//Importar Conexion a la Data Base
import db from './ProyectoColas/CONEXION_DB/database/db.js'

//Importamos el enrutador
import UsuarioRoutes from './ProyectoColas/CONEXION_DB/routes/routes.js'


const app = express()

app.use( cors() )
app.use(express.json)
app.use('/GESTION_USUARIOS', UsuarioRoutes)


try {
    await db.authenticate()
    console,log('Conexion exitosa a la Base de Datos')
} catch (error) {
    console,log(`El error de conexion es: ${error}`)
}


app.get('/', (req, res)=>{
    res.send('BIENVENIDO')
})


app.listen(3000, ()=>{
    console.log('Server UP running http://localhost:3000/')
})

