import React from 'react';
import { StyleSheet, Text, View, ScrollView, StatusBar } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Stack } from 'expo-router';

export default function About() {
  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: 'Well-Breathe' }} />
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Well-Breathe</Text>
        <Text style={styles.subtitle}>Sistema de Monitoramento de Qualidade do Ar</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="information-circle-outline" size={24} color="#3498DB" />
            <Text style={styles.sectionTitle}>Sobre o Projeto</Text>
          </View>
          <Text style={styles.text}>
            O Well-Breathe é uma aplicação desenvolvida para monitoramento e análise da qualidade do ar 
            em 209 cidades ao redor do mundo. O sistema utiliza dados históricos de 2025 para fornecer 
            insights sobre padrões climáticos e níveis de poluição atmosférica, auxiliando na tomada de 
            decisões relacionadas à saúde pública e planejamento urbano.
          </Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="code-slash-outline" size={24} color="#8E44AD" />
            <Text style={styles.sectionTitle}>Tecnologias Utilizadas</Text>
          </View>
          
          <View style={styles.techStack}>
            <View style={styles.techCategory}>
              <Text style={styles.techCategoryTitle}>Mobile App</Text>
              <View style={styles.techItem}>
                <View style={styles.bullet} />
                <Text style={styles.techText}>React Native com Expo</Text>
              </View>
              <View style={styles.techItem}>
                <View style={styles.bullet} />
                <Text style={styles.techText}>TypeScript para tipagem estática</Text>
              </View>
              <View style={styles.techItem}>
                <View style={styles.bullet} />
                <Text style={styles.techText}>AsyncStorage para persistência de dados</Text>
              </View>
              <View style={styles.techItem}>
                <View style={styles.bullet} />
                <Text style={styles.techText}>Expo Router para navegação</Text>
              </View>
            </View>

            <View style={styles.techCategory}>
              <Text style={styles.techCategoryTitle}>Ciência de Dados</Text>
              <View style={styles.techItem}>
                <View style={styles.bullet} />
                <Text style={styles.techText}>Python 3.13 para processamento</Text>
              </View>
              <View style={styles.techItem}>
                <View style={styles.bullet} />
                <Text style={styles.techText}>Pandas para manipulação de dados</Text>
              </View>
              <View style={styles.techItem}>
                <View style={styles.bullet} />
                <Text style={styles.techText}>Scikit-learn para Machine Learning</Text>
              </View>
              <View style={styles.techItem}>
                <View style={styles.bullet} />
                <Text style={styles.techText}>K-Means para clusterização</Text>
              </View>
            </View>

            <View style={styles.techCategory}>
              <Text style={styles.techCategoryTitle}>Backend</Text>
              <View style={styles.techItem}>
                <View style={styles.bullet} />
                <Text style={styles.techText}>Node.js para servidor</Text>
              </View>
              <View style={styles.techItem}>
                <View style={styles.bullet} />
                <Text style={styles.techText}>JSON para armazenamento de dados</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="layers-outline" size={24} color="#27AE60" />
            <Text style={styles.sectionTitle}>Processamento de Dados</Text>
          </View>
          
          <View style={styles.processStep}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Extração e Limpeza</Text>
              <Text style={styles.stepText}>
                Dataset original do Kaggle (Global Weather Repository) foi processado para extrair 
                dados do ano de 2025, removendo inconsistências e valores ausentes.
              </Text>
            </View>
          </View>

          <View style={styles.processStep}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Agregação por Cidade</Text>
              <Text style={styles.stepText}>
                Cálculo de médias anuais, identificação dos melhores e piores dias de cada cidade 
                baseado nos níveis de PM2.5 e outras variáveis meteorológicas.
              </Text>
            </View>
          </View>

          <View style={styles.processStep}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Clusterização com IA</Text>
              <Text style={styles.stepText}>
                Aplicação do algoritmo K-Means para classificar cidades em 4 perfis climáticos 
                distintos, considerando temperatura, umidade, PM2.5, precipitação, visibilidade e vento.
              </Text>
            </View>
          </View>

          <View style={styles.processStep}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>4</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Predição de Risco</Text>
              <Text style={styles.stepText}>
                Modelo Random Forest treinado para classificar cenários em risco elevado ou baixo, 
                disponível através do simulador interativo no app.
              </Text>
            </View>
          </View>

          <View style={styles.processStep}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>5</Text>
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>Exportação Otimizada</Text>
              <Text style={styles.stepText}>
                Dados transformados em formato JSON compacto e otimizado para consumo pelo aplicativo 
                móvel, garantindo performance e experiência fluida.
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="stats-chart-outline" size={24} color="#E74C3C" />
            <Text style={styles.sectionTitle}>Métricas do Dataset</Text>
          </View>
          
          <View style={styles.metricsGrid}>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>209</Text>
              <Text style={styles.metricLabel}>Cidades</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>6</Text>
              <Text style={styles.metricLabel}>Variáveis</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>365</Text>
              <Text style={styles.metricLabel}>Dias</Text>
            </View>
            <View style={styles.metricCard}>
              <Text style={styles.metricValue}>4</Text>
              <Text style={styles.metricLabel}>Clusters</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Desenvolvido como projeto acadêmico para análise de qualidade do ar e aplicação 
            de técnicas de Machine Learning em dados ambientais.
          </Text>
          <Text style={styles.footerYear}>2025</Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#F8F9FA' 
  },
  header: { 
    backgroundColor: '#2C3E50',
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 20,
    alignItems: 'center'
  },
  title: { 
    fontSize: 32, 
    fontWeight: 'bold', 
    color: '#FFF',
    marginBottom: 8
  },
  subtitle: { 
    fontSize: 14, 
    color: '#BDC3C7',
    textAlign: 'center'
  },
  content: { 
    padding: 20 
  },
  section: { 
    backgroundColor: '#FFF',
    borderRadius: 15,
    padding: 20,
    marginBottom: 15,
    elevation: 2
  },
  sectionHeader: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 15 
  },
  sectionTitle: { 
    fontSize: 18, 
    fontWeight: 'bold', 
    color: '#2C3E50',
    marginLeft: 10
  },
  text: { 
    fontSize: 13, 
    color: '#34495E', 
    lineHeight: 20,
    textAlign: 'justify'
  },
  techStack: { 
    gap: 15 
  },
  techCategory: { 
    marginBottom: 10 
  },
  techCategoryTitle: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    color: '#2C3E50',
    marginBottom: 8
  },
  techItem: { 
    flexDirection: 'row', 
    alignItems: 'flex-start',
    marginBottom: 6,
    paddingLeft: 10
  },
  bullet: { 
    width: 5, 
    height: 5, 
    borderRadius: 2.5, 
    backgroundColor: '#7F8C8D',
    marginTop: 5,
    marginRight: 10
  },
  techText: { 
    flex: 1,
    fontSize: 13, 
    color: '#34495E',
    lineHeight: 18
  },
  processStep: { 
    flexDirection: 'row',
    marginBottom: 15
  },
  stepNumber: { 
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#3498DB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12
  },
  stepNumberText: { 
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold'
  },
  stepContent: { 
    flex: 1 
  },
  stepTitle: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    color: '#2C3E50',
    marginBottom: 4
  },
  stepText: { 
    fontSize: 12, 
    color: '#34495E',
    lineHeight: 18,
    textAlign: 'justify'
  },
  metricsGrid: { 
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10
  },
  metricCard: { 
    flex: 1,
    minWidth: '45%',
    backgroundColor: '#F8F9FA',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8EAED'
  },
  metricValue: { 
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C3E50',
    marginBottom: 4
  },
  metricLabel: { 
    fontSize: 12,
    color: '#7F8C8D',
    textTransform: 'uppercase'
  },
  footer: { 
    marginTop: 20,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#E8EAED',
    alignItems: 'center'
  },
  footerText: { 
    fontSize: 12, 
    color: '#7F8C8D',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 10
  },
  footerYear: { 
    fontSize: 14,
    fontWeight: 'bold',
    color: '#95A5A6'
  }
});
