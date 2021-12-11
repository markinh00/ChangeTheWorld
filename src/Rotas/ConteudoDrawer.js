import React from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import { View } from "react-native";
import { Drawer, Text } from "react-native-paper";
import { Ionicons } from '@expo/vector-icons';
import UserInfo from "../componentes/UserInfo";
import { nometelas } from "./nomeTelas";


export default function ConteudoDrawer({props, usuario }){
    return(
        <View style={{flex:1}} >
            <DrawerContentScrollView {...props} >
                <View>
                    <UserInfo usuario={usuario} />
                </View>
                <Drawer.Section>
                    <DrawerItem
                        icon={({color,size}) =>(
                            <Ionicons
                                name='home-outline'
                                color={color}
                                size={size}
                            />
                        )}
                        label={'Home'}
                        onPress={()=>{props.navigation.navigate(nometelas.telaHome)}}
                    />
                    <DrawerItem
                        icon={({color,size}) =>(
                            <Ionicons
                                name='folder-outline' 
                                color={color}
                                size={size}
                            />
                        )}
                        label={usuario.tipoConta? 'Suas respostas' : 'Suas demandas'}
                        onPress={()=>{
                            props.navigation.navigate( usuario.tipoConta 
                                ? nometelas.telaRespostas
                                : nometelas.telasuasDemandas)
                            }
                        }
                    />
                </Drawer.Section>
            </DrawerContentScrollView>
            <Drawer.Section>
                <DrawerItem
                    icon={({color,size}) =>(
                        <Ionicons
                            name='exit-outline'
                            color={color}
                            size={size}
                        />
                    )}
                    label={'Sair'}
                    onPress={()=>{props.navigation.navigate(nometelas.telaSignOut)}}
                />
            </Drawer.Section>
        </View>
    );
};