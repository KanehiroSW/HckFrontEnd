export interface PdfRequest {
    user_data:      UserData;
    diagnosis_data: DiagnosisData;
}

export interface DiagnosisData {
    tipo_enfermedad: string;
    descripcion:     string;
    precision:       number;
    recomend:        string;
    imagen:          string;
}

export interface UserData {
    edad:      number;
    telefono:  string;
    dni:       string;
    direccion: string;
    peso?:     number;
    altura?:   number;
}
