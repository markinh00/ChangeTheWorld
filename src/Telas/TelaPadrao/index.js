import { StatusBar } from "expo-status-bar";
import React from "react";
import { Dimensions, KeyboardAvoidingView, Platform, StyleSheet } from "react-native";
import { cor } from "../../componentes/Cores";
import { SafeAreaView } from "react-native-safe-area-context";

export default function TelaPadrao({ children }){
    return<>
        <SafeAreaView style={ estilo.fundo } >
            <StatusBar/>
            <KeyboardAvoidingView
                behavior={ Platform.OS == 'ios' ? 'padding' : 'height' }
                style={{flex: 1}}
            >
                { children }
            </KeyboardAvoidingView>
        </SafeAreaView>
    </>
};

const deviceHeight = Dimensions.get('window').height;

const estilo = StyleSheet.create({
    fundo:{
        flex: 1,
        //alignItems: "center",
        //justifyContent: "center",
        //alignContent: "center",

        backgroundColor: cor.primaria,
        width:"100%",
        height: deviceHeight,
        
    },
});