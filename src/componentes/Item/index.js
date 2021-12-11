import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import estiloLista from "../Lista/estiloLista";
import { Ionicons } from '@expo/vector-icons';
import { cor } from "../Cores";
import { nometelas } from "../../Rotas/nomeTelas";
import { useDispatch } from "react-redux";
import { setDemandaAtual } from "../../redux/actions";

export default function Item({item, navigation, nometela}){
    const dispatch = useDispatch();
    const [corStatus, setCorStatus] = useState(cor.vermelho);

    const verItem = () =>{
        dispatch(setDemandaAtual(item));
        navigation.navigate({name: nometela});
    };
    

    useEffect(()=>{
        switch(item.statusDemanda){
            case 'open': setCorStatus(cor.verde);
                break;
            case 'em andamento': setCorStatus(cor.amarelo);
                break;
            case 'fechada': setCorStatus(cor.primaria);
                break;
            default: setCorStatus(cor.primaria);
                break;
        };
    },[]);

    return<>
        <View style={ estiloLista.container }>
            <View style={ estiloLista.itens } >
                <Text style={ estiloLista.textoTitulo } >{ item.titulo }</Text>
                <Text style={ estiloLista.textoDescricao } numberOfLines={2} >{ item.descricao }</Text>
                <Text style={ estiloStatus(corStatus).texto } >status: { item.statusDemanda }</Text>
            </View>
            <View style={ estiloLista.botao } >
                <TouchableOpacity>
                    <Ionicons
                        name='chevron-forward-outline'
                        size={ 32 }
                        color={ cor.detalheCinza }
                        style={{alignSelf: 'center', marginVertical: 10}}
                        onPress={ () => verItem() }                
                    />
                </TouchableOpacity>
            </View>
        </View>
    </>
};

const estiloStatus = (corStatus) => StyleSheet.create({
    texto:{
        ...estiloLista.textoDescricao,
        color: corStatus,
    }
});