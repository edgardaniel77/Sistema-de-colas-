const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());


const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"29595",
    database:"injupen_db"
});


/*METODO POST*/
app.post("/create",(req,res)=>{
    const NOMBRE =  req.body.NOMBRE;
    const IDENTIFICACION =  req.body.IDENTIFICACION;
    const CORREO =  req.body.CORREO;
    const TELEFONO =  req.body.TELEFONO;
    const PASSWORD =  req.body.PASSWORD;
    const ROL =  req.body.ROL;
    const AREA =  req.body.AREA;

    db.query('INSERT INTO GESTION_USUARIOS(NOMBRE,IDENTIFICACION,CORREO,TELEFONO,PASSWORD,ROL,AREA) VALUES(?,?,?,?,?,?,?)',[NOMBRE,IDENTIFICACION,CORREO,TELEFONO,PASSWORD,ROL,AREA],
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send("¡Usuario registrado con éxito!");
        }
    }
    );
    
});



/*METODO GET*/
app.get("/usuarios",(req,res)=>{
    
    db.query('SELECT * FROM GESTION_USUARIOS',
    (err,result)=>{
        if(err){
            console.log(err);
        }else{
            req.send(result);
        }
    }
    );
    
});



app.listen(3001,()=>{
    console.log("OK-200: Conectado al Puerto 3001")
})
