/**
 * Transparent skill catalog used by the JD analyzer.
 * level: verified = demonstrated in resume/projects; partial = related or coursework only;
 *        missing = known industry term that is NOT in the resume.
 */
export type Level = 'verified' | 'partial' | 'missing'
export interface CatalogEntry { name: string; aliases: string[]; level: Level; note: string }

const v = (name: string, aliases: string[], note: string): CatalogEntry => ({ name, aliases, level: 'verified', note })
const p = (name: string, aliases: string[], note: string): CatalogEntry => ({ name, aliases, level: 'partial', note })
const m = (name: string, aliases: string[]): CatalogEntry => ({ name, aliases, level: 'missing', note: 'Not listed in the resume.' })

export const SKILL_CATALOG: CatalogEntry[] = [
  v('Python', ['python'], 'Used across all four projects.'),
  v('SQL', ['sql'], 'Listed in resume skills.'),
  v('JavaScript', ['javascript', 'js', 'ecmascript'], 'Used in React projects.'),
  v('Machine learning', ['machine learning', 'ml', 'ai/ml'], 'AgriGuard, TrichyGuard, FairHire.'),
  v('Scikit-learn', ['scikit-learn', 'sklearn', 'scikit learn'], 'Resume skill; FairHire.'),
  v('XGBoost', ['xgboost'], 'Listed in resume skills.'),
  v('NLP', ['nlp', 'natural language processing', 'text mining'], 'FairHire AI.'),
  v('Model evaluation', ['model evaluation', 'roc-auc', 'auc', 'cross-validation', 'cross validation'], 'TrichyGuard ROC-AUC on held-out data.'),
  v('Explainable AI', ['explainable ai', 'xai', 'shap', 'lime', 'model interpretability'], 'FairHire AI uses SHAP and LIME.'),
  v('Feature engineering', ['feature engineering'], 'AgriGuard AI.'),
  v('Pandas', ['pandas'], 'AgriGuard AI; resume skill.'),
  v('NumPy', ['numpy'], 'Listed in resume skills.'),
  v('Data cleaning', ['data cleaning', 'data cleansing', 'data preparation', 'data wrangling', 'data preprocessing'], 'Listed in resume skills.'),
  v('Exploratory data analysis', ['exploratory data analysis', 'eda'], 'Listed in resume skills.'),
  v('Data visualization', ['data visualization', 'data visualisation', 'dashboards', 'dashboard'], 'AgriGuard dashboard.'),
  v('Streamlit', ['streamlit'], 'AgriGuard AI.'),
  v('React', ['react', 'react.js', 'reactjs'], 'TrichyGuard, FairHire, VisionEdit.'),
  v('HTML', ['html', 'html5'], 'Resume skill.'),
  v('CSS', ['css', 'css3', 'tailwind'], 'Resume skill.'),
  v('FastAPI', ['fastapi'], 'TrichyGuard, FairHire, VisionEdit.'),
  v('REST APIs', ['rest', 'rest api', 'rest apis', 'restful', 'api development'], 'FastAPI backends.'),
  v('Full-stack development', ['full stack', 'full-stack', 'fullstack'], 'React + FastAPI applications.'),
  v('MySQL', ['mysql'], 'Resume skill.'),
  v('Git', ['git', 'version control'], 'Resume skill.'),
  v('GitHub', ['github'], 'Resume skill.'),
  v('OpenStreetMap', ['openstreetmap', 'osm', 'gis', 'mapping'], 'TrichyGuard mapping.'),
  p('TypeScript', ['typescript'], 'JavaScript is verified; TypeScript is not listed on the resume.'),
  p('Statistics', ['statistics', 'statistical analysis', 'probability'], 'Coursework: University of London Probability & Statistics.'),
  p('Forecasting', ['forecasting', 'time series', 'time-series'], 'AgriGuard forecasting workflow; no formal time-series claims.'),
  p('Computer vision', ['computer vision', 'object detection', 'image processing'], 'VisionEdit AI is a prototype.'),
  p('Generative AI', ['generative ai', 'genai', 'stable diffusion', 'diffusion models'], 'VisionEdit AI prototype workflows.'),
  p('Deep learning', ['deep learning', 'neural networks', 'neural network'], 'Pretrained-model workflows only; no standalone deep-learning project.'),
  p('Algorithms', ['algorithms', 'data structures', 'dynamic programming'], 'Coursework: CU Boulder DP & Greedy Algorithms.'),
  p('PostgreSQL', ['postgresql', 'postgres'], 'SQL and MySQL are verified; PostgreSQL itself is not.'),
  p('Flask / Django', ['flask', 'django'], 'Related Python web framework (FastAPI), not the same.'),
  m('Docker', ['docker', 'containers', 'containerization']),
  m('Kubernetes', ['kubernetes', 'k8s']),
  m('AWS', ['aws', 'amazon web services']),
  m('Azure', ['azure']),
  m('Google Cloud', ['gcp', 'google cloud']),
  m('TensorFlow', ['tensorflow']),
  m('PyTorch', ['pytorch']),
  m('Keras', ['keras']),
  m('LLMs / RAG', ['llm', 'llms', 'rag', 'langchain', 'large language models']),
  m('MLOps / CI-CD', ['mlops', 'ci/cd', 'cicd', 'jenkins', 'github actions']),
  m('Java', ['java']),
  m('C++', ['c++']),
  m('Node.js', ['node.js', 'nodejs', 'node', 'express']),
  m('Next.js', ['next.js', 'nextjs']),
  m('MongoDB', ['mongodb']),
  m('Spark / Hadoop', ['spark', 'pyspark', 'hadoop']),
  m('Tableau', ['tableau']),
  m('Power BI', ['power bi', 'powerbi']),
  m('Excel', ['excel', 'advanced excel']),
  m('R', ['r programming', 'rstudio']),
]
