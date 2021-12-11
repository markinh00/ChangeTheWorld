import React, { useEffect, useState } from "react";
import { StyleSheet, Switch, TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import { cor } from "../Cores";

export default function BotaoSwitch({ texto01="on", texto02="off", largura="100%", altura=45, switchButtonState=true, onPress }){
    const [estilo01, setEstilo01] = useState(estilo(largura, altura, cor.secundaria).textoOff);
    const [estilo02, setEstilo02] = useState(estilo(largura, altura, cor.secundaria).textoOn);

    const desabilitar01 = () =>{
        setEstilo01(estilo(largura, altura, cor.secundaria).textoOff)
        setEstilo02(estilo(largura, altura, cor.secundaria).textoOn)
    };
    const desabilitar02 = () => {
        setEstilo01(estilo(largura, altura, cor.secundaria).textoOn)
        setEstilo02(estilo(largura, altura, cor.secundaria).textoOff)
    };

    const inverterBotao = () => {
        switchButtonState = !switchButtonState,
        onPress(switchButtonState),
        switchButtonState? desabilitar01() : desabilitar02()
    };

    return<View style={ estilo(largura, altura, cor.secundaria).botaoFundo } >
        <TouchableOpacity onPress={ () => inverterBotao() } style={ {width: '50%'} } >
            <Text style={ estilo01 } >{ texto01 }</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={ () => inverterBotao() } style={ {width: '50%'} } >
            <Text style={ estilo02 } >{ texto02 }</Text>
        </TouchableOpacity>
        
    </View>
}

const estilo= (largura, altura, corDeFundo, corTextoOn= cor.terciaria, corTextoOff= cor.detalheCinza) => StyleSheet.create({
    botaoFundo:{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        width: largura,
        height: altura,
        backgroundColor: corDeFundo,
        borderRadius: 25,
        borderWidth: 2,
        borderColor: cor.secundaria,
        marginBottom: 10,
    },
    textoOn:{
        color: corTextoOn,
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        height: '100%',
        backgroundColor: cor.primaria,
    },
    textoOff:{
        color: corTextoOff,
        textAlign: "center",
        fontSize: 20,
        fontWeight: "bold",
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 20,
        height: '100%',
        backgroundColor: cor.secundaria,
    },
});