# 🚦 Smart Packet Routing System (DSA-Based Simulator)

A fully interactive, visual network simulator where users build custom PC-router topologies and simulate packet routing using classical Data Structures & Algorithms (DSA) like Dijkstra, A*, and Bellman-Ford — with a clean GUI and intelligent algorithm selection logic.

---

## 📌 Project Overview

This project simulates how data packets are routed across a computer network. Users can:

- Design custom networks by placing routers and connecting PCs.
- Choose or auto-select the best routing algorithm.
- Send packets from one PC to another and visualize how the packet travels through the network.
- Observe metrics like latency, delivery success, and congestion in real time.

> 🚫 No AI is used — pure DSA logic for algorithm decisions and routing.

---

## 🧩 Key Features

- 🖱 *Drag-and-drop GUI* to place Routers and PCs
- 🛠 *Custom Topologies*: Star, Ring, Tree, Mesh, and manual layouts
- 🔗 *PCs connected to routers only*, no cross-router PC links
- 📦 *Packet Simulation*: Select source PC ➝ destination PC with TTL & priority
- 🤖 *Auto Algorithm Selector* using rule-based logic (TTL, weights, priority)
- ⚙ *Routing Algorithms: Dijkstra, A, Bellman-Ford
- 📊 *Live Metrics Dashboard*: Packet delivery, drops, latency, congestion
- 🛑 *Failure Simulation*: Manually drop links/routers, observe rerouting
- 🧠 *Queue Handling* at routers (priority queues)
- 💾 Optional: Save/load topology, export logs

---

## ⚙ Tech Stack

| Layer        | Technology                          |
|--------------|--------------------------------------|
| Frontend     | React.js + Konva.js (Canvas Drawing) |
| Backend      | Python (FastAPI or Flask)            |
| Routing Logic| Pure Python DSA (Graph, Heap, Queue) |
| Styling      | Tailwind CSS or Styled Components    |
| Data Storage | JSON for sessions, CSV for logs      |

---

## 🕹 Supported Topologies

- 🔹 *Router-to-Router*: Mesh, Tree, Star, Custom
- 🔸 *Router-to-PC (Local Topology)*:
  - Star (default)
  - Ring
  - Tree
  - Custom layouts
- 🔒 *Rule: PCs only connect to one router, **no PC–PC or cross-router PC links*

---

## 🚦 Routing Algorithms

1. *Dijkstra* – Shortest path using uniform weights
2. *A\** – Heuristic-based fast routing
3. *Bellman-Ford* – Supports negative/dynamic weights
4. *Auto Mode* – Selects best algorithm using rules:
   - High TTL + stable network → Dijkstra  
   - Low TTL or priority packet → A*  
   - Dynamic weights → Bellman-Ford  

---

## 📷 GUI Overview

Main interface includes:
- 🧱 *Canvas zone*: Drag-and-drop routers & PCs, connect them visually
- 🗂 *Left panel*: Toolbox to add devices, links, failures
- 📦 *Bottom panel*: Add packet (source PC, dest PC, TTL, priority, algorithm)
- 📊 *Right panel*: Live simulation metrics and path logs

> 🖼 Clean interface with icons and auto-arrangement of PCs around routers.

---

