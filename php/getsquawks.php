<?php

 

// if(isset($_GET["aircraft_id"]))
{
$json = file_get_contents(dirname(__FILE__) . '/json/getsquawks.json');
$input_arrays = json_decode($json, true);
 
 
$data = array ( "status" => "ok" ,
    'msg' => $input_arrays  
     );
 
 echo json_encode($data); // json output array
}
