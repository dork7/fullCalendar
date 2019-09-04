<?php

 

 

$json = file_get_contents(dirname(__FILE__) . '/json/getuserprefs.json');
$input_arrays = json_decode($json, true);


 
$data = array ( "success" => true , "status" => "ok",
    'msg' => $input_arrays
     );
echo json_encode($data); // json output array
