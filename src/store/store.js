import { configureStore } from "@reduxjs/toolkit";
import usuarioReducer from '../feature/usuariosSlice';
import  registrosReducer from '../feature/registrosSlice';
import alimentosReducer from '../feature/alimentosSlice'

export const store = configureStore({
    reducer:{
        usuario: usuarioReducer,
        registros: registrosReducer,
        alimentos: alimentosReducer
    }
})