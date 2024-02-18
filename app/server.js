
import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import router from './router.js';

const app = express();
dotenv.config();

const port = process.env.NODE_PORT;
/*  pueda manejar datos enviados a través 
    de formularios HTML utilizando el tipo de contenido 
    application/x-www-form-urlencoded
*/ 
app.use(cors());

app.use(express.json()); //leer req que sean json
app.use(express.urlencoded({extended: true})); //config para el POST y PUT

router(app); 

app.listen(port);
console.log('Escuchando por el puerto' + port);