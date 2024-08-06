//Importar de la DataBase
import db from "../ProyectoColas/CONEXION_DB/database/db.js";

//Importar Sequelize
import {DataTypes} from "sequelize";

const models = db.define('GESTION_USUARIOS', {
    NOMBRE:{ type:varchar.STRING },
    IDENTIFICACION:{ type:varchar.STRING },
    CORREO:{ type:varchar.STRING },
    TELEFONO:{ type:varchar.STRING },
    PASSWORD:{ type:varchar.STRING },
    ROL:{ type:varchar.STRING },
    AREA:{ type:varchar.STRING },
})

export default models

