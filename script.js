// selecting tools
let selectTool = document.getElementById("select-tool");
let textTool = document.getElementById("text-tool");
let rectangleTool = document.getElementById("rectangle-tool");
let circleTool = document.getElementById("circle-tool");
let pencilTool = document.getElementById("pencil-tool");

// selecting workspace
let workSpace = document.getElementById("work-space");

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

