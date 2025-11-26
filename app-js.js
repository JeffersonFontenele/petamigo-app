import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  StatusBar,
} from 'react-native';

// Dados de exemplo
const agendamentosData = [
  { id: 1, pet: 'Thor', servico: 'Banho + Tosa', hora: '09:00', status: 'confirmado' },
  { id: 2, pet: 'Luna', servico: 'Banho', hora: '10:30', status: 'confirmado' },
  { id: 3, pet: 'Bob', servico: 'Tosa Higiênica', hora: '14:00', status: 'pendente' },
];

const petsData = [
  { id: 1, nome: 'Thor', raca: 'Golden Retriever', tutor: 'Maria Silva', tel: '(61) 99999-1234' },
  { id: 2, nome: 'Luna', raca: 'Shih Tzu', tutor: 'João Santos', tel: '(61) 98888-5678' },
  { id: 3, nome: 'Bob', raca: 'Poodle', tutor: 'Ana Costa', tel: '(61) 97777-9012' },
];

// Tela Inicial
const HomeScreen = () => (
  <ScrollView style={styles.content}>
    <View style={styles.header}>
      <Text style={styles.dateText}>Terça, 26 de Novembro</Text>
      <Text style={styles.welcomeText}>Olá, Pet Amigo! 🐾</Text>
    </View>

    <View style={styles.cardsRow}>
      <View style={[styles.card, styles.cardBlue]}>
        <Text style={styles.cardIcon}>📅</Text>
        <Text style={styles.cardNumber}>3</Text>
        <Text style={styles.cardLabel}>Agendamentos hoje</Text>
      </View>
      <View style={[styles.card, styles.cardGreen]}>
        <Text style={styles.cardIcon}>🐕</Text>
        <Text style={styles.cardNumber}>47</Text>
        <Text style={styles.cardLabel}>Pets cadastrados</Text>
      </View>
    </View>

    <View style={styles.sectionHeader}>
      <Text style={styles.sectionTitle}>Próximos Atendimentos</Text>
      <Text style={styles.sectionLink}>Ver todos</Text>
    </View>

    {agendamentosData.map(ag => (
      <View key={ag.id} style={styles.listItem}>
        <View style={styles.listItemIcon}>
          <Text style={{fontSize: 24}}>🐕</Text>
        </View>
        <View style={styles.listItemContent}>
          <Text style={styles.listItemTitle}>{ag.pet}</Text>
          <Text style={styles.listItemSubtitle}>{ag.servico}</Text>
        </View>
        <View style={styles.listItemRight}>
          <Text style={styles.listItemTime}>{ag.hora}</Text>
          <View style={[styles.statusBadge, ag.status === 'confirmado' ? styles.statusConfirmado : styles.statusPendente]}>
            <Text style={[styles.statusText, ag.status === 'confirmado' ? styles.statusTextConfirmado : styles.statusTextPendente]}>
              {ag.status}
            </Text>
          </View>
        </View>
      </View>
    ))}

    <TouchableOpacity style={styles.primaryButton}>
      <Text style={styles.primaryButtonText}>+ Novo Agendamento</Text>
    </TouchableOpacity>
  </ScrollView>
);

// Tela de Pets
const PetsScreen = () => (
  <ScrollView style={styles.content}>
    <View style={styles.petsHeader}>
      <Text style={styles.pageTitle}>Pets Cadastrados</Text>
      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+</Text>
      </TouchableOpacity>
    </View>

    <TextInput
      style={styles.searchInput}
      placeholder="Buscar pet ou tutor..."
      placeholderTextColor="#999"
    />

    {petsData.map(pet => (
      <View key={pet.id} style={styles.petItem}>
        <View style={styles.petIcon}>
          <Text style={{fontSize: 28}}>🐕</Text>
        </View>
        <View style={styles.petInfo}>
          <Text style={styles.petName}>{pet.nome}</Text>
          <Text style={styles.petRaca}>{pet.raca}</Text>
          <Text style={styles.petTutor}>👤 {pet.tutor}</Text>
        </View>
        <TouchableOpacity style={styles.phoneButton}>
          <Text>📞</Text>
        </TouchableOpacity>
      </View>
    ))}
  </ScrollView>
);

// Tela de Agenda
const AgendaScreen = () => {
  const dias = ['Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
  const horarios = ['09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00'];
  const ocupados = { '09:00': 'Thor - Banho + Tosa', '10:00': 'Luna - Banho', '14:00': 'Bob - Tosa Higiênica' };

  return (
    <ScrollView style={styles.content}>
      <Text style={styles.pageTitle}>Agenda</Text>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.diasContainer}>
        {dias.map((dia, i) => (
          <View key={dia} style={[styles.diaItem, i === 1 && styles.diaItemAtivo]}>
            <Text style={[styles.diaTexto, i === 1 && styles.diaTextoAtivo]}>{dia}</Text>
            <Text style={[styles.diaNumero, i === 1 && styles.diaTextoAtivo]}>{25 + i}</Text>
          </View>
        ))}
      </ScrollView>

      {horarios.map(hora => (
        <View key={hora} style={styles.horarioRow}>
          <Text style={styles.horarioTexto}>{hora}</Text>
          <View style={[styles.horarioSlot, ocupados[hora] ? styles.slotOcupado : styles.slotLivre]}>
            <Text style={ocupados[hora] ? styles.slotTextoOcupado : styles.slotTextoLivre}>
              {ocupados[hora] || 'Disponível'}
            </Text>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

// App Principal
export default function App() {
  const [screen, setScreen] = useState('home');

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Header */}
      <View style={styles.appHeader}>
        <Text style={styles.appLogo}>🐾</Text>
        <Text style={styles.appTitle}>PetAmigo</Text>
      </View>

      {/* Conteúdo */}
      {screen === 'home' && <HomeScreen />}
      {screen === 'pets' && <PetsScreen />}
      {screen === 'agenda' && <AgendaScreen />}

      {/* Menu Inferior */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => setScreen('home')}>
          <Text style={styles.navIcon}>🏠</Text>
          <Text style={[styles.navText, screen === 'home' && styles.navTextAtivo]}>Início</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setScreen('agenda')}>
          <Text style={styles.navIcon}>📅</Text>
          <Text style={[styles.navText, screen === 'agenda' && styles.navTextAtivo]}>Agenda</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem} onPress={() => setScreen('pets')}>
          <Text style={styles.navIcon}>🐕</Text>
          <Text style={[styles.navText, screen === 'pets' && styles.navTextAtivo]}>Pets</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Text style={styles.navIcon}>⚙️</Text>
          <Text style={styles.navText}>Config</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f5f5f5' },
  appHeader: { backgroundColor: '#3b82f6', padding: 16, flexDirection: 'row', alignItems: 'center' },
  appLogo: { fontSize: 24, marginRight: 8 },
  appTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  content: { flex: 1, padding: 16 },
  header: { marginBottom: 20 },
  dateText: { color: '#666', fontSize: 14 },
  welcomeText: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  cardsRow: { flexDirection: 'row', gap: 12, marginBottom: 20 },
  card: { flex: 1, padding: 16, borderRadius: 16 },
  cardBlue: { backgroundColor: '#3b82f6' },
  cardGreen: { backgroundColor: '#22c55e' },
  cardIcon: { fontSize: 24, marginBottom: 8 },
  cardNumber: { color: '#fff', fontSize: 28, fontWeight: 'bold' },
  cardLabel: { color: 'rgba(255,255,255,0.9)', fontSize: 12 },
  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '600', color: '#333' },
  sectionLink: { color: '#3b82f6', fontSize: 14 },
  listItem: { backgroundColor: '#fff', padding: 16, borderRadius: 12, flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  listItemIcon: { width: 48, height: 48, backgroundColor: '#fed7aa', borderRadius: 24, justifyContent: 'center', alignItems: 'center' },
  listItemContent: { flex: 1, marginLeft: 12 },
  listItemTitle: { fontSize: 16, fontWeight: '600', color: '#333' },
  listItemSubtitle: { fontSize: 14, color: '#666' },
  listItemRight: { alignItems: 'flex-end' },
  listItemTime: { fontSize: 16, fontWeight: '600', color: '#333' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12, marginTop: 4 },
  statusConfirmado: { backgroundColor: '#dcfce7' },
  statusPendente: { backgroundColor: '#fef9c3' },
  statusText: { fontSize: 12 },
  statusTextConfirmado: { color: '#16a34a' },
  statusTextPendente: { color: '#ca8a04' },
  primaryButton: { backgroundColor: '#3b82f6', padding: 16, borderRadius: 12, alignItems: 'center', marginTop: 10 },
  primaryButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  petsHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 },
  pageTitle: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  addButton: { backgroundColor: '#3b82f6', width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  addButtonText: { color: '#fff', fontSize: 20 },
  searchInput: { backgroundColor: '#e5e5e5', padding: 12, borderRadius: 12, marginBottom: 16, fontSize: 16 },
  petItem: { backgroundColor: '#fff', padding: 16, borderRadius: 12, flexDirection: 'row', alignItems: 'center', marginBottom: 10 },
  petIcon: { width: 56, height: 56, backgroundColor: '#e9d5ff', borderRadius: 28, justifyContent: 'center', alignItems: 'center' },
  petInfo: { flex: 1, marginLeft: 12 },
  petName: { fontSize: 16, fontWeight: '600', color: '#333' },
  petRaca: { fontSize: 14, color: '#666' },
  petTutor: { fontSize: 12, color: '#999', marginTop: 4 },
  phoneButton: { backgroundColor: '#dcfce7', width: 36, height: 36, borderRadius: 18, justifyContent: 'center', alignItems: 'center' },
  diasContainer: { marginBottom: 16 },
  diaItem: { width: 56, paddingVertical: 12, borderRadius: 12, backgroundColor: '#e5e5e5', alignItems: 'center', marginRight: 8 },
  diaItemAtivo: { backgroundColor: '#3b82f6' },
  diaTexto: { fontSize: 12, color: '#666' },
  diaNumero: { fontSize: 16, fontWeight: 'bold', color: '#666' },
  diaTextoAtivo: { color: '#fff' },
  horarioRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 8 },
  horarioTexto: { width: 50, fontSize: 14, color: '#999' },
  horarioSlot: { flex: 1, padding: 12, borderRadius: 8 },
  slotOcupado: { backgroundColor: '#dbeafe', borderLeftWidth: 4, borderLeftColor: '#3b82f6' },
  slotLivre: { backgroundColor: '#f5f5f5', borderWidth: 1, borderColor: '#ddd', borderStyle: 'dashed' },
  slotTextoOcupado: { color: '#333', fontWeight: '500' },
  slotTextoLivre: { color: '#999' },
  bottomNav: { flexDirection: 'row', backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#e5e5e5', paddingVertical: 10 },
  navItem: { flex: 1, alignItems: 'center' },
  navIcon: { fontSize: 22 },
  navText: { fontSize: 12, color: '#999', marginTop: 4 },
  navTextAtivo: { color: '#3b82f6' },
});
