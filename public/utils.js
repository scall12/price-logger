function removeItemDuplicates(arr) {
  // Compare the items array and remove duplicates
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].innerText === arr[i + 1].innerText) {
      let element = document.querySelector(`#${arr[i].getAttribute('id')}`);
      element.setAttribute('rowspan', 2);
      element.classList.add('no-highlight');
      let del = document.querySelector(`#${arr[i + 1].getAttribute('id')}`);
      del.remove();
      i++;
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
