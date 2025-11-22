.PHONY: help install dev build preview clean static dynamic run local-setup local-check-node local-use-node local-setup-instructions

# Default target
.DEFAULT_GOAL := help

# Variables
NPM := npm
NODE_MODULES := node_modules
DIST := dist
REQUIRED_NODE_VERSION := 20.3.0
MIN_NODE_VERSION := 18.20.8

help: ## Show this help message
	@echo "Available targets:"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}'
	@echo ""
	@echo "Note: Targets prefixed with 'local-' are for local development only."
	@echo "      CI/CD (GitHub Actions) uses actions/setup-node@v4 automatically."

local-use-node: ## Automatically switch to the correct Node.js version (local development only)
	@echo "Detecting Node version manager and switching to $(REQUIRED_NODE_VERSION)..."
	@echo ""
	@if command -v asdf >/dev/null 2>&1; then \
		echo "📦 Found asdf, switching to Node $(REQUIRED_NODE_VERSION)..."; \
		asdf plugin add nodejs 2>/dev/null || true; \
		asdf install nodejs $(REQUIRED_NODE_VERSION) 2>/dev/null || true; \
		asdf local nodejs $(REQUIRED_NODE_VERSION) 2>/dev/null && echo "✅ Set Node $(REQUIRED_NODE_VERSION) in .tool-versions" || echo "⚠️  Could not set version automatically."; \
		echo ""; \
		echo "💡 asdf will automatically use this version when you cd into this directory."; \
		echo "   To use it now in your shell, run: asdf reshim && eval \"\$$(asdf export-nodejs-path)\""; \
	elif [ -s "$$HOME/.nvm/nvm.sh" ] || [ -s "$$HOME/.config/nvm/nvm.sh" ]; then \
		NVM_SCRIPT=$$([ -s "$$HOME/.nvm/nvm.sh" ] && echo "$$HOME/.nvm/nvm.sh" || echo "$$HOME/.config/nvm/nvm.sh"); \
		echo "📦 Found nvm, switching to Node $(REQUIRED_NODE_VERSION)..."; \
		. $$NVM_SCRIPT && nvm install $(REQUIRED_NODE_VERSION) 2>/dev/null || true; \
		. $$NVM_SCRIPT && nvm use $(REQUIRED_NODE_VERSION) 2>/dev/null && echo "✅ Switched to Node $$(node -v)" || echo "⚠️  Could not switch automatically."; \
		echo ""; \
		echo "💡 Note: Make runs in a subshell. To persist the version in your shell, run:"; \
		echo "  nvm use $(REQUIRED_NODE_VERSION)"; \
	elif command -v fnm >/dev/null 2>&1; then \
		echo "📦 Found fnm, switching to Node $(REQUIRED_NODE_VERSION)..."; \
		eval "$$(fnm env)" && fnm install $(REQUIRED_NODE_VERSION) 2>/dev/null || true; \
		eval "$$(fnm env)" && fnm use $(REQUIRED_NODE_VERSION) 2>/dev/null && echo "✅ Switched to Node $$(node -v)" || echo "⚠️  Could not switch automatically."; \
		echo ""; \
		echo "💡 Note: Make runs in a subshell. To persist the version in your shell, run:"; \
		echo "  fnm use $(REQUIRED_NODE_VERSION)"; \
	elif command -v n >/dev/null 2>&1; then \
		echo "📦 Found n, switching to Node $(REQUIRED_NODE_VERSION)..."; \
		n $(REQUIRED_NODE_VERSION) 2>/dev/null && echo "✅ Switched to Node $$(node -v)" || echo "⚠️  Could not switch automatically."; \
		echo ""; \
		echo "💡 Note: Make runs in a subshell. To persist the version in your shell, run:"; \
		echo "  n $(REQUIRED_NODE_VERSION)"; \
	else \
		echo "❌ No Node version manager found!"; \
		echo ""; \
		echo "Please install a Node version manager:"; \
		echo "  asdf: https://asdf-vm.com/guide/getting-started.html"; \
		echo "  nvm: curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash"; \
		echo "  fnm: curl -fsSL https://fnm.vercel.app/install | bash"; \
		echo ""; \
		echo "After installing, restart your terminal and run: make local-use-node"; \
		echo ""; \
		echo "Or manually install Node.js $(REQUIRED_NODE_VERSION) from https://nodejs.org/"; \
		exit 1; \
	fi

local-check-node: ## Check Node.js version meets requirements
	@echo "Checking Node.js version..."
	@NODE_VERSION=$$(node -v 2>/dev/null | sed 's/v//'); \
	NPM_VERSION=$$(npm -v 2>/dev/null); \
	if [ -z "$$NODE_VERSION" ]; then \
		echo "❌ Node.js is not installed!"; \
		echo ""; \
		echo "Please install Node.js version $(REQUIRED_NODE_VERSION) or higher."; \
		echo "Recommended: Use a Node version manager:"; \
		echo "  - nvm: https://github.com/nvm-sh/nvm"; \
		echo "  - fnm: https://github.com/Schniz/fnm"; \
		echo "  - n: https://github.com/tj/n"; \
		exit 1; \
	fi; \
	NODE_MAJOR=$$(echo $$NODE_VERSION | cut -d. -f1); \
	NODE_MINOR=$$(echo $$NODE_VERSION | cut -d. -f2); \
	NODE_PATCH=$$(echo $$NODE_VERSION | cut -d. -f3); \
	REQUIRED_MAJOR=$$(echo $(MIN_NODE_VERSION) | cut -d. -f1); \
	REQUIRED_MINOR=$$(echo $(MIN_NODE_VERSION) | cut -d. -f2); \
	REQUIRED_PATCH=$$(echo $(MIN_NODE_VERSION) | cut -d. -f3); \
	if [ $$NODE_MAJOR -lt $$REQUIRED_MAJOR ] || \
	   ([ $$NODE_MAJOR -eq $$REQUIRED_MAJOR ] && [ $$NODE_MINOR -lt $$REQUIRED_MINOR ]) || \
	   ([ $$NODE_MAJOR -eq $$REQUIRED_MAJOR ] && [ $$NODE_MINOR -eq $$REQUIRED_MINOR ] && [ $$NODE_PATCH -lt $$REQUIRED_PATCH ]); then \
		echo "❌ Node.js version $$NODE_VERSION is too old!"; \
		echo ""; \
		echo "Required: >= $(MIN_NODE_VERSION)"; \
		echo "Current:  $$NODE_VERSION"; \
		echo ""; \
		if command -v asdf >/dev/null 2>&1; then \
			echo "Using asdf, run: asdf install nodejs $(REQUIRED_NODE_VERSION) && asdf local nodejs $(REQUIRED_NODE_VERSION)"; \
		elif command -v nvm >/dev/null 2>&1; then \
			echo "Using nvm, run: nvm install $(REQUIRED_NODE_VERSION) && nvm use"; \
		elif command -v fnm >/dev/null 2>&1; then \
			echo "Using fnm, run: fnm install $(REQUIRED_NODE_VERSION) && fnm use"; \
		elif command -v n >/dev/null 2>&1; then \
			echo "Using n, run: n $(REQUIRED_NODE_VERSION)"; \
		else \
			echo "Please install Node.js $(REQUIRED_NODE_VERSION) or higher."; \
			echo "Or install a Node version manager:"; \
			echo "  - asdf: https://asdf-vm.com/"; \
			echo "  - nvm: https://github.com/nvm-sh/nvm"; \
			echo "  - fnm: https://github.com/Schniz/fnm"; \
		fi; \
		exit 1; \
	fi; \
	if [ -z "$$NPM_VERSION" ]; then \
		echo "⚠️  npm is not installed!"; \
		exit 1; \
	fi; \
	echo "✅ Node.js $$NODE_VERSION (npm $$NPM_VERSION) - OK"

local-setup: local-use-node local-check-node ## Check prerequisites and setup project (local development only)
	@echo ""
	@echo "✅ Prerequisites check passed!"
	@echo ""
	@if [ ! -d "$(NODE_MODULES)" ]; then \
		echo "Running 'make install' to install dependencies..."; \
		$(MAKE) install; \
	else \
		echo "Dependencies already installed."; \
	fi

install: local-check-node ## Install dependencies
	@echo "Installing dependencies..."
	$(NPM) install

dev: local-check-node ## Run development server
	@if [ ! -d "$(NODE_MODULES)" ]; then \
		echo "⚠️  Dependencies not installed. Running 'make install'..."; \
		$(MAKE) install; \
	fi
	@echo "Starting development server..."
	$(NPM) run dev

build: local-check-node ## Build for production
	@if [ ! -d "$(NODE_MODULES)" ]; then \
		echo "⚠️  Dependencies not installed. Running 'make install'..."; \
		$(MAKE) install; \
	fi
	@echo "Building for production..."
	$(NPM) run build

preview: ## Preview production build
	@echo "Previewing production build..."
	$(NPM) run preview

clean: ## Clean build artifacts
	@echo "Cleaning build artifacts..."
	rm -rf $(DIST)
	rm -rf .astro

static: build ## Build static site (alias for build)
	@echo "Static site built successfully"

dynamic: dev ## Run dynamic development server (alias for dev)
	@echo "Dynamic development server running"

run: dev ## Run the application (alias for dev)
	@echo "Running application..."

# Convenience aliases
start: dev ## Start development server (alias for dev)
stop: ## Stop any running processes (placeholder)
	@echo "Stop command - implement as needed"

test: ## Run tests (placeholder)
	@echo "Test command - implement as needed"

lint: local-check-node ## Run linter (placeholder)
	@echo "Lint command - implement as needed"

local-setup-instructions: ## Show setup instructions for Node version managers (local development)
	@echo "Node.js Version Management Setup"
	@echo "================================"
	@echo ""
	@echo "This project requires Node.js >= $(MIN_NODE_VERSION)"
	@echo ""
	@echo "Option 1: asdf (Version Manager) - Recommended"
	@echo "  Install: https://asdf-vm.com/guide/getting-started.html"
	@echo "  Then: asdf plugin add nodejs && asdf install nodejs $(REQUIRED_NODE_VERSION) && asdf local nodejs $(REQUIRED_NODE_VERSION)"
	@echo "  Note: asdf automatically reads .tool-versions file in this directory"
	@echo ""
	@echo "Option 2: nvm (Node Version Manager)"
	@echo "  Install: curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash"
	@echo "  Then: nvm install $(REQUIRED_NODE_VERSION) && nvm use"
	@echo ""
	@echo "Option 3: fnm (Fast Node Manager)"
	@echo "  Install: curl -fsSL https://fnm.vercel.app/install | bash"
	@echo "  Then: fnm install $(REQUIRED_NODE_VERSION) && fnm use"
	@echo ""
	@echo "Option 4: n"
	@echo "  Install: npm install -g n"
	@echo "  Then: n $(REQUIRED_NODE_VERSION)"
	@echo ""
	@echo "After installing, run: make local-setup"
	@echo ""
	@echo "GitHub Actions automatically uses Node 20 via actions/setup-node@v4"

