import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { cor } from "../Cores";

export default function CampoEntrada({ texto ,textoAjuda, textoAjudaCor, ehsenha= false, onChangeText }){
    return <View style={ estilo.container }>
        <Text style={ estilo.texto } >{ texto }</Text>
        <TextInput style={ estilo.input }
            placeholder={ textoAjuda }
            placeholderTextColor={ textoAjudaCor }
            secureTextEntry={ ehsenha }
            onChangeText={ onChangeText }
        />
    </View>
};

const estilo = StyleSheet.create({
    texto:{
        fontSize: 20,
        fontWeight: "bold",
        
        color: cor.terciaria,
        paddingHorizontal: 10,
        marginBottom: 5,
    },
    input:{
        backgroundColor: cor.secundaria,
        color: cor.terciaria,

        borderColor: cor.terciaria,
        borderWidth: 2,
        borderRadius: 20,
        padding: 10,

        fontSize: 20,
        lineHeight: 21,
        height: 40,
        
    },
    container: {
        width: "100%",
        height: 75,
        marginVertical: 5,
    },
});