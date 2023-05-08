import React from 'react';
import { Platform } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'
import { useTheme } from 'styled-components';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const { Navigator, Screen } = createBottomTabNavigator<AppRoutesParamList>();

import { Dashboard } from '../screens/Dashboard';
import { Register } from '../screens/Register';


export type AppRoutesParamList = {
    Listagem: undefined;
    Cadastrar: undefined;
    Resumo: undefined;
}

export function AppRoutes(){
    const theme = useTheme();

    return(
        <Navigator
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: theme.colors.secondary, /* menu que tive selecioado ficara com a cor definida */
                tabBarInactiveTintColor: theme.colors.text, /* menu que não tiver com a cor selecionada */
                tabBarLabelPosition: 'beside-icon',
                tabBarStyle: {
                    height: 88,
                    paddingVertical: Platform.OS === 'ios' ? 20 : 0,
                }
            }}
        >
            <Screen 
                name="Listagem"
                component={Dashboard} /// Navigator será a parte de baixo da tela (bottomtabnavigator), o component irá definiar qual interface será renderizada ao clicar em 'listagem'
                options={{
                    tabBarIcon: (({ size, color }) => 
                        <MaterialIcons
                            name='format-list-bulleted'
                            size={size}
                            color={color}
                        />
                    )
                }}
            />

            <Screen 
                name="Cadastrar"
                component={Register} /// Navigator será a parte de baixo da tela (bottomtabnavigator), o component irá definiar qual interface será renderizada ao clicar em 'listagem'
                options={{
                    tabBarIcon: (({ size, color }) => 
                        <MaterialIcons
                            name='attach-money'
                            size={size}
                            color={color}
                        />
                    )
                }}
                
            />


           <Screen 
                name="Resumo"
                component={Register} /// Navigator será a parte de baixo da tela (bottomtabnavigator), o component irá definiar qual interface será renderizada ao clicar em 'listagem'
                options={{
                    tabBarIcon: (({ size, color }) => 
                        <MaterialIcons
                            name='pie-chart'
                            size={size}
                            color={color}
                        />
                    )
                }}
            />     
        </Navigator>
    )
}
