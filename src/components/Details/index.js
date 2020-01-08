import React from 'react';
import {
  Container,
  TypeTitle,
  TypeDescription,
  TypeImage,
  RequestButtom,
  RequestButtomText,
} from './styles';
import uberx from '../../assets/uberx.png';

export default function Details() {
  return (
    <Container>
      <TypeTitle>Popular</TypeTitle>
      <TypeDescription>Viagens baratas para o dia-a-dia</TypeDescription>

      <TypeImage source={uberx} />

      <TypeTitle>UberX</TypeTitle>
      <TypeDescription>R$ 10,00</TypeDescription>

      <RequestButtom onPress={() => {}}>
        <RequestButtomText>Solicitar UberX</RequestButtomText>
      </RequestButtom>
    </Container>
  );
}
