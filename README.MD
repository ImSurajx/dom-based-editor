# Mini Web Editor (Vanilla JS)

This project is a simple browser-based design editor built using **HTML, CSS, and Vanilla JavaScript**.  
It allows users to create and manipulate basic shapes inside a workspace, similar to a very lightweight design tool.

---

## ✨ Features Implemented

- Rectangle tool  
- Circle tool (same logic as rectangle with border-radius)  
- Select & move elements using mouse drag  
- Delete selected element using `Delete` / `Backspace` key  
- Rotate selected element by fixed angle (15° per click)  
- Export design as:
  - JSON file (editor data)
  - HTML file (static output)
- Share button (copies current page URL to clipboard)
- Visual feedback for active tools and actions

---

## 🧭 How to Use

1. Select a tool from the toolbar (Rectangle / Circle).
2. Click and drag inside the workspace to draw.
3. Switch to **Select Tool** to:
   - Click an element to select it
   - Drag to move it
4. Use:
   - **Delete key** to remove selected element
   - **Rotate button** to rotate selected element
5. Export your work using:
   - **Export JSON** → editor data
   - **Export HTML** → static layout

---

## ⚠️ Known Limitations

- Resize feature is not implemented
- Rotation is step-based (not free rotation)
- No undo / redo
- Styles are inline (not optimized for production)

These were intentionally skipped due to submission time constraints.

---

## 🤖 AI Usage Disclosure

AI assistance (ChatGPT) was used **only for guidance, debugging help, and logic clarification**.  
All implementation, structure, and final decisions were made and written manually.

---

## 🕒 Updates

The project may receive further improvements until **11:59 PM**.  
For additional features or fixes, please check the **Git commit history**.

---

## 📌 Tech Stack

- HTML
- CSS
- JavaScript (Vanilla)