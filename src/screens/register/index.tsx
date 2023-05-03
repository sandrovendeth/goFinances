import react from 'react';
import { Container, Header, Title } from './styles'
import { Input } from '../../components/Form/Input';


export function Register() {
    return(
        <Container>
            <Header>
                <Title>Cadastro</Title>
            </Header>

            <Input 
                placeholder='Nome'
            
            />
                

        </Container>
    )
};