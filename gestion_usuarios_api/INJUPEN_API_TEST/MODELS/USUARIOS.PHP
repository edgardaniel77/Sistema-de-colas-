<?php
    
    class usuarios extends Conectar{
         
        public function get_usuarios(){
            $conectar= parent::Conexion();
            parent::set_names();
            $sql="SELECT * FROM GESTION_USUARIOS";
            $sql=$conectar->prepare($sql);
            $sql->execute();
            return $resultado=$sql->fetchAll(PDO::FETCH_ASSOC);

        }

        public function get_usuario($CODIGO){
            $conectar= parent::Conexion();
            parent::set_names();
            $sql="SELECT * FROM GESTION_USUARIOS WHERE CODIGO = ? " ;
            $sql=$conectar->prepare($sql);
            $sql->bindValue(1,$CODIGO);
            $sql->execute();
            return $resultado=$sql->fetchAll(PDO::FETCH_ASSOC);

        }
        
        public function insert_usuario($CODIGO, $NOMBRE, $IDENTIFICACION, $CORREO, $TELEFONO, $PASSWORD, $ROL, $AREA){
            $conectar= parent::Conexion();
            parent::set_names();
            $sql="INSERT INTO GESTION_USUARIOS(CODIGO, NOMBRE, IDENTIFICACION, CORREO, TELEFONO, PASSWORD, ROL, AREA)
            VALUES (?,?,?,?,?,?,?,?);";
            $sql=$conectar->prepare($sql);
            $sql->bindValue(1,$CODIGO);
            $sql->bindValue(2,$NOMBRE);
            $sql->bindValue(3,$IDENTIFICACION);
            $sql->bindValue(4,$CORREO);
            $sql->bindValue(5,$TELEFONO);
            $sql->bindValue(6,$PASSWORD);
            $sql->bindValue(7,$ROL);
            $sql->bindValue(8,$AREA);
            $sql->execute();
            return $resultado=$sql->fetchAll(PDO::FETCH_ASSOC);
        }

        public function update_usuario($NOMBRE, $IDENTIFICACION, $CORREO, $TELEFONO, $PASSWORD, $ROL, $AREA, $CODIGO){
            $conectar= parent::Conexion();
            parent::set_names();
            $sql="UPDATE GESTION_USUARIOS SET NOMBRE = ?, IDENTIFICACION = ?, CORREO = ?, TELEFONO = ?, PASSWORD = ?, ROL = ?, AREA = ?
            WHERE CODIGO = ?";
            $sql=$conectar->prepare($sql);
            $sql->bindValue(1,$NOMBRE);
            $sql->bindValue(2,$IDENTIFICACION);
            $sql->bindValue(3,$CORREO);
            $sql->bindValue(4,$TELEFONO);
            $sql->bindValue(5,$PASSWORD);
            $sql->bindValue(6,$ROL);
            $sql->bindValue(7,$AREA);
            $sql->bindValue(8,$CODIGO);
            $sql->execute();
            return $resultado=$sql->fetchAll(PDO::FETCH_ASSOC);
        }  
        
        public function delete_usuario($CODIGO){
            $conectar= parent::Conexion();
            parent::set_names();
            $sql="DELETE  FROM GESTION_USUARIOS WHERE CODIGO = ? " ;
            $sql=$conectar->prepare($sql);
            $sql->bindValue(1,$CODIGO);
            $sql->execute();
            return $resultado=$sql->fetchAll(PDO::FETCH_ASSOC);

        }
    }
?>