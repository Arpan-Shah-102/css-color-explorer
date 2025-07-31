// Complete list of all 147+ CSS color names
const cssColors = [
    'aliceblue', 'antiquewhite', 'aqua', 'aquamarine', 'azure',
    'beige', 'bisque', 'black', 'blanchedalmond', 'blue', 'blueviolet', 'brown', 'burlywood',
    'cadetblue', 'chartreuse', 'chocolate', 'coral', 'cornflowerblue', 'cornsilk', 'crimson', 'cyan',
    'darkblue', 'darkcyan', 'darkgoldenrod', 'darkgray', 'darkgrey', 'darkgreen', 'darkkhaki', 
    'darkmagenta', 'darkolivegreen', 'darkorange', 'darkorchid', 'darkred', 'darksalmon', 
    'darkseagreen', 'darkslateblue', 'darkslategray', 'darkslategrey', 'darkturquoise', 
    'darkviolet', 'deeppink', 'deepskyblue', 'dimgray', 'dimgrey', 'dodgerblue',
    'firebrick', 'floralwhite', 'forestgreen', 'fuchsia',
    'gainsboro', 'ghostwhite', 'gold', 'goldenrod', 'gray', 'grey', 'green', 'greenyellow',
    'honeydew', 'hotpink',
    'indianred', 'indigo', 'ivory',
    'khaki',
    'lavender', 'lavenderblush', 'lawngreen', 'lemonchiffon', 'lightblue', 'lightcoral', 
    'lightcyan', 'lightgoldenrodyellow', 'lightgray', 'lightgrey', 'lightgreen', 'lightpink', 
    'lightsalmon', 'lightseagreen', 'lightskyblue', 'lightslategray', 'lightslategrey', 
    'lightsteelblue', 'lightyellow', 'lime', 'limegreen', 'linen',
    'magenta', 'maroon', 'mediumaquamarine', 'mediumblue', 'mediumorchid', 'mediumpurple', 
    'mediumseagreen', 'mediumslateblue', 'mediumspringgreen', 'mediumturquoise', 
    'mediumvioletred', 'midnightblue', 'mintcream', 'mistyrose', 'moccasin',
    'navajowhite', 'navy',
    'oldlace', 'olive', 'olivedrab', 'orange', 'orangered', 'orchid',
    'palegoldenrod', 'palegreen', 'paleturquoise', 'palevioletred', 'papayawhip', 'peachpuff', 
    'peru', 'pink', 'plum', 'powderblue', 'purple',
    'rebeccapurple', 'red', 'rosybrown', 'royalblue',
    'saddlebrown', 'salmon', 'sandybrown', 'seagreen', 'seashell', 'sienna', 'silver', 
    'skyblue', 'slateblue', 'slategray', 'slategrey', 'snow', 'springgreen', 'steelblue',
    'tan', 'teal', 'thistle', 'tomato', 'turquoise',
    'violet',
    'wheat', 'white', 'whitesmoke',
    'yellow', 'yellowgreen'
];

// State management
let usedColors = new Set();

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    initializeColorExplorer();
    loadUsedColors();
});

// Initialize the color explorer
function initializeColorExplorer() {
    const container = document.getElementById('color-container');
    
    if (!container) {
        console.error('Color container not found!');
        return;
    }
    
    // Add loading indicator
    container.innerHTML = '<div class="loading">Loading colors...</div>';
    
    // Generate color entries with a slight delay for smooth loading
    setTimeout(() => {
        generateColorEntries();
    }, 100);
}

// Generate all color entries
function generateColorEntries() {
    const container = document.getElementById('color-container');
    container.innerHTML = '';
    
    cssColors.forEach((color, index) => {
        const colorEntry = createColorEntry(color, index);
        container.appendChild(colorEntry);
    });
    
    console.log(`Generated ${cssColors.length} color entries`);
}

// Create a single color entry
function createColorEntry(colorName, index) {
    // Create main container
    const entry = document.createElement('div');
    entry.className = 'color-entry';
    entry.setAttribute('data-color', colorName);
    
    // Create checkbox
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = 'color-checkbox';
    checkbox.id = `color-${index}`;
    checkbox.checked = usedColors.has(colorName);
    
    // Create color button
    const button = document.createElement('button');
    button.className = 'color-button';
    button.textContent = colorName;
    button.style.backgroundColor = colorName;
    button.style.color = getContrastColor(colorName);
    
    // Add event listeners
    checkbox.addEventListener('change', () => handleCheckboxChange(colorName, entry));
    button.addEventListener('click', () => changeBackgroundColor(colorName));
    
    // Append elements
    entry.appendChild(checkbox);
    entry.appendChild(button);
    
    // Apply used state if necessary
    if (usedColors.has(colorName)) {
        entry.classList.add('used');
    }
    
    return entry;
}

// Handle checkbox state changes
function handleCheckboxChange(colorName, entry) {
    const checkbox = entry.querySelector('.color-checkbox');
    
    if (checkbox.checked) {
        usedColors.add(colorName);
        entry.classList.add('used');
    } else {
        usedColors.delete(colorName);
        entry.classList.remove('used');
    }
    
    saveUsedColors();
}

// Change the background color of the page
function changeBackgroundColor(colorName) {
    document.body.classList.add('transitioning');
    document.body.style.backgroundColor = colorName;
    
    // Update page title to show current color
    document.title = `CSS Color Explorer - ${colorName}`;
    
    // Remove transitioning class after animation
    setTimeout(() => {
        document.body.classList.remove('transitioning');
    }, 800);
    
    console.log(`Background changed to: ${colorName}`);
}

// Get contrasting text color for better readability
function getContrastColor(backgroundColor) {
    // Create a temporary element to get computed color
    const temp = document.createElement('div');
    temp.style.color = backgroundColor;
    document.body.appendChild(temp);
    
    const computedColor = window.getComputedStyle(temp).color;
    document.body.removeChild(temp);
    
    // Extract RGB values
    const rgb = computedColor.match(/\d+/g);
    
    if (rgb && rgb.length >= 3) {
        const r = parseInt(rgb[0]);
        const g = parseInt(rgb[1]);
        const b = parseInt(rgb[2]);
        
        // Calculate relative luminance
        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        
        // Return black for light colors, white for dark colors
        return luminance > 0.5 ? '#000000' : '#ffffff';
    }
    
    // Fallback
    return '#ffffff';
}

// Save used colors to localStorage
function saveUsedColors() {
    try {
        localStorage.setItem('cssColorExplorer_usedColors', JSON.stringify([...usedColors]));
    } catch (error) {
        console.warn('Could not save used colors to localStorage:', error);
    }
}

// Load used colors from localStorage
function loadUsedColors() {
    try {
        const saved = localStorage.getItem('cssColorExplorer_usedColors');
        if (saved) {
            usedColors = new Set(JSON.parse(saved));
        }
    } catch (error) {
        console.warn('Could not load used colors from localStorage:', error);
        usedColors = new Set();
    }
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    // Press 'R' to reset all checkboxes
    if (e.key.toLowerCase() === 'r' && e.ctrlKey) {
        e.preventDefault();
        resetAllColors();
    }
    
    // Press 'Escape' to reset background to default
    if (e.key === 'Escape') {
        resetBackground();
    }
});

// Reset all color checkboxes
function resetAllColors() {
    if (confirm('Are you sure you want to uncheck all colors?')) {
        usedColors.clear();
        saveUsedColors();
        
        // Update UI
        document.querySelectorAll('.color-checkbox').forEach(checkbox => {
            checkbox.checked = false;
        });
        
        document.querySelectorAll('.color-entry').forEach(entry => {
            entry.classList.remove('used');
        });
        
        console.log('All colors reset');
    }
}

// Reset background to default
function resetBackground() {
    document.body.classList.add('transitioning');
    document.body.style.backgroundColor = '#f5f5f5';
    document.title = 'CSS Color Explorer';
    
    setTimeout(() => {
        document.body.classList.remove('transitioning');
    }, 800);
    
    console.log('Background reset to default');
}

// Add search functionality
function addSearchFunctionality() {
    const header = document.querySelector('header');
    const searchContainer = document.createElement('div');
    searchContainer.style.marginTop = '1rem';
    
    const searchInput = document.createElement('input');
    searchInput.type = 'text';
    searchInput.placeholder = 'Search colors...';
    searchInput.style.padding = '0.5rem';
    searchInput.style.borderRadius = '8px';
    searchInput.style.border = '2px solid rgba(255,255,255,0.3)';
    searchInput.style.backgroundColor = 'rgba(255,255,255,0.2)';
    searchInput.style.color = 'white';
    searchInput.style.fontSize = '1rem';
    searchInput.style.maxWidth = '300px';
    searchInput.style.width = '100%';
    
    searchInput.addEventListener('input', filterColors);
    
    searchContainer.appendChild(searchInput);
    header.appendChild(searchContainer);
}

// Filter colors based on search input
function filterColors(e) {
    const searchTerm = e.target.value.toLowerCase();
    const colorEntries = document.querySelectorAll('.color-entry');
    
    colorEntries.forEach(entry => {
        const colorName = entry.getAttribute('data-color').toLowerCase();
        const isVisible = colorName.includes(searchTerm);
        
        entry.style.display = isVisible ? 'flex' : 'none';
    });
}

// Initialize search functionality after page load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(addSearchFunctionality, 200);
});

// Log website info
console.log(`CSS Color Explorer initialized with ${cssColors.length} colors`);
console.log('Keyboard shortcuts:');
console.log('- Ctrl+R: Reset all checkboxes');
console.log('- Escape: Reset background color');