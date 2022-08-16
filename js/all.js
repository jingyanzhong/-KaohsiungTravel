/*const*/
const select = document.getElementById('area');
const hotArea = document.querySelector('.hotAreaList');
const areaTitle = document.querySelector('.areaTitle');
const areaList = document.querySelector('.areaList');
/*let data*/
let data = [];
let jsonData = [] ;
let dataLen ='';
/*導入JSON資料*/
function getData() {
    let xhr = new XMLHttpRequest();
    xhr.open('get', 'https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json', true);
    xhr.send(null);
    xhr.onload = function () {
        data = JSON.parse(xhr.responseText);
        jsonData = data.result.records;
        dataLen = jsonData.length;
        showOptions();
        allArea();
        changeArea();
    }
};
getData();
/*下拉選單*/
let selectStr = '<option value="尚未選擇行政區">--請選擇行政區--</option>';
function showOptions() { 
    //挑出所有的Zone
    let allZone = jsonData.map(function (item){
        return item.Zone;
    })
    //取出不重複的Zone
    let NoRepeatZone = allZone.filter(function(item, index, array){
        return array.indexOf(item) === index;
    });
    let zoneLen =NoRepeatZone.length ;
    //帶入option
    for (let i = 0; i < zoneLen; i++) {
        selectStr += '<option value="' + NoRepeatZone[i] + '">' + NoRepeatZone[i] + '</option>'
    }
    select.innerHTML = selectStr;
};

/*全部行政區*/
function allArea(e) {
    let str = '';
    for (let i = 0; i < dataLen; i++) {
        str += '<li class="areaListCard"><div class="cardImg bg-cover d-flex" style="background-image: url(' + jsonData[i].Picture1 + ')"><h4 class="h3">' + jsonData[i].Name + '</h4><h5 class="h6">三民區</h5></div><div class="cardText"><p><img src="images/icons_clock.png" alt="clockIcon">' + jsonData[i].Opentime + '</p><p><img src="images/icons_pin.png" alt="pinIcon">' + jsonData[i].Add + '</p><div class="tel d-flex"><p><img src="images/icons_phone.png" alt="phoneIcon">' + jsonData[i].Tel + '</p><p><img src="images/icons_tag.png" alt="tagIcon">' + jsonData[i].Ticketinfo + '</p></div></div></li>'
    }
    areaList.innerHTML = str;
}

/*change事件*/
function changeArea(e) {
    let areaOptions = e.target.value;
    let str = '';
    for (let i = 0; i < dataLen; i++) {
        if (areaOptions === jsonData[i].Zone) {
            str += '<li class="areaListCard"><div class="cardImg bg-cover d-flex" style="background-image: url(' + jsonData[i].Picture1 + ')"><h4 class="h3">' + jsonData[i].Name + '</h4><h5 class="h6">三民區</h5></div><div class="cardText"><p><img src="images/icons_clock.png" alt="clockIcon">' + jsonData[i].Opentime + '</p><p><img src="images/icons_pin.png" alt="pinIcon">' + jsonData[i].Add + '</p><div class="tel d-flex"><p><img src="images/icons_phone.png" alt="phoneIcon">' + jsonData[i].Tel + '</p><p><img src="images/icons_tag.png" alt="tagIcon">' + jsonData[i].Ticketinfo + '</p></div></div></li>'
        }       
    }
    areaList.innerHTML = str;
    areaTitle.textContent = areaOptions;
}
select.addEventListener('change', changeArea, false);
hotArea.addEventListener('click', changeArea, false);