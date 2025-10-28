import {Card, IconButton, List, ListItem, ListItemButton, ListItemText, Stack, Typography} from "@mui/material";
import { type Question as QuestionType } from "../types";
import { useQuestionsStore } from "../store/questions";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import { Footer } from "./Footer";




const getBackgroundColor = (info: QuestionType, index: number) => {
    const {userSelectedAnswer, respuestaCorrecta} = info;

    //si el usuario no selecciono nada
    if(userSelectedAnswer == null) return 'transparent';
    //si ya seleciono pero no es la correcta
    if(index !== respuestaCorrecta && index !== userSelectedAnswer) return 'transparent'; 
    //si es la correcta
    if(index === respuestaCorrecta) return 'green';
    //si no es la correcta
    if(index === userSelectedAnswer) return 'red';
    //si no se cumple nada
    return 'transparent';
}

const Question = ({info} : {info: QuestionType}) =>{
    const selectAnswer = useQuestionsStore(state => state.selectAnswer);

    const createHandleClick = (answerIndex: number) => () => {
        selectAnswer(info.id, answerIndex);
    }
    
    return (
        <Card variant="outlined" sx={{bgcolor:'#222', p:2, textAlign:'left', marginTop: 4}}>
            <Typography className="text-[#f7cf2f]" variant="h5">
                {info.pregunta}
            </Typography>
            <List sx={{bgcolor:'#333'}}>
                {info.respuestas.map((respuesta, index) => (
                    <ListItem key={index} disablePadding divider>
                        <ListItemButton
                            disabled={info.userSelectedAnswer != null}
                            onClick={createHandleClick(index)}
                            sx={{backgroundColor: getBackgroundColor(info, index)}}>
                            <ListItemText className="text-white" primary={respuesta} sx={{textAlign:'center'}}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </Card>
    )
}

export const Game = () => {
    const preguntas = useQuestionsStore(state => state.preguntas)
    const preguntaActual = useQuestionsStore(state => state.preguntaActual)
    const goNextQuestion = useQuestionsStore(state => state.goNextQuestion)
    const goPrevQuestion = useQuestionsStore(state => state.goPrevQuestion)

    const infoPregunta = preguntas[preguntaActual];

    return ( 
        <>
            <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
                <IconButton onClick={goPrevQuestion} disabled={preguntaActual === 0}>
                    <ArrowBackIosNew />
                </IconButton>

                {preguntaActual + 1} / {preguntas.length}

                <IconButton onClick={goNextQuestion} disabled={preguntaActual >= preguntas.length - 1}>
                    <ArrowForwardIos/>
                </IconButton>
            </Stack>
            <Question info={infoPregunta} />
            <Footer/>
        </>
    )
}
