
console.log("jay shree ganesh");

const container = document.getElementById('array-container');

function generateArray(size = 20) {
    const array = Array.from({ length: size }, () => Math.floor(Math.random() * 250) + 1);
    renderBars(array);
    console.log(array)
}

function renderBars(array) {
    container.innerHTML = ''; // Clear existing bars
    var clutter = '';
    array.forEach((value, index) => {
        clutter += `
        <div class="barWrapper" id=${index}>
            <div class="barHeight" style="height:${value}px"></div>
            <div class="barLabel">${value}</div>
        </div >
        `;
        container.innerHTML = clutter;
        // console.log(clutter)
    });
}

document.getElementById('generate').addEventListener('click', () => generateArray());
generateArray(); // Initial array generation

//bubble sort
async function bubbleSort() {
    const bars = document.querySelectorAll('.barWrapper');
    const labels = document.querySelectorAll('.barLabel');

    for (let i = 0; i < bars.length - 1; i++) {
        let swapped = false;
        for (let j = 0; j < bars.length - i - 1; j++) {
            // Highlight the two bars being compared
            bars[j].classList.add('highlight');
            bars[j + 1].classList.add('highlight');

            await sleep(200); // Pause for visualization

            let height1 = parseInt(bars[j].querySelector('.barHeight').style.height);
            let height2 = parseInt(bars[j + 1].querySelector('.barHeight').style.height);

            if (height1 > height2) {
                // Swap bar heights
                swapHeights(bars[j], bars[j + 1]);

                // Swap label values
                swapLabels(labels[j], labels[j + 1]);
                swapped = true;
            }

            // Remove the highlight
            bars[j].classList.remove('highlight');
            bars[j + 1].classList.remove('highlight');
        }
        // if (swapped == false) break;

        // Mark the sorted bar in a different color
        bars[bars.length - i - 1].classList.add('sorted');
    }

    // Mark the first bar as sorted after completion
    bars[0].classList.add('sorted');
}

// Function to swap bar heights
function swapHeights(bar1, bar2) {
    const barHeight1 = bar1.querySelector('.barHeight');
    const barHeight2 = bar2.querySelector('.barHeight');
    const tempHeight = barHeight1.style.height;
    barHeight1.style.height = barHeight2.style.height;
    barHeight2.style.height = tempHeight;
}

// Function to swap bar labels
function swapLabels(label1, label2) {
    const tempLabel = label1.innerText;
    label1.innerText = label2.innerText;
    label2.innerText = tempLabel;
}


// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, ms));
// }

document.getElementById('bubbleSort').addEventListener('click', bubbleSort);

// code of insertion
async function insertionSort() {
    const bars = document.querySelectorAll('.barWrapper'); // Select all bars
    const delay = 100; // Delay for visualization

    for (let i = 1; i < bars.length; i++) {
        let j = i - 1;
        let keyHeight = parseInt(bars[i].querySelector('.barHeight').style.height); // Get the height of the current bar
        let keyLabel = bars[i].querySelector('.barLabel').innerText; // Get the label of the current bar

        // Highlight the current bar
        bars[i].classList.add('highlight');
        await sleep(delay);

        // Shift bars that are greater than the keyHeight
        while (j >= 0 && parseInt(bars[j].querySelector('.barHeight').style.height) > keyHeight) {
            // Move the height and label of the bar
            bars[j + 1].querySelector('.barHeight').style.height = bars[j].querySelector('.barHeight').style.height;
            bars[j + 1].querySelector('.barLabel').innerText = bars[j].querySelector('.barLabel').innerText;

            // Highlight the bar being compared
            bars[j].classList.add('compare');
            await sleep(delay);
            bars[j].classList.remove('compare');

            j--;
        }

        // Place the key element in its correct position
        bars[j + 1].querySelector('.barHeight').style.height = `${keyHeight}px`;
        bars[j + 1].querySelector('.barLabel').innerText = keyLabel;

        // Remove highlight from the current bar
        bars[i].classList.remove('highlight');
    }

    // Mark all bars as sorted
    for (let bar of bars) {
        bar.classList.add('sorted');
    }
}

document.getElementById('insertionSort').addEventListener('click', insertionSort);


//lets go with the selectoin sort


async function selectionSort() {
    let bars = document.querySelectorAll('.barWrapper'); // Select bar wrappers
    let barHeights = document.querySelectorAll('.barHeight'); // Select actual bars
    let barLabels = document.querySelectorAll('.barLabel'); // Select bar labels

    for (let i = 0; i < bars.length - 1; i++) {
        let minIndex = i;

        // Highlight the current minimum bar
        bars[minIndex].classList.add('highlight');

        for (let j = i + 1; j < bars.length; j++) {
            // Highlight the bar being compared
            bars[j].classList.add('compare');
            await sleep(300); // Pause to show comparison

            let currentHeight = parseInt(barHeights[j].style.height);
            let minHeight = parseInt(barHeights[minIndex].style.height);

            if (currentHeight < minHeight) {
                // Remove highlight from old minimum
                bars[minIndex].classList.remove('compare');
                minIndex = j;
                bars[minIndex].classList.add('compare');
            }

            // Remove highlight from the bar after comparison
            bars[j].classList.remove('compare');
        }

        // Swap the minimum element with the first unsorted element
        if (minIndex !== i) {
            await swapBars(bars[i], bars[minIndex], barHeights, barLabels);
        }

        // Mark the sorted element
        bars[i].classList.remove('highlight')
        bars[i].classList.add('sorted');
        bars[minIndex].classList.remove('compare');
    }

    // Mark the last bar as sorted
    bars[bars.length - 1].classList.add('sorted');
}

async function swapBars(bar1, bar2, barHeights, barLabels) {
    // Swap heights
    let tempHeight = bar1.querySelector('.barHeight').style.height;
    bar1.querySelector('.barHeight').style.height = bar2.querySelector('.barHeight').style.height;
    bar2.querySelector('.barHeight').style.height = tempHeight;

    // Swap labels
    let tempLabel = bar1.querySelector('.barLabel').innerText;
    bar1.querySelector('.barLabel').innerText = bar2.querySelector('.barLabel').innerText;
    bar2.querySelector('.barLabel').innerText = tempLabel;

    // Pause after swapping
    await sleep(100);
}

// Utility function for delay
// function sleep(ms) {
//     return new Promise(resolve => setTimeout(resolve, 300));
// }



//----------------------------------------------------------------

async function quickSort(start, end) {
    if (start >= end) return;

    const pivotIndex = await partition(start, end);
    await quickSort(start, pivotIndex - 1);
    await quickSort(pivotIndex + 1, end);
}

async function partition(start, end) {
    const bars = document.querySelectorAll('.barHeight');
    const pivotValue = parseInt(bars[end].style.height);
    bars[end].classList.add('compare');
    let i = start - 1;

    for (let j = start; j < end; j++) {
        bars[j].classList.add('compare');
        await sleep(100);

        if (parseInt(bars[j].style.height) < pivotValue) {
            i++;
            await swap(bars[i], bars[j]);
        }
        bars[j].classList.remove('compare');
    }

    await swap(bars[i + 1], bars[end]);
    bars[end].classList.remove('compare');

    bars[i + 1].classList.add('sorted');
    return i + 1;
}

async function swap(bar1, bar2) {
    const tempHeight = bar1.style.height;
    bar1.style.height = bar2.style.height;
    bar2.style.height = tempHeight;

    const tempLabel = bar1.nextElementSibling.innerText;
    bar1.nextElementSibling.innerText = bar2.nextElementSibling.innerText;
    bar2.nextElementSibling.innerText = tempLabel;

    await sleep(100);
}


//==========================================================
async function mergeSort(left, right) {
    if (left >= right) return;

    const mid = Math.floor((left + right) / 2);
    await mergeSort(left, mid);
    await mergeSort(mid + 1, right);
    await merge(left, mid, right);
}

async function merge(left, mid, right) {
    const bars = document.querySelectorAll('.barHeight');
    const n1 = mid - left + 1;
    const n2 = right - mid;

    const leftArray = [];
    const rightArray = [];

    for (let i = 0; i < n1; i++) {
        leftArray.push(parseInt(bars[left + i].style.height));
        bars[left + i].classList.add('compare');
        await sleep(100);
        bars[left + i].classList.remove('compare');
    }

    for (let i = 0; i < n2; i++) {
        rightArray.push(parseInt(bars[mid + 1 + i].style.height));
        bars[mid + 1 + i].classList.add('compare');
        await sleep(100);
        bars[mid + 1 + i].classList.remove('compare');
    }

    let i = 0, j = 0, k = left;

    while (i < n1 && j < n2) {
        if (leftArray[i] <= rightArray[j]) {
            bars[k].style.height = `${leftArray[i]}px`;
            bars[k].nextElementSibling.innerText = leftArray[i];
            i++;
        } else {
            bars[k].style.height = `${rightArray[j]}px`;
            bars[k].nextElementSibling.innerText = rightArray[j];
            j++;
        }
        // bars[k].classList.add('sorted');
        await sleep(100);
        // bars[k].classList.remove('sorted');
        k++;
    }

    while (i < n1) {
        bars[k].style.height = `${leftArray[i]}px`;
        bars[k].nextElementSibling.innerText = leftArray[i];
        // bars[k].classList.add('sorted');
        await sleep(100);
        // bars[k].classList.remove('sorted');
        i++;
        k++;
    }

    while (j < n2) {
        bars[k].style.height = `${rightArray[j]}px`;
        bars[k].nextElementSibling.innerText = rightArray[j];
        // bars[k].classList.add('sorted');
        await sleep(100);
        // bars[k].classList.remove('sorted');
        j++;
        k++;
    }
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, 300));
}


document.getElementById('selectionSort').addEventListener('click', selectionSort);

document.getElementById('quickSort').addEventListener('click', async () => {
    const size = document.querySelectorAll('.barHeight').length;
    await quickSort(0, size - 1);
});

document.getElementById('mergeSort').addEventListener('click', async () => {
    const size = document.querySelectorAll('.barHeight').length;
    await mergeSort(0, size - 1);
});



//=========================
document.getElementById('custom-btn').addEventListener('click', () => {
    let input = document.getElementById('custom-input');
    input = input.value
    const customArray = input.split(',').map(num => parseInt(num.trim())).filter(num => !isNaN(num));

    if (customArray.length > 0) {
        renderBars(customArray);
    } else {
        document.getElementById('custom-input').value = ''
        alert("Please enter a valid array.");
    }
});
