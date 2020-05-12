// dom elements
const playBtn = document.querySelector('#play');
const resetBtn = document.querySelector('#reset');
const bubbleTimer = document.querySelector('#bubbleTimer');
const mergeTimer = document.querySelector('#mergeTimer');
const numberOfElementsInput = document.querySelector('#total');
const validation = document.querySelector('#validation');
const status = document.querySelector('#status');
const bubbleContainer = document.querySelector('.bubble-container');
const mergeContainer = document.querySelector('.merge-container');

function bubbleSort(arr) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - 1; j++) {
          if (arr[j] + 1 < arr[j]) {
            const tmp = arr[j];
            arr[j] = arr[j+1];
            arr[j+1] = tmp;
          }
        }
      }

      res(true);
    }, 0)
  });
}

function mergeSort(arr) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      let tmp = [];

      function merging(low, mid, high) {
        let list1, list2, i;

        for (list1 = low, list2 = mid + 1, i = low; list1 <= mid && list2 <= high; i++) {
          if(arr[list1] <= arr[list2]) {
            tmp[i] = arr[list1++];
          } else {
            tmp[i] = arr[list2++];
          }
        }

        while (list1 <= mid) {
          tmp[i++] = arr[list1++];
        }

        while(list2 <= high) {
          tmp[i++] = arr[list2++];
        }

        // put back in to original array
        for (let i = low; i < high; i++) {
          arr[i] = tmp[i];
        }
      }

      function merge(arr, low, high) {
        if (low >= high) {
          return;
        }

        const mid = (low + high) / 2;
        merge(arr, low, mid);
        merge(arr, mid + 1, high);
        merging(low, mid, high);
      }

      res(merge(arr, 0, arr.length));
    }, 0)
  });
}

function validateInput(val) {
  return !isNaN(parseInt(val));
}

function generateArr(length) {
  return new Promise((res, rej) => {
    setTimeout(() => {
      const arr = [];

      for (let i = 0; i < length; i++) {
        arr.push(Math.floor(Math.random() * 10000));
      }

      res(arr);
    }, 0)
  })
}

async function runScript() {
  const lengthOfArr = numberOfElementsInput.value;

  if (!validateInput(lengthOfArr)) {
    validation.textContent = 'value must be a number!';

    return;
  } else {
    reset();
    validation.textContent = '';
  }

  const arr = await generateArr(lengthOfArr);
  console.log(arr);
  status.textContent = 'Array created. Getting results...';
  let bubbleSortStartTime = performance.now();
  await bubbleSort(arr);
  bubbleTimer.textContent = (performance.now() - bubbleSortStartTime).toFixed(0);
  bubbleContainer.classList.add('highlight');

  let mergeSortStartTime = performance.now();
  await mergeSort(arr);
  mergeTimer.textContent = (performance.now() - mergeSortStartTime).toFixed(0);
  mergeContainer.classList.add('highlight');

  status.textContent = 'finished processing!';
}

function reset() {
  numberOfElementsInput.value = '';
  numberOfElementsInput.focus();
  status.textContent = '';
  [bubbleTimer, mergeTimer].forEach(timer => timer.textContent = '00');

  bubbleContainer.classList.remove('highlight');
  mergeContainer.classList.remove('highlight');
}

playBtn.addEventListener('click', runScript);
resetBtn.addEventListener('click', reset);

// TEST
// 1. implement quick sort and see what the difference is
// 2. use javascripts sort method and compare
