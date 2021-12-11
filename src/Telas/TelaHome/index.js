import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { estilo02 } from "../estiloTelas";
import TelaLoading from "../TelaLoading";
import { useDispatch, useSelector } from 'react-redux';
import { getTodasDemandas } from "../../config/firebase";
import Lista from "./Lista";
import {Ionicons} from '@expo/vector-icons'
import { cor } from "../../componentes/Cores";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { nometelas } from "../../Rotas/nomeTelas";
import Demanda from "../../componentes/Demanda";

const Stack = createNativeStackNavigator();

export default function Home({navigation}){
    const dispatch = useDispatch();
    const { usuario } = useSelector(state => state.usuarioReducer);
    const [isLoading, setIsLoading] = useState(true);
    const [demandaObj, setDemandaObj] = useState({});

    useEffect(() =>{
        getTodasDemandas().then( d => {
            setDemandaObj(d);
            setIsLoading(false);
        });
        
    },[isLoading]);

    return<>{ isLoading? (
            <TelaLoading/>
        ) : (
            <Stack.Navigator screenOptions={{headerShown: false}} >
                <Stack.Screen
                    name='lista-home'
                    children={ () => <ListaHome
                        lista={Object.values(demandaObj)}
                        navigation={ navigation }
                        onPress={ () => setIsLoading(true) }
                    /> }
                />
                <Stack.Screen
                    name={nometelas.telaHomeDemanda}
                    children={ () => <Demanda/> }
                />
            </Stack.Navigator>
        )
    }
    </>
}

function ListaHome({lista, navigation, onPress}){
    return <View style={ estilo02.fundo } >
    <TouchableOpacity>
        <View style={ {paddingBottom: 5} } >
            <Ionicons
                name= 'refresh-outline'
                size={ 32 }
                color={ cor.primaria }
                onPress={ ()=> onPress }
                style={{alignSelf: 'center', marginVertical: 10}}
            />
        </View>
    </TouchableOpacity>
    <Lista itemLista={ lista } navigation={ navigation }/>
</View>
};