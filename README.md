# testchatluongnuoc
Quality water monitoring maping
<html>

<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Bootstrap</title>

  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
    integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">

  <link rel="stylesheet" href="stylelayout.css">

  <script src="https://code.jquery.com/jquery-3.4.1.min.js" crossorigin="anonymous"></script>
  <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js"
    integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo"
    crossorigin="anonymous"></script>
  <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js"
    integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI"
    crossorigin="anonymous"></script>


  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.6.0/dist/leaflet.css"
    integrity="sha512-xwE/Az9zrjBIphAcBb3F6JVqxf46+CDLwfLMHloNu6KEQCAWi6HcDUbeOfBIptF7tcCzusKFjFw2yuvEpDL9wQ=="
    crossorigin="" />

  <script src="https://unpkg.com/leaflet@1.6.0/dist/leaflet.js"
    integrity="sha512-gZwIG9x3wUXg2hdXF6+rVkLF/0Vi9U8D2Ntg4Ga5I5BZpVkVxlJWbSQtXPSiUTtC0TjtGOmxa1AJPuV0CPthew=="
    crossorigin=""></script>

  <script src="wmsbetter.js"></script>

  <script src="https://cdn.jsdelivr.net/npm/chart.js@2.9.3/dist/Chart.min.js"></script>

</head>

<body>
  <div class="containerph">
    <div class="row navbar-custom">
      <img src="images/logo.jpg" style="width:97%;height:102%; margin-left: 19px;">
    </div>
    <div class="row bosung">

      <input id="madiem" name="madiem" class="custom-input" style="margin-left: 459px;" type="text"
        placeholder="Điểm lấy mẫu..." value="">
      <button onclick="search();" class="custom-buttom">
        <i class="fa fa-search" aria-hidden="true"></i></button>
      <!-- <input class="timkiem" type="submit" value="Tìm kiếm"> -->

    </div>
    <div class="row content">
      <div class="col-4 left">

        <div class="container">
          <ul class="nav nav-tabs">
            <li class="active"><a data-toggle="tab" href="#home">Lớp thông tin</a></li> &nbsp;&nbsp;&nbsp;&nbsp;
            <li class="active"><a data-toggle="tab" href="#menu1">Chú giải</a></li> &nbsp;&nbsp;&nbsp;&nbsp;
            <li class="active"><a data-toggle="tab" href="#menu2">Kết quả</a></li> &nbsp;&nbsp;&nbsp;&nbsp;
            <li class="active"><a data-toggle="tab" href="#menu3">Bản tin <i class="fa fa-newspaper-o"
                  aria-hidden="true"></i></a></li> &nbsp;&nbsp;&nbsp;&nbsp;
          </ul>

          <div class="tab-content">
            <div id="home" class="tab-pane fade in active">

              <!-- <div class="leaflet-control-layers-base"></div>
              <div class="leaflet-control-layers-separator" style="display:none;"></div> -->
              <!-- <div class="leaflet-control-layers-overlays"> -->

              <!-- <input type="checkbox" class="leaflet-control-layers-selector" checked>
              
                <img src="images/logodiemlaymau.png" class="nav-text" height="20" width="20">
                Điểm lấy mẫu
              
              Lớp thông tin -->
              <div class="custom-control custom-switch">
                <input type="checkbox" class="custom-control-input" id="customSwitch1" unchecked /><label
                  class="custom-control-label" for="customSwitch1"> <img src="images/diemmlaymau_2.PNG">      Điểm lấy mẫu</label>
                  </div>
              <div class="custom-control custom-switch">
              <input type="checkbox" class="custom-control-input" id="customSwitch2" unchecked /><label
                  class="custom-control-label" for="customSwitch2"> <img src="images/cong.PNG">     Cống</label>
                </div>
                <div class="custom-control custom-switch">
                  <input type="checkbox" class="custom-control-input" id="customSwitch3" unchecked /><label
                      class="custom-control-label" for="customSwitch3"><img src="images/vungduan.PNG"> Vùng dự án</label>
                    </div>
                    <div class="custom-control custom-switch">
                      <input type="checkbox" class="custom-control-input" id="customSwitch4" unchecked /><label
                          class="custom-control-label" for="customSwitch4"><img src="images/songkenh.png">   Sông kênh</label>
                        </div>
                        <div class="custom-control custom-switch">
                          <input type="checkbox" class="custom-control-input" id="customSwitch5" unchecked /><label
                              class="custom-control-label" for="customSwitch5">  WQI_802</label>
                            </div>
              <!-- </div> -->

            </div>
            <div id="menu1" class="tab-pane fade">
              <img src="images/wqi.png">
            </div>
            <div id="menu2" class="tab-pane fade">
              hahahaha
            </div>
            <div id="menu3" class="tab-pane fade">
              <h3>Bản tin QLPH</h3>
              <a class="bantin" href="bantin/BNTIN8022020.pdf">Bản tin tuần kỳ 1 ngày 8 tháng 2 năm 2020</a>
              <br>
              <a class="bantin" href="bantin/BNTIN23022020.pdf">Bản tin tuần kỳ 1 ngày 23 tháng 2 năm 2020</a>
              <!-- <p>Eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</p> -->
            </div>
          </div>
        </div>

      </div>
      <div class="col-8 right" id="map">


        <!-- <iframe src="https://vmap.vn/" framborder="0" style="width:100%; height: 100%;"></iframe> -->
        <!-- <input type="button" value="Tìm kiếm"> -->

        <!-- <div class="row timkiem">
                   
                    
                </div> -->
      </div>
    </div>
  </div>
  <script src="map.js"></script>
  <!-- <script src="func.js"></script> -->
</body>

</html>
