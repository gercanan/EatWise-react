import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    alimentos: []
}

export const alimentosSlice = createSlice({
    name: "alimentos",//consultar constantemente
    initialState,
    reducers: { //dentro de cada una estan las acciones que se realizan en este slice
        //cada accion tiene la posibilidad de acceder al valor actual (state)
        guardarAlimentos: (state, action) => {
            //me permite acceder a las propiedades del state
            state.alimentos = action.payload;
        }
    } 
}
    
);

//tenemos que exponer todas las acciones por separado
export const {guardarAlimentos} = alimentosSlice.actions;

export default alimentosSlice.reducer;