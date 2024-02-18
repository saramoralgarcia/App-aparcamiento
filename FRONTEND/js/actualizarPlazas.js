
const getPlazasURL = 'http://localhost:5000/aparking/';

document.addEventListener('DOMContentLoaded', () => 

{
    if (window.location.href === "http://127.0.0.1:5500/FRONTEND/index2.html")
    {
        
        ActualizaEstadoPlazas();
    }
});

function ActualizaEstadoPlazas()
{
    fetch(getPlazasURL)
    .then(response => response.json())
    .then(plazas => {
        if (plazas.length > 0)
        {
            for(let i = 0; i < plazas.length; i++)
            {
                const plazaElement = document.getElementById(`plaza-${plazas[i].Id}`);
                plazaElement.style.backgroundColor = (plazas[i].Estado == 0) ? '#9ADE7B' : 'tomato';
            }
        } else
        {
            throw new Error('No existe ninguna plaza en la base de datos.');
        }
    })
    .catch(error =>
    {
        console.error('Error al obtener la lista de plazas:', error);
    });
}