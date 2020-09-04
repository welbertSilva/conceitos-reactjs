import React,{ useEffect, useState } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  
  const [repositories, setrepositories] = useState([]); 

  useEffect(() => {
      api.get('repositories').then(response => {
        setrepositories(response.data);
      })
    }, []);


  async function handleAddRepository() {
    const response = await api.post('repositories',{ 
      title: 'Umbriel',
      url:'https://github.com/rocketseat/umbriel',
      techs: ['NodeJS','ReactJS']
    })
    setrepositories([...repositories,response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`); //aqui usu crase para poder fazerum scape e utilizar uma variavel js dentro do js
    setrepositories(repositories.filter(repository => repository.id != id //mantem apenas os repositorios que são diferentes do id deletado
      ))
  }

  return (
    <div>
      <ul data-testid="repository-list">
       { repositories.map(repository => (
        <li key={repository.id}>
          {repository.title}

        <button onClick={() => handleRemoveRepository(repository.id)}>
          Remover
        </button>
      </li>
       ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
