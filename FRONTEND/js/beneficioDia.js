document.addEventListener('DOMContentLoaded', () => 
{
    let botonBeneficioDia = document.getElementById('botonBeneficioDia');
    const textoBeneficio = document.getElementById('textoBeneficio');

    botonBeneficioDia.addEventListener('click', () => 
    {
        // Obtener la Fecha Actual
        let today = new Date();
        let dia = today.getDate().toString().padStart(2, '0');
        let mes = (today.getMonth() + 1).toString().padStart(2, '0');
        let ano = today.getFullYear();
        
        const url = 'http://localhost:5000/aparking/beneficioDia/' + dia + '/' + mes + '/' + ano;

        fetch(url)
        .then(response => response.json())
        .then(data =>
        {
            const total_ganado = data[0].total_ganado;
            mostrarPopupBeneficio("El Total ganado hasta ahora es: " + total_ganado); 
        })
        .catch(error => {
            console.error('Error al obtener el total ganado hoy:', error);
        });
    });
});

function mostrarPopupBeneficio(mensaje)
    {
        // Modificar el contenido
        document.getElementById('modal-body').innerHTML = `<p>${mensaje}</p>`;
        
        const modal = new bootstrap.Modal(document.getElementById('popupBeneficio'));
        modal.show();//ventana emergente
    }