import React, { useState } from 'react';
import { 
  StyleSheet, Text, View, ScrollView, StatusBar, 
  TouchableOpacity, Modal, TextInput, Alert 
} from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import weatherData from '../assets/data/well_breathe_cities.json';
import { Ionicons } from '@expo/vector-icons';

export default function Report() {
  const { cityName } = useLocalSearchParams();
  const router = useRouter();
  const city = weatherData.find(c => c.location_name === cityName);

  // --- ESTADOS PARA O SIMULADOR (POP-UP) ---
  const [modalVisible, setModalVisible] = useState(false);
  const [temp, setTemp] = useState('');
  const [hum, setHum] = useState('');
  const [wind, setWind] = useState('');
  const [precip, setPrecip] = useState('');
  const [vis, setVis] = useState('');
  const [result, setResult] = useState<string | null>(null);

  if (!city) return (
    <View style={styles.centered}>
      <Text>Cidade não encontrada</Text>
    </View>
  );

  // Motor de Inferência (Replica a lógica aprendida pela IA com 5 variáveis)
  const runSimulation = () => {
    const t = parseFloat(temp);
    const h = parseFloat(hum);
    const w = parseFloat(wind);
    const p = parseFloat(precip);
    const v = parseFloat(vis);

    if ([t, h, w, p, v].some(val => isNaN(val))) {
      Alert.alert("Erro de Entrada", "Preencha todos os campos com valores numéricos para prosseguir.");
      return;
    }

    // Lógica Multivariada (Simulando o Random Forest)
    let riscoFinal = 'Baixo';

    // 1. A chuva atua como lavagem atmosférica
    if (p > 2.0) {
      riscoFinal = 'Baixo';
    } 
    // 2. Visibilidade baixa em conjunto com calor indica retenção de partículas
    else if (v < 5 && t > 25) {
      riscoFinal = 'Elevado';
    }
    // 3. O clássico cenário de poluição: Calor + Secura + Ar Parado
    else if (t > 30 && h < 40 && w < 10) {
      riscoFinal = 'Elevado';
    }

    setResult(riscoFinal);
  };

  const getEpaInfo = (epa: number) => {
    const infos = [
      { label: 'N/A', color: '#BDC3C7' },
      { label: 'Bom', color: '#00E400' },
      { label: 'Moderado', color: '#FFFF00' },
      { label: 'Insalubre para Grupos Sensíveis', color: '#FF7E00' },
      { label: 'Insalubre', color: '#FF0000' },
      { label: 'Muito Insalubre', color: '#8F3F97' },
      { label: 'Perigoso', color: '#7E0023' },
    ];
    return infos[epa] || infos[0];
  };

  const DataCard = ({ title, data, color }: { title: string, data: any, color: string }) => {
    const epaInfo = getEpaInfo(data.epa);
    return (
      <View style={[styles.detailCard, { borderTopColor: color }]}>
        <Text style={[styles.cardTitle, { color }]}>{title}</Text>
        <Text style={styles.cardDate}>Data do registro: {data.date}</Text>
        
        <View style={styles.grid}>
          <View style={styles.gridRow}>
            <View style={styles.dataItem}>
              <Text style={styles.dataValue}>{data.pm25.toFixed(1)}</Text>
              <Text style={styles.dataLabel}>PM2.5</Text>
            </View>
            <View style={styles.dataItem}>
              <Text style={styles.dataValue}>{data.temp}°C</Text>
              <Text style={styles.dataLabel}>Temp</Text>
            </View>
            <View style={styles.dataItem}>
              <Text style={styles.dataValue}>{data.hum}%</Text>
              <Text style={styles.dataLabel}>Umid</Text>
            </View>
          </View>

          <View style={styles.gridRow}>
            <View style={styles.dataItem}>
              <Text style={styles.dataValue}>{data.wind}km/h</Text>
              <Text style={styles.dataLabel}>Vento</Text>
            </View>
            <View style={styles.dataItem}>
              <Text style={styles.dataValue}>{data.precip}mm</Text>
              <Text style={styles.dataLabel}>Chuva</Text>
            </View>
            <View style={styles.dataItem}>
              <Text style={styles.dataValue}>{data.vis}km</Text>
              <Text style={styles.dataLabel}>Visib.</Text>
            </View>
          </View>
        </View>

        <View style={[styles.epaBadgeInCard, { backgroundColor: epaInfo.color }]}>
          <Text style={[styles.epaTextInCard, { color: data.epa === 2 ? '#000' : '#FFF' }]}>
            Índice EPA {data.epa}: {epaInfo.label}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: 'Well-Breathe' }} />
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <Text style={styles.cityName}>{city.location_name}</Text>
        <Text style={styles.country}>{city.country}</Text>
        
        <View style={styles.locationContainer}>
          <Text style={styles.coords}>Latitude: {city.latitude}</Text>
          <Text style={styles.coordsSeparator}>|</Text>
          <Text style={styles.coords}>Longitude: {city.longitude}</Text>
        </View>
        
        <View style={styles.meanBadge}>
          <Text style={styles.meanLabel}>Média Anual de 2025</Text>
          <Text style={styles.meanValue}>{city.mean_pm25_2025} µg/m³</Text>
        </View>

        <TouchableOpacity 
          style={styles.clusterBadge}
          onPress={() => router.push({ pathname: '/cluster-info', params: { clusterName: city.cluster_name } })}
        >
          <Ionicons name="git-network-outline" size={16} color="#8E44AD" />
          <Text style={styles.clusterText}>{city.cluster_name}</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.simulatorBtn} 
          onPress={() => { setModalVisible(true); setResult(null); }}
        >
          <Ionicons name="options-outline" size={20} color="#FFF" />
          <Text style={styles.simulatorBtnText}>Simular Condições Hipotéticas</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <DataCard title="Pior Dia de 2025" data={city.worst_day} color="#E74C3C" />
        <DataCard title="Melhor Dia de 2025" data={city.best_day} color="#27AE60" />
      </View>

      <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Simulador de Risco</Text>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                <Ionicons name="close" size={28} color="#2C3E50" />
              </TouchableOpacity>
            </View>

            <ScrollView>
              <Text style={styles.inputLabel}>Temperatura (°C)</Text>
              <TextInput style={styles.input} keyboardType="numeric" value={temp} onChangeText={setTemp} placeholder="Ex: 30" />
              
              <Text style={styles.inputLabel}>Humidade (%)</Text>
              <TextInput style={styles.input} keyboardType="numeric" value={hum} onChangeText={setHum} placeholder="Ex: 25" />
              
              <Text style={styles.inputLabel}>Vento (km/h)</Text>
              <TextInput style={styles.input} keyboardType="numeric" value={wind} onChangeText={setWind} placeholder="Ex: 5" />

              <Text style={styles.inputLabel}>Precipitação (mm)</Text>
              <TextInput style={styles.input} keyboardType="numeric" value={precip} onChangeText={setPrecip} placeholder="Ex: 0" />

              <Text style={styles.inputLabel}>Visibilidade (km)</Text>
              <TextInput style={styles.input} keyboardType="numeric" value={vis} onChangeText={setVis} placeholder="Ex: 10" />

              <TouchableOpacity style={styles.calcBtn} onPress={runSimulation}>
                <Text style={styles.calcBtnText}>Analisar Condição Hipotética</Text>
              </TouchableOpacity>

              {result && (
                <View style={[styles.resultBox, { backgroundColor: result === 'Elevado' ? '#FDEDEC' : '#EAFAF1' }]}>
                  <Text style={[styles.resultText, { color: result === 'Elevado' ? '#E74C3C' : '#27AE60' }]}>
                    Risco {result}
                  </Text>
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { 
    padding: 25, 
    backgroundColor: '#2C3E50',
    paddingTop: 60
  },
  cityName: { fontSize: 28, fontWeight: 'bold', color: '#FFF', marginBottom: 5 },
  country: { fontSize: 16, color: '#BDC3C7', marginBottom: 10 },
  locationContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  coords: { fontSize: 13, color: '#95A5A6' },
  coordsSeparator: { marginHorizontal: 10, color: '#7F8C8D' },
  meanBadge: { 
    backgroundColor: '#3498DB', 
    padding: 15, 
    borderRadius: 15, 
    alignItems: 'center', 
    width: '100%' 
  },
  meanLabel: { color: '#FFF', fontSize: 10, textTransform: 'uppercase', fontWeight: 'bold' },
  meanValue: { color: '#FFF', fontSize: 26, fontWeight: 'bold', marginTop: 5 },
  clusterBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F3E5F5',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginTop: 15,
    width: '100%',
    borderWidth: 2,
    borderColor: '#8E44AD',
    gap: 8,
  },
  clusterText: {
    color: '#8E44AD',
    fontSize: 14,
    fontWeight: 'bold',
  },
  simulatorBtn: { 
    flexDirection: 'row', 
    backgroundColor: '#3498DB', 
    width: '100%', 
    padding: 15, 
    borderRadius: 15, 
    marginTop: 15, 
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  simulatorBtnText: { color: '#FFF', fontWeight: 'bold', marginLeft: 10 },
  content: { padding: 20 },
  detailCard: { backgroundColor: '#FFF', padding: 20, borderRadius: 20, marginBottom: 20, borderTopWidth: 6, elevation: 3 },
  cardTitle: { fontSize: 17, fontWeight: 'bold', marginBottom: 5, textAlign: 'center' },
  cardDate: { fontSize: 12, color: '#95A5A6', marginBottom: 15, textAlign: 'center' },
  grid: { marginTop: 5 },
  gridRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 15 },
  dataItem: { flex: 1, alignItems: 'center' },
  dataLabel: { fontSize: 9, color: '#7F8C8D', textTransform: 'uppercase', marginTop: 3 },
  dataValue: { fontSize: 16, fontWeight: 'bold', color: '#2C3E50' },
  epaBadgeInCard: { marginTop: 10, padding: 10, borderRadius: 10, alignItems: 'center' },
  epaTextInCard: { fontSize: 11, fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.6)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#FFF', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25, maxHeight: '80%' },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 22, fontWeight: 'bold', color: '#2C3E50' },
  inputLabel: { fontSize: 13, fontWeight: 'bold', color: '#34495E', marginBottom: 8, marginTop: 10 },
  input: { backgroundColor: '#F4F7F6', borderRadius: 12, padding: 15, borderWidth: 1, borderColor: '#EAECEE' },
  calcBtn: { backgroundColor: '#8E44AD', padding: 18, borderRadius: 15, alignItems: 'center', marginTop: 20 },
  calcBtnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  resultBox: { marginTop: 20, padding: 20, borderRadius: 15, alignItems: 'center', marginBottom: 20 },
  resultText: { fontSize: 18, fontWeight: 'bold' }
});