import React from "react";
import { StyleSheet, Text } from "react-native";
import { cor } from "../Cores";

export default function Titulo({ texto }){
    return  <Text style={ estilo.titulo }>{ texto }</Text>
};

const estilo = StyleSheet.create({
    titulo:{
        width: "100%",
        height: 50,

        textAlign: "center",
        textAlignVertical: "center",

        color: cor.terciaria,
        fontSize: 35,
        fontWeight: "bold",

        marginBottom: 10,
    },
});
