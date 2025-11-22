# Kumlawdi Website

A modern website built with Astro, Tailwind CSS, and Flowbite, deployed to GitHub Pages.

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.20.8 (recommended: 20.3.0+)
- npm >= 9.6.5
- Git installed
- GitHub account for deployment

### Node.js Version Management

This project requires Node.js >= 18.20.8. We recommend using a Node version manager:

**Using asdf (recommended if you use asdf):**
```bash
# Install asdf if you don't have it
# See: https://asdf-vm.com/guide/getting-started.html

# Install Node.js plugin and version
asdf plugin add nodejs
asdf install nodejs 20.3.0
asdf local nodejs 20.3.0
```
The `.tool-versions` file is already configured - asdf will automatically use the correct version when you `cd` into this directory.

**Using nvm:**
```bash
# Install nvm if you don't have it
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# Install and use the correct Node version
nvm install 20.3.0
nvm use
```

**Using fnm:**
```bash
# Install fnm if you don't have it
curl -fsSL https://fnm.vercel.app/install | bash

# Install and use the correct Node version
fnm install 20.3.0
fnm use
```

The project includes `.nvmrc`, `.node-version`, and `.tool-versions` files that version managers will automatically detect.

**GitHub Actions:** The project uses `actions/setup-node@v4` with Node 20, which matches the local development requirement.

### Local Development

#### Using Make (Recommended)

1. **Switch to correct Node version** (if you have a version manager installed):
```bash
make local-use-node
```
   > **Note:** Since Make runs in a subshell, the version switch may not persist in your terminal. If needed, run the version manager command directly: `nvm use 20.3.0` (or `fnm use 20.3.0`)

2. **First-time setup** (switches Node version, checks prerequisites, and installs dependencies):
```bash
make local-setup
```

2. Start the development server:
```bash
make dev
# or simply:
make
```

Your site will be available at `http://localhost:4321`

**Or manually:**

1. Check Node version:
```bash
make local-check-node
```

2. Install dependencies:
```bash
make install
```

3. Start development server:
```bash
make dev
```

#### Using npm directly

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

### Available Make Commands

**Local Development (prefixed with `local-`):**
- `make local-use-node` - Automatically switch to the correct Node.js version (requires asdf/nvm/fnm/n)
- `make local-setup` - Switch Node version, check prerequisites, and install dependencies (recommended for first-time setup)
- `make local-check-node` - Verify Node.js version meets requirements
- `make local-setup-instructions` - Show setup instructions for Node version managers

**General Commands:**
- `make install` - Install dependencies (automatically checks Node version)
- `make dev` or `make` - Run development server (checks Node version and installs deps if needed)
- `make build` or `make static` - Build for production
- `make preview` - Preview production build
- `make clean` - Clean build artifacts
- `make setup-instructions` - Show instructions for installing Node version managers
- `make help` - Show all available commands

All commands automatically check Node.js version and work the same way whether you're building static or dynamic content.

## 📁 Project Structure

```
kumlawdi-website/
├── src/
│   ├── components/       # Reusable Astro components
│   ├── layouts/          # Page layouts
│   ├── pages/            # Route pages
│   └── styles/           # Global styles
├── public/               # Static assets
├── astro.config.mjs      # Astro configuration
├── tailwind.config.mjs   # Tailwind configuration
└── package.json
```

## 🎨 Styling

This project uses:
- **Tailwind CSS** for utility-first styling
- **Flowbite** for UI components
- **Inter Tight** font family

Customize brand colors in `tailwind.config.mjs`:
- `brand-primary`: Primary brand color
- `brand-secondary`: Secondary/accent color
- `brand-light`: Light background color
- `brand-gray`: Gray text color

## 🚀 Deployment

### GitHub Pages

1. Push to GitHub repository
2. Enable GitHub Pages in repository settings
3. Site deploys automatically via GitHub Actions workflow

The workflow builds with `GITHUB_PAGES=true` to set the correct base path.

### Custom Domain

1. Update `public/CNAME` with your domain
2. Configure DNS with your provider
3. Update `astro.config.mjs` with your production domain

## 📝 License

© 2025 Kumlawdi. All rights reserved.

