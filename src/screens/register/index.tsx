import React, { useState } from "react";
import { Modal } from 'react-native';

import { Input } from "../../components/Form/Input";
import { Button } from "../../components/Form/Button";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";

import { CategorySelect } from '../CategorySelect'

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TranscationsTypes,
} from "./styles";

export function Register() {
  const [transactionType, setTransactionType] = useState(''); /* useState para armazenar qual botão está selecionado, tendo o fundo e a cor de acordo com a seleção */

  function handleTransactionTypeSelect(type: 'up' | 'down') {
    setTransactionType(type);
  }

  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />
          <TranscationsTypes>
            <TransactionTypeButton
              type="up"
              title="Income"
              onPress={() => handleTransactionTypeSelect('up')}
              isActive={transactionType === 'up'}
            />
            <TransactionTypeButton
              type="down"
              title="Outcome"
              onPress={() => handleTransactionTypeSelect('down')}
              isActive={transactionType === 'down'}
            />
          </TranscationsTypes>

          <CategorySelectButton title='Category'/>
        </Fields>

        <Button title="Enviar" />
      </Form>
      <Modal>
        <CategorySelect />
      </Modal>

    </Container>
  );
}
