import React, { useState } from "react";
import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from "react-native";
import * as Yup from 'yup';

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { InputForm } from "../../components/Form/InputForm";
import { Button } from "../../components/Form/Button";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";


import { CategorySelect } from "../CategorySelect";


import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TranscationsTypes,
} from "./styles";

interface FormData {
  [name: string]: any,

}
const schema = Yup.object().shape({
  name: Yup /* Validação do atributo name */
  .string()
  .required('Nome é obrigatório!'), 
  amount: Yup /* Validação do atributo amount(valor) com o Yup */
  .number()
  .typeError('Informe um valor numérico')
  .positive('O valor não pode ser neagtivo')
  .required('O valor é obrigatório')
}) 
export function Register() {
  const [transactionType, setTransactionType] = useState(''); /* useState para armazenar qual botão está selecionado, tendo o fundo e a cor de acordo com a seleção */
  const [categoryModalOpen, setCategoryModalOpen] = useState(false); /* estado para verificar se o modal está aberto ou não */


  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });

  const {control, handleSubmit, formState: { errors }} = useForm({
    resolver: yupResolver<any>(schema),
  });


  function handleTransactionTypeSelect(type: "up" | "down") {
    setTransactionType(type);
  }
  function handleOpenSelectCategoryModal(){
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal(){
    setCategoryModalOpen(false);
  }

  function handleRegister(form: FormData){
    if(!transactionType) /* Validação dos estads no qual se não tiver nada no transaction type ele retorna o alerta */
    return Alert.alert('Selecionte o tipo da transação');

    if(category.key === 'category') /* se a key de categoria ainda é category quer dizer que ele ainda não digitou nada */
    return Alert.alert('Selecionte a categoria');

    const data = {
      name: form.name,
      amount: form.amount,
      transactionType,
      category: category.key
    } 
    console.log(data);
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}> 
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <InputForm
          name="name"
          control={control} 
          placeholder="Nome"
          autoCapitalize="sentences"
          autoCorrect={false}
          error={errors.name && errors.name.message}

          />
          <InputForm
          name="amount"
          control={control} 
          placeholder="Preço" 
          keyboardType="numeric"
          error={errors.amount && errors?.amount.message}
    
          />
          <TranscationsTypes>
            <TransactionTypeButton
              type="up"
              title="Income"
              onPress={() => handleTransactionTypeSelect("up")}
              isActive={transactionType === "up"}
            />
            <TransactionTypeButton
              type="down"
              title="Outcome"
              onPress={() => handleTransactionTypeSelect("down")}
              isActive={transactionType === "down"}
            />
          </TranscationsTypes>

          <CategorySelectButton 
          title={category.name}
          onPress={handleOpenSelectCategoryModal}
          />
        </Fields>

        <Button 
        title="Enviar" 
        onPress={handleSubmit(handleRegister)}
        />
      </Form>
      <Modal visible={categoryModalOpen}>
        <CategorySelect 
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseSelectCategoryModal}
        
        />
      </Modal>
    </Container>
    </TouchableWithoutFeedback>
  );
}
