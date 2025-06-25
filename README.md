# 🧠 React Flow Interaction Board

An interactive canvas built using **React Flow**, designed to allow users to drag and drop blocks, connect them with defined rules, and interact in a structured visual flow environment.

Hosted Link: https://react-flow-board.netlify.app/

---

## 📌 Overview

This project is part of a Frontend Developer Task focused on working with **React Flow**, UI interactions, event handling, and modular architecture.

Key features include:

- A canvas that allows drag-and-drop of predefined blocks (`Block A`, `Block B`)
- Only **Block A ➝ Block B** connections are allowed
- Keyboard support for deleting selected nodes and edges
- Undo and Redo capabilities with state history
- Visual feedback via edge styling and minimap
- LocalStorage integration for auto-save functionality

---

## 🚀 Getting Started

### ✅ Prerequisites

Ensure you have the following installed:

- **Node.js** (v14+)
- **npm** or **yarn**
- Modern browser (Chrome recommended)

---

### 🛠️ Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/YOUR_USERNAME/react-flow-board.git
cd react-flow-board
npm install
```

---

### 📦 Running the App

To start the development server:

```bash
npm start
```

The app will be running at `http://localhost:3000`

---

## 🧩 Usage

### 🎯 Functional Flow

1. **Drag Blocks:**
   - Drag `Block A` or `Block B` from the right-side panel into the canvas.

2. **Connect Blocks:**
   - Connect `Block A ➝ Block B` by clicking and dragging between nodes.
   - Other combinations are **not allowed** and show a toast error.

3. **Select & Delete:**
   - Click a node or edge to select it.
   - Use `Delete` or `Backspace` to remove selected elements.
   - Multi-select using `Ctrl` + Click` or click-and-drag selection.

4. **Undo/Redo:**
   - Use the **Undo** and **Redo** buttons at the top-left to move between canvas states.

5. **Right Click:**
   - Right-click a node to open the context menu (placeholder UI for potential actions).

---

## 🧠 Summary of Solution

- **React Flow Renderer** is used for creating the node-edge interaction model.
- The canvas uses **react hooks and context** for dynamic interaction and state tracking.
- Edges are validated such that only `Block A ➝ Block B` connections are created.
- Undo/Redo is achieved via a manual stack history and future stack implementation.
- A responsive UI with TailwindCSS makes the design minimal and developer-friendly.

---

## 🧪 Features Recap

| Feature                  | Status |
|--------------------------|--------|
| Drag & Drop Nodes        | ✅     |
| Block A ➝ Block B Only   | ✅     |
| Select + Delete          | ✅     |
| Undo / Redo              | ✅     |
| MiniMap & Controls       | ✅     |
| Context Menu on Nodes    | ✅     |
| LocalStorage Save        | ✅     |

---

## 🎨 Design Decisions

1. **Minimal Customization**  
   Kept the UI clean using TailwindCSS without overcomplicating interactions.

2. **No Custom Edge Component**  
   The default edge component was sufficient for this task. Selection logic was handled via edge `style` props.

3. **Validation Logic inside `onConnect`**  
   The node types (`Block A`, `Block B`) were compared during the `onConnect` callback to restrict edge creation.

4. **Undo/Redo Mechanism**  
   Implemented using state stacks (`history`, `future`) to store node/edge state snapshots on every change.

---

## 💡 Future Improvements (Optional)

- Export/Import flow data as JSON
- Add node customization (icons, colors, types)
- Real-time collaboration with WebSockets
- Custom edge with dynamic labels or icons

---

> Built with ❤️ using React and React Flow
