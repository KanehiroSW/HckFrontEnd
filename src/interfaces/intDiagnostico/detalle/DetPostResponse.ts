export interface DetPostResponse{
    detalle_diag: DetalleDiag;
    message:      string;
}

export interface DetalleDiag {
    descripcion:     string;
    imagen:          string;
    precision:       number;
    recomend:        string;
    tipo_enfermedad: string;
}
