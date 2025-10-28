import { Button } from "@mui/material"
import { useQuestionData } from "../hooks/useQuestionData"
import { useQuestionsStore } from "../store/questions"


export const Footer = () => {

    const { correct, incorrect, unanswered} = useQuestionData()
    const reset = useQuestionsStore(state => state.reset)
    

  return (
    <footer className="mt-[25px] text-center ">
        <strong>{`✅ ${correct}  correctas - ❌ ${incorrect} incorrectas - ❓ ${unanswered} sin responder`}</strong>
        <div className="mt-[16px]">
            <Button variant="contained" color="success" onClick={ () => reset()}>
              Reiniciar
            </Button>
        </div>
    </footer>
  )
}
