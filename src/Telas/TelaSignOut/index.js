import React from "react";
import { ScrollView, Text, View } from "react-native";
import Botao from "../../componentes/Botao";
import { estilo } from "../estiloTelas";
import * as firebase from "firebase";
import { useDispatch, useSelector } from "react-redux";
import { deleteDemada, setDemada, setUser } from "../../redux/actions";
import { inicialState } from "../../redux/reducers";
import { database } from "../../config/firebase";

export default function TelaSignOut({ navigation }){
    const dispatch = useDispatch();
    const { demandas } = useSelector(state => state.demandaReducer);
    const { usuario } = useSelector(state => state.usuarioReducer);

    function fazerSighOut(){
        dispatch(setUser(inicialState.usuario));
        dispatch(setDemada(inicialState.demandas));
        
        firebase.auth().signOut().then(() => {
            console.log("usuario saiu!!!")
        }).catch((error) => {
            console.log(error);
        });
    }

    return <ScrollView style={ estilo.fundo }>
        <Text style={ estilo.texto } >Deseja mesmo sair?</Text>
        <View>
            <Botao texto="NÃO" onPress={ ()=>{navigation.goBack()} }/>
            <Botao texto="SIM" corFundo="#930002" onPress={ () =>fazerSighOut() }/>
        </View>
    </ScrollView>
};