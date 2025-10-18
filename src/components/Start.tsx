 
import {Card, List, ListItem, ListItemButton, ListItemText} from "@mui/material";

import { useQuestionsStore } from "../store/questions"

export const Start = () => {

    const fetchQuestions = useQuestionsStore(state => state.fetchQuestions); 
    const setCategoria = useQuestionsStore(state => state.setCategoria);

    const categorias = ['cine', 'musica', 'peruana', 'historia']

    return (
        <Card variant="outlined" sx={ {bgcolor: '#222', p:2, textAlign:'left', marginTop: 4}}>
            <List sx={{bgcolor: '#333'}} disablePadding>
                {categorias.map((c, index) =>(
                  <ListItem key={index} disablePadding divider>
                    <ListItemButton 
                        onClick={() =>{
                            setCategoria(c);
                            fetchQuestions(5, c);
                        }} 
                        >
                        <ListItemText primary={c} sx={{textAlign: 'center'}}/>
                    </ListItemButton>
                  </ListItem>
                ))}

            </List>
        </Card>
    )
}