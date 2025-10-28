export interface Question {
    id: number;
    pregunta: string;
    respuestas: string[];
    respuestaCorrecta: number;
    userSelectedAnswer?: number;
    isCorrectUserAnswer?: boolean

}