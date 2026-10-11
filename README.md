# Kaviya A. — Portfolio (React + Vite + TypeScript + Tailwind + Framer Motion)

## Run on Windows
1. Install **Node.js LTS** (https://nodejs.org) and **VS Code** (https://code.visualstudio.com). Optionally **Git** (https://git-scm.com).
2. Right-click the ZIP → *Extract All…*, then in VS Code: *File → Open Folder* → `kaviya-portfolio`.
3. Open the terminal (*Terminal → New Terminal*) and run:
```
npm install
npm run dev
```
4. Open the address shown (usually http://localhost:5173).
- Tests: `npm test` · Production build: `npm run build` · Preview build: `npm run preview`
- `npm install` creates `package-lock.json` — commit it to GitHub.

## Role URLs
`/?role=ai-ml` (default) · `/?role=fullstack` · `/?role=data`. Invalid values fall back to AI/ML. Refreshing keeps the role.

## Job-description analyzer (private)
Open `/?tools=jd`. Paste a JD → Analyze → review matched / partial / missing skills and project reasons → **Apply to this view** (this tab only; refresh or Reset undoes it). It is deterministic keyword matching against `src/lib/skillCatalog.ts`, not AI. To make a permanent tailored version, edit `projectOrder` in `src/config/profiles.ts`.

## Edit your content
| What | File |
|---|---|
| Email, phone (`showPhone`), GitHub, LinkedIn, intro, About text | `src/config/site.ts` |
| Projects, links, status (implemented / prototype) | `src/config/projects.ts` |
| Skills | `src/config/skills.ts` (+ analyzer catalog `src/lib/skillCatalog.ts`) |
| Achievements, education, certifications | `src/config/achievements.ts` |
| Role headlines, project/skill order | `src/config/profiles.ts` |

**Photo:** replace `public/images/kaviya.jpg` (same name). **Resume:** put your PDF at `public/resume/Kaviya_A_Resume.pdf`; the button activates automatically. **LinkedIn:** paste the URL in `site.ts`. **Project demo links:** add `demo:` / `github:` in `projects.ts`.

## Deploy
GitHub: create an empty repo on github.com, then in the terminal: `git init`, `git add .`, `git commit -m "Portfolio"`, `git branch -M main`, `git remote add origin <your-repo-url>`, `git push -u origin main`.
Vercel: sign in at vercel.com with GitHub → *Add New → Project* → import the repo → Framework *Vite* → Deploy. Every `git push` to `main` redeploys.

## Offline vs online
Works offline after install: everything (fonts are system fonts, no CDN). Needs internet: `npm install`, GitHub/LinkedIn links, deployment. Speech narration uses your browser's built-in voices (some browsers need internet for voices).

## Windows troubleshooting
- `npm` not recognized → reinstall Node.js, restart VS Code.
- Scripts disabled in PowerShell → use Command Prompt, or run `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`.
- Port busy → `npm run dev -- --port 5180`.
- Broken install → delete `node_modules`, run `npm install` again.

## Notes on honesty
Projects are marked Implemented or Prototype. Graphics are labelled illustrations, not screenshots. No metrics beyond TrichyGuard's ROC-AUC 0.7835 are shown.

## Voice narration
Edit the spoken script in `src/config/site.ts` (`narration`, one short sentence per line). The browser picks the best English voice it offers (preferring natural/neural en-IN or en-US voices); quality depends on your browser and operating system.
