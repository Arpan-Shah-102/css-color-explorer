// Comprehensive list of CSS color names (properly deduplicated)
const cssColors = [
    'aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure',
    'beige', 'bisque', 'black', 'blanchedalmond', 'blue', 'blueviolet', 'brown', 'burlywood',
    'cadetblue', 'chartreuse', 'chocolate', 'coral', 'cornflowerblue', 'cornsilk', 'crimson', 'cyan',
    'darkblue', 'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgreen', 'darkkhaki', 'darkmagenta',
    'darkolivegreen', 'darkorange', 'darkorchid', 'darkred', 'darksalmon', 'darkseagreen', 'darkslateblue',
    'darkslategray', 'darkturquoise', 'darkviolet', 'deeppink', 'deepskyblue', 'dimgray', 'dodgerblue',
    'firebrick', 'floralwhite', 'forestgreen', 'fuchsia',
    'gainsboro', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'green', 'greenyellow',
    'honeydew', 'hotpink',
    'indianred', 'indigo', 'ivory',
    'khaki',
    'lavender', 'lavenderblush', 'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral', 'lightcyan',
    'lightgoldenrodyellow', 'lightgray', 'lightgreen', 'lightpink', 'lightsalmon',
    'lightseagreen', 'lightskyblue', 'lightslategray', 'lightsteelblue', 'lightyellow',
    'lime', 'limegreen', 'linen',
    'magenta', 'maroon', 'mediumaquamarine', 'mediumblue', 'mediumorchid', 'mediumpurple', 'mediumseagreen',
    'mediumslateblue', 'mediumspringgreen', 'mediumturquoise', 'mediumvioletred', 'midnightblue',
    'mintcream', 'mistyrose', 'moccasin',
    'navajowhite', 'navy',
    'oldlace', 'olive', 'olivedrab', 'orange', 'orangered', 'orchid',
    'palegoldenrod', 'palegreen', 'paleturquoise', 'palevioletred', 'papayawhip', 'peachpuff', 'peru',
    'pink', 'plum', 'powderblue', 'purple',
    'rebeccapurple', 'red', 'rosybrown', 'royalblue',
    'saddlebrown', 'salmon', 'sandybrown', 'seagreen', 'seashell', 'sienna', 'silver', 'skyblue',
    'slateblue', 'slategray', 'snow', 'springgreen', 'steelblue',
    'tan', 'teal', 'thistle', 'tomato', 'turquoise',
    'violet',
    'wheat', 'white', 'whitesmoke',
    'yellow', 'yellowgreen'
];

let currentColor = 'goldenrod';
let checkedColors = new Set();
let exampleSectionBackgroundMode = 'white';
let customExampleBackgroundColor = '#ffffff';
let tooltip = null;
let isInitialized = false; // Flag to prevent double initialization

// Function to convert hex to RGB
function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

// Function to convert RGB to hex
function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

// Function to get RGB values from color name
function getColorRgb(color) {
    const tempElement = document.createElement('div');
    tempElement.style.color = color;
    document.body.appendChild(tempElement);
    
    const computedColor = window.getComputedStyle(tempElement).color;
    document.body.removeChild(tempElement);
    
    const rgb = computedColor.match(/\d+/g);
    if (rgb) {
        return {
            r: parseInt(rgb[0]),
            g: parseInt(rgb[1]),
            b: parseInt(rgb[2])
        };
    }
    return { r: 0, g: 0, b: 0 };
}

// Function to get opposite color
function getOppositeColor(color) {
    const rgb = getColorRgb(color);
    const oppositeR = 255 - rgb.r;
    const oppositeG = 255 - rgb.g;
    const oppositeB = 255 - rgb.b;
    return rgbToHex(oppositeR, oppositeG, oppositeB);
}

// Function to determine if a color is dark or light
function isColorDark(color) {
    const rgb = getColorRgb(color);
    const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255;
    return luminance < 0.5;
}

// Function to get example section background color based on mode
function getExampleSectionBackgroundColor() {
    switch (exampleSectionBackgroundMode) {
        case 'white':
            return 'white';
        case 'black':
            return 'black';
        case 'opposite':
            return getOppositeColor(currentColor);
        case 'custom':
            return customExampleBackgroundColor;
        default:
            return 'white';
    }
}

// Function to determine text color for example section
function getExampleSectionTextColor() {
    const backgroundColor = getExampleSectionBackgroundColor();
    return isColorDark(backgroundColor) ? 'white' : 'black';
}

// Function to update button styles based on current color
function updateButtonStyles() {
    const exampleBackgroundColor = getExampleSectionBackgroundColor();
    const textColor = getExampleSectionTextColor();
    
    // Update example section background
    const exampleSection = document.getElementById('exampleSection');
    exampleSection.style.backgroundColor = exampleBackgroundColor;
    exampleSection.className = `example-section ${isColorDark(exampleBackgroundColor) ? 'dark-section' : 'light-section'}`;
    
    // Update CSS custom properties for buttons
    const style = document.createElement('style');
    style.textContent = `
        .primary {
            background-color: ${currentColor};
            color: ${exampleBackgroundColor};
            border-color: ${currentColor};
        }
        
        .primary:disabled:hover,
        .primary:disabled:active {
            background-color: ${currentColor};
            color: ${exampleBackgroundColor};
        }
        
        .primary:hover {
            background-color: transparent;
            color: ${currentColor};
            border-color: ${currentColor};
        }
        
        .primary:active {
            background-color: ${currentColor};
            color: ${exampleBackgroundColor};
        }
        
        .secondary {
            background-color: transparent;
            color: ${currentColor};
            border-color: ${currentColor};
        }
        
        .secondary:disabled:hover,
        .secondary:disabled:active {
            background-color: transparent;
            color: ${currentColor};
        }
        
        .secondary:hover {
            background-color: ${currentColor};
            color: ${exampleBackgroundColor};
        }
        
        .secondary:active {
            background-color: transparent;
            color: ${currentColor};
        }
        
        .tertiary:hover {
            border-color: ${currentColor};
            color: ${currentColor};
        }
        
        .tertiary:active {
            background-color: ${currentColor};
            color: ${exampleBackgroundColor};
        }
    `;
    
    // Remove previous dynamic styles
    const existingStyle = document.getElementById('dynamic-styles');
    if (existingStyle) {
        existingStyle.remove();
    }
    
    style.id = 'dynamic-styles';
    document.head.appendChild(style);
}

// Function to change background color (main website background)
function changeBackgroundColor(color) {
    currentColor = color;
    // Change the main website background to the selected color
    document.body.style.backgroundColor = color;
    updateButtonStyles();
}

// Function to update example section background based on mode change
function updateExampleSectionBackground() {
    updateButtonStyles();
}

// Function to toggle checkbox
function toggleCheckbox(colorName, checkbox) {
    const colorItem = checkbox.closest('.color-item');
    const colorNameElement = colorItem.querySelector('.color-name');
    
    if (checkbox.checked) {
        checkedColors.add(colorName);
        colorNameElement.classList.add('crossed-out');
        colorItem.classList.add('crossed-out');
    } else {
        checkedColors.delete(colorName);
        colorNameElement.classList.remove('crossed-out');
        colorItem.classList.remove('crossed-out');
    }
}

// Tooltip functionality
function setupTooltip() {
    tooltip = document.getElementById('tooltip');
    
    function showTooltip(element, text) {
        if (!tooltip) return;
        
        tooltip.textContent = text;
        tooltip.classList.add('show');
        
        const rect = element.getBoundingClientRect();
        const tooltipRect = tooltip.getBoundingClientRect();
        
        let left = rect.left + (rect.width / 2) - (tooltipRect.width / 2);
        let top = rect.top - tooltipRect.height - 10;
        
        // Keep tooltip within viewport
        if (left < 10) left = 10;
        if (left + tooltipRect.width > window.innerWidth - 10) {
            left = window.innerWidth - tooltipRect.width - 10;
        }
        if (top < 10) {
            top = rect.bottom + 10;
        }
        
        tooltip.style.left = left + 'px';
        tooltip.style.top = top + 'px';
    }
    
    function hideTooltip() {
        if (tooltip) {
            tooltip.classList.remove('show');
        }
    }
    
    return { showTooltip, hideTooltip };
}

// Function to create color item
function createColorItem(colorName, tooltipFunctions) {
    const colorItem = document.createElement('div');
    colorItem.className = 'color-item';
    
    const colorButton = document.createElement('div');
    colorButton.className = 'color-button';
    colorButton.style.backgroundColor = colorName;
    colorButton.addEventListener('click', () => changeBackgroundColor(colorName));
    
    const colorInfo = document.createElement('div');
    colorInfo.className = 'color-info';
    
    const colorNameSpan = document.createElement('span');
    colorNameSpan.className = 'color-name';
    colorNameSpan.textContent = colorName;
    
    // Add tooltip functionality to the color name span
    if (tooltipFunctions) {
        let hoverTimeout;
        
        colorNameSpan.addEventListener('mouseenter', (e) => {
            clearTimeout(hoverTimeout);
            hoverTimeout = setTimeout(() => {
                tooltipFunctions.showTooltip(colorNameSpan, colorName);
            }, 300);
        });
        
        colorNameSpan.addEventListener('mouseleave', () => {
            clearTimeout(hoverTimeout);
            tooltipFunctions.hideTooltip();
        });
    }
    
    const checkboxContainer = document.createElement('div');
    checkboxContainer.className = 'checkbox-container';
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'checkbox';
    checkbox.addEventListener('change', () => toggleCheckbox(colorName, checkbox));
    
    checkboxContainer.appendChild(checkbox);
    colorInfo.appendChild(colorNameSpan);
    colorInfo.appendChild(checkboxContainer);
    
    colorItem.appendChild(colorButton);
    colorItem.appendChild(colorInfo);
    
    return colorItem;
}

// Function to initialize the color grid
function initializeColorGrid() {
    // Prevent double initialization
    if (isInitialized) {
        console.log('⚠️ Prevented double initialization of color grid');
        return;
    }
    
    const colorsGrid = document.getElementById('colorsGrid');
    
    // Clear any existing content
    colorsGrid.innerHTML = '';
    
    const tooltipFunctions = setupTooltip();
    
    console.log(`🎨 Loading ${cssColors.length} unique colors...`);
    
    cssColors.forEach((colorName, index) => {
        const colorItem = createColorItem(colorName, tooltipFunctions);
        
        // Add staggered animation delay
        colorItem.style.animationDelay = `${index * 0.005}s`;
        colorsGrid.appendChild(colorItem);
    });
    
    console.log(`✅ Successfully loaded ${colorsGrid.children.length} color items`);
    isInitialized = true;
}

// Function to setup background controls for example section
function setupBackgroundControls() {
    const radioButtons = document.querySelectorAll('input[name="background-mode"]');
    const customColorContainer = document.getElementById('customColorContainer');
    const customColorPicker = document.getElementById('customColorPicker');
    
    radioButtons.forEach(radio => {
        radio.addEventListener('change', (e) => {
            exampleSectionBackgroundMode = e.target.value;
            
            if (exampleSectionBackgroundMode === 'custom') {
                customColorContainer.style.display = 'flex';
            } else {
                customColorContainer.style.display = 'none';
            }
            
            updateExampleSectionBackground();
        });
    });
    
    customColorPicker.addEventListener('change', (e) => {
        customExampleBackgroundColor = e.target.value;
        if (exampleSectionBackgroundMode === 'custom') {
            updateExampleSectionBackground();
        }
    });
}

// Function to setup search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const colorItems = document.querySelectorAll('.color-item');
        
        colorItems.forEach(item => {
            const colorName = item.querySelector('.color-name').textContent.toLowerCase();
            if (colorName.includes(searchTerm)) {
                item.style.display = 'flex';
            } else {
                item.style.display = 'none';
            }
        });
    });
}

// Function to setup reset button
function setupResetButton() {
    const resetButton = document.getElementById('resetButton');
    
    resetButton.addEventListener('click', () => {
        // Reset color
        currentColor = 'goldenrod';
        document.body.style.backgroundColor = 'goldenrod';
        
        // Reset example section background mode
        exampleSectionBackgroundMode = 'white';
        document.querySelector('input[value="white"]').checked = true;
        document.getElementById('customColorContainer').style.display = 'none';
        
        // Reset custom color
        customExampleBackgroundColor = '#ffffff';
        document.getElementById('customColorPicker').value = '#ffffff';
        
        // Update example section
        updateExampleSectionBackground();
        
        // Reset checkboxes
        checkedColors.clear();
        document.querySelectorAll('.checkbox').forEach(checkbox => {
            checkbox.checked = false;
        });
        document.querySelectorAll('.color-name').forEach(name => {
            name.classList.remove('crossed-out');
        });
        document.querySelectorAll('.color-item').forEach(item => {
            item.classList.remove('crossed-out');
        });
        
        // Reset search
        const searchInput = document.getElementById('searchInput');
        searchInput.value = '';
        document.querySelectorAll('.color-item').forEach(item => {
            item.style.display = 'flex';
        });
        
        // Hide tooltip
        if (tooltip) {
            tooltip.classList.remove('show');
        }
    });
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    // Only initialize once
    if (!isInitialized) {
        console.log('🚀 Initializing CSS Color Explorer...');
        
        initializeColorGrid();
        setupBackgroundControls();
        setupSearch();
        setupResetButton();
        updateButtonStyles();
        
        // Set initial background to goldenrod
        document.body.style.backgroundColor = 'goldenrod';
        
        // Add keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'r' && e.ctrlKey) {
                e.preventDefault();
                document.getElementById('resetButton').click();
            }
            
            // Hide tooltip on escape
            if (e.key === 'Escape' && tooltip) {
                tooltip.classList.remove('show');
            }
        });
        
        // Hide tooltip when scrolling
        window.addEventListener('scroll', () => {
            if (tooltip) {
                tooltip.classList.remove('show');
            }
        });
        
        // Hide tooltip when clicking anywhere
        document.addEventListener('click', () => {
            if (tooltip) {
                tooltip.classList.remove('show');
            }
        });
        
        // Final log
        setTimeout(() => {
            console.log(`✨ CSS Color Explorer fully loaded!`);
            console.log(`📊 Total colors: ${cssColors.length}`);
            console.log(`🎯 DOM elements created: ${document.querySelectorAll('.color-item').length}`);
            console.log('🔧 Fixed: Opacity 0.25 and transparent to example section background!');
        }, 500);
    }
});
