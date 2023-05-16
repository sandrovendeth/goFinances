import React, { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "styled-components";
import { useAuth } from "../../hooks/auth";

import { HighlightCard } from "../../components/HighlightCard";
import {
  TransactionCard,
  TransactionCardProps,
} from "../../components/TransactionCard";

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
  HighlightCards,
  Transactions,
  Title,
  TransactionsList,
  LogoutButton,
  LoadContainer,

  
} from "./styles";



export interface DataListProps extends TransactionCardProps {
  id: string;
}

interface HighLightProps {
  amount: string;
  lastTransaction: string;
}

interface HighLightData {
  entries: HighLightProps;
  expensives: HighLightProps;
  total: HighLightProps;
}

export function Dashboard() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactions, setTransactions] = useState<DataListProps[]>([]);
  const [highLightData, setHighLightData] = useState<HighLightData>(
    {} as HighLightData
  );
  const theme = useTheme();

  const{ signOut, user } = useAuth();

  function getLastTransactionDate(
    collection: DataListProps[], 
    type: 'positive' | 'negative'
    ){

    const lasTransaction = 
      new Date()
      Math.max.apply(Math, collection
      .filter(transaction => transaction.type === type)
      .map(transaction => new Date (transaction.date).getTime()))

    return ` ${lasTransaction.getDate()} de ${lasTransaction.toLocaleString('pt-BR', { month: 'long'})}`;
  }

  async function loadTransactions() {
    const dataKey = "@gofinances:transactions";

    const response = await AsyncStorage.getItem(dataKey);
    const transcations = response ? JSON.parse(response) : [];

  

    let entriesTotal = 0;
    let expensiveTotal = 0;

    const transcationsFormatted: DataListProps[] = transcations.map(
      (item: DataListProps) => {
        if (item.type === "positive") {
          entriesTotal += Number(item.amount); /* acumulador */
        } else {
          expensiveTotal += Number(item.amount);
        }

        const amount = Number(item.amount).toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        });
        const date = Intl.DateTimeFormat("pt-BR", {
          day: "2-digit",
          month: "long",
          year: "2-digit",
        }).format(new Date(item.date));

        return {
          id: item.id,
          name: item.name,
          amount,
          type: item.type,
          category: item.category,
          date,
        };
      }
    );

    setTransactions(transcationsFormatted);

   const lastTransactionsEntries = getLastTransactionDate(transactions, 'positive');
   const lastTransactionsExpensives = getLastTransactionDate(transactions, 'negative');
   const totalInterval = `01 à${lastTransactionsExpensives}`;
    
    

    const total = entriesTotal - expensiveTotal;

    setHighLightData({
      entries: {
        amount: entriesTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: `Última entrada dia${lastTransactionsEntries}`,
      },
      expensives: {
        amount: `- ${expensiveTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}`,
        lastTransaction: `Última saída dia ${lastTransactionsExpensives}`,
      },
      total: {
        amount: total.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        }),
        lastTransaction: `Intervalo entre ${totalInterval}`
      },
    }),
      setIsLoading(false);
  } 
   async function handleRemoveSkill(transactionId: string) {
    const dataKey = '@gofinances:transactions';

    const response = await AsyncStorage.getItem(dataKey);
    const storagedTransactions = response ? JSON.parse(response) : [];

    const filteredTransactions = storagedTransactions.filter((transactions: DataListProps) => transactions.id !== transactionId);

    setTransactions(filteredTransactions);

    await AsyncStorage.setItem(dataKey, JSON.stringify(filteredTransactions));

    loadTransactions();
  
  }
  function alerta(name: string, id: string,) {
    console.log('alerta')
    Alert.alert(`Você deseja deletar ${(name)}`,
    "",
    [
      {text: 'Cancelar', },
      {text: 'Deletar', onPress: ( ) => handleRemoveSkill(id) },
    ],
      {cancelable: false}
    )}

    

  useEffect(() => {
    loadTransactions();
    

    // const dataKey = '@gofinances:transactions';
    // AsyncStorage.removeItem(dataKey)
    
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTransactions();
    }, [])
  );

  return (
    <Container>
      {isLoading ? (
        <LoadContainer>
          <ActivityIndicator color={theme.colors.primary_black} size="large" />
        </LoadContainer>
      ) : (
        <>
          <Header>
            <UserWrapper>
              <UserInfo>
                <Photo
                  source={{uri: user.photo}}     
                />
                <User>
                  <UserGreeting>Olá, </UserGreeting>
                  <UserName>{user.name}</UserName>
                </User>
              </UserInfo>
              <LogoutButton onPress={signOut}>
                <Icon name="power" />
              </LogoutButton>
            </UserWrapper>
          </Header>
          <HighlightCards>
            <HighlightCard
              type="up"
              title="Entradas"
              amount={highLightData.entries.amount}
              lastTransaction={highLightData.entries.lastTransaction}
            />
            <HighlightCard
              type="down"
              title="Saídas"
              amount={highLightData.expensives.amount}
              lastTransaction={highLightData.expensives.lastTransaction}
            />
            <HighlightCard
              type="total"
              title="Total"
              amount={highLightData.total.amount}
              lastTransaction={highLightData.total.lastTransaction}
            />
          </HighlightCards>

          <Transactions>
          
            <Title>Listagem</Title>
            

            <TransactionsList
              data={transactions}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => <TransactionCard exclude={alerta} data={item} />}           
            />
          </Transactions>
        </>
      )}
    </Container>
  );
}
