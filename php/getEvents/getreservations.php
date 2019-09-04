<?php

require dirname(__FILE__) . '/utils.php';
// print_r($_GET);

 
if (!isset($_GET['start']) || !isset($_GET['end'])) {
  die("Please provide a date range.");
}

$range_start = parseDateTime($_GET['start']);
$range_end = parseDateTime($_GET['end']);

$timeZone = null;
if (isset($_GET['timeZone'])) {
  $timeZone = new DateTimeZone($_GET['timeZone']);
}

$json = file_get_contents(dirname(__FILE__) . '/json-event/events.json');
$input_arrays = json_decode($json, true);
//echo json_encode($input_arrays);

 $output_arrays = array();
 if ($input_arrays) {
	 foreach ($input_arrays as $array) {

   $event = new Event($array, $timeZone);

   if ($event->isWithinDayRange($range_start, $range_end)) {
     $output_arrays[] = $event->toArray();
   }
 }}


 $data = array ( "status" => "ok",
     'event' => $output_arrays
      );
 echo json_encode($data); // json output array
 // echo json_encode($data); // json output array
