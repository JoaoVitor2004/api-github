import { useState } from 'react'
import './App.css'
import { FaLocationDot } from "react-icons/fa6";
import { MdPeopleAlt, MdDriveFileRenameOutline } from "react-icons/md";
import { FaFolderOpen } from "react-icons/fa";
import Logo from './assets/images/logo-github.png'
import api from './services/api'

function App() {
  const [input, setInput] = useState('')
  const [user, setUser] = useState({})

  async function addUser() {

    if (input === '') {
      alert('Campo vazio, tente novamente')
      return
    }

    try {
      const response = await api.get(`${input}`)
      const data = await response.data
      setUser(data)
      setInput('')

    } catch {
      alert('Usuario não encontrado')
      setInput('')
    }
  }

  return (
    <main className='App'>
      <aside className='User'>
        {Object.keys(user).length > 0 && (
          <div>
            <img src={user.avatar_url} alt="imagem do usuario" className='avatar' />
            <h2>{user.login}</h2>
            <div className='description'>
              <span>
                <MdDriveFileRenameOutline/>
                {user.name}
              </span>
              <span>
                <FaLocationDot />
                {user.location ? user.location : 'Não tem localização'}
              </span>
              <span>
                <MdPeopleAlt />
                {`Seguidores: ${user.followers} e seguindo ${user.following} pessoas`}
              </span>
              <span>
                <FaFolderOpen/>
                <a href={user.html_url} target='_blank'>Repositorios</a>
              </span>
            </div>
          </div>
        )}
      </aside>
      <section className='input-user'>
        <img className='logo' src={Logo} alt="logo do github"/>
        <h1>Api github</h1>
        <input value={input} onChange={(e) => setInput(e.target.value)} type="text" placeholder='Digite o nome de usuario' />
        <button onClick={addUser} className='btn-user'>Adicionar</button>
      </section>
    </main>
  )
}

export default App
