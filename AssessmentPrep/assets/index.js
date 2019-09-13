$(() => {
  fetch('/getItems')
  .then(data => data.json())
  .then((data) => {
    console.log(JSON.stringify(data))
    for(let i = 0; i < data.length; i++){
      const item = $(`<div><p>${data[i].item_description}</p><p>Created at ${data[i].created_at}</p></div>`);
      item.click(() => {
        fetch('/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({item: data[i].item_description}),
        })
        .then(() => {item.css('text-decoration', 'line-through')})
      })
      $('#items-container').append(item)
    }
  })
  // all our scripts go here
  $('#cookie-button').click(()=>{
    fetch('/verified')
    .then(()=> {console.log('Cookie Arrived!')})
  })

  
$('#add-item-btn').click(() => {
  fetch('/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({item: $('#item-text').val()}),
  })
  .then(data => data.json())
  .then((data) => {
    console.log('Item added!', data);
    $('#items-container').append(`<div><p>${data.item_description}</p><p>Created at ${data.created_at}</p></div>`);
  })
})
})