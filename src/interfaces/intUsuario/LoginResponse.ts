import { UsuarioResponse } from "./UsuarioResponse";

export interface LoginResponse {
    message: string;
    usuario?: UsuarioResponse;
}