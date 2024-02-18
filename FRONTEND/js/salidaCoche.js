document.addEventListener('DOMContentLoaded', () =>
{
    document.getElementById('stopButton').addEventListener('click', SalidaCoche);
});

function SalidaCoche()
{
    const updateSalidaCoche = 'http://localhost:5000/aparking/updateSalidaCoche/';
    const getTicketSinCerrar = 'http://localhost:5000/aparking/ticketsSinCerrar';
    const getPlazaById = 'http://localhost:5000/aparking/buscarPlaza/';
    
    fetch(getTicketSinCerrar)
    .then(response => response.json())
    .then(tickets =>
        {
        if (tickets.length > 0)
        {
            const indiceAleatorio = Math.floor(Math.random() * tickets.length);
            const ticketACerrar = tickets[indiceAleatorio];
            fetch(getPlazaById + ticketACerrar.Plaza_id,
            {
                method: 'GET',
                headers:
                {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => response.json())
            .then(plaza =>
            {
                if (plaza.length > 0)
                {
                    const fechaActual = new Date(); 
                    const diferenciaMilisegundos = fechaActual.getTime() - new Date(ticketACerrar.Hora_entrada).getTime();

                    const precio = plaza[0].Precio;

                    const horasTranscurridas = diferenciaMilisegundos / (1000 * 60 * 60);
                    const precioTotal = horasTranscurridas * precio;
                    
                    fetch(updateSalidaCoche + ticketACerrar.Id,
                    {
                        method: 'PUT',
                        headers:
                        {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify( {precio_total : precioTotal, fecha_actual : fechaActual.toISOString().slice(0, 19).replace('T', ' ') })
                    })
                    .then(response =>
                        {
                            console.log("EXITO");
                            window.location.reload();
                        })
                    .catch(error =>
                    {
                        console.error('Error al cerrar el ticket:', error);
                    });
                } else
                {
                    throw new Error('No existe ninguna plaza con ese Id.');
                }
            })
        }
            })
            .catch(error =>
            {
                console.error('Error al obtener el precio de la plaza:', error);
            });
}
