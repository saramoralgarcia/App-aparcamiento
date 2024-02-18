import dbConnection from '../database/dbConnection.js';

/*
----------------- MOSTRAR PLAZAS LIBRES -------------------------------
*/

export const getPlazas = (req, res) =>//exporta funcion
{
        let consulta = 
        `SELECT DISTINCT Aparcamiento.Plaza.*, 
            CASE 
                WHEN Ticket.Plaza_id IS NULL THEN 0
                WHEN Ticket.Hora_salida IS NULL THEN 1
                ELSE 0
            END AS Estado
        FROM Plaza
        LEFT JOIN Ticket ON Plaza.Id = Ticket.Plaza_id;
        `;
    
    dbConnection.query(consulta, (error, results) =>
    {
        if(error) throw error;
        res.status(200).json(results);
    });
};

/*
--------------- MOSTRAR PLAZAS OCUPADAS -------------------------------
*/

export const getTicketSinCerrar = (req, res) =>
{
        let consulta =
        `SELECT Aparcamiento.Ticket.*
        FROM Ticket
        WHERE Ticket.Hora_salida IS NULL;
        `;
    
    dbConnection.query(consulta, (error, results) =>
    {
        if(error) throw error;
        res.status(200).json(results);
    });
};

/*
--------------- MOSTRAR PLAZAS POR ID -------------------------------
*/

export const getPlazasById = (req, res) =>
{
    const { id } = req.params;
        let consulta =
        `SELECT *
        FROM Aparcamiento.Plaza
        WHERE Id = ${ id };
        `;

    dbConnection.query(consulta, (error, results) =>
    {
        if(error) throw error;
        res.status(200).json(results);
    });
};

/*
--------------- MOSTRAR COCHES -------------------------------
*/

export const getListaCoches = (req, res) =>
{
    let consulta =
    `SELECT *
        FROM Aparcamiento.Coche`;

    dbConnection.query(consulta, (error, results) =>
    {
        if(error) throw error;
        res.status(200).json(results);
    });
}

/*
--------------- MOSTRAR PLAZAS LIBRES -------------------------------
*/

export const getPlazasLibres = (req, res) =>
{
    let consulta =
    `SELECT Id FROM Aparcamiento.Plaza
    WHERE Id NOT IN (SELECT Plaza_id FROM Aparcamiento.Ticket
        WHERE Hora_salida IS NULL);
    `;

    dbConnection.query(consulta, (error, results) =>
    {
        if(error) throw error;
        res.status(200).json(results);
    });
}

/*
--------------- MOSTRAR BENEFICIO DIA -------------------------------
*/

export const getBeneficioDia = (req, res) =>
{
    const { dia, mes, ano } = req.params;
    const fecha = `${ano}-${mes}-${dia}`;

    let consulta =
    `SELECT SUM(Precio_total) AS total_ganado
    FROM Aparcamiento.Ticket
    WHERE DATE(Hora_salida) = '${fecha}'`;

    dbConnection.query(consulta, (error, results) =>
    {
        if(error) throw error;
        res.status(200).json(results);
    });
}

/*
--------------- CREAR UNA ENTRADA COCHE -------------------------------
*/

export const createEntradaCoche = (req, res) =>
{
    const { coche_id, plaza_id } = req.body;

    let consulta =
    `INSERT INTO Aparcamiento.Ticket (Coche_id, Plaza_id)
        VALUES('${ coche_id }', ${ plaza_id })`;

    dbConnection.query(consulta, (error, results) =>
    {
        if(error) throw error;
        res.status(200).json(results);
    });
}

/*
--------------------- CREAR UN COCHE --------------------------
*/

export const createNuevoCoche = (req, res) =>
{
    const { matricula } = req.body;
    
    let consulta =
    `INSERT INTO Aparcamiento.Coche (Matricula)
        VALUES('${matricula}')`;

    dbConnection.query(consulta, (error, results) =>
    {
        if(error) throw error;
        res.status(200).json(results);
    });
}

/*
--------------- MODIFICAR HORA SALIDA COCHE -------------------------------
*/

export const updateSalidaCoche = (req, res) =>
{
    const { id } = req.params;
    const { precio_total, fecha_actual } = req.body;

    let consulta =
    `UPDATE Aparcamiento.Ticket
        SET Hora_salida = '${ fecha_actual }',
        Precio_total = ${ precio_total }
        WHERE Id = ${ id }`;

    dbConnection.query(consulta, (error, results) => 
    {
        if(error) throw error;
        res.status(200).json(results);
    });
}

/*
--------------- MOSTRAR TICKETS -------------------------------
*/

export const getTickets = (req, res) =>
{
    let consulta =
    `SELECT *
        FROM Aparcamiento.Ticket`;

    dbConnection.query(consulta, (error, results) =>
    {
        if(error) throw error;
        res.status(200).json(results);
    });
}


