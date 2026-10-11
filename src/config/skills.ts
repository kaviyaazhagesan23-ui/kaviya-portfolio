export interface SkillCategory { id: string; title: string; items: string[] }

export const SKILL_CATEGORIES: SkillCategory[] = [
  { id: 'programming', title: 'Programming', items: ['Python', 'SQL', 'JavaScript'] },
  { id: 'ai-ml', title: 'AI & Machine Learning', items: ['Scikit-learn', 'XGBoost', 'NLP', 'Model evaluation'] },
  { id: 'data', title: 'Data Analysis', items: ['Pandas', 'NumPy', 'Data cleaning', 'Exploratory data analysis'] },
  { id: 'web', title: 'Web Development', items: ['React', 'HTML', 'CSS', 'FastAPI', 'REST APIs'] },
  { id: 'tools', title: 'Databases & Tools', items: ['MySQL', 'Git', 'GitHub'] },
]
