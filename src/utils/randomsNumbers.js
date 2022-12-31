const getRandomNumbers = (cantidad) => {
    let contador;
    
    if (typeof(parseInt(cantidad)) != 'number' || isNaN(parseInt(cantidad))){
        contador = 100000;
    }else{
        contador = cantidad;
    }
    
    const obj = {}
  
    for (let i = 0; i < contador; i++){
      let randomNumber  = Math.round(Math.random() * 1000 /*contador*/)

      if(obj[randomNumber]){
        obj[randomNumber] += 1
      }else{
        obj[randomNumber] = 1
      }
    }
  
    return obj
};

process.on('message', (cantidad) => {
    process.send(getRandomNumbers(cantidad))
    process.exit()
})

process.send('okey')