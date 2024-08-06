import {Sequelize} from 'sequelize'

const db = new Sequelize('injupen_db', 'root', '29595',{
    host:'localhost',
    dialect: 'mysql'
})

export default db
