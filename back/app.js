//Back

/* Obtener todos los personajes: Endpoint: http://localhost:3000/characters Método: GET
Esta ruta devuelve todos los personajes disponibles en la API de Rick and Morty.

Obtener un personaje por nombre:
Endpoint: http://localhost:3000/characters/:name Método: GET

Reemplaza :name con el nombre del personaje que deseas buscar. Por ejemplo, http://localhost:3000/characters/Rick. */

const express = require('express');
const axios = require('axios');
const cors = require('cors');
// traigo cors para poder requerir el l alinformacion del bck desde el front

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/character', async (req, res) => {
    const allCharacter = [];

    try {
        //Bucle para acceder a todos los personajes por pagina
        for (let i = 1; i < 43; i++) {
            const url = `https://rickandmortyapi.com/api/character/?page=${i}`;
            const response = await axios.get(url);

            const characters = response.data.results;
            //Filtramos los datos
            const characterFilters = characters.map((character) => {
                return {
                    id: character.id,
                    name: character.name,
                    status: character.status,
                    species: character.species,
                    gender: character.gender,
                    origin: character.origin.name,
                    image: character.image
                };
            });

            allCharacter.push(...characterFilters); // PAso cada elemento individualmente con ... poruqe sin o estoy haciendo un array de arrays
            
        }

        res.json(allCharacter);

    } catch (ERROR) {
        res.status(404).json({ error: 'Datos no encontrados' });
    }
});
 // Accedemos a la lista de personajes con el comodin :name
app.get('/character/:name', async (req, res) => {
    const name = req.params.name;  //requerimos el parametro del comodin
    const url = `https://rickandmortyapi.com/api/character/?name=${name}`;

    try {
        const response = await axios.get(url);

        // Accedemos a la lista de resultados data.result y obtenemos el primer personaje si hay dos iguales
        const character = response.data.results[0];
        if (!character) {
            return res.status(404).json({ error: 'Personaje no encontrado' });
        }
        //Filtramos los datos para traernos solo lo que nos insteresa y no saturar
        const { id, name, status, species, gender, origin, image } = character;
        
        //Generamos el json con la informacion
        res.json({ id, name, status, species, gender, origin: origin.name, image });
    } 
    
    catch (ERROR) {
        res.status(404).json({ error: 'Error al obtener el personaje' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});


