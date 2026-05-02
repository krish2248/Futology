# Contributing to FUTOLOGY

Thank you for your interest in contributing! This guide will help you get started.

## Development Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/YOUR_USERNAME/futology.git`
3. Install dependencies: `cd futology && npm install`
4. Copy environment file: `cp .env.example .env.local`
5. Run development server: `npm run dev`
6. Open [http://localhost:3000](http://localhost:3000)

## Branch Strategy

- `main` - Production-ready code, auto-deploys to GitHub Pages
- Feature branches: `feature/description` (e.g., `feature/add-search`)
- Bug fixes: `fix/description` (e.g., `fix/lint-warnings`)
- Documentation: `docs/description` (e.g., `docs/update-readme`)

## Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new feature
fix: bug fix
docs: documentation changes
test: adding tests
refactor: code refactoring
style: formatting changes
chore: build process or auxiliary tool changes
```

## Pull Request Process

1. Create a feature branch from `main`
2. Make your changes with clear, atomic commits
3. Add tests if applicable
4. Ensure `npm run lint` and `npm run build:export` pass
5. Push to your fork and create a PR to `krish2248/futology:main`
6. Fill out the PR template with clear description
7. Link any related issues (e.g., "Closes #5")

## Code Standards

- **TypeScript strict mode** - No `any` types, no `@ts-ignore`
- **ESLint** - Run `npm run lint` before committing
- **Formatting** - LF line endings (Git handles CRLF conversion)
- **Components** - Use functional components with hooks
- **Naming** - PascalCase for components, camelCase for functions/variables
- **Dark mode only** - `#0A0A0A` background, no theme toggle

## Testing

```bash
# Run E2E tests (requires Playwright)
npx playwright test

# Run lint
npm run lint

# Type check
npx tsc --noEmit

# Build check
npm run build:export
```

## Issue Reporting

- Check existing issues before creating new ones
- Use clear, descriptive titles
- Include steps to reproduce for bugs
- Add relevant labels (bug, enhancement, docs, etc.)

## Questions?

Feel free to open a discussion or reach out via GitHub issues.

---

**Remember: Every contribution matters, no matter how small!** 🚀
