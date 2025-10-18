import { create } from "zustand";
import {type Question } from "../types";
import confetti from 'canvas-confetti';
import { persist } from "zustand/middleware";


interface State {
    preguntas: Question[];
    preguntaActual: number;
    categoria: string | null;
    fetchQuestions: (limit: number, categoria: string) => Promise<void>;
    selectAnswer: (questionId: number, answerIndex: number) => void;
    goNextQuestion: () => void;
    goPrevQuestion: () => void;
    reset: () => void;
    setCategoria: (categoria: string) => void;
}

export const useQuestionsStore = create<State>()(persist((set, get) => {
    return {
        preguntas: [],
        preguntaActual: 0,
        categoria: null,
        fetchQuestions: async (limit: number, categoria: string ) => {
            const res = await fetch('http://localhost:5173/categoria.json')
            const json = await res.json()

            const preguntaCategoria = json[categoria] ;

            const preguntas = preguntaCategoria.sort(() => Math.random() - 0.5).slice(0, limit);

            set({preguntas, categoria});
        },

        selectAnswer: (questionId: number, answerIndex: number) => {
            const {preguntas} = get();

            const newQuestions = structuredClone(preguntas);
            const questionIndex = newQuestions.findIndex(q => q.id === questionId);
            const questionInfo = newQuestions[questionIndex];
            const isCorrectUserAnswer = questionInfo.respuestaCorrecta === answerIndex;
            if ( isCorrectUserAnswer ) confetti();

            newQuestions[questionIndex] = {
                ...questionInfo,
                isCorrectUserAnswer, 
                userSelectedAnswer: answerIndex
            }

            set({preguntas: newQuestions});
        }, 

        goNextQuestion: () => {
            const {preguntaActual, preguntas} = get();
            const nextQuestion = preguntaActual + 1;

            if(nextQuestion < preguntas.length){
                set({preguntaActual: nextQuestion});
            }
        }, 


        goPrevQuestion() {
            const {preguntaActual} = get();
            const prevQuestion = preguntaActual - 1;

            if(prevQuestion >= 0){
                set({preguntaActual: prevQuestion});
            }
        },

        reset() {
            set ({preguntaActual: 0, preguntas: [], categoria: null});
        },

        setCategoria(categoria) {
            set({categoria, preguntas: [], preguntaActual: 0});
            // get().fetchQuestions(5, categoria);  
        },
    }
},{
    name: "categorias"
}))