/**
 * Role presentations. These only change ORDER and EMPHASIS of verified content;
 * they never add skills or projects. The master data lives in the other config files.
 */
import { DEFAULT_ROLE, type RoleId } from '../lib/role'

export interface Profile {
  id: RoleId
  label: string
  headline: string
  summary: string
  cta: string
  projectOrder: string[]
  skillOrder: string[]
  achievementOrder: string[]
  projectFocus: Record<string, string>
  /** Skill-catalog names used by the JD analyzer to pick the closest role. */
  focusSkills: string[]
}

export interface ProfileOverride { baseRole: RoleId; projectOrder: string[] }

export const PROFILES: Record<RoleId, Profile> = {
  'ai-ml': {
    id: 'ai-ml',
    label: 'AI/ML Engineer',
    headline: 'Building intelligent systems that solve real-world problems.',
    summary:
      "I'm Kaviya, a Computer Science undergraduate specializing in AI and Machine Learning at SRMIST. I build data-driven applications that combine machine learning, explainable AI, and interactive full-stack experiences to address practical problems.",
    cta: 'See ML projects',
    projectOrder: ['agriguard', 'fairhire', 'trichyguard', 'visionedit'],
    skillOrder: ['ai-ml', 'programming', 'data', 'web', 'tools'],
    achievementOrder: ['iecom','sns', 'tnwise', 'protothon', 'smartathon', 'wec'],
    projectFocus: {
      agriguard: 'ML focus: feature engineering and a forecasting workflow.',
      fairhire: 'ML focus: NLP classification with SHAP/LIME explainability.',
      resqnet: 'ML focus: accident-risk model evaluated on held-out data.',
    },
    focusSkills: ['Machine learning', 'NLP', 'Scikit-learn', 'XGBoost', 'Model evaluation', 'Explainable AI', 'Computer vision', 'Generative AI', 'Deep learning'],
  },
  fullstack: {
    id: 'fullstack',
    label: 'Software / Full-Stack',
    headline: 'Building full-stack products that put intelligent systems to work.',
    summary:
      "I'm Kaviya, a Computer Science undergraduate who builds React and FastAPI applications backed by machine-learning services, from PDF processing and mapping to REST APIs and interactive interfaces.",
    cta: 'See full-stack projects',
    projectOrder: ['resqnet', 'visionedit', 'fairhire', 'agriguard'],
    skillOrder: ['web', 'programming', 'tools', 'ai-ml', 'data'],
    achievementOrder: ['iecom','protothon', 'sns', 'tnwise', 'smartathon', 'wec'],
    projectFocus: {
      resqnet: 'Full-stack focus: React map UI, FastAPI services, hospital discovery and routing.',
      visionedit: 'Full-stack focus: React + FastAPI architecture (prototype).',
      fairhire: 'Full-stack focus: React frontend, FastAPI backend, PDF processing, candidate records.',
    },
    focusSkills: ['React', 'FastAPI', 'JavaScript', 'REST APIs', 'HTML', 'CSS', 'Git', 'GitHub', 'MySQL', 'Full-stack development', 'TypeScript'],
  },
  data: {
    id: 'data',
    label: 'Data Analyst',
    headline: 'Turning raw data into clear, evidence-based decisions.',
    summary:
      "I'm Kaviya, a Computer Science undergraduate who cleans, explores and models data with Python, Pandas and SQL, and presents results through dashboards and clear visualizations.",
    cta: 'See data projects',
    projectOrder: ['agriguard', 'fairhire', 'resqnet', 'visionedit'],
    skillOrder: ['data', 'programming', 'ai-ml', 'tools', 'web'],
    achievementOrder: ['iecom','sns', 'tnwise', 'protothon', 'smartathon', 'wec'],
    projectFocus: {
      agriguard: 'Data focus: historical price analysis, trends and a sell-or-wait dashboard.',
      fairhire: 'Data focus: text feature extraction (TF-IDF) and feature-contribution analysis.',
      resqnet: 'Data focus: zone-level risk analysis and held-out model evaluation.',
    },
    focusSkills: ['Pandas', 'NumPy', 'SQL', 'MySQL', 'Data cleaning', 'Exploratory data analysis', 'Data visualization', 'Statistics', 'Forecasting', 'Python'],
  },
}

/** Returns the visible profile. An override only re-orders projects; it never changes master data. */
export function resolveProfile(role: RoleId, override: ProfileOverride | null): Profile {
  const base = PROFILES[override?.baseRole ?? role] ?? PROFILES[DEFAULT_ROLE]
  if (!override) return base
  const known = new Set(base.projectOrder)
  const ordered = override.projectOrder.filter((id) => known.has(id))
  const rest = base.projectOrder.filter((id) => !ordered.includes(id))
  return { ...base, projectOrder: [...ordered, ...rest] }
}
