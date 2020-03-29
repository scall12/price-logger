function removeItemDuplicates(arr) {
  let j = 1;
  for (let i = 0; i < arr.length; i++) {
    const filtered = arr.filter(element => element.item === arr[i].item);
    if (filtered.length > 1) {
      let element = document.querySelector(`tbody #tr${i + 1} td`);
      if (element.className.includes('item') && j === 1) {
        element.setAttribute('rowspan', filtered.length);
        element.classList.add('no-highlight');
      } else if (element.className.includes('item') && j > 1) {
        element.remove();
      }
      j++;
    }
  }
}

function rankBy(arr, type) {
  for (let i = 0; i < arr.length; i++) {
    const lowest = [];
    document.querySelector(`#tr${i + 1}`).classList.remove('highlight-green');

    // Create array of items which have multiple data entries
    const filtered = arr.filter(element => element.item === arr[i].item);

    // Only push true if comparing against a null value or a larger value
    if (filtered.length > 1) {
      for (let j = 0; j < filtered.length; j++) {
        if (!arr[i][type]) {
          lowest.push(false);
        } else if (!filtered[j][type]) {
          lowest.push(true);
        } else if (arr[i][type] > filtered[j][type]) {
          lowest.push(false);
        } else lowest.push(true);
      }

      // If all array elements are true, then highlight the row
      if (lowest.every(element => element === true)) {
        document.querySelector(`#tr${i + 1}`).classList.add('highlight-green');
      }
    }
  }
}
