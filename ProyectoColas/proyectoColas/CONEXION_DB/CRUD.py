import tkinter as tk

# Importar los módulos restantes de tkinter
from tkinter import *
from tkinter import ttk
from tkinter import messagebox #Msj POP para verificar registros se realizo con exito




class FormularioUsuarios:

    def Formulario():
        
        try:
            base = tk()
            base.geometry("1200x300")
            base.tit1e("Formu1ario Usuarios")
            base.mainloop()
        
        except ValueError as error:
            print("ERROR al mostrar la interfaz,error: {}".format(error))

    Formulario()


#METODO - C R U D


import mysql.connector

def crear_usuario(nombre, identificacion, correo, telefono, password, rol, area):
    conn = mysql.connector.connect(
        host="localhost",
        user="tu_usuario",
        password="tu_contraseña",
        database="injupen_db"
    )
    cursor = conn.cursor()
    cursor.callproc('CrearUsuario', [nombre, identificacion, correo, telefono, password, rol, area])
    conn.commit()
    cursor.close()
    conn.close()

def leer_usuarios():
    conn = mysql.connector.connect(
        host="localhost",
        user="tu_usuario",
        password="tu_contraseña",
        database="injupen_db"
    )
    cursor = conn.cursor()
    cursor.callproc('LeerUsuarios')
    for result in cursor.stored_results():
        for row in result.fetchall():
            print(row)
    cursor.close()
    conn.close()

def actualizar_usuario(codigo, nombre, identificacion, correo, telefono, password, rol, area):
    conn = mysql.connector.connect(
        host="localhost",
        user="tu_usuario",
        password="tu_contraseña",
        database="injupen_db"
    )
    cursor = conn.cursor()
    cursor.callproc('ActualizarUsuario', [codigo, nombre, identificacion, correo, telefono, password, rol, area])
    conn.commit()
    cursor.close()
    conn.close()

def eliminar_usuario(codigo):
    conn = mysql.connector.connect(
        host="localhost",
        user="tu_usuario",
        password="tu_contraseña",
        database="injupen_db"
    )
    cursor = conn.cursor()
    cursor.callproc('EliminarUsuario', [codigo])
    conn.commit()
    cursor.close()
    conn.close()