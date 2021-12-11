import { LogBox, StyleSheet, Text, View } from "react-native";
import React from "react";
import { estilo } from "../estiloTelas";

export default function TelaLoading(){
    LogBox.ignoreLogs(['Setting a timer for a long period of time']);

    return <View style={ estiloLoading.fundo }>
        <Text style={ estilo.texto } >Carregando...</Text>
    </View>
}

const estiloLoading = StyleSheet.create({
    fundo:{
        ...estilo.fundo,
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
});