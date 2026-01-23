// selecting tools
let selectTool = document.getElementById("select-tool");
let textTool = document.getElementById("text-tool");
let rectangleTool = document.getElementById("rectangle-tool");
let circleTool = document.getElementById("circle-tool");
let pencilTool = document.getElementById("pencil-tool");
let rotationTool = document.getElementById("rotate-btn");

// prevent deafult behaviour
document.addEventListener('contextmenu', event => event.preventDefault());


// selecting workspace
let workSpace = document.getElementById("work-space");

// selecting element
let selectElement = null;

// varaible that manage states
let activeTool = document.getElementById("select-tool");

// visual effect on active element
activeTool.classList.add('active-tool');
selectTool.addEventListener('click', () => {
    if (activeTool !== selectTool) activeTool.classList.remove('active-tool');
    activeTool = selectTool;
    activeTool.classList.add('active-tool');
})
textTool.addEventListener('click', () => {
    if (activeTool !== textTool) activeTool.classList.remove('active-tool');
    activeTool = textTool;
    activeTool.classList.add('active-tool');
});
circleTool.addEventListener('click', () => {
    if (activeTool !== circleTool) activeTool.classList.remove('active-tool');
    activeTool = circleTool;
    activeTool.classList.add('active-tool');
})
rectangleTool.addEventListener('click', () => {
    if (activeTool !== rectangleTool) activeTool.classList.remove('active-tool');
    activeTool = rectangleTool;
    activeTool.classList.add('active-tool');
});
pencilTool.addEventListener('click', () => {
    if (activeTool !== pencilTool) activeTool.classList.remove('active-tool');
    activeTool = pencilTool;
    activeTool.classList.add('active-tool');
});

// creating a dynamic element
let startX = 0, startY = 0, isCreating = false, justCreated = false;
let currentX = 0, currentY = 0;
let rectangle = null;
// movement variables
let isMoving = false;
let mouseStartX = 0;
let mouseStartY = 0;
let elementStartX = 0;
let elementStartY = 0;
let dx = 0, dy = 0; // calculate cursor movement

workSpace.addEventListener('mousedown', (e) => {
    if (activeTool === selectTool && selectElement && selectElement === e.target) {
        isMoving = true;
        let rect = workSpace.getBoundingClientRect();

        // calculate mouse start postition
        mouseStartX = e.clientX - rect.left;
        mouseStartY = e.clientY - rect.top;

        // element start position
        elementStartX = +(selectElement.style.left.replace("px", ""));
        elementStartY = +(selectElement.style.top.replace("px", ""));
        return;
    }
    // decide: we are creating a element or selecting
    if (activeTool !== selectTool) {
        isCreating = true;
    } else {
        isCreating = false;
    }
    const rect = workSpace.getBoundingClientRect();

    startX = e.clientX - rect.left; // calculate initial position of element in x plane
    startY = e.clientY - rect.top; // calculate initial position of element in y plane
    // creating a rectangle when tool is active
    if (isCreating === true) {
        if (activeTool === rectangleTool) {
            rectangle = document.createElement('div');
            rectangle.style.position = "absolute";
            rectangle.style.left = `${startX}px`;
            rectangle.style.top = `${startY}px`;
            rectangle.style.width = "0px";
            rectangle.style.height = "0px";
            rectangle.style.border = "4px solid black";
            rectangle.classList.add('rectangle');
            rectangle.setAttribute('rotation', 0);
            workSpace.appendChild(rectangle);
        }
        if (activeTool === circleTool) {
            rectangle = document.createElement('div');
            rectangle.style.position = "absolute";
            rectangle.style.left = `${startX}px`;
            rectangle.style.top = `${startY}px`;
            rectangle.style.width = "0px";
            rectangle.style.height = "0px";
            rectangle.style.border = "4px solid black";
            rectangle.classList.add('circle');
            rectangle.setAttribute('rotation', 0);
            workSpace.appendChild(rectangle);
        }
    }
});
// drag to create element
workSpace.addEventListener('mousemove', (e) => {
    if (isMoving) {
        let rect = workSpace.getBoundingClientRect();
        let currentMouseX = e.clientX - rect.left;
        let currentMouseY = e.clientY - rect.top;

        dx = currentMouseX - mouseStartX;
        dy = currentMouseY - mouseStartY;

        selectElement.style.left = `${elementStartX + dx}px`;
        selectElement.style.top = `${elementStartY + dy}px`;
    }
    if (isCreating === false || rectangle === null) return;
    const rect = workSpace.getBoundingClientRect();
    currentX = e.clientX - rect.left;
    currentY = e.clientY - rect.top;
    rectangle.style.width = `${currentX - startX}px`
    rectangle.style.height = `${currentY - startY}px`
});
// stop draging, & element will be created
workSpace.addEventListener('mouseup', (e) => {
    // stop moving
    if (isMoving) {
        isMoving = false;
        return;
    }
    if (isCreating === false) return;
    else {
        isCreating = false;
    }
    // make element selected just after creation
    if (selectElement !== null) {
        selectElement.classList.remove('selected');
        selectElement = null;
    }
    selectElement = rectangle;
    selectElement.classList.add('selected');
    justCreated = true;
    rectangle = null;
})

// selecting element after creation
workSpace.addEventListener('click', (e) => {
    // fix element not auto selecting issue just after creation
    if (justCreated === true) {
        justCreated = false;
        return;
    }
    if (e.target !== workSpace) {
        if (selectElement != null) {
            selectElement.classList.remove('selected');
            selectElement = e.target;
            selectElement.classList.add('selected');
        }
    } else {
        if (selectElement !== null) {
            selectElement.classList.remove('selected');
        }
    }
});

//  remove element on pressing delete key
document.addEventListener('keydown', (e) => {
    if (e.key == 'Backspace' || e.key == 'Delete') {
        if (selectElement) {
            selectElement.remove();
            selectElement = null;
        } else {
            return;
        }
    }
});

//  export json
let exportJSON = document.getElementById('export-json');
exportJSON.addEventListener('click', (e) => {
    let allChildren = [...workSpace.children];
    let elements = [];
    let i = 0;
    allChildren.forEach((el) => {
        console.log(el.style);
        elements[i] = {
            elementType: `${el.className.replace(" selected", "")}`,
            height: `${el.style.height}`,
            width: `${el.style.width}`,
            top: `${el.style.top}`,
            left: `${el.style.left}`,
        }
        i++;
    })
    // convert JS object to JSON string (used json template that present on the internet)
    const jsonData = JSON.stringify(elements, null, 2);
    // create a file-like object
    const blob = new Blob([jsonData], { type: "application/json" });
    // create a temporary download link
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "design.json";
    // trigger download
    a.click();
    // cleanup
    URL.revokeObjectURL(url);
});

// export html
let exportHTML = document.getElementById('export-html');
exportHTML.addEventListener('click', (el) => {
    let allChildren = [...workSpace.children];
    let htmlContent = "";
    allChildren.map((el) => {
        htmlContent += `${el.outerHTML}\n`;
    })
    let html = `
     <!DOCTYPE html>
        <html lang="en">
            <head>
                <style> body {position: relative;}</style>
            </head>
            <body>
                ${htmlContent}
            </body>
        </html>
    `;
    // create a file-like object
    const blob = new Blob([html], { type: "text/html" });
    // create a temporary download link
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "index.html";
    // trigger download
    document.body.appendChild(a);
    a.click();
    // cleanup
    URL.revokeObjectURL(url);
})

// share button -> copy to clipboard
shareBtn = document.getElementById('share-btn');
const label = document.querySelector('.label');
shareBtn.addEventListener('click', (e) => {
    const url = window.location.href; // get url from window
    navigator.clipboard.writeText(url);
    label.innerText = "Copied";
    setTimeout(() => {
        label.innerText = "Share";
    }, 3000)
});

// rotation element on click of rotate icon by 30 Degree
rotationTool.addEventListener('click', () => {
    if (!selectElement) return; // if selectElement is empty return;
    let rotationData = +(selectElement.getAttribute('rotation')) + 15;
    selectElement.style.transform = `rotate(${rotationData}deg)`;
    selectElement.setAttribute('rotation', rotationData);
    // click feedback
    rotationTool.style.color = "royalblue";

    setTimeout(() => {
        rotationTool.style.color = "";
    }, 200);
});
