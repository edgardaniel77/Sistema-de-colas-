import './GestionUsuarios.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import axios from 'axios';


/*PAQUETE DE ALERTAS POP */
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
const AlertaPOP = withReactContent(Swal)



function USUARIOS(){

    const [CODIGO,setCODIGO] = useState("");
    const [NOMBRE,setNombre] = useState("");
    const [IDENTIFICACION,setIdentificacion] = useState("");
    const [CORREO,setCorreo] = useState("");
    const [TELEFONO,setTelefono] = useState("");
    const [PASSWORD,setPassword] = useState("");
    const [ROL,setRol] = useState("");
    const [AREA,setArea] = useState("");

    const [Editar,setEditar] = useState(false);

    const limpiarCampos = () => {
        setCODIGO("");
        setNombre("");
        setIdentificacion("");
        setCorreo("");
        setTelefono("");
        setPassword("");
        setRol("");
        setArea("");
    };

    const Cancelar = () => {
        setEditar(false);
        limpiarCampos();
    };

    const roles = [
        { value: "administrador", label: "Administrador" },
        { value: "usuario", label: "Usuario" }
    ];
    
    const areas = [
        { value: "secretaria_general", label: "Secretaría General" },
        { value: "prestamos", label: "Préstamos" },
        { value: "cartera_y_cobro", label: "Cartera y Cobro" },
        { value: "planilla_jubilados", label: "Planilla Jubilados" },
        { value: "beneficios", label: "Beneficios" },
        { value: "Informatica", label: "Informatica" }
    ];    
    

    const [UsuariosList,setUsuarios] = useState ([]);
    
    /*POST USUARIOS - CRUD/DataBase*/
    const addUser = ()=>{
        axios.post("http://localhost:5000/usuarios",{
            NOMBRE:NOMBRE,
            IDENTIFICACION:IDENTIFICACION,
            CORREO:CORREO,
            TELEFONO:TELEFONO,
            PASSWORD:PASSWORD,
            ROL:ROL,
            AREA:AREA
        }).then(()=>{
            limpiarCampos();
            getUser();
            AlertaPOP.fire({
                title: <strong>!Registro Exitoso!</strong>,
                html: <i>!El Usuario {NOMBRE} fue Registrado con Éxito!</i>,
                icon: 'success',
                timer:3000                            
            })          
        });
    }


    const UPDATE = () => {
        // Asegúrate de que CODIGO tenga el valor correcto del usuario a actualizar
        axios.put(`http://localhost:5000/usuarios/${CODIGO}`, {
            NOMBRE: NOMBRE,
            IDENTIFICACION: IDENTIFICACION,
            CORREO: CORREO,
            TELEFONO: TELEFONO,
            PASSWORD: PASSWORD,
            ROL: ROL,
            AREA: AREA
        }).then(() => {
            limpiarCampos();
            Cancelar();
            AlertaPOP.fire({
                title: <strong>!Actualización Exitosa!</strong>,
                html: <i>!El Usuario {NOMBRE} fue actualizado con Éxito!</i>,
                icon: 'success',
                timer: 3000
            })
        }).catch((error) => {
            console.error('Error al actualizar el usuario:', error);
            AlertaPOP.fire({
                title: <strong>!Error!</strong>,
                html: <i>No se pudo actualizar el Usuario {NOMBRE}. Intente nuevamente.</i>,
                icon: 'error',
                timer: 3000
            });
        });
    }
    


    /*GET USUARIOS - DATAGRID*/
    const getUser = ()=>{
        axios.get("http://localhost:5000/usuarios").then((response)=>{
            setUsuarios(response.data);
        });
    }

    getUser();


    /*UPDATE USUARIOS - DATAGRID*/
    const EditarUsuario = (val)=>{
        setEditar(true)

        setCODIGO(val.CODIGO);
        setNombre(val.NOMBRE);
        setIdentificacion(val.IDENTIFICACION);
        setCorreo(val.CORREO);
        setTelefono(val.TELEFONO);
        setPassword(val.PASSWORD);
        setRol(val.ROL);
        setArea(val.AREA);
    }


    /*DELETE USUARIOS - CRUD/DataBase*/
    const BorrarUser = (val) => {
        Swal.fire({
            title: 'Confirma la Eliminación?',
            html: "<i>¿Desea eliminar el Usuario <strong>" + val.NOMBRE + "</strong>?</i>",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminarlo!',
        }).then((result) => {
            if (result.isConfirmed) {
                // Usa el CODIGO del usuario para construir la URL de la API
                axios.delete(`http://localhost:5000/usuarios/${val.CODIGO}`).then(() => {
                    limpiarCampos();
                    Cancelar();
                    
                    Swal.fire(
                        'Eliminado!',
                        val.NOMBRE + ' fue eliminado.',
                        'success'
                    );  
                }).catch(error => {
                    // Manejo de errores
                    Swal.fire(
                        'Error!',
                        'Hubo un problema al eliminar el usuario.',
                        'error'
                    );
                });
            }
        });
    }
    
    
    


    return(
        <div className="USUARIOS">
            
            <div className="DATOS">
            <label>Nombre: <input value={NOMBRE}
            onChange={(event)=>{
                setNombre(event.target.value);
            }}
            type="text"/></label>

            <label>Identificación: <input value={IDENTIFICACION}
            onChange={(event)=>{
                setIdentificacion(event.target.value);
            }} type="text"/></label>

            <label>Correo Electrónico: <input value={CORREO}
            onChange={(event)=>{
                setCorreo(event.target.value);
            }} type="text"/></label>

            <label>Número de Celular: <input value={TELEFONO}
            onChange={(event)=>{
                setTelefono(event.target.value);
            }} type="text"/></label> 

            <label>Contraseña: <input  value={PASSWORD}
            onChange={(event)=>{
                setPassword(event.target.value);
            }} type="password"/></label>


            <label>Rol: 
                <select value={ROL} onChange={(event) => setRol(event.target.value)}>
                    <option value="" className="placeholder-option">Seleccione una opción</option>
                    {roles.map((role) => (
                        <option key={role.value} value={role.value}>
                            {role.label}
                        </option>
                    ))}
                </select>
            </label>

            <label>Área: 
                <select value={AREA} onChange={(event) => setArea(event.target.value)}>
                    <option value="" className="placeholder-option">Seleccione una opción</option>
                    {areas.map((area) => (
                        <option key={area.value} value={area.value}>
                            {area.label}
                        </option>
                    ))}
                </select>
            </label>
             
        

            {
                Editar==true?
                <div>
                    <button className='btn btn-warning m-2' onClick={UPDATE}>Actualizar</button>
                    <button className='btn btn-info m-2' onClick={Cancelar}>Cancelar</button>
                </div>
                
                :<button type="button" className='btn btn-success m-2' onClick={addUser}>Registrar</button>
            }

            
                       
            </div>            
                

                <table className="table">
                    <thead className="table-dark">
                        <tr>
                        <th scope="col">CODIGO</th>
                        <th scope="col">NOMBRE</th>
                        <th scope="col">IDENTIFICACION</th>
                        <th scope="col">CORREO</th>
                        <th scope="col">TELEFONO</th>
                        <th scope="col">PASSWORD</th>
                        <th scope="col">ROL</th>
                        <th scope="col">AREA</th>
                        <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            UsuariosList.map((val,key)=>{
                                return <tr>
                                            <th scope="row">{val.CODIGO}</th>
                                            <td>{val.NOMBRE}</td>
                                            <td>{val.IDENTIFICACION}</td>
                                            <td>{val.CORREO}</td>
                                            <td>{val.TELEFONO}</td>
                                            <td>{val.PASSWORD}</td>
                                            <td>{val.ROL}</td>
                                            <td>{val.AREA}</td>

                                            <td>
                                                <div className="btn-group" role="group" aria-label="Basic example">
                                                    <button type="button"
                                                    onClick={()=>{
                                                        EditarUsuario(val);
                                                    }}
                                                    className="btn btn-info">Editar</button>
                                                    
                                                    
                                                    <button type="button" onClick={()=>{
                                                        BorrarUser(val);
                                                    }}  className="btn btn-danger">Eliminar</button>
                                                </div>
                                            </td>
                                        </tr>                      
                            })
                        }
                        
                    </tbody>
                </table>
        
            </div>

    );
}

export default USUARIOS;

