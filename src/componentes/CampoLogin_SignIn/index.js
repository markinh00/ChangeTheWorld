import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Botao from "../Botao";

export default function Campologin_SignIn({ texto, textoBotao, larguraBotao= "30%", onPress }){
    return <View style={ estilo.campoSignIn } >
        <Text style={ estilo.texto } >{ texto }</Text>
        <Botao texto={ textoBotao } tamanho={ larguraBotao } onPress={ onPress } />
    </View>
};

const estilo = StyleSheet.create({
    campoSignIn:{
        width: "100%",

        alignItems: "center",
        justifyContent: "flex-end",
        flexDirection: "row",
    },
    texto:{
        marginRight: 5,
    },
});