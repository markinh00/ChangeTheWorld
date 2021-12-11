import React from "react";
import { FlatList } from "react-native";
import Item from "../Item";
import estiloLista from "./estiloLista";

export default function Lista({ itemLista, navigation }){

    return<FlatList
        contentContainerStyle={ estiloLista.containerLista }
        data={ itemLista }
        renderItem={({ item }) => <Item item={ item } navigation={navigation} /> }
        keyExtractor={ item => item.id }
    />
};