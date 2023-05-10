import styled from "styled-components/native";
import { RFValue } from "react-native-responsive-fontsize";
import { BorderlessButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  background-color: ${({ theme }) =>
    theme.colors
      .primary_black}; /*Usarmos as cores defindas na estilização global (themes) */

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

export const Content = styled.ScrollView``;

export const ChartContainer = styled.View`
    width: 100%;
    align-items: center;
`;
export const MonthSelect = styled.View`
    width: 100%;

    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    margin-top: 24px;

`;

export const MonthSelectButton = styled(BorderlessButton)`
`;

export const MonthSelectIcon = styled(Feather)`
    font-size: ${RFValue(24)}px;
`;

export const Month = styled.Text`
    font-family: ${({ theme }) => theme.fonts.regular};
    font-size: ${RFValue(20)}px;
`;
export const LoadContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
