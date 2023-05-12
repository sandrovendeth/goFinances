import React, { useState, useEffect } from 'react';
import { Keyboard, Modal, TouchableWithoutFeedback, Alert } from 'react-native';
import * as Yup from 'yup';
import  AsyncStorage  from '@react-native-async-storage/async-storage';
import { useForm } from 'react-hook-form';
import uuid from 'react-native-uuid';
import { useNavigation } from '@react-navigation/native'
import { yupResolver } from '@hookform/resolvers/yup';


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
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { AppRoutesParamList } from '../../routes/app.routes';

interface FormData {
  [name: string]: any,

}

type RegisterNavigationProps = BottomTabNavigationProp<
  AppRoutesParamList, 
  "Cadastrar"
>;

const schema = Yup.object().shape({
  name: Yup /* Validação do atributo name */
  .string()
  .required('Nome é obrigatório!'), 
  amount: Yup /* Validação do atributo amount(valor) com o Yup */
  .number().transform((_value, originalValue) => Number(originalValue.replace(/,/, '.')))
  .typeError('Informe um valor numérico')
  .positive('O valor não pode ser negativo')
  .required('O valor é obrigatório'),
  
}) 
export function Register() {
  const [transactionType, setTransactionType] = useState(''); /* useState para armazenar qual botão está selecionado, tendo o fundo e a cor de acordo com a seleção */
  const [categoryModalOpen, setCategoryModalOpen] = useState(false); /* estado para verificar se o modal está aberto ou não */

  

  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria',
  });


  const {control, handleSubmit, reset, formState: { errors }} = useForm({
    resolver: yupResolver<any>(schema),
  });

  const navigation = useNavigation<RegisterNavigationProps>();

  function handleTransactionTypeSelect(type: "positive" | "negative") {
    setTransactionType(type);
  }
  function handleOpenSelectCategoryModal(){
    setCategoryModalOpen(true);
  }

  function handleCloseSelectCategoryModal(){
    setCategoryModalOpen(false);
  }

  async function handleRegister(form: FormData){ /* função assincrona para pidermos usarmos o await */
    if(!transactionType) /* Validação dos estads no qual se não tiver nada no transaction type ele retorna o alerta */
    return Alert.alert('Selecione o tipo da transação');

    if(category.key === 'category') /* se a key de categoria ainda é category quer dizer que ele ainda não digitou nada */
    return Alert.alert('Selecione a categoria');

    const newTransaction = {
      id: String(uuid.v4()), /* Bliblioteca UUID gera rash para os nossos ID's */
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date()
    } 
    try {   /* Estrutura de tratativas de erros, tenta executar algo e caso não dê certo teremos um catch e verificar o que deu errado, para nós verificarmos o erro daremos o console log e para o usuário um alert */

      const dataKey = '@gofinances:transactions';
      const data = await AsyncStorage.getItem(dataKey); /* Visto que o setitem substitui/sobrescereve os dados e não acrescenta, sempre teremos somente a última transção, sendo assim necessário recuperar todos os dados do asyncstorage */
      const currentData = data ? JSON.parse(data) : [];
      
      const dataFormatted = [ /* o objeto dataFormatted terá as transações já existentes mais a nova transação */
        newTransaction,
        ...currentData
        
      ];
      await AsyncStorage.setItem(dataKey, JSON.stringify(dataFormatted)); /* Para o armazenamento definiremos um chave (@gofinances:transactions), passando essa chave para o AsyncStorage com o setItem e dpos passamos o objeto, sendo necessãrio converter o objeto pra string para seu armazenamento (JSON.strinfy(dataFormated)). */

      reset(); /* reset do input */
      setTransactionType('');
      setCategory({
        key: 'category',
        name: 'Categoria'
      });

      navigation.navigate('Listagem');  /* Ao clicar em enviar irá voltar para a lista inicial */

    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível salvar")
      
    }
  }

  // useEffect(() => {  /* usaremos o useEffect para verificar os dados que estão sendo salvos no async storage,  recebendo dois parametros(função e array de dependência, como o campo de dependência será vazio, o useEffect vai ser disparado no momento de carregamento da interface. Visto que não podemos falar que o useEffect é uma função assincrona(await), devemos criar uma função assyncrona (async loadData) e através do useeffect usaremos esta função). Com a função assincrona, pegaremos (getitens) as informações com o (dataKey) */
  //   async function loadData(){
  //    const data = await AsyncStorage.getItem(dataKey);
  //    console.log(JSON.parse(data!)); /* json.parse transforma text para json */
  //   }

  //  loadData();
  // }, []);
  

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
          inputMode="decimal"
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
              onPress={() => handleTransactionTypeSelect("positive")}
              isActive={transactionType === "positive"}
            />
            <TransactionTypeButton
              type="down"
              title="Outcome"
              onPress={() => handleTransactionTypeSelect("negative")}
              isActive={transactionType === "negative"}
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
