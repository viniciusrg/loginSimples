import './App.css';
import ContainerForm from './components/ContainerForm';
import Login from './components/Login';
import Register from './components/Register';
import backgroundImg from './assets/background.jpg'
import { useState } from 'react';

function App() {

  const [loginVisible, setLoginVisible] = useState('block');
  const [registerVisible, setRegisterVisible] = useState('none');

  const handleFormVisible = () =>{
    if (loginVisible === 'block'){
      setLoginVisible('none');
      setRegisterVisible('block')
    }else{
      setLoginVisible('block');
      setRegisterVisible('none')
    }
  }

  return (
    <div className='container'>
      <ContainerForm>
        <Login visible={loginVisible} handleFormVisible={handleFormVisible} />
        <Register visible={registerVisible} handleFormVisible={handleFormVisible}/>
      </ContainerForm>
      <div className='imagemDeFundo' style={{backgroundImage: `linear-gradient(transparent 0%, rgba(0, 0, 0, .75) 0%), url(${backgroundImg})`}}>
        <h1>Acessar painel</h1>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining.</p>
      </div>
    </div>
  );
}

export default App;
