import React from "react";
import Titulo from "../../componentes/Titulo";
import Botao from "../../componentes/Botao";
import CampoLogin_SignIn from "../../componentes/CampoLogin_SignIn";
import BotaoSwitch from "../../componentes/BotaoSwitch";
import { Alert, LogBox, ScrollView, Text, TextInput, View } from "react-native";
import { estilo, estilo02 } from "../estiloTelas";
import { useState } from "react";
import { database } from "../../config/firebase";
import * as firebase from "firebase";
import TelaLoading from "../TelaLoading";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/actions";
import { Formik } from "formik";
import * as yup from "yup";

const revisarFrom = yup.object({
    nome: yup.string().required('required'),
    email: yup.string().email().required('required'),
    tipoConta: yup.bool(),
    senha: yup.string().required('required'),
    confSenha: yup.string().required('required').test('passwords-match', 'Passwords must match', function(value){
        return this.parent.senha === value
      }),
});

export default function TelaSignIn({ navigation }){
    LogBox.ignoreLogs(['Setting a timer for a long period of time']);
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] =useState(false);

    function addUsuario (values){
        setIsLoading(true);
        firebase.auth().createUserWithEmailAndPassword(values.email, values.senha)
        .then((userCredential) => {
            const user = {
                uid: userCredential.user.uid,
                nome: values.nome,
                email: values.email,
                senha: values.senha,
                idLista: [],
                tipoConta: values.tipoConta,
            };
            
            dispatch(setUser({ ...user }));
            database.collection('usuarios').doc(user.uid).set({ ...user });
            
            console.log("cadastro feito com sucesso!!");
            setIsLoading(false);
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorCode);
            console.log(errorMessage);
            Alert.alert("ERRO: " + errorCode, errorMessage, [
                {text: 'ok', onPress: ()=>{console.log('alert closed!!')} }
            ]);
            setIsLoading(false);
        });
        
    }

    const irTelaLogin = () =>{ //vai para a tela de login
        navigation.goBack();
    }

    return <ScrollView style={ estilo.fundo }>
        {!isLoading? (
            <Formik
                initialValues={{nome: '', email: '', senha: '', confSenha: '', tipoConta: true}}
                validationSchema={ revisarFrom }
                onSubmit={(values, actions)=>{
                    actions.resetForm();
                    addUsuario(values);
                }}
            >
                {(props) => (
                    <View>
                    <Titulo texto="ChangeTheWorld"/>
                    <TextInput style={ estilo.input }
                        placeholder="Digite o seu nome..."
                        placeholderTextColor="#cccccc"
                        value={ props.values.nome }
                        onChangeText={ props.handleChange('nome')}
                    />
                    <Text style={ estilo02.textoErro } >{ props.touched.nome && props.errors.nome }</Text>
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
                    <TextInput style={ estilo.input }
                        placeholder="Confirme sua senha..."
                        placeholderTextColor="#cccccc"
                        secureTextEntry={ true }
                        value={ props.values.confSenha }
                        onChangeText={ props.handleChange('confSenha') }
                    />
                    <Text style={ estilo02.textoErro } >{ props.touched.confSenha && props.errors.confSenha }</Text>
                    <BotaoSwitch
                        texto01="quero ajuda"
                        texto02="posso ajudar"
                        switchButtonState = { props.values.tipoConta }
                        onPress={ () => props.setFieldValue('tipoConta', !props.values.tipoConta ) }
                    />
                    <Botao
                        texto="cadastrar"
                        tamanho="100%"
                        onPress={ props.handleSubmit }
                    />
                    <CampoLogin_SignIn
                        texto="Já tem uma conta?"
                        textoBotao="entrar"
                        larguraBotao="40%"
                        onPress={ () => irTelaLogin() }
                    />
                    </View>
                )}
            </Formik>
        ) : (
            <TelaLoading/>
        )}
    </ScrollView>
};
