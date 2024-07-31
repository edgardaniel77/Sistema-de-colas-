<?php  

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header('Access-Control-Allow-Origin: *');
    header('Access-Control-Allow-Methods: POST, GET, DELETE, PUT, PATCH, OPTIONS');
    header('Access-Control-Allow-Headers: token, Content-Type');
    header('Access-Control-Max-Age: 1728000');
    header('Content-Length: 0');
    header('Content-Type: text/plain');
    die();
  }
    header('Access-Control-Allow-Origin: *');  
    header('Content-Type: application/json');

    require_once ("../CONFIG/Conexion.php"); 
    require_once ("../MODELS/USUARIOS.php "); 
    $usuario=new usuarios();

    $body=json_decode(file_get_contents("php://input"),true) ;

    switch ($_GET["op"]) {


  	    case 'GetUsuarios':
            $dato=$usuario->get_usuarios();
            echo json_encode($dato);
        break;

        case 'GetUsuario':
            $dato=$usuario->get_usuario($body["CODIGO"]);
            echo json_encode($dato);
        break;

        case 'InsertUsuario':
            $dato=$usuario->insert_usuario($body["CODIGO"], $body["NOMBRE"], $body["IDENTIFICACION"], $body["CORREO"], $body["TELEFONO"], $body["PASSWORD"], $body["ROL"], $body["AREA"]);
            echo json_encode("Usuario Agregado");
        break;

        case 'UpdateUsuario':
            $dato=$usuario->update_usuario($body["NOMBRE"], $body["IDENTIFICACION"], $body["CORREO"], $body["TELEFONO"], $body["PASSWORD"], $body["ROL"], $body["AREA"], $body["CODIGO"]);
            echo json_encode("Usuario Actualizado");
        break;

        case 'DeleteUsuario':
            $dato=$usuario->delete_usuario($body["CODIGO"]);
            echo json_encode("El Usuario fue eliminado");
        break;

    }
        

?>        