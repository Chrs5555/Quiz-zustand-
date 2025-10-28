 
import '../App.css'
import {Card, List, ListItem, ListItemButton, ListItemText} from "@mui/material";
import { useQuestionsStore } from "../store/questions"

export const Start = () => {

    const fetchQuestions = useQuestionsStore(state => state.fetchQuestions); 
    const setCategoria = useQuestionsStore(state => state.setCategoria);

    const categorias = ['cine', 'musica', 'peruana', 'historia']

    return (
        <div className='text-center flex justify-center flex-col'>
            <h2 className="quiz text-lg text-white font-bold  mt-14">Selecciona una categoria para comenzar 👾</h2>

            <Card variant="outlined" sx={ {bgcolor: '#222', p:2,marginLeft: 12 , textAlign:'left', marginTop: 4, width:350, }}>
                <List sx={{bgcolor: '#333'}} disablePadding>
                    {categorias.map((c, index) =>(
                    <ListItem key={index} disablePadding divider>
                        <ListItemButton 
                            onClick={() =>{
                                setCategoria(c);
                                fetchQuestions(5, c);
                            }} 
                            >
                            <ListItemText className=" text-amber-300  " primary={c} sx={{textAlign: 'center'}}/>
                        </ListItemButton>
                    </ListItem>
                    ))}

                </List>
            </Card>
        </div>
    )
}