import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    registros: [],
    paises: []
}

export const registrosSlice = createSlice({
    name: "registros",//consultar constantemente
    initialState,
    reducers: { //dentro de cada una estan las acciones que se realizan en este slice
        //cada accion tiene la posibilidad de acceder al valor actual (state)
        guardarRegistros: (state, action) => {
            //me permite acceder a las propiedades del state
            state.registros = action.payload.registros;
        },
        agregarRegistro: (state, action) => {
            state.registros.push(action.payload);
        },
        eliminarRegistro: (state, action) => {
            //recibo solo el id del registro
            state.registros = state.registros.filter(registro => registro.id !== action.payload);
        },
        guardarPaises: (state, action) => {
            state.paises = action.payload;
        }
    } 
}
    
);

//tenemos que exponer todas las acciones por separado
export const {guardarRegistros, agregarRegistro, eliminarRegistro, guardarPaises} = registrosSlice.actions;

export default registrosSlice.reducer;