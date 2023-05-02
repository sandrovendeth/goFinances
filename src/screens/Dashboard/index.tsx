import React from "react";

import {
  Container,
  Header,
  UserInfo,
  Photo,
  User,
  UserGreeting,
  UserName,
  UserWrapper,
  Icon,
  HighlghtCards,
  Transactions,
  Title,
  TransactionList,
} from "./styles";
import { HighlightCard } from "../../components/HighlightCard";
import { TransactionCard } from "../../components/TransactionCard";

const data = [{
  title: "Desenvolvimento de Site",
  amount: "R$ 12.000,00",
  category: {
    name: "Vendas",
    icon: "dollar-sign",
  },
  date: "02/05/2023",
}];

export function Dashboard() {
  return (
    <Container>
      <Header>
        <UserWrapper>
          <UserInfo>
            <Photo
              source={{
                uri: "https://avatars.githubusercontent.com/u/115854112?v=4",
              }}
            />
            <User>
              <UserGreeting>Olá, </UserGreeting>
              <UserName>Sandro</UserName>
            </User>
          </UserInfo>
          <Icon name="power" />
        </UserWrapper>
      </Header>
      <HighlghtCards>
        <HighlightCard
          type="up"
          title="Entradas"
          amount="R$ 17.400,00"
          lastTransaction="Última entrada dia 13 de abril"
        />
        <HighlightCard
          type="down"
          title="Saídas"
          amount="R$ 1.259,00"
          lastTransaction="Última saída dia 03 de abril"
        />
        <HighlightCard
          type="total"
          title="Total"
          amount="R$ 16.141,00"
          lastTransaction="01 à 16 de abril"
        />
      </HighlghtCards>

      <Transactions>
        <Title>Listagem</Title>
        <TransactionList
          data={data}
        />
        <TransactionCard data={data[0]} />
      </Transactions>
    </Container>
  );
}
