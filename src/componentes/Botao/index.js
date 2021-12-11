import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { cor } from "../Cores";

export default function Botao({ texto="botao", tamanho="100%", altura=45, corFundo= cor.secundaria, onPress }){
    
    return <TouchableOpacity style={ estilo(tamanho, altura, corFundo).botao } onPress={ onPress }>
        <Text adjustsFontSizeToFit style={ estilo(tamanho, altura).textoBotao } >{ texto }</Text>
    </TouchableOpacity>
}

const estilo= (largura, altura, corFundo) => StyleSheet.create({
    botao:{
        width: largura,
        height: altura,

        backgroundColor: corFundo,

        borderRadius: 20,

        marginVertical: 10,
        
    },
    textoBotao:{
        height: "100%",
        textAlignVertical: "center",
        color: cor.terciaria,
        textAlign: "center",
        fontSize: 20,
        //textTransform: "uppercase",
        fontWeight: "bold",
    },
});