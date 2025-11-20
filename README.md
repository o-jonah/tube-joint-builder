# Tube Joint Visualizer - 3D CAD Tool

An interactive desktop application for visualizing and designing joints between rectangular and square tubes at various angles. Built with React, Three.js, and Electron for professional engineering visualization.

## 🎯 Project Overview

This application enables users to:
- Create and manipulate rectangular and square tubes in 3D space
- Adjust tube dimensions (width, height, thickness, length)
- Position and rotate tubes with precision controls
- Visualize tube assemblies in solid or wireframe mode
- Snap rotation to standard angles (45°, 90°)
- Interactive 3D workspace with orbit controls

## 🚀 Features

### Core Functionality
- ✅ **Tube Creation**: Add rectangular or square tubes
- ✅ **Parameter Control**: Precise dimension inputs (width, height, thickness, length)
- ✅ **3D Manipulation**: Position tubes in X, Y, Z coordinates
- ✅ **Rotation Control**: Rotate tubes with degree precision and angle snapping
- ✅ **View Modes**: Toggle between wireframe and solid visualization
- ✅ **Selection System**: Click to select tubes, visual feedback with highlight
- ✅ **Multiple Tubes**: Create complex assemblies with multiple tubes

### Technical Features
- Dark CAD-style interface optimized for 3D visualization
- Real-time 3D rendering with Three.js
- Responsive controls and parameter updates
- Professional engineering aesthetic

## ✅ Completed

The following core features and tooling are implemented in this project:

- **Tube Creation:** Add rectangular and square tubes to the scene with a single control action.
- **Parameter Controls:** Live inputs for width, height, thickness, and length that update the 3D view in real time.
- **3D Manipulation:** Position tubes in X/Y/Z and rotate with precise numeric controls and mouse-based camera controls.
- **Rotation Snapping:** Snap rotations to common angles (45°, 90°) for precise mitering.
- **View Modes:** Toggle between wireframe and solid rendering.
- **Selection & Feedback:** Click-select tubes with visual highlighting for the active selection.
- **Multiple Tubes & Assemblies:** Add and manage multiple tubes in one scene to build assemblies.
- **Undo/Redo (basic):** Undo/redo support for recent edits (core functionality present).
- **Joint Preview / Detection (initial):** Prototype joint detection and preview behavior when tubes are positioned close.
- **Rendering Stack:** Real-time rendering using Three.js + React Three Fiber and helpers from `@react-three/drei`.
- **Design System:** Dark CAD-style theme with Tailwind CSS and `shadcn/ui` components for a consistent UI.
- **Type Safety & Tooling:** TypeScript config with strict options and `@` path aliases for cleaner imports.
- **Vite Setup:** Vite dev tooling with `@vitejs/plugin-react-swc` configured and `@` alias resolved in `vite.config.ts`.
- **Docs & Workflow:** `README.md` with setup, development, and build instructions; contribution workflow and roadmap.

## Release Notes

See the short release notes and changelog in `CHANGELOG.md` (v0.1.0 added on 2025-11-20).

## 📋 Prerequisites

- **Node.js** (v16 or higher) 
- **npm** (comes with Node.js) or **yarn**
- **Git** for version control

## 🛠️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/o-jonah/tube-joint-builder.git
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React & TypeScript
- Three.js & React Three Fiber
- Vite (build tool)
- Tailwind CSS
- shadcn/ui components

### 3. Run Development Server

```bash
npm run dev
```

The application will start at `http://localhost:8080`

## 📦 Building for Production

### Web Build

To create an optimized production build:

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Desktop App (Electron) - Coming Soon

Electron packaging configuration will be added for standalone desktop executables.

#### Planned Packaging Steps:
1. Install Electron dependencies
2. Configure electron-builder
3. Build cross-platform executables (Windows, macOS, Linux)

## 🎮 Usage Guide

### Adding Tubes

1. Click **"Rectangular"** or **"Square"** button in the control panel
2. A new tube appears in the 3D workspace
3. The tube is automatically selected for editing

### Editing Tubes

**Dimensions Tab:**
- Adjust Width, Height, Thickness, and Length using numeric inputs
- Changes update in real-time in the 3D view

**Position Tab:**
- Set X, Y, Z coordinates for precise positioning
- Adjust rotation in degrees
- Use "Snap 45°" or "Snap 90°" buttons for standard angles

### 3D Navigation

- **Left Click + Drag**: Rotate the camera around the scene
- **Right Click + Drag**: Pan the camera
- **Scroll Wheel**: Zoom in/out
- **Click on Tube**: Select for editing

### View Controls

- **Wireframe/Solid Toggle**: Switch between visualization modes
- Zoom and rotation controls in the toolbar

### Deleting Tubes

- Select a tube
- Click the trash icon in the properties panel

## 🏗️ Project Structure

```
tube-joint-visualizer/
├── src/
│   ├── components/
│   │   ├── tube-visualizer/
│   │   │   ├── TubeVisualizer.tsx    # Main 3D canvas component
│   │   │   └── TubeMesh.tsx          # Individual tube 3D mesh
│   │   ├── controls/
│   │   │   └── TubeControls.tsx      # Side panel controls
│   │   ├── toolbar/
│   │   │   └── ViewToolbar.tsx       # View mode controls
│   │   └── ui/                        # shadcn UI components
│   ├── types/
│   │   └── tube.ts                    # TypeScript interfaces
│   ├── pages/
│   │   └── Index.tsx                  # Main application page
│   ├── index.css                      # Design system & styles
│   └── App.tsx                        # Root component
├── public/                            # Static assets
├── package.json                       # Dependencies
├── tailwind.config.ts                 # Tailwind configuration
├── vite.config.ts                     # Vite build configuration
└── README.md                          # This file
```

## 🎨 Design System

The application uses a professional dark theme optimized for 3D CAD work:

- **Primary Color**: Cyan (#00d9ff) - for selections and accents
- **Background**: Dark blue-grey for reduced eye strain
- **Canvas**: Extra dark for optimal 3D contrast
- **All colors defined using HSL in semantic tokens**

## 🔧 Technologies Used

- **React 18** - UI framework
- **TypeScript** - Type-safe development
- **Three.js** - 3D rendering engine
- **React Three Fiber** - React renderer for Three.js
- **React Three Drei** - Useful helpers for R3F
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first styling
- **shadcn/ui** - High-quality UI components
- **Lucide React** - Icon library

## 🚧 Roadmap & Future Features

### Phase 2 (Planned)
- [ ] Joint detection and preview when tubes are close
- [ ] Automatic joint angle calculation
- [ ] Joint highlight visualization
- [ ] Dimension display on tubes
- [ ] Undo/redo functionality

### Phase 3 (Planned)
- [ ] Export to common CAD formats (STEP, STL)
- [ ] Save/load project files
- [ ] Advanced joint types (mitered, coped)
- [ ] Measurement tools
- [ ] Print-ready joint templates

### Electron Desktop App
- [ ] Electron integration
- [ ] Cross-platform builds (Windows, Mac, Linux)
- [ ] Auto-updates
- [ ] Offline functionality

## 📝 Development Workflow

This project follows professional Git practices:

```bash
# Create feature branch
git checkout -b feat/joint-preview

# Make changes and commit
git add .
git commit -m "feat: add joint preview visualization"

# Push to GitHub
git push origin feat/joint-preview
```

### Commit Message Format
- `feat:` New features
- `fix:` Bug fixes
- `docs:` Documentation changes
- `style:` Code style changes
- `refactor:` Code refactoring
- `test:` Test additions/changes
- `chore:` Build process updates

## 📄 License

This project is developed as part of a technical challenge.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes with clear messages
4. Push to the branch
5. Open a Pull Request

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

**Built with ❤️ for precision engineering visualization by Jonah Odongo**