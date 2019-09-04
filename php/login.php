<?php
//fetch.php
//if(isset($_POST["id"]))
{
 
 
 {
  $data["name"] = "name";//$row["name"];
  $data["address"] = "add";//$row["address"];
  $data["gender"] ="gender";// $row["gender"];
  $data["designation"] ="designation";// $row["designation"];
  $data["age"] = "age " ;//$row["age"];
 }
$data = array ( "success" => true , 'status' => "err",
    'msg' => "failiure reason"
     );
    
 echo json_encode($data);
}
?>