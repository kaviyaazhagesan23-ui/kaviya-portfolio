/** Project data. Edit text, links and order here. Only describe what is verified. */
export type ProjectStatus = 'implemented' | 'prototype'

export interface Project {
  id: string
  name: string
  title: string
  image: string
  status: ProjectStatus
  statusNote: string
  problem: string
  contribution: string[]
  tech: string[]
  /** Names from the skill catalog (src/lib/skillCatalog.ts) this project demonstrates. */
  skills: string[]
  github?: string
  demo?: string
  metric?: string
}

export const PROJECTS: Project[] = [
  {
    id: 'agriguard',
    name: 'AgriGuard',
    title: 'AI-Powered Paddy Price Forecasting & Smart Agriculture Decision Support System',
    status: 'implemented',
    statusNote: 'Interactive Streamlit application',
    problem: 'Helping decide whether to sell or wait by analysing historical paddy market prices and trends.',
    contribution: [
      'Built a data-driven decision-support application on historical paddy market-price data and forecasting workflows.',
      'Implemented data processing and feature engineering to analyse historical prices, market trends and forecasting features.',
      'Designed an interactive dashboard for price forecasting, market comparison and sell-or-wait support.',
    ],
    tech: ['Python', 'Machine Learning', 'Pandas', 'Streamlit', 'Data Visualization'],
    skills: ['Python', 'Machine learning', 'Pandas', 'Streamlit', 'Data visualization', 'Feature engineering', 'Forecasting'],
    github: 'https://github.com/kaviyaazhagesan23-ui/agriguard-agritech-ai-platform',
    image: '/images/projects/agriguard.png',
  },
  {
    id: 'resqnet',
    name: 'ResQnet',
    title: 'AI-Powered Road Accident Risk Prediction & Emergency Response System',
    status: 'implemented',
    statusNote: 'Full-stack application (React + FastAPI)',
    problem: 'Analysing road-accident risk across five custom zones of Tiruchirappalli and supporting emergency response.',
    contribution: [
      'Developed a machine-learning accident-risk analysis system covering five custom geographic zones.',
      'Integrated risk prediction, zone classification, weather information, interactive mapping, hospital discovery and ambulance routing.',
      'Evaluated the risk model on held-out test data.',
    ],
    tech: ['Python', 'Machine Learning', 'FastAPI', 'React', 'JavaScript', 'OpenStreetMap'],
    skills: ['Python', 'Machine learning', 'FastAPI', 'React', 'JavaScript', 'OpenStreetMap', 'REST APIs', 'Model evaluation'],
    github: 'https://github.com/kaviyaazhagesan23-ui/ResQNet-Road-Accident-Risk-Prediction-Emergency-Response-',

    metric: 'ROC-AUC 0.7835 on held-out test data',
    image: '/images/projects/resqnet.png',
  },
  {
    id: 'fairhire',
    name: 'FairHire',
    title: 'Explainable AI-Powered Resume Screening System',
    status: 'implemented',
    statusNote: 'Full-stack application; research paper presented and published at IECOM 2025',
    problem: 'Screening resumes against jobs while making model decisions inspectable.',
    contribution: [
      'Built a full-stack app with a React frontend, FastAPI backend, PDF resume processing and candidate record management.',
      'Implemented NLP-based resume classification and candidate-to-job matching for comparison and skills analysis.',
      'Used SHAP and LIME to investigate feature contributions to model predictions.',
    ],
    tech: ['Python', 'NLP', 'TF-IDF', 'Scikit-learn', 'SHAP', 'LIME', 'FastAPI', 'React'],
    github: 'https://github.com/kaviyaazhagesan23-ui/FairHire-Ai-Nexus',

    skills: ['Python', 'NLP', 'Scikit-learn', 'Explainable AI', 'FastAPI', 'React', 'REST APIs', 'Machine learning'],
  image: '/images/projects/fairhire.png',
  },
  {
    id: 'visionedit',
    name: 'VisionEdit AI',
    title: 'AI-Powered Image Editing & Object Manipulation',
    status: 'implemented',
    statusNote: 'Architecture and workflows in progress; not claimed production-ready',
    problem: 'Exploring text-guided object detection and AI-assisted editing in one interface.',
    contribution: [
      'Designed an application architecture integrating a React frontend with a Python FastAPI backend.',
      'Developed workflows for text-guided detection, object removal, replacement and image generation.',
      'Incorporated modern frontend interaction and visualization technologies.',
    ],
    tech: ['React', 'Vite', 'Python', 'FastAPI', 'Grounding DINO', 'Stable Diffusion'],
    github: 'https://github.com/kaviyaazhagesan23-ui/VisionEdit-AI',

    skills: ['React', 'Python', 'FastAPI', 'Computer vision', 'Generative AI'],
  image: '/images/projects/visionedit.png',
  },
]
