<?php
include('config.php');

$madiem=$_GET['madiem'];
/* echo $madiem; */


if($madiem!=''){
    $truyvan="SELECT *
FROM diemlaymautwo
WHERE madiem = '$madiem'
LIMIT 50";
//echo $truyvan;
}else{
    $truyvan='';
    echo 'Bạn chưa nhập điểm lấy mẫu!';
}
if($truyvan!=''){
    /* $thucthi=pg_query($dbcon,$truyvan);

    while($kq=pg_fetch_assoc($thucthi)){
        echo '<b>Tên điểm:</b> '. $kq['madiem'].', <b>WQI ngày 7 tháng 5:</b> '. $kq['wqi_705'].', Thực đo DO ngày 7 tháng 5: '. $kq['do_705'];
        echo '<br>';
    } */

    //Thực thi câu truy vấn trả về JSON
    $thucthi=pg_query($dbcon,$truyvan);
		/* $i=pg_num_rows($thucthi)-1; */
		$array=array();
		//Lay du lieu
		while($kq=pg_fetch_assoc($thucthi)){
			array_push($array,$kq); 
			/* array_push :php */ 
		}

		$myJSON = json_encode($array);
		echo $myJSON;
}
?>