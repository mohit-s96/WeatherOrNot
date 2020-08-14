function updateUI(name,data){
    let details = document.querySelector('.details');
    details.innerHTML = `
    <h5 class="my-3">${name}</h5>
    <div class="my-3">${data[0].WeatherText}</div>
    <div class="display-4 my-4">
      <span>${data[0].Temperature.Metric.Value}</span>
      <span>&deg;C</span>
    </div>
  </div>
    `;
}


function showCard(){
    if(card.classList.contains('d-none')){
       card.classList.remove('d-none'); 
    }
}


function setImg(data){
    let imgSrc = null;
    if(data[0].IsDayTime === true){
        imgSrc = 'img/day.svg';
    }
    else{
        imgSrc = 'img/night.svg';
    }
    document.querySelector('.card-img-top').setAttribute('src' ,imgSrc);
    
}


function setIcon(data){
    let imgSrc = `img/icons/${data[0].WeatherIcon}.svg`
    document.querySelector('.icon-img').setAttribute('src' ,imgSrc);

}