import React, { useEffect, useState } from "react";
import {  Alert, LogBox, ScrollView, Text, TextInput, View } from "react-native";
import Titulo from "../../componentes/Titulo";
import Botao from "../../componentes/Botao";
import CampoLogin_SignIn from "../../componentes/CampoLogin_SignIn";
import { estilo, estilo02 } from "../estiloTelas";
import { nometelas } from "../../Rotas/nomeTelas";
import * as firebase from "firebase";
import TelaLoading from "../TelaLoading";
import { useDispatch, useSelector } from "react-redux";
import { setDemada, setUser } from "../../redux/actions";
import { Formik, isEmptyArray } from "formik";
import * as yup from 'yup';
import { getDados } from "../../config/firebase";

const revisarFrom = yup.object({
    email: yup.string().email().required('required'),
    senha: yup.string().required('required'),
});

export default function TelaLogin({ navigation }){
    LogBox.ignoreLogs(['Setting a timer for a long period of time']);

    const dispatch = useDispatch();
    const { usuario } = useSelector(state => state.usuarioReducer);
    const { demandas } = useSelector(state => state.demandaReducer);
    const [isLoading, setIsLoading] = useState(false);
    const [dados, setDados] = useState();

    useEffect(()=>{
        setIsLoading(true);
        setIsLoading(false);
    },[]);

    function fazerLogin(user){ //faz o login
        setIsLoading(true);
        firebase.auth().signInWithEmailAndPassword(user.email, user.senha)
        .then((userCredential) => {
            const user_1 = userCredential.user;
            dispatch(setUser({ ...usuario, uid: user_1.uid, email: user_1.email }));
            setIsLoading(false);
            console.log("Login feito com sucesso!!!");
        }).catch(error => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            Alert.alert("ERRO: " + errorCode, errorMessage, [
                { text: 'ok', onPress: () => { console.log('alert closed!!'); } }
            ]);
            setIsLoading(false);
        });
    }

    const irTelaSignIn = () =>{ //vai para a tela de login
        navigation.navigate(nometelas.telaCadastro);
    }

    return<>{ !isLoading? (
            <ScrollView style={ estilo.fundo }>
                <Formik
                    initialValues={{email: '', senha: ''}}
                    validationSchema={ revisarFrom }
                    onSubmit={(values, actions)=>{
                        actions.resetForm();
                        fazerLogin(values);
                    }}
                >
                    {(props) => (
                        <View>
                            <Titulo texto='ChangeTheWorld'/>
                            <TextInput style={ estilo.input }
                                placeholder="Digite o seu email..."
                                placeholderTextColor="#cccccc"
                                value={ props.values.email }
                                onChangeText={ props.handleChange('email') }
                            />
                            <Text style={ estilo02.textoErro } >{ props.touched.email && props.errors.email }</Text>
                            <TextInput style={ estilo.input }
                                placeholder="Digite a sua senha..."
                                placeholderTextColor="#cccccc"
                                secureTextEntry={ true }
                                value={ props.values.senha }
                                onChangeText={ props.handleChange('senha') }
                            />
                            <Text style={ estilo02.textoErro } >{ props.touched.senha && props.errors.senha }</Text>
                            <Botao texto="entrar" tamanho="100%" onPress={ props.handleSubmit }/>
                            <CampoLogin_SignIn
                                texto="não tem uma conta?"
                                textoBotao="cadastre-se"
                                larguraBotao="40%"
                                onPress={ ()=>irTelaSignIn() }
                            />
                        </View>
                    )}    
                </Formik>
            </ScrollView>
        ) : (   
            <TelaLoading/>
        ) 
    }
    </> 
};