
document.addEventListener('DOMContentLoaded', () =>
{
    const getListaCoches = 'http://localhost:5000/aparking/listaCoches';
    const createEntradaCoche = 'http://localhost:5000/aparking/entradaCoche';
    const getPlazasLibres = 'http://localhost:5000/aparking/plazasLibres';
    const createNuevoCoche = 'http://localhost:5000/aparking/nuevoCoche';


    function GetPlazaAleatoriaLibre()
    {
        return new Promise((resolve, reject) =>
        {
            fetch(getPlazasLibres)
                .then(response => response.json())
                .then(plazasLibres =>
                {
                    if (plazasLibres.length > 0)
                    {
                        const indiceAleatorio = Math.floor(Math.random() * plazasLibres.length);
                        const plazaAleatoria = plazasLibres[indiceAleatorio];
                        resolve(plazaAleatoria.Id); // Resuelve la promesa con el ID de la plaza aleatoria
                    } else
                    {
                        mostrarPopupError("No hay plazas libres disponibles. <br>  Espera a que salga un coche"); 
                        reject(new Error('No hay plazas libres disponibles.'));
                    }
                })
                .catch(error =>
                {
                    reject(error); // Rechaza la promesa
                });
        });
    }

    function GenerarMatricula()
    {
        const letras = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const numeros = '0123456789';
        let letraMatricula = '';
        let numeroMatricula = '';
        let matriculaAleatoria = '';

        for (let i = 0; i < 3; i++)
        {
            letraMatricula += letras.charAt(Math.floor(Math.random() * letras.length));
        }
        for (let i = 0; i < 4; i++)
        {
            numeroMatricula += numeros.charAt(Math.floor(Math.random() * numeros.length));
        }

        matriculaAleatoria = letraMatricula + '-' + numeroMatricula;
        return matriculaAleatoria;
    }

    function CrearTicket(plazaId, matricula)
    {
        fetch(createEntradaCoche,
        {
            method: 'POST',
            headers:
            {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ coche_id: matricula, plaza_id: plazaId })
        })
            .then(response =>
            {
                const plazaElement = document.getElementById(`plaza-${plazaId}`);
                plazaElement.style.backgroundColor = 'tomato';
            })
            .catch(error => 
            {
                console.error('Error al crear un ticket:', error);
            });
    }

    function InsertarCocheAleatorio()
    {
        fetch(getListaCoches)
            .then(getListaCochesRespuesta => getListaCochesRespuesta.json())
            .then(coches => 
            {
                let matriculaAleatoria;
                do
                {
                    matriculaAleatoria = GenerarMatricula();
                } while
                (coches.some(coche => coche.matricula === matriculaAleatoria));
                //some(Condicion) se utiliza para comprobar si al menos un elemento del array cumple una condición

                fetch(createNuevoCoche, 
                {
                    method: 'POST',
                    headers: 
                    {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ matricula: matriculaAleatoria })
                })
                    .then(response => 
                    {
                        GetPlazaAleatoriaLibre()
                            .then(plazaId =>
                            {
                                CrearTicket(plazaId, matriculaAleatoria);
                            })
                            .catch(error =>
                            {
                                console.error('Error al obtener plaza aleatoria:', error);
                            });
                    })
                    .catch(error => 
                    {
                        console.error('Error al crear un nuevo coche:', error);
                    });
            })
            .catch(error => 
            {
                console.error('Error al obtener la lista de coches:', error);
            });
    }

    function mostrarPopupError(mensaje)
    {
        // Modificar el contenido
        document.getElementById('popup-body').innerHTML = `<p>${mensaje}</p>`;
        
        const modal = new bootstrap.Modal(document.getElementById('popupPlazasLibres'));
        modal.show();//ventana emergente
    }


    document.getElementById('startButton').addEventListener('click', InsertarCocheAleatorio);

})