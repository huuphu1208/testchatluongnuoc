var _selectedlayer;

var map = L.map('map').setView([9.449369, 105.471695], 15);
var tilemap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 15,
    minZoom: 10
});
//add tile map vào add
map.addLayer(tilemap);

var vetinh = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 15,
    minZoom: 10
});
var esri = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
    maxZoom: 15,
    minZoom: 10
});
//map.addLayer(vetinh);

var basemap={
    'Bản đồ đơn giản': tilemap,
    'Bản đồ Esri': esri
    /* 'Bản đồ vệ tinh ESRi': vetinh */
}
var overlays={};
//tạo control
var control= L.control.layers(basemap, overlays,{position:'topleft', /* collapsed: false */});
map.addControl(control);


//add layer form geosever lớp điểm lấy mẫu

var diemlaymau=L.tileLayer.betterWms('http://localhost:8080/geoserver/diemlaymautwo/wms', {
    layers: 'diemlaymautwo:diemlaymautwo',
    transparent: true,
    format: 'image/png',
    tiled: true
    }); 
    //custom layers bản đồ
$('#customSwitch1').on('change', function() { 
    // From the other examples
    if (this.checked) {
        map.addLayer(diemlaymau);
    }else{
        map.removeLayer(diemlaymau);
    }
});

//map.addLayer(diemlaymau);
//control.addOverlay(diemlaymau, 'Điểm lấy mẫu');
//cong
var cong=L.tileLayer.wms('http://localhost:8080/geoserver/vinagit/wms', {
    layers: 'vinagit:cong',
    transparent: true,
    format: 'image/png',
    tiled: true
});
$('#customSwitch2').on('change', function() { 
    // From the other examples
    if (this.checked) {
        map.addLayer(cong);
    }else{
        map.removeLayer(cong);
    }
});
//map.addLayer(cong);
//control.addOverlay(cong, 'cống');


//wqi802
/* var wqi802=L.tileLayer.betterWms('http://localhost:8080/geoserver/diemlaymau/wms', {
    layers: 'diemlaymau:diemlaymau',
    transparent: true,
    format: 'image/png',
    tiled: true
}); */
//map.addLayer(wqi802);
//control.addOverlay(wqi802, 'WQI 8/02/2020');




//add data geojson
/* var geojsonFeature = {
    "type": "Feature",
    "properties": {
        "name": "Coors Field",
    },
    "geometry": {
        "type": "Point",
        "coordinates": [105.376686, 9.462630]
    }
};
var geojsondata=L.geoJSON(geojsonFeature).bindPopup('Tôi là điểm số 1');
map.addLayer(geojsondata);
control.addOverlay(geojsondata, 'test'); */







//lớp vùng dự án
var vungduan=L.tileLayer.wms('http://localhost:8080/geoserver/ranhvungduan/wms', {
    layers: 'ranhvungduan:ranhvungduan',
    transparent: true,
    format: 'image/png',
    tiled: true
});
$('#customSwitch3').on('change', function() { 
    // From the other examples
    if (this.checked) {
        map.addLayer(vungduan);
    }else{
        map.removeLayer(vungduan);
    }
});


//map.addLayer(vungduan);
//control.addOverlay(vungduan, 'Vùng dự án');

//lớp songkenh
var songkenh=L.tileLayer.wms('http://localhost:8080/geoserver/vinagit/wms?service=WMS', {
    layers: '	vinagit:songkenh',
    transparent: true,
    format: 'image/png',
    tiled: true
});
$('#customSwitch4').on('change', function() { 
    // From the other examples
    if (this.checked) {
        map.addLayer(songkenh);
    }else{
        map.removeLayer(songkenh);
    }
});


//Lớp WQI ngày 8 tháng 2 năm 2020
var wqi802=L.tileLayer.wms('http://localhost:8080/geoserver/vinagit/wms?service=WMS', {
    layers: '		vinagit:WQI_802',
    transparent: true,
    format: 'image/png',
    tiled: true
});
$('#customSwitch5').on('change', function() { 
    // From the other examples
    if (this.checked) {
        map.addLayer(wqi802);
    }else{
        map.removeLayer(wqi802);
    }
});



//map.addLayer(songkenh);
//control.addOverlay(songkenh, 'Sông kênh'); 

//tạo function search
function search(){
    //lấy giá trị madiem khi nhập vào
    var madiem=document.getElementById('madiem').value;
    //tạo biến url để xử lý ajax
    var url="xuly.php?madiem="+madiem;

    $.ajax({
        url :url, 
        type : "get", // chọn phương thức gửi là get
        dateType:"json", // dữ liệu trả về dạng json
        success : function (result){
            var datajson = JSON.parse(result);
            console.log(result);
            //chạy
            ShowTable(datajson);
        },
        error: function (xhr, ajaxOptions, thrownError) {
          alert(xhr.status);
          alert(thrownError);
        } 
    }); 
}




function ShowTable(data){
    console.log(data);
    if(data.length !=0){
        

        for (var i = 0; i < data.length; i++){
            var Table = '<table class="table table-hover header-fixed">';
        Table += '<thead>';
        Table += '<tr><th>Thời gian</th>   <th>WQI</th> <th>DO</th> <th>BOD</th> <th>NH4</th> <th>Mặn</th> </tr>';
        Table += '</thead>';
        Table += '<tbody>';
        //JSON.stringify: định dạng object dưới dạng json
        //Table += "<tr onclick='flyTo("+ JSON.stringify(data[i])+")'>";
        //Dua trên tọa độ xy đã có trong bảng, đưa về dạng geojson bằng cách ghép chuỗi.
        Table += "<tr onclick='flyTo(" + JSON.stringify(data[i]) + ", {\"type\":\"Point\",\"coordinates\":[ " + data[i].x + "," + data[i].y + "]})'>";
        /* Table += '<td>'+data[i].madiem+'</td>';
        Table += '<td>'+data[i].wqi_705+'</td>';
        Table += '<td>'+data[i].wqi_606+'</td>';
        Table += '<td>'+data[i].wqi_802+'</td>';
        Table += '<td>'+data[i].nh4_705+'</td>';
        Table += '<td>'+data[i].wqi_2304+'</td>';
        Table += '<td>'+data[i].wqi_2402+'</td>';
        Table += '<td>'+data[i].wqi_2403+'</td>'; */
        Table += '<td>8/2/2020</td>';
        Table += '<td>'+data[i].wqi_802+'</td>';       
        Table += '<td>'+data[i].do_802+'</td>';
        Table += '<td>'+data[i].bod_802+'</td>';
        Table += '<td>'+data[i].nh4_802+'</td>';
        Table += '<td>'+data[i].man_802+'</td>';
        
        
        Table += '</tbody>';
        Table += '</tr>';
        Table += '<tr> <td> 24/2/2020</td>   <td> '+data[i].wqi_2402+'</td>    <td> '+data[i].do_2402+'</td>  <td> '+data[i].bod_2402+'</td>  <td> '+data[i].nh4_2402+'</td>    <td> '+data[i].man_2402+'</td>                  </tr>'
        Table += '<tr> <td> 8/3/2020</td>   <td> '+data[i].wqi_803+'</td>    <td> '+data[i].do_803+'</td>  <td> '+data[i].bod_803+'</td>  <td> '+data[i].nh4_803+'</td>    <td> '+data[i].man_803+'</td>                  </tr>'
        Table += '<tr> <td> 24/3/2020</td>   <td> '+data[i].wqi_2403+'</td>    <td> '+data[i].do_2403+'</td>  <td> '+data[i].bod_2403+'</td>  <td> '+data[i].nh4_2403+'</td>    <td> '+data[i].man_2403+'</td>                  </tr>'
        Table += '<tr> <td> 23/4/2020</td>   <td> '+data[i].wqi_2304+'</td>    <td> '+data[i].do_2304+'</td>  <td> '+data[i].bod_2304+'</td>  <td> '+data[i].nh4_2304+'</td>    <td> '+data[i].man_2304+'</td>                  </tr>'
        Table += '<tr> <td> 7/5/2020</td>   <td> '+data[i].wqi_705+'</td>    <td> '+data[i].do_705+'</td>  <td> '+data[i].bod_705+'</td>  <td> '+data[i].nh4_705+'</td>    <td> '+data[i].man_705+'</td>                  </tr>'
        Table += '<tr> <td> 23/5/2020</td>   <td> '+data[i].wqi_2305+'</td>    <td> '+data[i].do_2305+'</td>  <td> '+data[i].bod_2305+'</td>  <td> '+data[i].nh4_2305+'</td>    <td> '+data[i].man_2305+'</td>                  </tr>'
        Table += '<tr> <td> 6/6/2020</td>   <td> '+data[i].wqi_606+'</td>    <td> '+data[i].do_606+'</td>  <td> '+data[i].bod_606+'</td>  <td> '+data[i].nh4_606+'</td>    <td> '+data[i].man_606+'</td>                  </tr>'
        Table += '<tr> <td> 21/6/2020</td>   <td> '+data[i].wqi_2106+'</td>    <td> '+data[i].do_2106+'</td>  <td> '+data[i].bod_2106+'</td>  <td> '+data[i].nh4_2106+'</td>    <td> '+data[i].man_2106+'</td>                  </tr>'
        Table += '<tr> <td> 5/7/2020</td>   <td> '+data[i].wqi_507+'</td>    <td> '+data[i].do_507+'</td>  <td> '+data[i].bod_507+'</td>  <td> '+data[i].nh4_507+'</td>    <td> '+data[i].man_507+'</td>                  </tr>'
        Table += '</table>';
        

        }

        
        //lấy html có id là kết quả
        var result = $('#menu2'); 
        //cho thẻ html rỗng
        result.empty();   
        //chèn bảng vào html
        result.append(Table);
    }
    
}

function flyTo(json, data){
    console.log(data);
    if(_selectedlayer !=undefined){
        map.removeLayer(_selectedlayer);
    }
    //vẽ 1 lớp geoJSON
    _selectedlayer = L.geoJSON(data);  
    map.addLayer(_selectedlayer);
    //_selectedlayer.bindPopup(json.madiem+'  '+'Mặn ngày 5 tháng 7:'+json.man_507+' '+'Mặn ngày 8 tháng 2:'+json.man_802).openPopup();
    _selectedlayer.bindPopup(
        json.madiem+'<hr>'+'Ngày 8/2/2020'+'   '+'Mặn:'+json.man_802+'<br>'+
        'Ngày 24/2/2020'+'   '+'Mặn:'+json.man_2402+'<br>'+
        'Ngày 8/3/2020'+'   '+'Mặn:'+json.man_803+'<br>'+
        'Ngày 24/3/2020'+'   '+'Mặn:'+json.man_2403+'<br>'+
        'Ngày 7/5/2020'+'   '+'Mặn:'+json.man_705+'<br>'+
        'Ngày 23/5/2020'+'   '+'Mặn:'+json.man_2305+'<br>'+
        'Ngày 6/6/2020'+'   '+'Mặn:'+json.man_606+'<br>'+
        'Ngày 21/6/2020'+'   '+'Mặn:'+json.man_2106+'<br>'+
        'Ngày 5/7/2020'+'   '+'Mặn:'+json.man_507
        
    ).openPopup();
    var BoundLayer = _selectedlayer.getBounds();
    //zoom to layer
    //map.fitBounds(BoundLayer);
    var center = BoundLayer.getCenter();
    map.flyTo([center.lat,center.lng], 15);
}






//hàm để nhận kết quả trả về khi click
function showinfo(data){
    //chuyển đổi dữ liệu sang kiểu JSON
    var jsondata=JSON.parse(data);
    //lấy ra geojson của dữ liệu
    var feature=jsondata.features[0];
    console.log(feature);
    //nếu biến này khác undefined thì có nghĩa là nó đã được gán cho một cái layers nào đó
    if(_selectedlayer !=undefined){
        map.removeLayer(_selectedlayer);
    }
    //vẽ 1 lớp geoJSON
    _selectedlayer = L.geoJSON(feature);
    map.addLayer(_selectedlayer);

    

    //show thuộc tính ra bảng
    var Properties = feature.properties;
    console.log(Properties);
    /* var Table = '<table class="table table-hover header-fixed">';
    Table += '<thead>';
    Table += '<tr><th>Điểm mẫu</th>   <th>WQI 705</th> <th>WQI 606</th> <th>WQI 802</th> <th>NH4+ 705</th> <th>WQI 2304</th> <th>WQI 2402</th> <th>WQI 2403</th> </tr>';
    Table += '</thead>';
    Table += '<tbody>';
    Table += '<tr>';
    Table += '<td>'+Properties.madiem+'</td>';
    Table += '<td>'+Properties.wqi_705+'</td>';
    Table += '<td>'+Properties.wqi_606+'</td>';
    Table += '<td>'+Properties.wqi_802+'</td>';
    Table += '<td>'+Properties.nh4_705+'</td>';
    Table += '<td>'+Properties.wqi_2304+'</td>';
    Table += '<td>'+Properties.wqi_2402+'</td>';
    Table += '<td>'+Properties.wqi_2403+'</td>';
    Table += '</tr>';
    Table += '</tbody>';
    Table += '</table>'; */


    var Table = '<table class="table table-hover header-fixed">';
    Table += '<tr>  <th>Mã điểm</th> <td>'+Properties.madiem+'</td>    </tr>';
    Table += '<tr>  <td>Thời gian</td> <td>WQI</td> <td>DO(mg/l)</td> <td>BOD(mg/l)</td> <td>NH4(mg/l)</td>  <td>Mặn(PSU)</td>  </tr>';
    Table += '<tr> <td> 8/2/2020</td>   <td> '+Properties.wqi_802+'</td>    <td> '+Properties.do_802+'</td>  <td> '+Properties.bod_802+'</td>  <td> '+Properties.nh4_802+'</td>    <td> '+Properties.man_802+'</td>                  </tr>'
    Table += '<tr> <td> 24/2/2020</td>   <td> '+Properties.wqi_2402+'</td>    <td> '+Properties.do_2402+'</td>  <td> '+Properties.bod_2402+'</td>  <td> '+Properties.nh4_2402+'</td>    <td> '+Properties.man_2402+'</td>                  </tr>'
    Table += '<tr> <td> 8/3/2020</td>   <td> '+Properties.wqi_803+'</td>    <td> '+Properties.do_803+'</td>  <td> '+Properties.bod_803+'</td>  <td> '+Properties.nh4_803+'</td>    <td> '+Properties.man_803+'</td>                  </tr>'
    Table += '<tr> <td> 24/3/2020</td>   <td> '+Properties.wqi_2403+'</td>    <td> '+Properties.do_2403+'</td>  <td> '+Properties.bod_2403+'</td>  <td> '+Properties.nh4_2403+'</td>    <td> '+Properties.man_2403+'</td>                  </tr>'
    Table += '<tr> <td> 23/4/2020</td>   <td> '+Properties.wqi_2304+'</td>    <td> '+Properties.do_2304+'</td>  <td> '+Properties.bod_2304+'</td>  <td> '+Properties.nh4_2304+'</td>    <td> '+Properties.man_2304+'</td>                  </tr>'
    Table += '<tr> <td> 7/5/2020</td>   <td> '+Properties.wqi_705+'</td>    <td> '+Properties.do_705+'</td>  <td> '+Properties.bod_705+'</td>  <td> '+Properties.nh4_705+'</td>    <td> '+Properties.man_705+'</td>                  </tr>'
    Table += '<tr> <td> 23/5/2020</td>   <td> '+Properties.wqi_2305+'</td>    <td> '+Properties.do_2305+'</td>  <td> '+Properties.bod_2305+'</td>  <td> '+Properties.nh4_2305+'</td>    <td> '+Properties.man_2305+'</td>                  </tr>'
    Table += '<tr> <td> 6/6/2020</td>   <td> '+Properties.wqi_606+'</td>    <td> '+Properties.do_606+'</td>  <td> '+Properties.bod_606+'</td>  <td> '+Properties.nh4_606+'</td>    <td> '+Properties.man_606+'</td>                  </tr>'
    Table += '<tr> <td> 21/6/2020</td>   <td> '+Properties.wqi_2106+'</td>    <td> '+Properties.do_2106+'</td>  <td> '+Properties.bod_2106+'</td>  <td> '+Properties.nh4_2106+'</td>    <td> '+Properties.man_2106+'</td>                  </tr>'
    Table += '<tr> <td> 5/7/2020</td>   <td> '+Properties.wqi_507+'</td>    <td> '+Properties.do_507+'</td>  <td> '+Properties.bod_507+'</td>  <td> '+Properties.nh4_507+'</td>    <td> '+Properties.man_507+'</td>                  </tr>'
    Table += '</table>';
    
    
    var result = $('#menu2'); 
    result.empty();   
    result.append(Table);

    
}





