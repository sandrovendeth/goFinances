import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { AuthRoutes } from './auth.routes';
import { AppRoutes } from './app.routes';

import { useAuth } from '../hooks/auth';


export function Routes(){
    const { user } = useAuth(); /* verificação se o usuário ta autenticado ou não, se tiver alguma coisa no user significad que está autenticada, se não, não está autenticado */

    console.log(user)
    return(
        <NavigationContainer>
            {user.id ? <AppRoutes /> : <AuthRoutes />}
        </NavigationContainer>
    );
}