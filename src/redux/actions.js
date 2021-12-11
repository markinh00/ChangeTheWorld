export const SET_USER = 'SET_USER';
export const SET_DEMANDA = 'SET_DEMANDA';
export const SET_DEMANDA_ATUAL = 'SET_DEMANDA_ATUAL';

export const setUser = user => dispatch =>{
    dispatch({
        type: SET_USER,
        payload: user,
    });
};

export const setDemada = demanda => dispatch =>{
    dispatch({
        type: SET_DEMANDA,
        payload: demanda,
    });
};

export const setDemandaAtual = demanda  => dispatch =>{
    dispatch({
        type: SET_DEMANDA_ATUAL,
        payload: demanda,
    });
};