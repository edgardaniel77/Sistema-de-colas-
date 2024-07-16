from flask import Flask, request, jsonify
import mysql.connector

app = Flask(__name__)

def get_db_connection():
    return mysql.connector.connect(
        host="localhost",
        user="tu_usuario",
        password="tu_contraseña",
        database="injupen_db"
    )

@app.route('/usuarios', methods=['POST'])
def crear_usuario():
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.callproc('CrearUsuario', [
        data['nombre'],
        data['identificacion'],
        data['correo'],
        data['telefono'],
        data['password'],
        data['rol'],
        data['area']
    ])
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Usuario creado exitosamente"}), 201

@app.route('/usuarios', methods=['GET'])
def leer_usuarios():
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.callproc('LeerUsuarios')
    results = []
    for result in cursor.stored_results():
        for row in result.fetchall():
            results.append({
                'codigo': row[0],
                'nombre': row[1],
                'identificacion': row[2],
                'correo': row[3],
                'telefono': row[4],
                'password': row[5],
                'rol': row[6],
                'area': row[7]
            })
    cursor.close()
    conn.close()
    return jsonify(results), 200

@app.route('/usuarios/<int:codigo>', methods=['PUT'])
def actualizar_usuario(codigo):
    data = request.json
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.callproc('ActualizarUsuario', [
        codigo,
        data['nombre'],
        data['identificacion'],
        data['correo'],
        data['telefono'],
        data['password'],
        data['rol'],
        data['area']
    ])
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Usuario actualizado exitosamente"}), 200

@app.route('/usuarios/<int:codigo>', methods=['DELETE'])
def eliminar_usuario(codigo):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.callproc('EliminarUsuario', [codigo])
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Usuario eliminado exitosamente"}), 200

if __name__ == '__main__':
    app.run(debug=True)