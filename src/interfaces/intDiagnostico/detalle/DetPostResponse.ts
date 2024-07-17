export interface DetPostResponse{
    detalle_diag: DetalleDiag;
    message:      string;
}

export interface DetalleDiag {
    descripcion:     string;
    idDetalle:       number;
    imagen:          string;
    precision:       number;
    recomend:        string;
    tipo_enfermedad: string;
    fecha_creacion:  string;
}
