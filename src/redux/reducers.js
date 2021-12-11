import { SET_USER, SET_DEMANDA, SET_DEMANDA_ATUAL } from "./actions";

export const inicialState ={
    usuario: {
        uid: '',
        nome: '',
        email: '',
        senha: '',
        tipoConta: true,
        idLista: [],
    },
    demandas:{},
    demandaAtual:{},
};

export function usuarioReducer(state = inicialState, action){
    switch(action.type){
        case SET_USER:
            return { ...state, usuario: action.payload }; 
        default: return state;
    };
};

export function demandaReducer(state = inicialState, action){
    switch(action.type){
        case SET_DEMANDA:
            return { ...state, demandas:  action.payload};
        default: return state;
    };
};

export function demandaAtualReducer(state = inicialState, action){
    switch(action.type){
        case SET_DEMANDA_ATUAL:
            return { ...state, demandaAtual: action.payload }; 
        default: return state;
    };
};
