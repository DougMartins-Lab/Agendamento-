import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NovoAgendamento from './screens/NovoAgendamento';
import AgendamentosFeitos from './screens/AgendamentosFeitos';

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="NovoAgendamento" component={NovoAgendamento} />
        <Tab.Screen name="AgendamentosFeitos" component={AgendamentosFeitos} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
