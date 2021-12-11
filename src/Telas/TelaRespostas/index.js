import React, { useEffect, useState } from "react";
import { Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import { estilo02 } from "../estiloTelas";
import TelaLoading from "../TelaLoading";

export default function TelaRespostas(){
    const {usuario} = useSelector(state => state.usuarioReducer);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() =>{
        setIsLoading(true);
        setIsLoading(false);
    },[]);

    return<>{ isLoading? (
            <TelaLoading/>
        ) : (
            <ScrollView style={ estilo02.fundo } > 
                <Text style={ estilo02.texto } >tela respostas</Text>
                <Text style={ estilo02.texto } >Olá { usuario.nome }</Text>
            </ScrollView>
        )
    }
    </>
};
