d3.csv('data/view1_full.csv')
  .then(data => {

    data.forEach(d=>{
      d.value = Number(d.value)
    })

    let sunBurst = new SunBurst({parentElement:".canva"},data);
    
  })
  .catch(error => {
    console.error(error);
  });





