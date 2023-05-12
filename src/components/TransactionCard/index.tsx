import React from "react";
import { RectButtonProps } from "react-native-gesture-handler";

import {
  Container,
  Title,
  Amount,
  Footer,
  Category,
  Icon,
  CategoryName,
  Date,
  IconClose,
  IconButton,
  View,
} from "./styles";
import { categories } from "../../utils/categories";

interface Categories {
  name: string;
  icon: string;
}
export interface TransactionCardProps {
  type: "positive" | "negative";
  name: string;
  amount: string;
  category: string;
  date: string;
  id: string;
}

interface Props extends RectButtonProps {
  data: TransactionCardProps;
  exclude: (name: string, id: string) => void;
}

export function TransactionCard({ data, exclude }: Props) {
  const [category] = categories.filter((item) => item.key === data.category);

  return (
    <Container>
      <View>
        <Title>{data.name}</Title>

        <IconButton onPress={ () => {exclude(data.name, data.id), console.log('exclude')}} >
          <IconClose  name={"close"} />
        </IconButton>
      </View>

      <Amount type={data.type}>
        {data.type === "negative" && "- "}
        {data.amount}
      </Amount>

      <Footer>
        <Category>
          <Icon name={category.icon} />
          <CategoryName>{category.name}</CategoryName>
        </Category>

        <Date>{data.date}</Date>
      </Footer>
    </Container>
  );
}
