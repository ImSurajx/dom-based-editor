// selecting tools from toolbar
let selectTool = document.getElementById("select-tool");
let textTool = document.getElementById("text-tool");
let rectangleTool = document.getElementById("rectangle-tool");
let circleTool = document.getElementById("circle-tool");
let pencilTool = document.getElementById("pencil-tool");
let rotationTool = document.getElementById("rotate-btn");
let saveBtn = document.getElementById("save-btn");
let deleteBtn = document.getElementById("delete-btn");
let layers = document.getElementById("layers");
let isResizing = false;
let resizeDirection = null; // "tl", "tr", "bl", "br"
let resizeStartX = 0;
let resizeStartY = 0;
let startWidth = 0;
let startHeight = 0;
let startLeft = 0;
let startTop = 0;
let propWidth = document.getElementById('prop-width');
let propHeight = document.getElementById('prop-height');
let propBg = document.getElementById('prop-bg');
let propText = document.getElementById('prop-text');



// prevent default right click menu on whole document
document.addEventListener('contextmenu', event => event.preventDefault());

// selecting workspace (main canvas)
let workSpace = document.getElementById("work-space");

// currently selected element on canvas
let selectElement = null;

// variable that tracks which tool is active
let activeTool = document.getElementById("select-tool");

// add active class to default tool
activeTool.classList.add('active-tool');

// tool click handlers (all tools use same helper function)
selectTool.addEventListener('click', () => {
    setActiveTool(selectTool);
});
textTool.addEventListener('click', () => {
    setActiveTool(textTool);
});
circleTool.addEventListener('click', () => {
    setActiveTool(circleTool);
});
rectangleTool.addEventListener('click', () => {
    setActiveTool(rectangleTool);
});
pencilTool.addEventListener('click', () => {
    setActiveTool(pencilTool);
});

// variables used for creating and dragging elements
let startX = 0, startY = 0;
let isCreating = false;
let justCreated = false;
let currentX = 0, currentY = 0;
let rectangle = null;

// variables used for moving elements
let isMoving = false;
let mouseStartX = 0;
let mouseStartY = 0;
let elementStartX = 0;
let elementStartY = 0;
let dx = 0, dy = 0;

// count total elements for unique id generation
let elementCount = 0;

// track when user is editing text to prevent delete key issues
let isEditingText = false;

// handle mouse down on workspace
workSpace.addEventListener('mousedown', (e) => {
    // return if no handler present
    if (e.target.classList.contains('handler')) {
        isResizing = true;
        resizeDirection = e.target.dataset.dir;
        let rect = workSpace.getBoundingClientRect();
        resizeStartX = e.clientX - rect.left;
        resizeStartY = e.clientY - rect.top;
        startWidth = +(selectElement.style.width.replace("px", ""));
        startHeight = +(selectElement.style.height.replace("px", ""));
        startLeft = +(selectElement.style.left.replace("px", ""));
        startTop = +(selectElement.style.top.replace("px", ""));
        e.stopPropagation();
        return;
    }

    // only newly created element get the handler or selected on
    if (activeTool !== selectTool && selectElement) {
        selectElement.classList.remove('selected');
        selectElement.querySelectorAll('.handler').forEach(h => h.remove());
        selectElement = null;
    }

    // start moving element if select tool is active
    if (activeTool === selectTool && selectElement && selectElement === e.target) {
        isMoving = true;

        let rect = workSpace.getBoundingClientRect();

        // store mouse starting position
        mouseStartX = e.clientX - rect.left;
        mouseStartY = e.clientY - rect.top;

        // store element starting position
        elementStartX = +(selectElement.style.left.replace("px", ""));
        elementStartY = +(selectElement.style.top.replace("px", ""));
        return;
    }

    // decide whether to create a new element
    if (activeTool !== selectTool) {
        isCreating = true;
    } else {
        isCreating = false;
    }

    const rect = workSpace.getBoundingClientRect();

    // initial mouse position for element creation
    startX = e.clientX - rect.left;
    startY = e.clientY - rect.top;

    // create elements based on active tool
    if (isCreating === true) {

        // rectangle creation
        if (activeTool === rectangleTool) {
            rectangle = document.createElement('div');
            rectangle.id = `rectangle+${++elementCount}`;
            rectangle.style.position = "absolute";
            rectangle.style.left = `${startX}px`;
            rectangle.style.top = `${startY}px`;
            rectangle.style.width = "0px";
            rectangle.style.height = "0px";
            rectangle.style.border = "4px solid black";
            rectangle.classList.add('rectangle');
            rectangle.setAttribute('rotation', 0);
            workSpace.appendChild(rectangle);
            setActiveTool(selectTool);
        }

        // circle creation
        if (activeTool === circleTool) {
            rectangle = document.createElement('div');
            rectangle.id = `circle+${++elementCount}`;
            rectangle.style.position = "absolute";
            rectangle.style.left = `${startX}px`;
            rectangle.style.top = `${startY}px`;
            rectangle.style.width = "0px";
            rectangle.style.height = "0px";
            rectangle.style.border = "4px solid black";
            rectangle.classList.add('circle');
            rectangle.setAttribute('rotation', 0);
            workSpace.appendChild(rectangle);
            setActiveTool(selectTool);
        }

        // text box creation
        if (activeTool === textTool) {
            rectangle = document.createElement('div');
            rectangle.id = `textBox+${++elementCount}`;
            rectangle.style.position = "absolute";
            rectangle.style.left = `${startX}px`;
            rectangle.style.top = `${startY}px`;
            rectangle.style.minWidth = "80px";
            rectangle.style.minHeight = "30px";
            rectangle.style.border = "4px solid royalblue";
            rectangle.classList.add('text-box');
            rectangle.setAttribute('rotation', 0);
            rectangle.contentEditable = true;
            workSpace.appendChild(rectangle);

            // auto focus text box after creation
            rectangle.focus();

            // switch back to select tool after creating text
            setActiveTool(selectTool);
            updateCursor();

            // track text editing state
            rectangle.addEventListener('focus', () => {
                isEditingText = true;
            });
            rectangle.addEventListener('blur', () => {
                isEditingText = false;
            });

            // save text changes instantly
            rectangle.addEventListener("input", () => {
                saveToLocalStorage();
            });
        }
    }
});

// mouse move handler for dragging and resizing
workSpace.addEventListener('mousemove', (e) => {
    if (isResizing) {
        let rect = workSpace.getBoundingClientRect();
        let currentResizeX = e.clientX - rect.left;
        let currentResizeY = e.clientY - rect.top;
        dx = currentResizeX - resizeStartX;
        dy = currentResizeY - resizeStartY;
        if (resizeDirection === "br") {
            selectElement.style.width = `${startWidth + dx}px`;
            selectElement.style.height = `${startHeight + dy}px`;
        } else if (resizeDirection === "tl") {
            selectElement.style.width = `${startWidth - dx}px`;
            selectElement.style.height = `${startHeight - dy}px`;
            selectElement.style.top = `${startTop + dy}px`;
            selectElement.style.left = `${startLeft + dx}px`;
        } else if (resizeDirection === "tr") {
            selectElement.style.width = `${startWidth + dx}px`;
            selectElement.style.height = `${startHeight - dy}px`;
            selectElement.style.top = `${startTop + dy}px`;
        } else if (resizeDirection === "bl") {
            selectElement.style.width = `${startWidth - dx}px`;
            selectElement.style.height = `${startHeight + dy}px`;
            selectElement.style.left = `${startLeft + dx}px`;
        }

    }

    // move selected element
    if (isMoving) {
        let rect = workSpace.getBoundingClientRect();
        let currentMouseX = e.clientX - rect.left;
        let currentMouseY = e.clientY - rect.top;

        dx = currentMouseX - mouseStartX;
        dy = currentMouseY - mouseStartY;

        selectElement.style.left = `${elementStartX + dx}px`;
        selectElement.style.top = `${elementStartY + dy}px`;
        saveToLocalStorage();
    }

    // resize element while creating
    if (isCreating === false || rectangle === null) return;

    const rect = workSpace.getBoundingClientRect();
    currentX = e.clientX - rect.left;
    currentY = e.clientY - rect.top;

    rectangle.style.width = `${currentX - startX}px`;
    rectangle.style.height = `${currentY - startY}px`;
});

// mouse up handler to finalize creation or movement
workSpace.addEventListener('mouseup', (e) => {
    // stop resizing element
    if (isResizing) {
        isResizing = false;
        resizeDirection = null;
        saveToLocalStorage();
        return;
    }

    // stop moving element
    if (isMoving) {
        isMoving = false;
        return;
    }

    // stop creating element
    if (isCreating === false) return;
    isCreating = false;
    saveToLocalStorage();

    // auto select newly created element
    if (selectElement !== null) {
        selectElement.classList.remove('selected');
        selectElement = null;
    }

    selectElement = rectangle;
    // remove old handler if any
    selectElement.classList.add('selected');
    selectElement.querySelectorAll('.handler').forEach(h => h.remove());
    addResizeHandlers();
    justCreated = true;
    rectangle = null;
    updateCursor();
    setActiveTool(selectTool);
    layersManger(); // manage layers
    syncLayer(); // update layer selection
});

// handle element selection
workSpace.addEventListener('click', (e) => {

    // skip click right after creation
    if (justCreated) {
        justCreated = false;
        return;
    }

    // deselect if clicked on empty space
    if (e.target === workSpace) {
        if (selectElement) {
            selectElement.classList.remove('selected');
            // remove old handler if any
            selectElement.querySelectorAll('.handler').forEach(h => h.remove());
            selectElement = null;
        }
        return;
    }

    // select clicked element
    if (selectElement) {
        selectElement.classList.remove('selected');
        // remove old handler if any
        selectElement.querySelectorAll('.handler').forEach(h => h.remove());
    }
    selectElement = e.target;
    selectElement.classList.add('selected');
    addResizeHandlers();
    syncLayer();
});

// delete selected element using keyboard
document.addEventListener('keydown', (e) => {
    if (isEditingText === true) return;

    if (e.key == 'Backspace' || e.key == 'Delete') {
        if (selectElement) {
            selectElement.remove();
            selectElement = null;
            isCreating = false;
            justCreated = false;
            isMoving = false;
            setActiveTool(selectTool);
            rectangle = null;
            saveToLocalStorage();
            layersManger();
        }
    }
});

// export canvas data as json
let exportJSON = document.getElementById('export-json');
exportJSON.addEventListener('click', (e) => {
    let allChildren = [...workSpace.children];
    let elements = [];

    allChildren.forEach((el, i) => {
        elements[i] = {
            elementType: `${el.className.replace(" selected", "")}`,
            height: `${el.style.height}`,
            width: `${el.style.width}`,
            top: `${el.style.top}`,
            left: `${el.style.left}`,
            rotation: el.getAttribute('rotation'),
        };
    });

    const jsonData = JSON.stringify(elements, null, 2);
    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "design.json";
    a.click();
    URL.revokeObjectURL(url);
});

// export canvas as html file
let exportHTML = document.getElementById('export-html');
exportHTML.addEventListener('click', (el) => {
    let htmlContent = "";
    [...workSpace.children].forEach(el => {
        htmlContent += `${el.outerHTML}\n`;
    });

    let html = `
    <!DOCTYPE html>
    <html lang="en">
    <head><style> body {position: relative;}</style></head>
    <body>${htmlContent}</body>
    </html>
    `;

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "index.html";
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
});

// share button copies current url
shareBtn = document.getElementById('share-btn');
const label = document.querySelector('.label');
shareBtn.addEventListener('click', (e) => {
    navigator.clipboard.writeText(window.location.href);
    label.innerText = "Copied";
    setTimeout(() => label.innerText = "Share", 3000);
});

// rotate selected element by 15 degrees
rotationTool.addEventListener('click', () => {
    if (!selectElement) return;
    let rotationData = +(selectElement.getAttribute('rotation')) + 15;
    selectElement.style.transform = `rotate(${rotationData}deg)`;
    selectElement.setAttribute('rotation', rotationData);
    saveToLocalStorage();
});

// move element using arrow keys
document.addEventListener('keydown', (e) => {
    if (!selectElement || isEditingText) return;
    e.preventDefault();

    if (e.key === 'ArrowUp') selectElement.style.top = `${+(selectElement.style.top.replace("px", "")) - 5}px`;
    if (e.key === 'ArrowDown') selectElement.style.top = `${+(selectElement.style.top.replace("px", "")) + 5}px`;
    if (e.key === 'ArrowLeft') selectElement.style.left = `${+(selectElement.style.left.replace("px", "")) - 5}px`;
    if (e.key === 'ArrowRight') selectElement.style.left = `${+(selectElement.style.left.replace("px", "")) + 5}px`;

    saveToLocalStorage();
});

// save canvas state to local storage
function saveToLocalStorage() {
    let elements = [];

    [...workSpace.children].forEach((el, i) => {
        let type = "rectangle";
        if (el.classList.contains("text-box")) type = "text-box";
        else if (el.classList.contains("circle")) type = "circle";

        elements[i] = {
            elementType: type,
            height: el.style.height,
            width: el.style.width,
            top: el.style.top,
            left: el.style.left,
            rotation: el.getAttribute('rotation'),
            text: el.classList.contains("text-box") ? el.textContent : "",
        };
    });

    localStorage.setItem("editorData", JSON.stringify(elements, null, 2));
}

// load saved data from local storage on page load
function loadFromLocalStorage() {
    const data = localStorage.getItem("editorData");
    if (!data) return;

    JSON.parse(data).forEach(el => {
        let eli = document.createElement('div');
        eli.classList.add(el.elementType);
        eli.style.position = "absolute";
        eli.style.height = el.height;
        eli.style.width = el.width;
        eli.style.top = el.top;
        eli.style.left = el.left;
        eli.setAttribute("rotation", el.rotation);
        eli.style.transform = `rotate(${el.rotation}deg)`;
        eli.style.border = "4px solid black";

        if (el.elementType === "text-box") {
            eli.contentEditable = true;
            eli.textContent = el.text;
            eli.addEventListener('focus', () => isEditingText = true);
            eli.addEventListener('blur', () => {
                isEditingText = false;
                saveToLocalStorage();
            });
        }
        workSpace.appendChild(eli);
    });
    layersManger();
}
loadFromLocalStorage();

// manual save button
saveBtn.addEventListener('click', () => {
    saveToLocalStorage();
});

// clear all button
deleteBtn.addEventListener('click', () => {
    workSpace.innerHTML = "";
    localStorage.removeItem("editorData");
    selectElement = null;
    setActiveTool(selectTool);
    layersManger();
});

// update cursor based on active tool
function updateCursor() {
    if (activeTool === textTool) {
        workSpace.style.cursor = "text";
    } else {
        workSpace.style.cursor = "pointer";
    }
}

// helper function to manage active tool state
function setActiveTool(tool) {
    if (activeTool) activeTool.classList.remove('active-tool');
    activeTool = tool;
    activeTool.classList.add('active-tool');
    updateCursor();
}

// handler for resizing element
function addResizeHandlers() {
    if (!selectElement) return;
    // remove old handler if any
    selectElement.querySelectorAll('.handler').forEach(h => h.remove());

    // top left handler
    let topLeft = document.createElement('div');
    topLeft.id = "top-left";
    topLeft.classList.add('handler');
    topLeft.style.top = "0%";
    topLeft.style.left = "0%";
    topLeft.dataset.dir = "tl";
    selectElement.appendChild(topLeft);

    // top right handler
    let topRight = document.createElement('div');
    topRight.id = "top-right";
    topRight.classList.add('handler');
    topRight.style.top = "0%";
    topRight.style.left = "100%";
    topRight.dataset.dir = "tr";
    selectElement.appendChild(topRight);

    // bottom left handler
    let bottomLeft = document.createElement('div');
    bottomLeft.id = "bottom-left";
    bottomLeft.classList.add('handler');
    bottomLeft.style.top = "100%";
    bottomLeft.style.left = "0%";
    bottomLeft.dataset.dir = "bl";
    selectElement.appendChild(bottomLeft);

    // bottom right handler
    let bottomRight = document.createElement('div');
    bottomRight.id = "bottom-right";
    bottomRight.classList.add('handler');
    bottomRight.style.top = "100%";
    bottomRight.style.left = "100%";
    bottomRight.dataset.dir = "br";
    selectElement.appendChild(bottomRight);
}

// layers: generate layers according to the canvas
function layersManger() {
    // remove all the layers which was present earlier
    layers.innerHTML = '';
    let elements = [...workSpace.children];
    elements.forEach((el) => {
        let div = document.createElement('div');
        div.classList.add('layer-div');
        div.textContent = el.id;
        // store direct reference to canvas element
        div.elementRef = el;
        layers.prepend(div);
        // selection logic, manage element from layers panel
        div.addEventListener('click', () => {
            if (selectElement) {
                selectElement.classList.remove('selected');
                selectElement.querySelectorAll('.handler').forEach(h => h.remove());
            }
            selectElement = div.elementRef;
            selectElement.classList.add('selected');
            addResizeHandlers();
            syncLayer();
        });
        console.log(div.elementRef === el); // should be true
    });
}

// backward or farword buttons: manage layers
let backward = document.getElementById('backward');
let forward = document.getElementById('forward');
// move element backward
backward.addEventListener('click', (el) => {
    if (!selectElement) return;
    elements = [...workSpace.children];
    const previousElement = selectElement.previousElementSibling;
    if (previousElement) {
        workSpace.insertBefore(selectElement, previousElement);
        layersManger();
    }
});
// move element forward
forward.addEventListener('click', () => {
    if (!selectElement) return;
    const nextElement = selectElement.nextElementSibling;
    if (nextElement) {
        workSpace.insertBefore(nextElement, selectElement);
        layersManger();
    }
});

// sync layer with selection
function syncLayer() {
    let layers = document.querySelectorAll('.layer-div');
    layers.forEach((el) => {
        if (selectElement) {
            el.classList.remove('active-layer');
        }
        if (selectElement === el.elementRef) {
            el.classList.add('active-layer');
        }
    });
}