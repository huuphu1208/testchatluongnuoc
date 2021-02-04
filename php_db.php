<?php
include('config.php');

//lệnh select
$truyvan="SELECT madiem, wqi_802, wqi_2402, wqi_705
FROM diemlaymau
LIMIT 20";

$thucthi=pg_query($dbcon,$truyvan);

while($kq=pg_fetch_assoc($thucthi)){
        echo '<b>Tên điểm:</b> '. $kq['madiem'].', <b>WQI ngày 7 tháng 5:</b> '. $kq['wqi_705'];
        echo '<br>';
}

?>