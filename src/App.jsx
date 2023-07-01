import { useState } from "react"

import Perfil from "./components/Perfil"
import ReposList from "./components/ReposList"

import './global.css'

function App() {

  const [nomeUsuario, setNomeUsuario] = useState('');

  return (
    <>
    <div className="container_input">
      <label htmlFor="input_userName">Nome do usuário:</label>
      <input id="input_userName" className="input_userName" type="text" onBlur={(e) => setNomeUsuario(e.target.value)} placeholder="Nome do usuário " />
    </div>

      {nomeUsuario && (
        <>
          <Perfil nomeUsuario={nomeUsuario} />
          <ReposList nomeUsuario={nomeUsuario} />
        </>
      )}

    </>

  )
}

export default App
