import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from "@react-navigation/drawer";
import React, { useEffect, useState } from "react";

import TelaHome from "../Telas/TelaHome";
import TelaLogin from "../Telas/TelaLogin";
import TelaSignIn from "../Telas/TelaSignIn";
import TelaSignOut from "../Telas/TelaSignOut";
import { nometelas } from "./nomeTelas";
import TelaLoading from "../Telas/TelaLoading";
import TelaRespostas from "../Telas/TelaRespostas";

import { LogBox } from "react-native";
import * as firebase from "firebase";
import estiloNav from "./estiloNav";
import { getUsuario } from "../config/firebase";

import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../redux/actions";
import TelaDemanda from "../Telas/TelaDemanda";
import ConteudoDrawer from "./ConteudoDrawer";

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function Rotas({navigation}){
    LogBox.ignoreLogs(['Setting a timer for a long period of time','Non-serializable values were found in the navigation state']);

    const dispatch = useDispatch();
    const { usuario } = useSelector(state => state.usuarioReducer);
    const [isLogged, setIslogged] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() =>{
        setIsLoading(true);
        firebase.auth().onAuthStateChanged( (user) => {
            if (user) {
                setIslogged(true);
                getUsuario(user.uid).then( u => {
                    dispatch(setUser( u ));
                    setIsLoading(false);
                }).catch(err => {
                    console.log(err);
                });
                
            } else {
                setIslogged(false);
                setIsLoading(false);
            }
        });
        return () => {
            dispatch(setUser({}));
        }
    },[]);
    
    return <NavigationContainer>{
        isLogged? (
            isLoading? (
                <TelaLoading/>
            ) : (
                <Drawer.Navigator
                    screenOptions={ estiloNav }
                    drawerContent={ (props) => <ConteudoDrawer props={props} usuario={usuario}  /> }
                    >
                    <Drawer.Screen
                        name={ nometelas.telaHome }
                        component={ TelaHome }
                    />
                    {usuario.tipoConta
                    ?<Drawer.Screen
                        name={ nometelas.telaRespostas }
                        children={ () => <TelaRespostas/> }
                    /> 
                    :<Drawer.Screen
                        name={ nometelas.telasuasDemandas }
                        children={ () => <TelaDemanda/> }
                    />}
                    <Drawer.Screen
                        name={nometelas.telaSignOut}
                        component={ TelaSignOut }
                    />
                </Drawer.Navigator>
            )                
        ) : (
            <Stack.Navigator screenOptions={ estiloNav } >
                <Stack.Screen
                    name={ nometelas.telaLogin }
                    //children={() => <TelaLogin/> }
                    component={ TelaLogin }
                />
                <Stack.Screen
                    name={ nometelas.telaCadastro }
                    //children={() => <TelaSignIn/> }
                    component={ TelaSignIn }
                />
            </Stack.Navigator>
        )
    }
    </NavigationContainer>
};