import styled from'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';


export const Container = styled.View`
    flex: 1;
    background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
    background-color: ${({ theme }) => theme.colors.primary_black}; /*Usarmos as cores defindas na estilização global (themes) */

    width: 100%; /* ocupa 100% da tela */
    height: ${RFValue(113)}px; /* seta a altura de 113 (valor pegado no figma) */

    align-items: center; /* centraliza ao topo */
    justify-content: flex-end; /* tras o título para a linha debaixo */
    padding-bottom: 19px; /* espaçamanto por baixo */
`;

export const Title = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    color: ${({ theme }) => theme.colors.shape};
    font-size: ${RFValue(18)}px;   
`;
