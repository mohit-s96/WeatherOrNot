let key = 'ayfHUntf4qJS7CA4GDChutnc3Z07fAH3';
let url = 'http://dataservice.accuweather.com';

const input = document.querySelector('#input');
const list_item = document.querySelector('.list-group');
const card = document.querySelector('.card');

callEventListeners();
function callEventListeners(){
    input.addEventListener('keyup', showCityList);
    list_item.addEventListener('click', getSelectedCityId);
    
}

function removeList(){
    list_item.innerHTML = '';
}

function getSelectedCityId(e){
    if(e.target.classList.contains('list-group-item')){
        let cityId = e.target.firstElementChild.textContent;
        let cityName = e.target.innerText;
        
        getCityWeather(cityId).then((data)=>{
            console.log(data);
            updateUI(cityName,data);
            setImg(data);
            setIcon(data);
            removeList();
            showCard();
        }).catch((err) => {
            console.log(err.message);
        })

    }
}


function showCityList(e){
    let query = e.target.value;
    let endPoint = '/locations/v1/cities/autocomplete';
    if(query === ''){
        document.querySelector('.list-group').innerHTML = '';
    }
    else{
        let requestUrl = `${url}${endPoint}?apikey=${key}&q=${query}`;
        getLocation(requestUrl).then((data)=>{
            // console.log(data);
            createTemporaryViewList(data);  
        }).catch((err)=>{
            console.log(err.message);
        })
    }
}

function createTemporaryViewList(data){
    let ul = document.querySelector('.list-group');
    let i = 0;
    if(ul.firstChild){
        ul.innerHTML = '';
    }
    if(data.length <= 6){
        i = data.length;
    }
    else{
        i = 6;
    }
    for(let j = 0 ; j < i ; j++){
        let list = document.createElement('li');
        let id = document.createElement('span');
        id.classList.add('hidden-id');
        id.textContent = data[j].Key;
        list.classList.add('list-group-item');
        list.textContent = data[j].LocalizedName;
        list.appendChild(id);


        ul.appendChild(list);
    }

}

const getLocation = async (requestUrl) =>{
    const response = await fetch(requestUrl);
    const data = await response.json();
    return data;
}

const getCityWeather = async (id) =>{
    let endPoint = '/currentconditions/v1/';
    let requestUrl = `${url}${endPoint}${id}?apikey=${key}`
    const response = await fetch(requestUrl);
    const data = await response.json();
    return data;

}
