import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity, StatusBar } from 'react-native';
import { useRouter, useFocusEffect, Stack } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import weatherData from '../assets/data/well_breathe_cities.json';

export default function List() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);

  // Recarrega favoritos toda vez que a tela é focada
  useFocusEffect(
    React.useCallback(() => {
      loadFavorites();
    }, [])
  );

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

  const loadFavorites = async () => {
    const saved = await AsyncStorage.getItem('@favorites_v2');
    if (saved) setFavorites(JSON.parse(saved).map((f: any) => f.name));
  };

  // CREATE/DELETE no CRUD de favoritos
  const toggleFavorite = async (cityName: string) => {
    const saved = await AsyncStorage.getItem('@favorites_v2');
    let favoritesList = saved ? JSON.parse(saved) : [];
    
    const isFavorited = favoritesList.some((f: any) => f.name === cityName);
    
    if (isFavorited) {
      // DELETE: Remove dos favoritos
      favoritesList = favoritesList.filter((f: any) => f.name !== cityName);
    } else {
      // CREATE: Adiciona aos favoritos com threshold padrão (OMS: 25)
      favoritesList.push({ name: cityName, threshold: 25 });
    }
    
    await AsyncStorage.setItem('@favorites_v2', JSON.stringify(favoritesList));
    loadFavorites();
  };

  const filteredData = weatherData
    .filter(item => item.location_name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.location_name.localeCompare(b.location_name));

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: 'Well-Breathe' }} />
      <StatusBar barStyle="light-content" />
      <View style={styles.header}>
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#7F8C8D" style={styles.searchIcon} />
          <TextInput 
            style={styles.searchInput} 
            placeholder="Buscar por nome da cidade ou país..." 
            placeholderTextColor="#95A5A6"
            value={search} 
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')} style={styles.clearButton}>
              <Ionicons name="close-circle" size={20} color="#95A5A6" />
            </TouchableOpacity>
          )}
        </View>
        <Text style={styles.resultsCount}>
          {filteredData.length} {filteredData.length === 1 ? 'cidade encontrada' : 'cidades encontradas'}
        </Text>
      </View>

      <FlatList
        data={filteredData}
        keyExtractor={(item) => item.location_name}
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
            <TouchableOpacity onPress={() => toggleFavorite(item.location_name)}>
              <Ionicons 
                name={favorites.includes(item.location_name) ? "star" : "star-outline"} 
                size={26} 
                color="#FFC107" 
              />
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
    paddingHorizontal: 15,
    paddingBottom: 12
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F9FA',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#E8EAED',
    paddingHorizontal: 10,
    height: 40
  },
  searchIcon: {
    marginRight: 6
  },
  searchInput: { 
    flex: 1,
    fontSize: 14,
    color: '#2C3E50',
    paddingVertical: 0
  },
  clearButton: {
    padding: 2,
    marginLeft: 2
  },
  resultsCount: {
    fontSize: 12,
    color: '#BDC3C7',
    marginTop: 8
  },
  card: { flexDirection: 'row', backgroundColor: '#FFF', padding: 18, borderRadius: 12, marginBottom: 12, alignItems: 'center', elevation: 3 },
  infoContainer: { flex: 1 },
  cityName: { fontSize: 18, fontWeight: 'bold' },
  countryName: { fontSize: 13, color: '#7F8C8D' },
  clusterBadge: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F3E5F5', paddingHorizontal: 8, paddingVertical: 3, borderRadius: 12, marginTop: 4, marginBottom: 4, alignSelf: 'flex-start', borderWidth: 1, borderColor: '#E1BEE7' },
  clusterText: { color: '#9B59B6', fontSize: 10, fontWeight: '600', marginLeft: 4 },
  pmBadge: { paddingHorizontal: 10, paddingVertical: 5, borderRadius: 8, marginTop: 6, alignSelf: 'flex-start' },
  pmMean: { fontSize: 13, fontWeight: 'bold' }
});