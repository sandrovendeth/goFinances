import React, { useContext, useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import { RFValue } from "react-native-responsive-fontsize";

import { useTheme } from "styled-components";

import AppleSvg from "../../assets/apple.svg";
import GoogleSvg from "../../assets/google.svg";
import LogoSvg from "../../assets/logo.svg";

import { useAuth } from "../../hooks/auth";

import { SignInSocialButton } from "../../components/SignInSocialButton";

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
} from "./styles";

export function SignIn() {
  const [isLoading, setIsLoading] = useState(false);

  const { signInWithGoogle, signInWithApple, user } = useAuth(); /* Hook useContext para usarmos o contexto que criamos */
  const theme = useTheme();

  async function handleSignInWithGoogle() {
    try {
      setIsLoading(true);
      return await signInWithGoogle();
      console.log("user", user.id);
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível conectar a conta Google");
    } finally {
      setIsLoading(false);
    }
  }
  async function handleSignInWithApple() {
    try {
      setIsLoading(true);
      return await signInWithApple();
      console.log("user", user.id);
    } catch (error) {
      console.log(error);
      Alert.alert("Não foi possível conectar a conta Apple");
    } finally {
      setIsLoading(false);
    }
  }
  return (
    <Container>
      <Header>
        <TitleWrapper>
          <LogoSvg width={RFValue(120)} height={RFValue(68)} />
          <Title>Controle suas {"\n"}finanças de forma muito simples</Title>
        </TitleWrapper>

        <SignInTitle>
          Faça seu login com {"\n"}umas das contas abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton
            svg={GoogleSvg}
            title="Entrar com Google"
            onPress={handleSignInWithGoogle}
          />
          <SignInSocialButton 
          svg={AppleSvg}
          title="Entrar com Apple"
          onPress={handleSignInWithApple}
          />
        </FooterWrapper>

        { isLoading && <ActivityIndicator color={theme.colors.shape} style={{ marginTop: 18}}/>}
      </Footer>
    </Container>
  );
}
