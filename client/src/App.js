import './App.css';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as yup from 'yup';
import Axios from 'axios';

function App() {

  const handleClickCadastro = (values) => {
    Axios.post("http://localhost:3001/register", {
      email: values.email,
      password: values.password,
    }).then((response) => {
      alert(response.data.msg);
      console.log(response);
    });
  };

  const validationCadastro = yup.object().shape({
    email: yup.string().email("Insira um e-mail válido!").required("Este campo é obrigatório!"),
    password: yup.string().min(8, "A senha deve conter pelo menos 8 caracteres!").required("Este campo é obrigatório!"),
    confirmPassword: yup.string().oneOf([yup.ref('password'), null], "As senhas não são iguais!"),
  })

  const handleClickLogin = (values) => {
    Axios.post("http://localhost:3001/login", {
      email: values.email,
      password: values.password,
    }).then((response)=>{
      console.log(response)
      if (response.data.login){
        console.log("Logado");
      }else{
        console.log("Erro ao logar");
      }
    })
  }

  const validationLogin = yup.object().shape({
    email: yup.string().email("Insira um e-mail válido!").required("Este campo é obrigatório!"),
    password: yup.string().min(8, "A senha deve conter pelo menos 8 caracteres!").required("Este campo é obrigatório!"),
  })

  return (
    <div className='container'>
      <h1>Login</h1>
      <Formik initialValues={{}}
        onSubmit={handleClickLogin}
        validationSchema={validationLogin}
      >
        <Form className='login-form'>
          <div className='login-form-group'>
            <Field name='email' className='form-field' placeholder='E-mail' />
            <ErrorMessage component='span' name='email' className='form-error' />
          </div>

          <div className='login-form-group'>
            <Field name='password' className='form-field' placeholder='Senha' />
            <ErrorMessage component='span' name='password' className='form-error' />
          </div>
          <button type='submit' className='button'>Login</button>
        </Form>
      </Formik>
      {/* Cadstrar */}

      <h1>Cadastrar</h1>
      <Formik initialValues={{}}
        onSubmit={handleClickCadastro}
        validationSchema={validationCadastro}
      >
        <Form className='login-form'>
          <div className='login-form-group'>
            <Field name='email' className='form-field' placeholder='E-mail' />
            <ErrorMessage component='span' name='email' className='form-error' />
          </div>

          <div className='login-form-group'>
            <Field name='password' className='form-field' placeholder='Senha' />
            <ErrorMessage component='span' name='password' className='form-error' />
          </div>

          <div className='login-form-group'>
            <Field name='confirmPassword' className='form-field' placeholder='Digite sua senha novamente' />
            <ErrorMessage component='span' name='confirmPassword' className='form-error' />
          </div>
          <button type='submit' className='button'>Cadastrar</button>
        </Form>
      </Formik>

    </div>
  );
}

export default App;
