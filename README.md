# Well-Breathe

Sistema de monitoramento global de qualidade do ar com análise preditiva baseada em Machine Learning.

## Visão Geral

Well-Breathe é uma aplicação mobile fullstack que combina React Native com Python para análise de dados ambientais de 209 cidades ao redor do mundo. O projeto utiliza técnicas de ciência de dados para classificar perfis climáticos e prever riscos de poluição atmosférica.

<div align="center">
  <img src="https://github.com/user-attachments/assets/258bab0c-f619-4f5a-b997-87ea5e367069" width="300">
</div>

* Nota: Este projeto possui caráter estritamente exploratório e acadêmico. Seu objetivo central é o aprendizado de técnicas de Data Science e a viabilização técnica da integração entre modelos de Machine Learning e o desenvolvimento de sistemas. Portanto, os dados utilizados e os resultados apresentados não têm a pretensão de explicar a complexidade dos fenômenos atmosféricos reais, tampouco devem ser utilizados como base para decisões de saúde ou segurança, uma vez que se trata de uma simulação didática baseada em um recorte limitado de variáveis meteorológicas.

## Funcionalidades

### 1. Monitoramento de Cidades
- Visualização de 209 cidades globais com dados de qualidade do ar
- Sistema de busca inteligente com filtros em tempo real
- Contador dinâmico de resultados
- Listagem organizada alfabeticamente por país

### 2. Sistema de Favoritos
- Salvamento local de cidades favoritas usando AsyncStorage
- Persistência de dados entre sessões
- Interface dedicada para gerenciamento de favoritos
- Adição e remoção rápida de cidades

### 3. Relatórios Detalhados
- Análise comparativa de melhor e pior dia do ano por cidade
- Visualização de 6 variáveis ambientais: PM2.5, temperatura, umidade, vento, precipitação e visibilidade
- Badges coloridos com classificação EPA (Environmental Protection Agency)
- Coordenadas geográficas e média anual de PM2.5

### 4. Classificação por Clusters
- Agrupamento de cidades em 4 perfis climáticos distintos
- Descrição detalhada de cada cluster com características ambientais
- Recomendações específicas por tipo de perfil
- Visualização de badges identificadores

### 5. Simulador de Risco
- Motor de inferência baseado em Random Forest
- Análise preditiva com 5 variáveis: temperatura, umidade, vento, precipitação e visibilidade
- Resultado instantâneo de risco (Baixo/Elevado)
- Interface modal intuitiva para entrada de dados

## Tecnologias Utilizadas

### Frontend Mobile
- **React Native**: Framework principal para desenvolvimento mobile multiplataforma
- **Expo**: Plataforma para build e deploy simplificado
- **Expo Router**: Sistema de navegação baseado em arquivos
- **TypeScript**: Tipagem estática para maior segurança no código
- **AsyncStorage**: Persistência local de dados
- **Ionicons**: Biblioteca de ícones vetoriais

### Data Science e Machine Learning
- **Python 3.13**: Linguagem base para processamento de dados
- **Pandas 2.3.3**: Manipulação e análise de dataframes
- **Scikit-learn 1.8.0**: Framework de machine learning
- **K-Means Clustering**: Algoritmo para classificação de perfis climáticos
- **Random Forest**: Modelo de predição de risco de poluição
- **NumPy**: Computação numérica
- **Jupyter Lab**: Ambiente interativo para análise exploratória

### Ferramentas de Desenvolvimento
- **Git**: Controle de versão
- **VS Code**: Editor de código
- **Node.js**: Runtime JavaScript
- **npm**: Gerenciador de pacotes

### Dataset
- **Global Weather Repository**: Base de dados do Kaggle com 365 dias de informações meteorológicas de 2025 para mais de 200 cidades

## Etapas 

### Definição do Projeto
1. Escolha do tema: monitoramento de qualidade do ar global
2. Seleção do dataset: Global Weather Repository (Kaggle)
3. Definição do escopo: 209 cidades, 6 variáveis ambientais, análise de 2025
4. Planejamento da arquitetura: mobile + data science

### Configuração do Ambiente
1. Criação da estrutura de diretórios do projeto
2. Inicialização do projeto React Native com Expo
3. Configuração do ambiente virtual Python
4. Instalação de dependências: Pandas, Scikit-learn, Jupyter Lab
5. Setup do TypeScript e ESLint no mobile

### Processamento de Dados
1. **Extração e Exploração**
   - Download do dataset do Kaggle (GlobalWeatherRepository.csv)
   - Análise exploratória inicial com Jupyter Lab
   - Identificação de variáveis relevantes: PM2.5, temp, humidity, wind_kph, precip_mm, visibility

2. **Limpeza e Filtragem**
   - Filtro de dados do ano 2025
   - Remoção de valores nulos e outliers
   - Padronização de nomes de cidades e países
   - Cálculo de índice EPA baseado em PM2.5

3. **Agregação e Enriquecimento**
   - Cálculo de média anual de PM2.5 por cidade
   - Identificação do pior dia (maior PM2.5) com todas as variáveis
   - Identificação do melhor dia (menor PM2.5) com todas as variáveis
   - Criação de campos latitude e longitude

4. **Machine Learning - Clusterização**
   - Normalização de dados com StandardScaler
   - Aplicação de K-Means com 4 clusters
   - Análise de características de cada cluster
   - Nomeação dos clusters baseada em perfis identificados:
     - Clima Temperado Equilibrado (99 cidades)
     - Ambiente de Alta Visibilidade e Pureza (48 cidades)
     - Região de Alta Dispersão Eólica (8 cidades)
     - Zona Industrial com Alta Retenção (54 cidades)

5. **Machine Learning - Predição**
   - Treinamento de modelo Random Forest para classificação de risco
   - Feature engineering com 5 variáveis preditoras
   - Validação do modelo
   - Geração de predições para todas as cidades

6. **Exportação**
   - Geração de well_breathe_2025_full.csv (dados completos)
   - Geração de well_breathe_2025_ml.csv (dados para ML)
   - Geração de well_breathe_cities.json (otimizado para mobile)

## Estrutura de Arquivos

```
well-breathe/
├── mobile-app/
│   ├── app/
│   │   ├── index.tsx              # Tela inicial
│   │   ├── list.tsx               # Lista de cidades
│   │   ├── favorites.tsx          # Favoritos
│   │   ├── report.tsx             # Relatório detalhado
│   │   ├── cluster-info.tsx       # Info do cluster
│   │   ├── about.tsx              # Sobre o projeto
│   │   └── _layout.tsx            # Layout principal
│   ├── assets/
│   │   └── data/
│   │       └── well_breathe_cities.json  # Dados processados
│   └── package.json
├── data-science/
│   ├── notebooks/
│   │   ├── 01_data_cleaning_mobile_app.ipynb
│   │   └── 02_cluster_ia.ipynb
│   ├── dataset/
│   │   ├── GlobalWeatherRepository.csv
│   │   ├── well_breathe_2025_full.csv
│   │   └── well_breathe_2025_ml.csv
│   └── venv/
├── .gitignore
└── README.md
```

## Variáveis Analisadas

| Variável | Unidade | Descrição |
|----------|---------|-----------|
| PM2.5 | µg/m³ | Concentração de material particulado fino |
| Temperatura | °C | Temperatura média do ar |
| Umidade | % | Umidade relativa do ar |
| Vento | km/h | Velocidade do vento |
| Precipitação | mm | Índice pluviométrico |
| Visibilidade | km | Alcance visual atmosférico |
| EPA | 0-6 | Índice de qualidade do ar EPA |

## Clusters Identificados

| Cluster | Cidades | Características |
|---------|---------|-----------------|
| Clima Temperado Equilibrado | 99 | Condições moderadas e estáveis |
| Ambiente de Alta Visibilidade e Pureza | 48 | Excelente qualidade do ar |
| Região de Alta Dispersão Eólica | 8 | Ventos intensos, boa dispersão |
| Zona Industrial com Alta Retenção | 54 | Desafios de poluição atmosférica |

## Como Executar

### Pré-requisitos
- Node.js 18+ e npm/yarn
- Python 3.13+
- Expo CLI
- Git

### Instalação e Execução

#### 1. Clone o repositório
```bash
git clone https://github.com/pablonvsx/well-breathe.git
cd well-breathe
```

#### 2. Configurar Mobile App
```bash
cd mobile-app
npm install
npx expo start
```

Use o aplicativo Expo Go no seu smartphone ou um emulador para visualizar.

#### 3. Configurar Data Science (Opcional)
```bash
cd data-science
python -m venv venv
venv\Scripts\activate  # Windows
source venv/bin/activate  # Linux/Mac
pip install pandas scikit-learn jupyter numpy
jupyter lab
```

Execute os notebooks na ordem:
- `01_data_cleaning_mobile_app.ipynb`: Limpeza e preparação dos dados
- `02_cluster_ia.ipynb`: Clusterização e classificação

## Métricas do Projeto

| Métrica | Valor |
|---------|-------|
| Cidades Analisadas | 209 |
| Variáveis Ambientais | 6 |
| Dias de Dados | 365 (ano 2025) |
| Clusters de Classificação | 4 |
| Países Representados | 60+ |

## Resultados 

### Insights
- Identificação de 4 perfis climáticos distintos globalmente
- Correlação entre baixa visibilidade e alta concentração de PM2.5
- Impacto da precipitação na limpeza atmosférica
- Padrões de poluição em zonas industriais

### Habilidades
- Integração de React Native com pipelines de Data Science
- Processamento e análise de grandes volumes de dados
- Implementação de algoritmos de Machine Learning (K-Means, Random Forest)
- Design de interfaces mobile responsivas
- Persistência de dados com AsyncStorage
- Navegação em aplicações mobile com Expo Router

## Melhorias Futuras

- Redesenho da interface React Native
- Gráficos interativos com histórico temporal
- Implementação de backend Node.js com API REST
- Integração com APIs meteorológicas e sincronização de dados em tempo real
- Notificações push para alertas de qualidade do ar

## Autor

LinkedIn: [linkedin.com/in/pabloguilherme](https://linkedin.com/in/pabloguilherme/)  
GitHub: [github.com/pablonvsx](https://github.com/pablonvsx)
