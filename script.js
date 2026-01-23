// selecting tools
let selectTool = document.getElementById("select-tool");
let textTool = document.getElementById("text-tool");
let rectangleTool = document.getElementById("rectangle-tool");
let circleTool = document.getElementById("circle-tool");
let pencilTool = document.getElementById("pencil-tool");

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
workSpace.addEventListener('mousedown', (e) => {
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
        rectangle = document.createElement('div');
        rectangle.style.position = "absolute";
        rectangle.style.left = `${startX}px`;
        rectangle.style.top = `${startY}px`;
        rectangle.style.width = "0px";
        rectangle.style.height = "0px";
        rectangle.style.border = "4px solid black";
        workSpace.appendChild(rectangle);
    }
});
// drag to create element
workSpace.addEventListener('mousemove', (e) => {
    if (isCreating === false || rectangle === null) return;
    const rect = workSpace.getBoundingClientRect();
    currentX = e.clientX - rect.left;
    currentY = e.clientY - rect.top;
    rectangle.style.width = `${currentX - startX}px`
    rectangle.style.height = `${currentY - startY}px`
});
// stop draging, & element will be created
workSpace.addEventListener('mouseup', (e) => {
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
            selectElement = null;
        }
    }
});
