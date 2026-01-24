# Dom Based Editor

![project preview](./assets/project-preview.png)

**dom based editor** is a browser-based design editor inspired by figma-like workflows.  
it is built **from scratch using only html, css, and vanilla javascript (dom)** as required in the **inter batch showdown** by sheryians coding school.

the purpose of this project is to demonstrate **strong frontend fundamentals**, including:
- dom manipulation  
- state management  
- keyboard & mouse interactions  
- event-driven ui logic  

all without using any framework or external library.

---

## Competition Alignment

**project type:** frontend web project  
**tech stack:** html, css, javascript (dom only)  
**frameworks / libraries:** ❌ none used  
**ai usage:** ✅ only for guidance, debugging, and logic clarification  

this project strictly follows all competition rules:
- no frameworks or libraries used  
- all logic written manually  
- clear understanding of every implemented feature  
- no copied or generated code  
- original ui/ux decisions  
- no commits will be made after submission until results are declared  

---

## Features Implemented

### Shape Creation Tools
- rectangle tool  
- circle tool (rectangle logic with border-radius)

**how to use**
1. select rectangle or circle tool from the left toolbar  
2. click and drag inside the workspace to draw the shape  

---

### Text Tool
- create editable text boxes  
- auto-focus after creation  
- real-time text saving  

**how to use**
1. select the text tool  
2. click anywhere on the canvas  
3. start typing immediately  
4. click outside the text box to finish editing  

---

### Select And Move Elements
- click to select an element  
- drag to move it freely  
- selected element is visually highlighted  

**how to use**
1. select the cursor/select tool  
2. click on any element  
3. drag it to reposition  

---

### Delete Element
- delete selected element using:
  - `delete` key  
  - `backspace` key  
- delete is disabled while editing text to prevent data loss  

**how to use**
1. select an element  
2. press `delete` or `backspace`  

---

### Rotation Tool
- rotate selected element by **15° per click**  
- rotation state is preserved and restored  

**how to use**
1. select an element  
2. click the rotate icon in the toolbar  

---

### Keyboard Movement
- move selected element using arrow keys  
- smooth movement in 5px steps  

**controls**
- ↑ move up  
- ↓ move down  
- ← move left  
- → move right  

---

### Export Features

#### Export As Json
- exports complete editor data  
- includes position, size, rotation, and text content  

#### Export As Html
- generates a standalone static html file  
- can be opened directly in a browser  

**how to use**
- click `export json` or `export html` from the top-right menu  

---

### Local Storage Persistence
- editor auto-saves state to `localStorage`  
- design restores automatically on page reload  
- manual save button also provided  

**how to use**
- work is saved automatically  
- click the save icon to force-save manually  

---

### Cursor And Tool Feedback
- cursor updates based on active tool  
- active tool icon highlights automatically  
- improves usability and reduces confusion  

---

### Share Feature
- copies current project url to clipboard  

**how to use**
- click the `share` button  

---

## How To Test The Project

1. open `index.html` in any modern browser  
2. create rectangles, circles, and text boxes  
3. select and move elements using mouse  
4. rotate elements using rotate tool  
5. delete elements using keyboard  
6. reload page to verify auto-restore  
7. export json and html files and open them  
8. test keyboard controls (arrow keys + delete)  

---

## Ai Usage Disclosure

ai (chatgpt) was used **only for guidance, debugging assistance, and conceptual clarification**.  
all code, structure, and implementation decisions were written and finalized manually.

---

## Submission Notice

this repository is **frozen for submission**.  
no further commits will be made until competition results are announced.

for detailed progress and changes, please refer to the git commit history.