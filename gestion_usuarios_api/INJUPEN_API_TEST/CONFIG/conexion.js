const mysql = require('mysql2/promise');

class Conectar {
    constructor() {
        this.dbh = null;
    }

    async Conexion() {
        if (this.dbh) {
            return this.dbh;
        }

        try {
            this.dbh = await mysql.createConnection({
                host: '127.0.0.1',
                user: 'root',
                password: '29595',
                database: 'injupen_db',
                charset: 'utf8'
            });
            return this.dbh;
        } catch (e) {
            console.error("Error BD!: " + e.message);
            throw e;
        }
    }

    async set_names() {
        if (!this.dbh) {
            await this.Conexion();
        }
        await this.dbh.query("SET NAMES 'utf8'");
    }
}

module.exports = Conectar;

function App(){
    return(
        <div className='App'>
            <div className='datos'>
            <label>Nombre: <input type="text"/></label>
            <label>Identificación (13 dígitos): <input type="text"/></label>
            <label>Correo Electrónico: <input type="text"/></label>
            <label>Número de Celular: <input type="text"/></label>
            <label>Contraseña: <input type="text"/></label>
            <label>Rol: <input type="select" valor={usuario.rol} onChange={(e) => onChange(e, 'rol')} opciones={roles} /></label>
            <label>Área: <input type="select" valor={usuario.area} onChange={(e) => onChange(e, 'area')} opciones={areas} /></label>
            <button type="submit" className="boton-submit">{modoEdicion ? 'Editar' : 'Crear'} Usuario</button>
            </div>
        </div>
    );



}



