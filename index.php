<!DOCTYPE html>
<html lang="en">

<head>

	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<meta name="description" content="">
	<meta name="author" content="">

	<title>Airbill</title>

	<!-- Bootstrap core CSS -->
	<link href="vendor/bootstrap/css/bootstrap.min.css" rel="stylesheet">

	<!-- Custom styles for this template -->
	<link href="css/shop-item.css" rel="stylesheet">

	<!--	////////////////////////////-->
	<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.9.0/fullcalendar.min.css'>
	<link rel='stylesheet' href='https://fullcalendar.io/js/fullcalendar-scheduler-1.9.2/scheduler.min.css'>
	<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css'>
	<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/css/select2.min.css'>
	<link rel='stylesheet' href='https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.42/css/bootstrap-datetimepicker.min.css'>

	<link rel="stylesheet" href="css/style.css">
<!--	<link rel="stylesheet" href="schedular/schedular.css">-->
	<!--	///////////////////////////////-->
	<!--	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCit4RJVPT9UiLQCJJPYEBkNTJCslqO4ps&libraries=places"></script>-->
<!--	<script src="schedular/schedular.js"></script>-->
	<script src = "https://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.9.1/underscore-min.js"></script>

	<script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js'></script>
	<script src='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js'></script>
	<script src='https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment.js'></script>
	<script src='https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.47/js/bootstrap-datetimepicker.min.js'></script>


	<!--

	<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCit4RJVPT9UiLQCJJPYEBkNTJCslqO4ps&libraries=places"></script>
	<script src='https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js'></script>
	<script src='js/popper.js'></script>
	<script src='https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js'></script>
 	<script src='https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.10.6/moment.js'></script>
	<script src='https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.9.0/fullcalendar.min.js'></script>
	<script src='https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.9.0/locale-all.js'></script>
	<script src='https://fullcalendar.io/js/fullcalendar-scheduler-1.9.2/scheduler.js'></script>
	<script src='https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/js/select2.min.js'></script>
	<script src='https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.47/js/bootstrap-datetimepicker.min.js'></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/0.9.0rc1/jspdf.min.js"></script>
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.22/pdfmake.min.js"></script>
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js"></script>
-->



</head>


<body>

	<link href="https://fonts.googleapis.com/css?family=Roboto:400,500,700" rel="stylesheet">

	<link href='https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.9.0/fullcalendar.print.css' rel='stylesheet' media='print' />

	<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">


 


	<!--//////////////////////	/////////////////////-->
	<!--	//// panel /////////-->
	<div class="card border bg-light" style="margin-left: 150px;margin-right: 150px; border-radius: 5px; ">
		<div class="row">

			<div class="col-md-12" style=" height:80px">
				<div class="mt-3">


 				<button type="button" class="btn btn-default  text-center    bg-light col-md-1 " style="border:none;" id="month_view"><span class="glyphicon glyphicon-calendar" style="color:#4286f4"></span><br>Calendar</button>

 				<button type="button" class="btn btn-default  text-center   bg-light col-md-1" style="border:none;" id="resource_view"><span class="glyphicon glyphicon-plane" style="color:#4286f4"></span><br>Resources</button>
 			</div>

				<div id="divToHide">
					<div class="col-md-4">
						<div class="form-group">
							<label for="calendar_view" style="font-size: 10px;">Show <span class="glyphicon glyphicon-plane" style="color:#4286f4;font-size: 14px"> </span></label>
							<select class="form-control" id="air_craftFilter" style="font-size: 10px;">
								<option value="a0">All</option>

 						</select>
 					</div>
 				</div>

					<div class="col-md-4">
						<div class="form-group">
							<label for="calendar_start_time" style="font-size: 10px;">and: <span class="glyphicon glyphicon-headphones" style="color:#4286f4;font-size: 14px"></span></label>
							<select class="form-control" id="instructor_filter" style="font-size: 10px;">
								<option value="b0">All</option>



 						</select>
 					</div>
 				</div>

			<!-- 		<div class="col-md-3">
						<div class="form-group">
							<label for="calendar_start_time" style="font-size: 10px;">and: <span class="glyphicon glyphicon-briefcase" style="color:#4286f4;font-size: 14px"></span></label>
							<select class="form-control" id="equ_filter" style="font-size: 10px;">
								<option value="c0">None</option>

							</select>
						</div>
					</div> -->

				</div>


				<div id="divtoshow" style="display:none;">
					<div class="col-md-2">
						<div class="form-group">
							<label for="calendar_view" style="font-size: 10px;">Number of Days </label>
							<select class="form-control" id="no_of_days" style="font-size: 10px;">
								<option value="1">1</option>
								<option value="2">2</option>
								<option value="3">3</option>
								<option value="4">4</option>
								<option value="5" selected>5</option>
								<option value="6">6</option>
								<option value="7">7</option>
								<option value="8">8</option>
								<option value="9">9</option>
								<option value="10">10</option>
								<option value="11">11</option>
								<option value="12">12</option>
								<option value="13">13</option>
								<option value="14">14</option>
								<option value="15">15</option>
								<option value="16">16</option>
								<option value="17">17</option>
								<option value="18">18</option>
								<option value="19">19</option>
								<option value="20">20</option>
								<option value="21">21</option>
								<option value="22">22</option>
								<option value="23">23</option>
								<option value="24">24</option>
								<option value="25">25</option>
								<option value="26">26</option>
								<option value="27">27</option>
								<option value="28">28</option>
								<option value="29">29</option>
								<option value="30">30</option>

 						</select>
 					</div>
 				</div>
			</div>
			
 		</div>
	</div>
 </div>
 <!-- Page Content -->
 <div class="container ">

 	<div id="wrapper">
  		<div class="print-visible" id="calendar"></div>
  		<!-- 		<div class="print-visible" id="timeline"></div>-->
 	</div>
	 <div id="wrapper">
 		<div id="loading"></div>
   		<!-- 		<div class="print-visible" id="timeline"></div>-->
 	</div>






 	<div class="card border bg-light" style="border-radius: 5px; ">
 		<div class='buttonPanel' style='font-size:12px;background-color:#efefef;padding-bottom:6px;padding-top:5px;padding-right:7px;margin-right:0px;text-align:right;'>

  			<span class='legendSpan' style='background-color:#3c9a5f; '>&nbsp;</span> green 
 			<span class='legendSpan' style='background-color:#008cba'>&nbsp;</span>  blue
 			<span class='legendSpan' style='background-color:#ea2f10'>&nbsp;</span> red 	 
 			<span class='legendSpan' style='background-color:#e99002;'>&nbsp;</span>  yellow
 		</div>
 	</div>



 </div>
 <!-- /.container -->




 <!-- ADD EVENT MODAL -->
 <div class="col-md-6">
 	<div class="modal fade bd-example-modal-lg" id="newEventModal" tabindex="-1" role="dialog" aria-labelledby="newEventModal" aria-hidden="true">
 		<div class="modal-dialog modal-lg" role="document">
 			<div class="modal-content ">
 				<div class="modal-header bg-primary">
 					<h5 class="modal-title" id="exampleModalLabel">Make New Reservation</h5>
 					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
 						<span aria-hidden="true">&times;</span>
 					</button>
 				</div>

<div id="subTabs">
 				<div class="d-flex align-items-center justify-content-center bg-light" id="">


 					<button type="button" class="btn btn-default  text-center mt-1  bg-light " style="border:none;" id="flight-tab"><span class="glyphicon glyphicon-plane"></span><br>Flight</button>
 					<button type="button" class="btn btn-default  text-center ml-5 mt-1  bg-light " style="border:none;" id="inst-tab"><span class="glyphicon glyphicon-headphones"></span><br>Instructor Only</button>

<!-- 					<button type="button" class="btn btn-default  text-center ml-5 mt-1  bg-light " style="border:none;" id="maintenencemodal"><span class="glyphicon glyphicon-plus"></span><br>Maintenance</button>-->
 				</div>
 			</div>

 				<div class="modal-body">

 					<div id="flight-form">
 						<form id="reserve-flight">
 							<div class="container ">
 								<div class="row m-1">
 									<label class="col-md-2 "><b>Title</b></label>
 									<label class="col-md-2" id="title"> </label>

 								</div>

 								<div class="row m-1">
 									<label for="message-text" class="col-md-2 "><b>Color:</b></label>
 									<select class="form-control col-md-5" id="color">
										<option value="#3c9a5f">green</option>
										<option value="#008cba">blue</option>
										<option value="#ea2f10">red</option>
 									</select>
 								</div>

 					 

 								<div class="row m-1">
 									<label for="message-text" class="col-md-2 "><b>From:</b></label>
 									<input class="form-control col-md-2" type="text" id="startAt1">
 						 
 								</div>
 								<div class="row m-1">
 									<label for="message-text" class="col-md-2 "><b>To:</b></label>
 									<input class="form-control col-md-2" type="text" id="endAt1">
 									 
 								</div>
 	 
 
 								<div class="row m-1">
 									<label for="message-text" class="col-md-2" id="lbl_destination"><b>Destination:</b></label>
 									<input class="form-control col-md-2" type="text" id="destination" placeholder="e.g KLAX">

 								</div>

 								<div class="row m-1">
 									<label for="message-text" class="col-md-2 "><b>Comments:</b></label>
 									<textarea name="message" id="comments1" cols="10" rows="2" class="form-control col-md-5"></textarea>
 								</div>
 							</div>


 							<div class="d-flex align-items-center justify-content-end  mt-3 mr-5 mb-2">
 								<div class="row ">
 									<button type="button" class="btn btn-primary m-1" id="flight-event">Save</button>
 									<button type="button" class="btn btn-secondary m-1" data-dismiss="modal">Cancel</button>
 								</div>
 							</div>

 						</form>
 					</div>
 					<!--				/////////////////////////// instructor form //////////////////////////-->
 					 

 					<!--
					<div class="modal-footer">
						<label>thanks</label>

					</div>
-->

 				</div>
 			</div>
 		</div>
 	</div>
 </div>

  <div class="col-md-6">
 	<div class="modal fade bd-example-modal-lg" id="eventDisplayModal" tabindex="-1" role="dialog" aria-labelledby="eventDisplayModal" aria-hidden="true">
 		<div class="modal-dialog modal-lg" role="document">
 			<div class="modal-content ">
 				<div class="modal-header bg-primary">
 					<h5 class="modal-title" id="modallabel"></h5>
 					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
 						<span aria-hidden="true">&times;</span>
 					</button>
 				</div>

 				<div class="modal-body border">

 					<div id="flight-form">
 						<form id="maintenance-flight">
 							<div class="container ">


 								<div class="row m-1">
 									<label class="col-md-2"><b>Tittle</b></label>
 									<label class="col-md-2" id="d_user"></label>
 								</div>
 								<div class="row m-1">
 									<label class="col-md-2" id="lbl_craft"><b>Aircraft:</b></label>
 									<label class="col-md-2" id="d_aircraft"></label>
 								</div>
 								<div class="row m-1">
 									<label class="col-md-2" id="lbl_inst"><b>Instructor:</b></label>
 									<label class="col-md-2" id="d_instructor"></label>
 								</div>
 								<div class="row m-1">
 									<label class="col-md-2"><b>From:</b></label>
 									<label class="col-md-4" id="d_from_dt"></label>
 								</div>
 								<div class="row m-1">
 									<label class="col-md-2"><b>To:</b></label>
 									<label class="col-md-4" id="d_to_dt"></label>
 								</div>
 								<!--
 								<div class="row m-1">
 									<label class="col-md-2"><b></b>Share this flight:</label>
 									<label class="col-md-2" id="d_res_type"></label>
 								</div>
-->
<!--
 								<div class="row m-1">
 									<label class="col-md-2"><b>Destination:</b></label>
 									<label class="col-md-2" id="d_destination"></label>
 								</div>
-->
 								<div class="row m-1">
 									<label class="col-md-2"><b>Comments:</b></label>
 									<label class="col-md-2" id="d_comments" style="word-break:break-all;"> </label>
 								</div>

 							</div>

 							<div class="container" id="hobbs_cont">


 								<div class="row m-1">
 									<label class="col-md-2 mt-3"><b>Hobb Start:</b></label>
 									<input class="form-control col-md-2" type="text" id="hobb_start">
									<button type="button" class="btn btn-primary mt-1 ml-2" id="trip_start" style="height:80%">Start Trip</button> 
 								</div>


 								<div class="row m-1">
 									<label class="col-md-2 mt-3"><b>Hobb End:</b></label>
 									<input class="form-control col-md-2" type="text" id="hobb_end">
								  <button type="button" class="btn btn-primary mt-1 ml-2" id="trip_end" style="height:80%">End Trip</button>
 								</div>
 				 


 							</div>


 							<div class="d-flex align-items-center justify-content-end  mt-3 mr-5 mb-2">
 								<div class="row " id="btn_append">

 						 
 								</div>
 							</div>

 						</form>
 					</div>
 					<!--				/////////////////////////// instructor form //////////////////////////-->



 				</div>
 			</div>
 		</div>
 	</div>
 </div>
	
	

 <!--//////////////////-->


<!-- Footer -->
<footer class="py-5 ">
	<div class="container">
	</div>

</footer>

<!-- Bootstrap core JavaScript -->
 
	<script src='js/popper.js'></script>
 
 	<script src='https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.9.0/fullcalendar.min.js'></script>
	<script src='https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.9.0/locale-all.js'></script>
	<script src='https://fullcalendar.io/js/fullcalendar-scheduler-1.9.2/scheduler.js'></script>
	<script src='https://cdnjs.cloudflare.com/ajax/libs/select2/4.0.6-rc.0/js/select2.min.js'></script>
	<script src='https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datetimepicker/4.17.47/js/bootstrap-datetimepicker.min.js'></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jspdf/0.9.0rc1/jspdf.min.js"></script>
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/pdfmake/0.1.22/pdfmake.min.js"></script>
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/html2canvas/0.4.1/html2canvas.min.js"></script>



<!--//////////////////-->


<script src="js/index.js"></script>
<script src="js/timeline.js"></script>
 
 
<script src="js/print.js"></script>

<script src="js/notify.js"></script>

</body>

</html>

