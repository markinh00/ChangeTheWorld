import { isEmptyArray } from 'formik';
import React, { useEffect, useState } from 'react';
import { ScrollView, Text, View, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { useSelector } from 'react-redux';
import { getRespostas, getUsuario } from '../../config/firebase';
import { estilo02 } from '../../Telas/estiloTelas';
import TelaLoading from '../../Telas/TelaLoading';
import { cor } from '../Cores';
import estiloLista from '../Lista/estiloLista';
import UserInfo from '../UserInfo';
import Botao from '../Botao'
import { estiloDemanda } from './estilo';

export default function Demanda({navigation}){
    const [isLoading, setIsLoading] = useState(true);
    const [criadorDemanda, setCriadorDemanda] = useState({});
    const { usuario } = useSelector(state => state.usuarioReducer);
    const { demandaAtual } = useSelector(state => state.demandaAtualReducer);

    useEffect(()=>{
        getUsuario(demandaAtual.idCriadorDemanda).then( u => {
            setCriadorDemanda(u);
            if(!isEmptyArray(demandaAtual.idRespostas)){
                getRespostas(demandaAtual).then( r => {
                    console.log(r);
                }).catch(err => {
                    console.log(err);
                });
            }
            setIsLoading(false);
        }).catch(err => {
            console.log(err);
        });
    },[]);

    return<>{ isLoading ? (
            <TelaLoading/>
        ):(
            <View style={{ ...estilo02.fundo, justifyContent: 'space-between' }} >
                <View>
                    <UserInfo usuario={ criadorDemanda } />
                    <View>
                        <Text style={ estiloLista.textoTitulo } >{ demandaAtual.titulo }</Text>
                        <Text style={ estiloLista.textoDescricao } >{ demandaAtual.descricao }</Text>
                    </View>
                    {demandaAtual.idRespostas
                        ?<View>
                            <Text style={ {...estilo02.texto, color: cor.detalheCinza, textAlign: 'center'} } >
                                está demanda ainda não tem respostas
                            </Text>
                        </View>

                        :<Text>teste</Text>
                    }
                </View>
                { usuario.tipoConta && <View style={ {...estiloDemanda.containerInput, alignItems:'center' }} >
                    <KeyboardAvoidingView
                        behavior={ Platform.OS == 'ios' ? 'padding' : 'height' }
                        style={{flex: 1}}
                    >
                        <TextInput
                        style={ {...estilo02.input, minWidth: '75%'} }
                        />
                    </KeyboardAvoidingView>
                    <Botao tamanho='20%' texto='enviar'  />
                </View>
                }
            </View>
           
        )}
    </>
}