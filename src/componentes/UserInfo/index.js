import React from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { Ionicons } from '@expo/vector-icons'
import { cor } from "../Cores";
import { color } from "react-native-reanimated";


export default function  UserInfo({usuario}){
    return<View style={ estiloUserInfo.container } >
        <Ionicons
            name='person-circle-outline'
            size={64}
            color={ cor.detalheCinza }
        />
        <View style={ estiloUserInfo.containerTexto } >
            <Text style={ estiloUserInfo.nome } >{usuario.nome}</Text>
            <Text style={ estiloUserInfo.email } >{usuario.email}</Text>
        </View>
    </View>
}

const estiloUserInfo = StyleSheet.create({
    container:{
        padding: 2.5,
        margin: 2.5,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: cor.detalheCinza,
    },
    containerTexto:{
        marginLeft: 5,
    },
    nome: {
        fontWeight: "bold",
        fontSize: 20
    },
    email:{
        fontSize: 15,
        color: cor.detalheCinza,
    },
});