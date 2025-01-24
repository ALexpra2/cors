/* Haremos un front sencillo en otro documento con HTML, CSS y JS
El HTML tendrá un input de búsqueda por nombre hacia nuestra api levantada
Recibiremos los datos del personaje.
Name
Status
Species
gender
origin
image */
 
//Funcion para llamarla al hacer click en el html tb se puede hacer con un adevenlistener
function getCharacterInfo() {
    const characterNameInput = document.getElementById('characterName');
    const characterInfo = document.getElementById('characterInfo');

    const characterName = characterNameInput.value;
    // llamo a la informacion de mi servidor
    fetch(`http://localhost:3000/character/${characterName}`)
        
        .then(response => response.json())

        .then (data => {
            //console.log(data)
            // insertar  HTML con las caracteristicas del personaje
            characterInfo.innerHTML = `
                <div>
                    <h2>${data.name}</h2>
                    <img src="${data.image}" alt="${data.name}">
                    <p>Estado: ${data.status}</p>
                    <p>Especie: ${data.species}</p>
                    <p>Género: ${data.gender}</p>
                    <p>Origen: ${data.origin}</p>
                </div>
            `;})

        .catch(error => {
            characterInfo.innerHTML = `<p>Imposible acceder al personaje: ${error.message}</p>`;
        })

}

