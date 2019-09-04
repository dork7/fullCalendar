<?php

// require dirname(__FILE__) . '/utils.php';

// if (!isset($_GET['start']) || !isset($_GET['end'])) {
  // die("Please provide a date range.");
// }

// $range_start = parseDateTime($_GET['start']);
// $range_end = parseDateTime($_GET['end']);

// $timeZone = null;
// if (isset($_GET['timeZone'])) {
  // $timeZone = new DateTimeZone($_GET['timeZone']);
// }

$json = file_get_contents(dirname(__FILE__) . '\json-event\events.json');
$input_arrays = json_decode($json, true);


// $output_arrays = array();
// foreach ($input_arrays as $array) {

  // $event = new Event($array, $timeZone);

  // if ($event->isWithinDayRange($range_start, $range_end)) {
    // $output_arrays[] = $event->toArray();
  // }
// }
// $data = array ( "success" => true ,
    // 'msg' => $output_arrays
     // );
echo json_encode($input_arrays); // json output array
// echo json_encode($data); // json output array
