import React from 'react';
import { StyleSheet, Text, View, ScrollView, StatusBar } from 'react-native';
import { useLocalSearchParams, Stack } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

type ClusterInfoData = {
  icon: string;
  color: string;
  bgColor: string;
  description: string;
  characteristics: string[];
  recommendations: string[];
};

type ClusterDataType = {
  [key: string]: ClusterInfoData;
};

export default function ClusterInfo() {
  const { clusterName } = useLocalSearchParams();

  const clusterData: ClusterDataType = {
    "Clima Temperado Equilibrado": {
      icon: "partly-sunny-outline",
      color: "#3498DB",
      bgColor: "#EBF5FB",
      description: "Regiões com clima moderado e equilibrado, caracterizadas por temperaturas agradáveis, umidade balanceada e boa dispersão de poluentes. Geralmente apresentam qualidade do ar favorável com PM2.5 em níveis aceitáveis.",
      characteristics: [
        "Temperaturas médias entre 15-25°C",
        "Umidade relativa equilibrada (40-70%)",
        "PM2.5 médio entre 20-30 µg/m³",
        "Boa visibilidade (>8 km)",
        "Ventos moderados facilitam dispersão",
        "Precipitação variável ao longo do ano"
      ],
      recommendations: [
        "Condições favoráveis para atividades ao ar livre",
        "Monitore índices em dias de baixa precipitação",
        "Atenção a variações sazonais",
        "Mantenha hábitos saudáveis de exercício",
        "Continue práticas de sustentabilidade",
        "Acompanhe previsões para planejar atividades"
      ]
    },
    "Ambiente de Alta Visibilidade e Pureza": {
      icon: "eye-outline",
      color: "#27AE60",
      bgColor: "#EAFAF1",
      description: "Regiões privilegiadas com excelente qualidade do ar, caracterizadas por alta visibilidade, baixíssimos níveis de poluição e condições atmosféricas muito favoráveis. Geralmente áreas com pouca industrialização e boa circulação de ar.",
      characteristics: [
        "PM2.5 muito baixo (<15 µg/m³)",
        "Visibilidade excelente (≥10 km)",
        "Ar limpo e puro constantemente",
        "Baixa concentração de poluentes",
        "Condições atmosféricas ideais",
        "Qualidade do ar superior às diretrizes OMS"
      ],
      recommendations: [
        "Ambiente ideal para todas as atividades",
        "Aproveite exercícios ao ar livre",
        "Continue preservando o meio ambiente",
        "Promova práticas sustentáveis locais",
        "Compartilhe boas práticas ambientais",
        "Mantenha vigilância para preservar qualidade"
      ]
    },
    "Regiao de Alta Dispersao Eolica": {
      icon: "thunderstorm-outline",
      color: "#F39C12",
      bgColor: "#FEF5E7",
      description: "Regiões com ventos fortes e constantes que promovem excelente dispersão de poluentes atmosféricos. Apesar de poder ter emissões, os ventos intensos mantêm a qualidade do ar em níveis aceitáveis através da rápida renovação atmosférica.",
      characteristics: [
        "Ventos intensos e constantes (>15 km/h)",
        "Rápida dispersão de poluentes",
        "PM2.5 moderado apesar de emissões",
        "Variações rápidas na qualidade do ar",
        "Baixa retenção de partículas",
        "Condições dinâmicas e mutáveis"
      ],
      recommendations: [
        "Aproveite períodos de ventos fortes",
        "Cuidado com poeira e partículas suspensas",
        "Proteja olhos e vias respiratórias em dias muito ventosos",
        "Acompanhe mudanças rápidas nas condições",
        "Evite atividades em dias sem vento",
        "Use proteção adequada ao ar livre"
      ]
    },
    "Zona Industrial com Alta Retencao": {
      icon: "business-outline",
      color: "#E74C3C",
      bgColor: "#FADBD8",
      description: "Regiões com alta concentração de poluentes devido à atividade industrial ou urbana intensa, combinada com condições que dificultam a dispersão (baixo vento, alta umidade). Requer atenção especial e monitoramento constante da qualidade do ar.",
      characteristics: [
        "PM2.5 elevado (>30 µg/m³)",
        "Alta retenção de poluentes",
        "Baixa dispersão atmosférica",
        "Ventos fracos ou ausentes",
        "Visibilidade frequentemente reduzida",
        "Qualidade do ar comprometida regularmente"
      ],
      recommendations: [
        "Evite atividades físicas intensas ao ar livre",
        "Use máscaras de proteção (N95/PFF2)",
        "Mantenha ambientes internos bem ventilados com filtros",
        "Monitore diariamente os índices de qualidade do ar",
        "Atenção especial a grupos vulneráveis",
        "Consulte médico em caso de sintomas respiratórios",
        "Apoie políticas de controle de emissões"
      ]
    },
    "Não Classificado": {
      icon: "help-circle-outline",
      color: "#95A5A6",
      bgColor: "#F2F3F4",
      description: "Regiões que não se encaixam nos padrões identificados pela análise de dados ou com características únicas que requerem avaliação individual. Pode indicar dados insuficientes ou padrões climáticos atípicos.",
      characteristics: [
        "Padrão climático único ou variável",
        "Dados insuficientes para classificação",
        "Características não identificadas pelos clusters",
        "Requer análise individual detalhada",
        "Possíveis condições atípicas",
        "Em processo de monitoramento"
      ],
      recommendations: [
        "Monitore os dados específicos da região",
        "Acompanhe atualizações do sistema",
        "Consulte índices locais de qualidade do ar",
        "Use como referência os dados diários",
        "Reporte observações locais se possível",
        "Aguarde classificação com mais dados"
      ]
    }
  };

  const currentCluster = clusterData[clusterName as string] || clusterData["Não Classificado"];

  return (
    <ScrollView style={styles.container}>
      <Stack.Screen options={{ title: 'Well-Breathe' }} />
      <StatusBar barStyle="light-content" />
      
      <View style={[styles.header, { backgroundColor: currentCluster.bgColor }]}>
        <Ionicons name={currentCluster.icon as any} size={60} color={currentCluster.color} />
        <Text style={[styles.title, { color: currentCluster.color }]}>{clusterName}</Text>
        <Text style={styles.subtitle}>Perfil Climático e de Qualidade do Ar</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="information-circle" size={24} color="#2C3E50" />
            <Text style={styles.sectionTitle}>Descrição</Text>
          </View>
          <Text style={styles.description}>{currentCluster.description}</Text>
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="stats-chart" size={24} color="#3498DB" />
            <Text style={styles.sectionTitle}>Características</Text>
          </View>
          {currentCluster.characteristics.map((item: string, index: number) => (
            <View key={index} style={styles.listItem}>
              <View style={[styles.bullet, { backgroundColor: currentCluster.color }]} />
              <Text style={styles.listText}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ionicons name="checkmark-circle" size={24} color="#27AE60" />
            <Text style={styles.sectionTitle}>Recomendações</Text>
          </View>
          {currentCluster.recommendations.map((item: string, index: number) => (
            <View key={index} style={styles.listItem}>
              <View style={[styles.bullet, { backgroundColor: currentCluster.color }]} />
              <Text style={styles.listText}>{item}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.infoBox, { borderColor: currentCluster.color, backgroundColor: currentCluster.bgColor }]}>
          <Text style={styles.infoText}>
            Estes perfis foram gerados através de análise de Machine Learning (K-Means) 
            utilizando dados de temperatura, umidade, PM2.5, precipitação, visibilidade e velocidade do vento de 2025.
          </Text>
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
    padding: 40, 
    alignItems: 'center',
    paddingTop: 60
  },
  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginTop: 15,
    textAlign: 'center'
  },
  subtitle: { 
    fontSize: 14, 
    color: '#7F8C8D',
    marginTop: 5,
    textAlign: 'center'
  },
  content: { 
    padding: 20 
  },
  section: { 
    backgroundColor: '#FFF', 
    borderRadius: 15, 
    padding: 20, 
    marginBottom: 20,
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
  description: { 
    fontSize: 13, 
    color: '#34495E', 
    lineHeight: 20,
    textAlign: 'justify'
  },
  listItem: { 
    flexDirection: 'row', 
    alignItems: 'flex-start', 
    marginBottom: 10 
  },
  bullet: { 
    width: 6, 
    height: 6, 
    borderRadius: 3, 
    marginTop: 5,
    marginRight: 10
  },
  listText: { 
    flex: 1, 
    fontSize: 12, 
    color: '#34495E', 
    lineHeight: 18,
    textAlign: 'justify'
  },
  infoBox: { 
    padding: 15, 
    borderRadius: 12, 
    borderWidth: 1,
    marginTop: 10
  },
  infoText: { 
    fontSize: 11, 
    color: '#5D6D7E',
    lineHeight: 17,
    textAlign: 'justify'
  }
});
