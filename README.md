# STEM CodeLab

A modern, extensible starter for building STEM-oriented web applications using **Next.js**, **TypeScript**, **Radix UI**, **Tailwind CSS**, and more.

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Configuration](#configuration)
- [Contributing](#contributing)
- [License](#license)

---

## Overview

**STEM CodeLab** provides a robust foundation for building interactive STEM (Science, Technology, Engineering, Mathematics) learning tools, dashboards, or experimental projects. Leveraging the latest frameworks and UI toolkits, it helps developers quickly prototype and deploy scalable web applications.

---

## Features

- **Next.js 15** for server-side rendering and static site generation
- **TypeScript** for type safety and better developer experience
- **Radix UI** and **ShadCN**-style components for accessible, customizable interfaces
- **Tailwind CSS** for utility-first styling and rapid prototyping
- **React Hook Form** and **Zod** for robust forms and validation
- **Recharts** for beautiful, responsive data visualizations
- **Framer Motion** for smooth animations
- Pre-configured linting and formatting
- Modular, scalable project structure
- Ready for deployment

---

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI Components:** [Radix UI](https://www.radix-ui.com/), [ShadCN](https://ui.shadcn.com/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/), [CSS]
- **State/Form:** [React Hook Form](https://react-hook-form.com/), [Zod](https://zod.dev/)
- **Visualization:** [Recharts](https://recharts.org/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [Lucide](https://lucide.dev/)

---

## Getting Started

### Prerequisites

- **Node.js** (18.x or newer recommended)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/paarthbhatt/stem-codelab.git
   cd stem-codelab
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

   The app will be available at [http://localhost:3000](http://localhost:3000).

---

## Available Scripts

- `npm run dev` — Start in development mode
- `npm run build` — Build for production
- `npm run start` — Start the production server
- `npm run lint` — Run ESLint on the codebase

---

## Project Structure

```
stem-codelab/
├── public/              # Static files
├── src/                 # Source code (pages, components, utils, etc.)
├── styles/              # Global and component styles
├── tsconfig.json        # TypeScript configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── package.json         # Dependencies and scripts
└── ...
```

- **`src/`**: Main source code for pages, components, hooks, and utilities.
- **`public/`**: Static assets (images, icons, etc).
- **`styles/`**: Tailwind and custom CSS files.
- **`tsconfig.json`**: TypeScript compiler options (includes strict mode, path aliases, Next.js plugin).
- **`tailwind.config.js`**: Tailwind and plugin setup.

---

## Configuration

- **TypeScript**: Strict mode enabled, paths aliased with `@/*` for cleaner imports.
- **Next.js**: Modern app directory structure, SSR and SSG supported.
- **Radix UI**: Accessible, headless UI primitives.
- **Tailwind CSS**: Utility-first, responsive styling.

You can adjust settings in `tsconfig.json` and `tailwind.config.js` to fit your needs.

---

## Contributing

Contributions are welcome! Please open issues or submit pull requests for bug fixes, new features, or improvements.

1. Fork the repository
2. Create a new branch (`git checkout -b feature/your-feature`)
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

---

## License

Distributed under the MIT License. See [`LICENSE`](LICENSE) for details.

---

_This project is maintained by [@paarthbhatt](https://github.com/paarthbhatt)._
