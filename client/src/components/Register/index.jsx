import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react';
import * as yup from 'yup';
import Axios from 'axios';
import Styles from '../ContainerForm/containerForm.module.css';
import Title from '../Title';
import SubTitle from '../SubTitle';
import Button from '../Button';

function Register({ visible, handleFormVisible }) {

    // Registrar nova conta
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

    return (
        <div className={Styles.containerFormGroup} style={{ display: visible }}>
            <Title>
                <h1>Cadastrar</h1>
            </Title>
            <SubTitle>
                <h3>Já possui uma conta? <b onClick={handleFormVisible}>Fazer login!</b></h3>
            </SubTitle>
            <Formik initialValues={{}}
                onSubmit={handleClickCadastro}
                validationSchema={validationCadastro}
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

                    <div className={Styles.formGroup}>
                        <Field type='password' name='confirmPassword' className={Styles.formField} placeholder='Digite sua senha novamente' />
                        <ErrorMessage component='span' name='confirmPassword' className={Styles.formError} />
                    </div>
                    <Button type='submit'>Cadastrar</Button>
                </Form>
            </Formik>
        </div>
    )
}

export default Register;