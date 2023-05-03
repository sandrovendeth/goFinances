import React from 'react';
import { TextInputProps } from 'react-native'; // Importar a tipagem do TextInput

import { Container } from './styles';

type Props = TextInputProps;   // criou um type chamada Props que englobará todas as propriedades do text input

export function Input({...rest} : Props){ /* pega todas as propriedades que vem to textinput e coloca no container (linha10) */
    return(
        <Container {...rest}>
            
        </Container>
    )
}