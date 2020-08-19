import React, { useState, useEffect } from "react";


import "./styles.css";
import api from "./services/api";

function App() {

  const [repositories, setRepositories] = useState([]);


  useEffect(() => {
    api.get('repositories')
      .then(res => setRepositories(res.data));
  }, [repositories])

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
    const index = array.findIndex(e => e.id === id);

    const res = array.splice(index, 1);

    setRepositories(array)
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
