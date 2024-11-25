import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';

export default function NovoAgendamento() {
  const navigation = useNavigation();
  const [nome, setNome] = useState('');
  const [data, setData] = useState(new Date());
  const [horario, setHorario] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Lista de agendamentos, armazenada na memória para comparação
  const [agendamentos, setAgendamentos] = useState([]);

  // Função que verifica se o horário já está ocupado
  const isHorarioOcupado = (novoHorario) => {
    return agendamentos.some(agendamento => agendamento.horario === novoHorario);
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || data;
    setShowDatePicker(false);
    setData(currentDate);
  };

  const handleTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || horario;
    setShowTimePicker(false);
    setHorario(currentTime);
  };

  const handleSave = () => {
    const novoHorario = horario.toLocaleTimeString();

    // Verifica se o horário já está ocupado
    if (isHorarioOcupado(novoHorario)) {
      Alert.alert('Erro', 'Este horário já está agendado.');
      return;
    }

    if (!nome) {
      Alert.alert('Erro', 'Por favor, insira o nome do cliente.');
      return;
    }

    const agendamento = {
      nome,
      data: data.toLocaleDateString(),
      horario: novoHorario,
    };

    // Salva o agendamento e navega para a tela de agendamentos feitos
    setAgendamentos(prev => [...prev, agendamento]);
    navigation.navigate('AgendamentosFeitos', { agendamentos: [...agendamentos, agendamento] });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Novo Agendamento</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome do Cliente</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite o nome do cliente"
          value={nome}
          onChangeText={setNome}
        />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Data</Text>
        <Button title="Selecionar Data" onPress={() => setShowDatePicker(true)} />
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Horário</Text>
        <Button title="Selecionar Horário" onPress={() => setShowTimePicker(true)} />
      </View>

      <Button title="Salvar Agendamento" onPress={handleSave} />

      {showDatePicker && (
        <DateTimePicker
          value={data}
          mode="date"
          display="calendar"
          onChange={handleDateChange}
        />
      )}

      {showTimePicker && (
        <DateTimePicker
          value={horario}
          mode="time"
          display="spinner"
          onChange={handleTimeChange}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
});
