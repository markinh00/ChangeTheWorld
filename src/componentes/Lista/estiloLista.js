import { StyleSheet } from "react-native";
import { cor } from "../Cores";
import { estilo02 } from "../../Telas/estiloTelas";

const estiloLista = StyleSheet.create({
    container: {
        borderTopWidth: 1,
        borderColor: cor.detalheCinza,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    containerLista:{
        paddingBottom: 70,
    },
    itens:{
        maxWidth: '90%'
    },
    botao:{

    },
    textoTitulo:{
        ...estilo02.texto,
    },
    textoDescricao:{
        ...estilo02.texto,
        fontSize: 17,
        fontWeight: "normal",
        textAlign: "justify",
    },
});

export default estiloLista;