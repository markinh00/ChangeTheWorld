import { Dimensions, StatusBar, StyleSheet } from "react-native";
import { cor } from "../componentes/Cores";

const deviceHeight = Dimensions.get('window').height;

export const estilo = StyleSheet.create({
    fundo: {
        height: deviceHeight - StatusBar.currentHeight * 1.2,
        //justifyContent: "center",
        backgroundColor: cor.primaria,
        padding: 15,
    },
    titulo:{
        fontSize: 25,
        fontWeight: "bold",
        
        color: cor.terciaria,
        paddingHorizontal: 10,
        marginBottom: 5,
    },
    texto:{
        fontSize: 20,
        fontWeight: "bold",
        
        color: cor.terciaria,
        paddingHorizontal: 10,
        marginBottom: 5,
    },
    textoErro: {
        fontSize: 15,
        fontWeight: "bold",

        color: cor.vermelho,
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
    },
    container: {
        width: "100%",
        height: 75,
        marginVertical: 5,
    },
});

export const estilo02 = StyleSheet.create({
    ...estilo,
    fundo: {
        ...estilo.fundo,
        backgroundColor: cor.terciaria,
    },
    texto: {
        ...estilo.texto,
        color: cor.preto,
    },
    input:{
        ...estilo.input,
        backgroundColor: cor.detalheCinza,
        borderColor: cor.secundaria,
        color: cor.preto,
    },
});
