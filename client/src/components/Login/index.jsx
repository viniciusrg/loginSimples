import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import Axios from 'axios';
import Styles from '../ContainerForm/containerForm.module.css';
import Title from '../Title';
import SubTitle from '../SubTitle';
import Button from '../Button';

function Login({ visible, handleFormVisible }) {

    // Login
    const handleClickLogin = (values) => {
        Axios.post("http://localhost:3001/login", {
            email: values.email,
            password: values.password,
        }).then((response) => {
            console.log(response)
            if (response.data.login) {
                alert("Usuário logado!");
            } else {
                alert("Informações incorretas!");
            }
        })
    }

    const validationLogin = yup.object().shape({
        email: yup.string().email("Insira um e-mail válido!").required("Este campo é obrigatório!"),
        password: yup.string().min(8, "A senha deve conter pelo menos 8 caracteres!").required("Este campo é obrigatório!"),
    })

    return (
        <div className={Styles.containerFormGroup} style={{ display: visible }}>
            <Title>
                <h1>Entrar</h1>
            </Title>
            <SubTitle>
                <h3>Ainda não possui uma conta? <b onClick={handleFormVisible}>Criar uma conta agora!</b></h3>
            </SubTitle>
            <Formik
                initialValues={{}}
                onSubmit={handleClickLogin}
                validationSchema={validationLogin}
            >
                <Form className={Styles.form}>
                    <div className={Styles.formGroup}>
                        <Field name='email' className={Styles.formField} placeholder='E-mail' />
                        <ErrorMessage component='span' name='email' className={Styles.formError} />
                    </div>

                    <div className={Styles.formGroup}>
                        <Field type='password' name='password' className={Styles.formField} placeholder='Senha' />
                        <ErrorMessage component='span' name='password' className={Styles.formError} />
                    </div>
                    <div className={Styles.esqueceuSenha}>
                        <SubTitle><b>Esqueceu a senha?</b></SubTitle>
                    </div>
                    <Button type='submit'>Entrar</Button>
                </Form>
            </Formik>
        </div>
    )
}

export default Login;