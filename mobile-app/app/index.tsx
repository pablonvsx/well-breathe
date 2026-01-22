import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Home() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <Text style={styles.logo}>Well-Breathe</Text>
        <Text style={styles.tagline}>Monitoramento de Qualidade do Ar</Text>
        <Text style={styles.period}>Análise Global 2025</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.menu}>
          <Link href="/list" asChild>
            <TouchableOpacity style={styles.btn}>
              <Ionicons name="list" size={24} color="#FFF" />
              <View style={styles.btnContent}>
                <Text style={styles.btnText}>Cidades Monitoradas</Text>
                <Text style={styles.btnSubtext}>209 cidades disponíveis</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#FFF" />
            </TouchableOpacity>
          </Link>

          <Link href="/favorites" asChild>
            <TouchableOpacity style={styles.btn}>
              <Ionicons name="star" size={24} color="#FFF" />
              <View style={styles.btnContent}>
                <Text style={styles.btnText}>Cidades Favoritas</Text>
                <Text style={styles.btnSubtext}>Suas cidades selecionadas</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#FFF" />
            </TouchableOpacity>
          </Link>
          
          <Link href="/about" asChild>
            <TouchableOpacity style={styles.btn}>
              <Ionicons name="information-circle" size={24} color="#FFF" />
              <View style={styles.btnContent}>
                <Text style={styles.btnText}>Sobre o Projeto</Text>
                <Text style={styles.btnSubtext}>Tecnologias e metodologia</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#FFF" />
            </TouchableOpacity>
          </Link>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerInfo}>Dados: World Weather Repository (Kaggle)</Text>
          <Text style={styles.footerInfo}>Machine Learning: K-Means + Random Forest</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F8F9FA'
  },
  header: {
    backgroundColor: '#2C3E50',
    paddingTop: 80,
    paddingBottom: 40,
    paddingHorizontal: 30,
    alignItems: 'center'
  },
  logo: { 
    fontSize: 40, 
    fontWeight: '900', 
    color: '#FFF',
    marginBottom: 10
  },
  tagline: { 
    fontSize: 15, 
    color: '#BDC3C7', 
    textAlign: 'center',
    marginBottom: 8
  },
  period: {
    fontSize: 13,
    color: '#95A5A6',
    textAlign: 'center'
  },
  content: { 
    flex: 1, 
    justifyContent: 'space-between',
    padding: 25
  },
  menu: { 
    gap: 15,
    marginTop: 20
  },
  btn: { 
    backgroundColor: '#3498DB',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 15,
    elevation: 3
  },
  btnContent: {
    flex: 1,
    marginLeft: 15
  },
  btnText: { 
    color: '#FFF', 
    fontSize: 17, 
    fontWeight: 'bold',
    marginBottom: 2
  },
  btnSubtext: {
    color: '#BDC3C7',
    fontSize: 13
  },
  footer: { 
    alignItems: 'center',
    paddingVertical: 20
  },
  footerInfo: { 
    fontSize: 11, 
    color: '#95A5A6',
    marginTop: 4,
    textAlign: 'center'
  }
});