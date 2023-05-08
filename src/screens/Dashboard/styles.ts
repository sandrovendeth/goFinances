import styled from "styled-components/native";
import { FlatList, FlatListProps } from "react-native";
import { Feather } from "@expo/vector-icons"; //biblioteca de icones
import { RFPercentage, RFValue } from "react-native-responsive-fontsize";
import { getBottomSpace, getStatusBarHeight } from "react-native-iphone-x-helper";
import { BorderlessButton } from 'react-native-gesture-handler';


import { DataListProps } from '.';

export const Container = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.background};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFPercentage(
    42
  )}px; /* usando a biblioteca responsive fontsize, no qual dimensiona na proporação de cada tela */
  background-color: ${({ theme }) => theme.colors.primary_black};
  align-items: flex-start;
  justify-content: center;
  flex-direction: row;
`;
export const UserWrapper = styled.View`
  width: 100%;

  padding: 0 24px; /* padding 0 encima baixo e 24px lado esquerdo e direito */
  margin-top: ${getStatusBarHeight() + RFValue(28)}px;

  flex-direction: row; /* deixar os itens nas mesma linha */
  justify-content: space-between; /* fazem com que fiquem separados um em cada borda respeitado o tamanho do padding colocado */
  align-items: center; /* alinha verticalmente */
`;

export const UserInfo = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const Photo = styled.Image`
  /* estilização da foto, usando também a biblioteca RFvalue pois mantém a proporção também pra cada tela */
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  border-radius: 10px;
`;

export const User = styled.View`
  margin-left: 17px;
`;

export const UserGreeting = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
`;

export const UserName = styled.Text`
  color: ${({ theme }) => theme.colors.shape};
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.bold};
`;

export const LogoutButton = styled(BorderlessButton)``;

export const Icon = styled(Feather)`
  /* Estilização do ícone de sair (power). Visto que é um elemento externo, não usamos '.' visto que não é nativo */
  color: ${({ theme }) => theme.colors.secondary};
  font-size: ${RFValue(24)}px;
`;

export const HighlghtCards = styled.ScrollView.attrs({
  /* Em vez de colocar as proprieaddes da scrollview no index, pelo attrs você pode já colocar direto aqui pelo styled components, ficando mais inxuto o elemento no index.html */
  horizontal: true,
  showsHorizontalScrollIndicator: false,
  contentContainerStyle: { paddingHorizontal: 24 },
})`
  width: 100%;
  position: absolute;
  margin-top: ${RFPercentage(20)}px;
`;

export const Transactions = styled.View`
  flex: 1%;
  padding: 0 24px;

  margin-top: ${RFPercentage(12)}px;
`;
export const Title = styled.Text`
  font-size: ${RFValue(18)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  margin-bottom: 16px;
`;

export const TransactionsList = styled(
  FlatList as new (props: FlatListProps<DataListProps>) => FlatList<DataListProps>
  ).attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: {
    paddingBottom: getBottomSpace()
  }
})``;