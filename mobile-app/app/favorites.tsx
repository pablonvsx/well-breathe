import React, { useState, useCallback } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, StatusBar } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useRouter, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import weatherData from '../assets/data/well_breathe_cities.json';

export default function Favorites() {
  const router = useRouter();
  const [favData, setFavData] = useState<any[]>([]);

  // Determina a cor baseada no valor PM2.5
  const getPM25Color = (pm25: number) => {
    if (pm25 <= 12) return '#00E400'; // Bom
    if (pm25 <= 35.4) return '#FFFF00'; // Moderado
    if (pm25 <= 55.4) return '#FF7E00'; // Ruim
    if (pm25 <= 150.4) return '#FF0000'; // Muito Ruim
    if (pm25 <= 250.4) return '#8F3F97'; // Péssimo
    return '#7E0023'; // Perigoso
  };

  const getPM25TextColor = (pm25: number) => {
    // Para amarelo (Moderado), usar texto escuro
    return (pm25 > 12 && pm25 <= 35.4) ? '#000' : '#FFF';
  };

  // READ: Carrega os favoritos
  const loadFavorites = async () => {
    const saved = await AsyncStorage.getItem('@favorites_v2');
    const favoritesList = saved ? JSON.parse(saved) : [];
    
    const fullData = favoritesList
      .map((fav: any) => {
        const cityDetails = weatherData.find(c => c.location_name === fav.name);
        if (!cityDetails) return null;
        return cityDetails;
      })
      .filter((item: any) => item !== null)
      .sort((a: any, b: any) => a.location_name.localeCompare(b.location_name));
    setFavData(fullData);
  };

  useFocusEffect(useCallback(() => { loadFavorites(); }, []));

  // DELETE: Remove cidade dos favoritos
  const removeFavorite = async (cityName: string) => {
    const saved = await AsyncStorage.getItem('@favorites_v2');
    let favoritesList = saved ? JSON.parse(saved) : [];
    favoritesList = favoritesList.filter((f: any) => f.name !== cityName);
    await AsyncStorage.setItem('@favorites_v2', JSON.stringify(favoritesList));
    loadFavorites();
  };

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Well-Breathe' }} />
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.headerSubtitle}>{favData.length} {favData.length === 1 ? 'cidade salva' : 'cidades salvas'}</Text>
      </View>

      <FlatList
        data={favData}
        keyExtractor={(item) => item.location_name}
        ListEmptyComponent={<Text style={styles.empty}>Nenhuma cidade favoritada.</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <TouchableOpacity 
              style={styles.infoContainer} 
              onPress={() => router.push({ pathname: '/report', params: { cityName: item.location_name } })}
            >
              <Text style={styles.cityName}>{item.location_name}</Text>
              <Text style={styles.countryName}>{item.country}</Text>
              {item.cluster_name && (
                <View style={styles.clusterBadge}>
                  <Ionicons name="git-network-outline" size={12} color="#9B59B6" />
                  <Text style={styles.clusterText}>{item.cluster_name}</Text>
                </View>
              )}
              <View style={[styles.pmBadge, { backgroundColor: getPM25Color(item.mean_pm25_2025) }]}>
                <Text style={[styles.pmMean, { color: getPM25TextColor(item.mean_pm25_2025) }]}>
                  PM2.5: {item.mean_pm25_2025.toFixed(2)} µg/m³
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => removeFavorite(item.location_name)}>
              <Ionicons name="trash-outline" size={24} color="#E74C3C" />
            </TouchableOpacity>
          </View>
        )}
        contentContainerStyle={{ padding: 15 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8F9FA' },
  header: {
    backgroundColor: '#2C3E50',
    paddingTop: 10,
    paddingHorizontal: 20,
    paddingBottom: 12
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#BDC3C7'
  },
  card: { 
    flexDirection: 'row', 
    backgroundColor: '#FFF', 
    padding: 18, 
    borderRadius: 12, 
    marginBottom: 12, 
    alignItems: 'center', 
    elevation: 3 
  },
  infoContainer: { flex: 1 },
  cityName: { fontSize: 18, fontWeight: 'bold' },
  countryName: { fontSize: 13, color: '#7F8C8D' },
  clusterBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3E5F5', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12, marginTop: 4, marginBottom: 4, alignSelf: 'flex-start', borderWidth: 1, borderColor: '#E1BEE7' },
  clusterText: { color: '#9B59B6', fontSize: 10, fontWeight: '600', marginLeft: 4 },
  pmBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, marginTop: 6, alignSelf: 'flex-start' },
  pmMean: { fontSize: 13, fontWeight: 'bold' },
  empty: { textAlign: 'center', marginTop: 50, color: '#888', fontSize: 16 }
});
