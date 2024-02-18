import dotenv from 'dotenv';
import mysql from 'mysql2';

dotenv.config();

const dbConnection = mysql.createConnection
({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});
  
dbConnection.connect((err) =>
{
    if (err)
    {
        console.log('Error al conectar a la BBDD');
        return;
    }
    console.log('Conexión establecida correctamente');

});
  
export default dbConnection;