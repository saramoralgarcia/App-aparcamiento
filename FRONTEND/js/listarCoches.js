document.addEventListener('DOMContentLoaded', () =>
{
    let botonListarCoches = document.getElementById('botonListarCoches');
    let cuerpoTabla = document.querySelector('.modal-body .container-fluid');


    botonListarCoches.addEventListener('click', () =>
    {
        // Lista de coches
        const url = 'http://localhost:5000/aparking/listaCoches'
        fetch(url)
            .then(response => response.json())
            .then(listaCoches =>
            {
                let nuevaPagina = `
                <html>
                    <head>
                        <title>Lista de Coches</title>
                        <style>
                            table {
                                border-collapse: collapse;
                                width: 100%;
                            }
                            th, td {
                                border: 1px solid black;
                                padding: 8px;
                                text-align: left;
                            }
                            th {
                                background-color: #f2f2f2;
                            }
                        </style>
                    </head>
                    <body>
                        <h1>Lista de Coches</h1>
                        <table>
                        <tr>
                            <th>Matrícula</th>
                        </tr>`;
                
            listaCoches.forEach(coche =>
            {
                nuevaPagina += `<tr><td>${coche.Matricula}</td></tr>`;
            });

            nuevaPagina += `
                        </table>
                    </body>
                </html>`;

            let nuevaVentana = window.open('', '_blank');
            nuevaVentana.document.write(nuevaPagina);
        });
    });
});
