// Seu arquivo RootNavigator.js

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ActivityIndicator, View } from 'react-native';
import { Colors } from '../src/constants/theme';
import { useAuth } from '../context/AuthContext';

// Telas de Autenticação
import Login from '../screens/Auth/Login';
import Register from '../screens/Auth/Register';
import ForgotPassword from '../screens/Auth/ForgotPassword';

// Telas do Aplicativo Principal (com Abas)
import BottomTabNavigator from './BottomTabNavigator';
import Item from '../screens/Item';
import Notifications from '../screens/Notifications';
import Chat from '../screens/Chat';
import AddItem from '../screens/AddItem';
import Favorites from '../screens/Favorites';
import ProfileLoggedIn from '../screens/Auth/ProfileLoggedInScreen';
import ProfileNotLoggedIn from '../screens/Auth/ProfileNotLoggedInScreen';
import FeedbackAddItem from '../screens/FeedbackAddItem';

const Stack: any = createNativeStackNavigator();

// 1. Pilha para usuários logados
const AppStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="MainApp" component={BottomTabNavigator} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="AddItem" component={AddItem} />
        <Stack.Screen name="Favorites" component={Favorites} />
        <Stack.Screen name="Notifications" component={Notifications} />
        <Stack.Screen name="ProfileLoggedIn" component={ProfileLoggedIn} />
        <Stack.Screen name="FeedbackAddItem" component={FeedbackAddItem} />
        <Stack.Screen name="Item" component={Item} />
    </Stack.Navigator>
);

// 2. Pilha para usuários não logados, que podem navegar na home e em outras telas públicas
const PublicStack = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
        {/* A BottomTabNavigator como a primeira tela */}
        <Stack.Screen name="MainApp" component={BottomTabNavigator} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        {/* Adicione outras telas que podem ser acessadas sem login aqui, se necessário */}
        <Stack.Screen name="Item" component={Item} />
    </Stack.Navigator>
);

const RootNavigator = () => {
    const { user, isLoading } = useAuth();

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color={Colors.light.primary} />
            </View>
        );
    }

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            {user ? (
                // ✅ Se o usuário estiver logado, mostre o App Stack
                <Stack.Screen name="LoggedInFlow" component={AppStack} />
            ) : (
                // 🔒 Se o usuário não estiver logado, mostre o Public Stack
                <Stack.Screen name="PublicFlow" component={PublicStack} />
            )}
        </Stack.Navigator>
    );
};

export default RootNavigator;