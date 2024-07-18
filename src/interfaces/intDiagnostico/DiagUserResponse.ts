import { DetalleResponse } from "./detalle/DetalleResponse";

export interface DiagUserResponse{
    detalle:   DetalleResponse;
    idDetalle: number;
    idDiagno:  number;
    idUsuario: number;
}