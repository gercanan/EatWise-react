import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cuenta: 0,
    apiKey: "",
    id: -1,
    caloriasDiarias: -1
}

export const usuariosSlice = createSlice({
    name: "usuarios",//consultar constantemente
    initialState,
    reducers: { //dentro de cada una estan las acciones que se realizan en este slice
        //cada accion tiene la posibilidad de acceder al valor actual (state)
        incrementar: state => {
            //me permite acceder a las propiedades del state
            state.cuenta++;
        },
        guardarinfo: (state, action) => {
            state.apiKey = action.payload.apiKey;
            state.id = action.payload.id;
            state.caloriasDiarias = action.payload.caloriasDiarias;
            console.log(state.apiKey, state.id, state.caloriasDiarias);
        }
    } 
}
    
);

//tenemos que exponer todas las acciones por separado
export const {incrementar, guardarinfo} = usuariosSlice.actions;

export default usuariosSlice.reducer;