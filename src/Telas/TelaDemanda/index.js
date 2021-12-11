import React, { useEffect, useState } from "react";
import TelaLoading from "../TelaLoading";
import { estilo02 } from "../estiloTelas";
import { Modal, Text, View } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { cor } from "../../componentes/Cores";
import TelaCriarDemanda from "../TelaCriarDemanda";

import { useSelector, useDispatch } from "react-redux";
import { setDemada } from "../../redux/actions";
import { isEmptyArray } from "formik";
import { getDemandas } from "../../config/firebase";
import Lista from "./Lista";
import { TouchableOpacity } from "react-native-gesture-handler";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Demanda from "../../componentes/Demanda";
import { nometelas } from "../../Rotas/nomeTelas";

const Stack = createNativeStackNavigator();

export default function TelaDemanda({navigation}){
    const dispatch = useDispatch();
    const { usuario } = useSelector(state => state.usuarioReducer);
    const { demandas } = useSelector(state => state.demandaReducer);
    const [isLoading, setIsLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);

    function aoApertar(){
        setModalOpen(false)
        setIsLoading(true);
    }

    useEffect(() => {
        if(usuario.tipoConta){

        }else{
            getDemandas(usuario).then( d => {
                dispatch(setDemada(d));
                setIsLoading(false);
            }).catch(err => {
                console.log(err);
            });
        }

        return () => {
            dispatch(setDemada({}));
        };
    },[isLoading]);
    
    return<>{ !isLoading?(
            <View style={ estilo02.fundo } >
                <View style={ {paddingBottom: 5} } >
                    <Modal visible={ modalOpen } animationType='slide'>
                        <View>
                            <TouchableOpacity>
                                <Ionicons
                                    name='close'
                                    size={ 32 }
                                    color='crimson'
                                    onPress={ ()=> setModalOpen(false) }
                                    style={{alignSelf: 'center', marginVertical: 10}}
                                />
                            </TouchableOpacity>
                            <TelaCriarDemanda onPress={ () => aoApertar() } />
                        </View>
                    </Modal>
                </View>
                
                { isEmptyArray(demandas)
                    ?<View  style={ {...estilo02.fundo, justifyContent: 'center', alignItems: 'center'} }>
                        <Text style={ {...estilo02.texto, color: cor.detalheCinza, textAlign: 'center'} }>
                            Para criar uma demanda pressione o botao "+" acima
                        </Text>
                    </View>

                    :<Stack.Navigator screenOptions={{headerShown: false}} >
                        <Stack.Screen
                            name='lista-demanda'
                            children={ () => <ListaDemanda
                                lista={ Object.values(demandas) }
                                navigation={ navigation }
                                usuario = { usuario }
                                onPressRefresh = { () => setIsLoading(true) }
                                onPressAdd = { () => setModalOpen(true) } 
                            /> }
                        />
                        <Stack.Screen
                            name={nometelas.telaDemandas}
                            children={ () => <Demanda/> }
                        />
                    </Stack.Navigator>
                }
            </View>    
        ) : (
            <TelaLoading/>
        )
    }
    </>
};

function ListaDemanda({lista, navigation, onPressRefresh, onPressAdd, usuario}){
    return <View style={ {...estilo02.fundo, padding: 0} } >
        <View style={ {paddingBottom: 5, flexDirection: 'row', justifyContent: 'space-evenly'} } >
            <TouchableOpacity>
                <Ionicons
                    name= 'refresh-outline'
                    size={ 32 }
                    color={ cor.primaria }
                    onPress={ onPressRefresh }
                    style={{alignSelf: 'center', marginVertical: 10}}
                />
            </TouchableOpacity>
            <TouchableOpacity>
                <Ionicons
                    name= {usuario.tipoConta? 'mail-outline' : 'add-outline'}
                    size={ 32 }
                    color={ cor.primaria }
                    onPress={ onPressAdd }
                    style={{alignSelf: 'center', marginVertical: 10}}
                />
            </TouchableOpacity>
        </View>
        <Lista itemLista={ lista } navigation={ navigation } />
    </View>
};