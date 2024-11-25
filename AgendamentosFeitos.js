import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';

export default function AgendamentosFeitos() {
  const [agendamentos, setAgendamentos] = useState([]);
  const route = useRoute();
  const navigation = useNavigation();

  // Recebe agendamentos ao navegar da tela NovoAgendamento
  useEffect(() => {
    if (route.params?.agendamentos) {
      setAgendamentos(route.params.agendamentos);
    }
  }, [route.params]);

  const handleRemoveAgendamento = (index) => {
    const updatedAgendamentos = agendamentos.filter((_, i) => i !== index);
    setAgendamentos(updatedAgendamentos);
  };

  const renderItem = ({ item, index }) => (
    <View style={{ marginBottom: 10, padding: 10, borderWidth: 1, borderRadius: 5 }}>
      <Text style={{ fontWeight: 'bold' }}>Nome: {item.nome}</Text>
      <Text style={{ fontWeight: 'bold' }}>Data: {item.data}</Text>
      <Text style={{ fontWeight: 'bold' }}>Horário: {item.horario}</Text>
      <TouchableOpacity onPress={() => handleRemoveAgendamento(index)}>
        <Text style={{ color: 'red' }}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View>
      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Agendamentos Feitos</Text>
      <FlatList
        data={agendamentos}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
      <Button title="Novo Agendamento" onPress={() => navigation.navigate('NovoAgendamento')} />
    </View>
  );
}
