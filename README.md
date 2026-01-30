# ZedX Original

ZedX Original is a futuristic e-commerce platform designed for next-generation hardware and advanced tactical gear. This Single Page Application (SPA) delivers a high-performance, immersive shopping experience using modern web technologies.

## Technology Stack

This project is built using the following core technologies:

- **Framework:** React 18
- **Language:** TypeScript
- **Build Tool:** Vite
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Backend & Authentication:** Cocobase SDK

## Features

- **Responsive Architecture:** Fully adaptive design that scales seamlessly from mobile devices to desktop workstations.
- **Secure Authentication:** Integrated identity management system powered by Cocobase, featuring secure login, registration, and session persistence.
- **Dynamic Product Catalog:** Real-time product fetching with local caching fallbacks for offline reliability.
- **State Management:**
  - **CocobaseContext:** Global handler for user sessions and database connections.
  - **CartContext:** Persistent shopping cart with complex quantity logic and real-time total calculations.
- **Futuristic UI/UX:** Glassmorphism design language, motion-enhanced transitions, and a utility-first styling approach.

## Installation

1.  Clone the repository:

    ```bash
    git clone https://github.com/daodudestiny56-netizen/zedx-original.git
    ```

2.  Navigate to the project directory:

    ```bash
    cd zedx-original
    ```

3.  Install dependencies:
    ```bash
    npm install
    ```

## Development

To start the local development server:

```bash
npm run dev
```

The application will be accessible at http://localhost:5173.

## Building for Production

To create a production-ready build:

```bash
npm run build
```

This command compiles the TypeScript code and generates optimized assets in the dist directory.

## Configuration

The application configuration is located in src/config.ts. Ensure you have the correct Cocobase API credentials set up for full backend functionality.

- API Key
- Project ID
- Base URL

## Structure

- src/components: Reusable UI components (Navbar, Footer, ProductCard)
- src/context: Global state providers (Auth, Cart)
- src/pages: Route views (Home, Shop, Cart, Login)
- src/types: TypeScript definitions for data models
- src/styles: Global CSS and Tailwind directives

## License

This project is proprietary software developed for the ZedX Original platform.
