# Growth Compass 🚀

**Growth Compass** is a modern, AI-powered personal development platform designed to help you build discipline, sharpen communication, and cultivate unwavering confidence through bite-sized, actionable video lessons and smart task management.

## ✨ Features

- **Vertical Video Experience**: Immersive, TikTok-style interface for quick, engaging lessons.
- **AI-Generated Content**: Dynamic video generation with personality-focused prompts.
- **Task Management**: Stay organized with intelligent task tracking.
- **Theme Customization**: Personalize your dashboard with custom colors and styles.
- **Redux Toolkit**: Robust state management for a smooth user experience.
- **Responsive Design**: Built with Tailwind CSS for seamless use across all devices.

## 🛠️ Tech Stack

- **Framework**: React 18 + Vite 5
- **Language**: TypeScript
- **Styling**: Tailwind CSS, Radix UI Primitives
- **State Management**: Redux Toolkit
- **Testing**: Vitest

## 📂 Project Structure

```
src/
├── components/           # UI Components
│   ├── Reels/            # Vertical video components
│   └── ui/               # Reusable Radix UI components
├── data/                 # Mock and static data
├── hooks/                # Custom React hooks
├── pages/                # Page components
│   ├── ReelsPage.tsx     # Reels viewer and discovery
│   └── CategoryDetail.tsx# Category-specific content
├── redux/                # Redux Toolkit store and slices
├── test/                 # Unit tests
└── App.tsx               # Main application component
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher recommended)
- **Bun** (v1.x recommended for faster installs, or use npm)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/jitendra-dhadavi/personality-dev-app.git
   cd personality-dev-app
   ```

2. Install dependencies:
   ```bash
   npm install
   # or using bun
   bun install
   ```

3. Run the development server:
   ```bash
   npm run dev
   # or using bun
   bun run dev
   ```

4. Open [http://localhost:8080](http://localhost:8080) in your browser to view the app.

### Build & Run

To create a production build:
```bash
npm run build
```

To preview the production build:
```bash
npm run preview
```

## 🧪 Testing

Run the test suite:
```bash
npm run test
```

## 🎨 Customization

### Theme Management

Customize your app's theme using the Theme Manager:
1. Navigate to **Settings** (or Profile section).
2. Use the color picker to select your preferred primary and secondary colors.
3. The changes are saved instantly and applied throughout the app.
