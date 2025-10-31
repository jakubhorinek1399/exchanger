# Exchanger - Development Environment Setup

**Date:** 2025-10-31
**Status:** ✅ Complete and Ready for Development

---

## ✅ Installed Tools

### Core Development Tools

| Tool | Version | Status | Purpose |
|------|---------|--------|---------|
| **Node.js** | v24.9.0 | ✅ Installed | JavaScript runtime (LTS 20+ required) |
| **npm** | v11.6.1 | ✅ Installed | Package manager |
| **Git** | v2.50.1 | ✅ Installed | Version control |
| **GitHub CLI (gh)** | v2.82.1 | ✅ Installed | GitHub management |
| **Homebrew** | v4.6.16 | ✅ Installed | macOS package manager |
| **Docker** | v28.4.0 | ✅ Installed | Containerization (optional) |
| **VS Code** | v2.0.43 | ✅ Installed | Code editor |

---

## ✅ VS Code Extensions Installed

### 1. **ESLint** (v3.0.16)
- **ID:** `dbaeumer.vscode-eslint`
- **Purpose:** JavaScript/TypeScript linting
- **Features:** Real-time error detection, auto-fix on save

### 2. **Prettier** (v11.0.0)
- **ID:** `esbenp.prettier-vscode`
- **Purpose:** Code formatting
- **Features:** Auto-format on save, consistent code style

### 3. **Tailwind CSS IntelliSense** (v0.14.28)
- **ID:** `bradlc.vscode-tailwindcss`
- **Purpose:** Tailwind CSS autocomplete and syntax highlighting
- **Features:** Class name suggestions, hover previews, syntax highlighting

### 4. **GitLens** (v17.6.2)
- **ID:** `eamodio.gitlens`
- **Purpose:** Git supercharged
- **Features:** Blame annotations, commit history, repository insights

### 5. **Error Lens** (v3.26.0)
- **ID:** `usernamehw.errorlens`
- **Purpose:** Inline error/warning display
- **Features:** Highlights errors directly in code, no need to hover

---

## 🔧 Recommended VS Code Settings

Create or update `.vscode/settings.json` in your project:

```json
{
  // Editor
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "editor.tabSize": 2,
  "editor.insertSpaces": true,

  // Tailwind CSS
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"],
    ["cx\\(([^)]*)\\)", "(?:'|\"|`)([^']*)(?:'|\"|`)"]
  ],

  // Files
  "files.exclude": {
    "**/.git": true,
    "**/.DS_Store": true,
    "**/node_modules": true,
    "**/.next": true
  },

  // TypeScript
  "typescript.tsdk": "node_modules/typescript/lib",
  "typescript.enablePromptUseWorkspaceTsdk": true,

  // ESLint
  "eslint.validate": [
    "javascript",
    "javascriptreact",
    "typescript",
    "typescriptreact"
  ]
}
```

---

## 📦 Project Structure (To Be Created)

When we initialize the Next.js project, this structure will be created:

```
exchanger/
├── .git/                    # Git repository
├── .gitignore              # Git ignore file ✅
├── .vscode/                # VS Code settings (we'll create)
│   └── settings.json       # Project-specific settings
├── app/                    # Next.js App Router
│   ├── [id]/              # Dynamic share page
│   ├── dashboard/         # User dashboard
│   ├── pricing/           # Pricing page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/               # UI components (shadcn/ui)
│   └── shared/           # Shared components
├── lib/                  # Utility functions
│   ├── supabase/        # Supabase client
│   └── utils.ts         # Helper functions
├── public/              # Static assets
│   ├── images/         # Images
│   └── favicon.ico     # Favicon
├── styles/             # Global styles
│   └── globals.css     # Tailwind + custom CSS
├── types/              # TypeScript types
├── .env.local          # Environment variables (not committed)
├── next.config.js      # Next.js configuration
├── package.json        # Dependencies
├── tsconfig.json       # TypeScript configuration
├── tailwind.config.ts  # Tailwind configuration
├── PRODUCT_REQUIREMENTS.md  # PRD ✅
├── TECH_STACK_2025_UPDATES.md  # Tech analysis ✅
└── README.md           # Project documentation (to create)
```

---

## 🚀 Next Steps

### 1. Initialize Next.js Project
```bash
cd "/Users/jakubhorinek/Library/Mobile Documents/com~apple~CloudDocs/WebDev/qrsharingapp"
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir
```

### 2. Install Core Dependencies
```bash
npm install @supabase/supabase-js @supabase/ssr next-intl react-dropzone qrcode.react zod react-hook-form stripe @stripe/stripe-js
```

### 3. Install Dev Dependencies
```bash
npm install -D @types/node @types/react @types/react-dom
```

### 4. Install UI Dependencies
```bash
npm install clsx tailwind-merge @tailwindcss/typography @tailwindcss/forms
```

### 5. Set Up Supabase
- Create account at https://supabase.com
- Create new project
- Copy API keys to `.env.local`

### 6. Configure Tailwind CSS v4
- Update `tailwind.config.ts` with custom theme
- Add `@theme` directive in `globals.css`

### 7. Start Development Server
```bash
npm run dev
```

---

## 🔗 Important Links

### Documentation
- [Next.js 15 Docs](https://nextjs.org/docs)
- [React 19 Docs](https://react.dev/)
- [Tailwind CSS v4 Docs](https://tailwindcss.com/)
- [Supabase Docs](https://supabase.com/docs)
- [TypeScript Docs](https://www.typescriptlang.org/docs/)

### GitHub Repository
- **URL:** https://github.com/jakubhorinek1399/exchanger
- **Owner:** jakubhorinek1399
- **Visibility:** Public

### Local Project Path
```
/Users/jakubhorinek/Library/Mobile Documents/com~apple~CloudDocs/WebDev/qrsharingapp
```

---

## 💡 Quick Commands Reference

### Git Commands
```bash
# Check status
git status

# Add and commit changes
git add .
git commit -m "Your message"

# Push to GitHub
git push

# Pull latest changes
git pull

# Create new branch
git checkout -b feature-name

# View commit history
git log --oneline
```

### npm Commands
```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linting
npm run lint

# Run type checking
npm run type-check
```

### GitHub CLI Commands
```bash
# View repository
gh repo view

# Create pull request
gh pr create

# View issues
gh issue list

# Create new issue
gh issue create
```

---

## 🎯 Development Workflow

### Daily Workflow
1. **Pull latest changes**: `git pull`
2. **Create feature branch**: `git checkout -b feature-name`
3. **Write code** in VS Code
4. **Test locally**: `npm run dev`
5. **Commit changes**: `git add . && git commit -m "message"`
6. **Push to GitHub**: `git push`
7. **Create PR** (when ready): `gh pr create`

### Before Coding Session
- ✅ Open VS Code in project directory
- ✅ Run `git pull` to get latest changes
- ✅ Run `npm install` if `package.json` changed
- ✅ Start dev server with `npm run dev`

### After Coding Session
- ✅ Run `npm run lint` to check for errors
- ✅ Commit your changes
- ✅ Push to GitHub for backup

---

## 🛠️ Troubleshooting

### Port Already in Use
```bash
# If port 3000 is busy
npm run dev -- -p 3001
```

### Clear Cache
```bash
# Clear Next.js cache
rm -rf .next
npm run dev
```

### Node Modules Issues
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

### VS Code Extensions Not Working
```bash
# Reload VS Code
# Press: Cmd+Shift+P → "Developer: Reload Window"
```

---

## ✅ Setup Complete!

Your development environment is fully configured and ready for:
- ✅ Next.js 15.5 development
- ✅ React 19.2 with Server Components
- ✅ Tailwind CSS v4.0
- ✅ TypeScript development
- ✅ Git version control
- ✅ GitHub integration
- ✅ Professional code editing with VS Code

**You're ready to start building Exchanger! 🚀**

---

**Last Updated:** 2025-10-31
**Status:** Ready for Phase 1 Development
