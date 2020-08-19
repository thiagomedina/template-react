import React, { useState, useEffect } from "react";


import "./styles.css";
import api from "./services/api";

function App() {

  const [repositories, setRepositories] = useState([]);


  useEffect(() => {
    api.get('repositories')
      .then(res => setRepositories(res.data));
  }, [])

  async function handleAddRepository() {

    const response = await api.post('repositories', {
      title: "title",
      url: "thittiu.com",
      techs: ["nose, deded"]
    })

    setRepositories([...repositories, response.data])


  }

  async function handleRemoveRepository(id) {


    const response = await api.delete(`repositories/${id}`)
 

    const array = repositories
    const result = array.find((e , i)=> id == repositories[i].id  )
    
         console.log(result)

    
  }

  return (
    <div>
      <ul data-testid="repository-list">

        {repositories.map(e => {
          return (
            <li key={e.id}>
              {e.title}
              <button onClick={() => handleRemoveRepository(e.id)}>
                Remover
            </button>
            </li>
          );
        })}

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
