import './style.css';
import Trash from '../../assets/Lixeira.png';
import api from '../../services/api';
import { useEffect,useState, useRef } from 'react';

function Home() {
  const [users, setUsers] = useState([]);

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  async function getUsers() {
    const usersFromApi = await api.get('/usuarios');
    setUsers(usersFromApi.data);
  }

  async function createUsers() {

  await api.post('/usuarios',{
    name:inputName.current.value,
    age: inputAge.current.value,
    email: inputEmail.current.value
  })
  getUsers();

  }
  useEffect(() => {
    getUsers();
  }, []);

  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`);  

    getUsers();
  }



  return (
    <>
      <div className="container">
        <form>
          <h1>Cadastro de Usuários</h1>
          <input placeholder="Nome" name='name' type='text' ref={inputName}/>
          <input placeholder="Idade" name='age' type='number' ref={inputAge}/>
          <input placeholder="Email" name='email' type='email' ref={inputEmail}/>
          <button type='button' onClick={createUsers}>Cadastrar</button>
        </form>
        {users.map(user => (
          <div className="card" key={user.id}>
            <div>
              <p>Nome: <span>{user.name}</span></p>
              <p>Idade: <span>{user.age}</span></p>
              <p>Email:<span>{user.email}</span></p>
              <button onClick={() => deleteUsers(user.id)}>
                <img src={Trash} alt="  " />
              </button>
            </div>
          </div>

        ))}
      </div>
    </>
  )
}

export default Home
