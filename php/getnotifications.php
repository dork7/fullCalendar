<?php

 

 

// $json = file_get_contents(dirname(__FILE__) . '/json/getnotifications.json');
// $input_arrays = json_decode($json, true);
// echo $input_arrays;
$t_noti = 4;

$arr1 = array("id" => "1", "time" => "2019-05-10 10:45:00" , "notification" => "Reservation by 'John Doe'
reserved from 2019-07-03 09:00:00 to 2019-07-03
11:00:00 has ended. The aircraft 'CESSNA-172' is
now available for use." ,"unread"=> "0" );
$arr2 = array("id" => "2", "time" => "2019-05-26 23:00:00", "notification" => "Reservation upcoming" ,"unread"=> "0" ); 
$arr3 = array("id" => "3", "time" => "2019-05-26 23:00:00", "notification" => "Reservation upcoming" ,"unread"=> "1" ); 
$arr4 = array("id" => "4", "time" => "2019-05-26 23:00:00", "notification" => "Reservation upcoming" ,"unread"=> "1" ); 

$array = array( $arr1 , $arr2 ,$arr3 , $arr4 );
 
$data = array ( "success" => true ,
    'total_notifications' => $t_noti , 'notif_list' => $array 
     );
 
echo json_encode($data); // json output array



 
 
