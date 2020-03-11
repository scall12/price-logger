function rankBy(arr) {
  for (let i = 0; i < arr.length; i++) {
    // Compare the price array and highlight row with lowest price
    let row1 = document.querySelector(`#${arr[i].getAttribute('id')}`)
      .parentNode;
    let row2 = document.querySelector(`#${arr[i + 1].getAttribute('id')}`)
      .parentNode;
    if (arr[i].innerText < arr[i + 1].innerText) {
      //highlight row green
      row1.classList.add('highlight-green');
      row2.classList.remove('highlight-green');
    } else if (arr[i].innerText > arr[i + 1].innerText) {
      //highlight row green
      row2.classList.add('highlight-green');
      row1.classList.remove('highlight-green');
    } else {
      row1.classList.remove('highlight-green');
      row2.classList.remove('highlight-green');
    }
    i++;
  }
}

function removeItemDuplicates(arr) {
  // Compare the items array and remove duplicates
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].innerText === arr[i + 1].innerText) {
      let element = document.querySelector(`#${arr[i].getAttribute('id')}`);
      element.setAttribute('rowspan', 2);
      element.classList.add('no-highlight');
      let del = document.querySelector(`#${arr[i + 1].getAttribute('id')}`);
      del.remove();
    }
    i++;
  }
}
