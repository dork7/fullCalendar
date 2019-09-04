<?php
 
 $data1 = $_POST["jsondata"];




    if(file_exists('getEvents/json-event/events.json'))
    {
    $current_data = file_get_contents('getEvents/json-event/events.json');
    $array_data = json_decode($current_data, true);
    $array_data[] = $data1;
    $final_data = json_encode($array_data);
    if(file_put_contents('getEvents/json-event/events.json', $final_data))
    {
   
 			$data = array ( "success" => true , 'status' => "ok",
									   	'msg' => "assa"
									  	);
					echo json_encode($data);
    }
    }


// echo json_encode($data,JSON_PRETTY_PRINT);
//	$formattedData = json_encode($data1);
//
//	$filename = 'getEvents/json-event/events.json';
//
////open or create the file
//$handle = fopen($filename,'a');
//
////write the data into the file
//fwrite($handle,$formattedData );
//
////close the file
//fclose($handle);
 
?>
