import React, { useEffect, useState } from "react";
import { Text, TextInput, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { estilo02 } from "../estiloTelas";
import TelaLoading from "../TelaLoading";
import { Formik } from "formik";
import Botao from "../../componentes/Botao";
import * as yup from "yup";
import { createDemanda } from "../../config/firebase";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/actions";

const revisarFrom = yup.object({
    titulo: yup.string().required().min(4),
    descricao: yup.string().required().min(4),
});

export default function TelaCriarDemanda({ onPress }){
    //const dispatch = useDispatch();
    const { usuario } = useSelector(state => state.usuarioReducer);
    const [isLoading, setisLoading] = useState(false);

    useEffect(() =>{
        setisLoading(true);
        setisLoading(false);
        
        return () => {
            setisLoading(false);
        };
    },[]);

    function criarDemanda(demanda){
        setisLoading(true);
        createDemanda(demanda, usuario.uid).then((message) =>{
            console.log(message);
            setisLoading(false);
            onPress();
        }).catch((err) => {
            console.log(err);
        });
    }

    return<>{ !isLoading? (
            <ScrollView style={ estilo02.fundo } >
                <Formik
                    initialValues={ {titulo: '', descricao: ''} }
                    validationSchema={ revisarFrom }
                    onSubmit={(values, actions)=>{
                        actions.resetForm();
                        criarDemanda(values);
                    }}
                >
                    {(props)=>(
                        <View>
                            <Text style={ estilo02.texto } >Título:</Text>
                            <TextInput
                                style={ estilo02.input }
                                placeholder= 'Digite um titulo...'
                                onChangeText={ props.handleChange('titulo') }
                                value={ props.values.titulo }
                            />
                            <Text style={ estilo02.textoErro } >{ props.touched.titulo && props.errors.titulo }</Text>
                            <Text style={ estilo02.texto } >Descreva a sua demanda:</Text>
                            <TextInput
                                multiline= { true }
                                style={ estilo02.input }
                                placeholder= 'Digite uma demanda...'
                                onChangeText={ props.handleChange('descricao') }
                                value={ props.values.descricao }
                            />
                            <Text style={ estilo02.textoErro } >{ props.touched.descricao && props.errors.descricao }</Text>
                            <Botao texto='enviar' onPress={ props.handleSubmit } />
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
