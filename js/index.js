var newEvent;
var editEvent;
var eventsToRender;
var instructors = [];

var list = [];


var instructor_map = [];
var craft_map = [];

var userLoggedIn;
var user_role;
var hobbs_id;

// getting profile data 
$(document).ready(function () {
	var profile_pic;


	$.ajax({
		type: 'GET',
		url: "php/getprofile.php",
		dataType: 'json',
		encode: true,
		success: function (data) {

			if (data.status == "ok") {
				$("#title").text(data.msg[0]["first_name"]);
				$("#title2").text(data.msg[0]["first_name"]);
				$("#headerUsername").text(data.msg[0]["first_name"]);
				$("#first_name").val(data.msg[0]["first_name"]);
				$("#last_name").val(data.msg[0]["last_name"]);
				$("#dob").val(data.msg[0]["dob"]);
				$("#country").val(data.msg[0]["country"]);
				$("#home_phone").val(data.msg[0]["home_phone"]);
				$("#street").val(data.msg[0]["street"]);
				$("#cell_phone").val(data.msg[0]["cell_phone"]);
				$("#city").val(data.msg[0]["city"]);
				$("#work_phone").val(data.msg[0]["work_phone"]);
				$("#state").val(data.msg[0]["state"]);
				$("#emergency_contact").val(data.msg[0]["emergency_contact"]);
				$("#postal_code").val(data.msg[0]["postal_code"]);
				$("#emergency_num").val(data.msg[0]["emergency_num"]);
				$("#comments").val(data.msg[0]["comments"]);
				profile_pic = data.msg[0]["profile_pic"];
				userLoggedIn = data.msg[0]["user_id"];
				user_role = data.msg[0]["role"];
				$("#profile_Image").attr("src","../images/ppp.jpg");
				if (user_role == "admin") {
					$("#admin_nav").show();
					$("#flight_nav").hide();

				} else {
					$("#admin_nav").hide();
					$("#flight_nav").show();
					//                    $("#flight_nav").css("display","");
				}

			} else if (data.status == "err") {
				$.notify(
					data.msg, {
						position: "bottom center",
						showDuration: 1,
						className: 'warn'
					}
				);
			}



			//			console.log(obj.msg[0][]);
		},
		error: function (data) {
			//alert("error in getting user progile info");
		}

	});



});
$('#profile_Image').on({
    'click': function(){
         //$('#profile_Image').attr('src','second.jpg');
    }
});
// getting airport status data 
$(document).ready(function () {
	var profile_pic;


	$.ajax({
		type: 'GET',
		url: "php/getairportstatus.php",
		dataType: 'json',
		encode: true,
		success: function (data) {

			if (data.status == "ok") {
				//				$("#air_stat_disp").val("Airport Status : "+ data.msg);
				$("#air_stat_disp").text("Airport Status : " + data.msg.airport_status);
			} else if (data.status == "err") {
				$.notify(
					data.msg, {
						position: "bottom center",
						showDuration: 1,
						className: 'warn'
					}
				);
			}



			//			console.log(obj.msg[0][]);
		},
		error: function (data) {
			//alert("error in getting user progile info");
		}

	});



});



$(document).ready(function () {

	var calendar = $('#calendar').fullCalendar({
		schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
		eventRender: function (event, element, view) {
 			if (view.name == "month") {
				var startTimeEventInfo = moment(event.from_dt).format("h:mm a");
				var endTimeEventInfo = moment(event.to_dt).format("h:mm a");
				var displayEventDate;

				var air_craft_filter = $('#air_craftFilter').val();
				var instructor_filter = $('#instructor_filter').val();
				//	console.log(air_craft_filter);

 				{
					if (event.aircraft_id || event.instructor_id) {
 						if (event.aircraft_id == (air_craft_filter)) 
						{

						} 
						else if (air_craft_filter == "a0" ){

						}
						else 
						{
							return false;
							//					console.log("adasd");
						}




						if (event.instructor_id == (instructor_filter)) {
							//					event.remove();

						} 
						else if (instructor_filter == "b0"){

						}
						else 
						{
							return false;
							//					console.log("adasd");
						}
					}

				} 

				var new_description =
					'<div class="fc-event-inner pt-1 ><span class="fc-event-title"> <span style="float:left;margin-right:2px;margin-left:2px;">' + startTimeEventInfo + '</span>  <div class="ttt" > ' + event.title + ' </div> <span style="float:right;margin-right:2px;">' +
					endTimeEventInfo + '</span><br/></div> </div>';

				if (event.res_type == "regular") {
					element.css('background-color', 'rgb(0, 140, 186)');
				} else if (event.res_type == "maintenance") {
					element.css('background-color', 'rgb(234, 47, 16)');
				} else if (event.res_type == "backup") {
					element.css('background-color', '#e99002');
				}
				if (event.userID == userLoggedIn) {
					element.css('background-color', '#3c9a5f');
				}


				element.find(".fc-content").replaceWith(new_description);
				if (event.comments) {
					element.popover({
						title: '<div class=""> <h3> Shared Flight </h3> </div>',
						content: '<div class=""><strong> </strong> ' + event.title + ':' + event.comments + ' </div>' +
							'</div>',
						delay: {
							show: "500",
							hide: "50"
						},
						trigger: 'hover',
						placement: 'top',
						html: true,
						container: 'body'
					});
				}
			}
			///////////////////////////////////////////////// for timelineDay
			else if (view.name == "timlineDay") {

				//					$(".fc-content").css('height', 'auto');
				if (event.res_type == "regular") {
					element.css('background-color', 'rgb(0, 140, 186)');
				} else if (event.res_type == "maintenance") {
					element.css('background-color', 'rgb(234, 47, 16)');
				} else if (event.res_type == "backup") {
					element.css('background-color', '#e99002');
				}
				//				else if (event.res_type == "user") 
				if (event.userID == userLoggedIn) {
					element.css('background-color', '#3c9a5f');
				}


				var new_Resource_description =
					'<div class="fc-event-inner pt-1" style="text-align: center;" ><span class="fc-event-title" >    <div class=" " > ' + event.title + ' </div>  <br/></div> </div>';
				element.find(".fc-content").replaceWith(new_Resource_description);
				//element.css('background-color', 'rgb(234, 47, 16)');

			}


		},
		dayRender: function (date, cell, view) {
			// fc-widget-content
			//			if (view.name == "timelineDay") {
			//				cell.append('<div class="unavailable">Unavailable</div>');
			//			}
			cell.addClass('disable');
		},



		/// my header
		customButtons: {
			toggleBtn: {
				text: 'Toggle View',
				click: function () {
					$("#calendar").fullCalendar('refetchEvents');
					$("#calendar").fullCalendar( 'refresh' );
					//					////alert('clicked the custom button!');
				}
			},
			printButton: {
				icon: 'print',
				click: function () {
					window.print();
				}
			}

		},
		////////////////////////
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'toggleBtn  '
		},


		///////////////////////////

		views: {
			month: {
				columnFormat: 'dddd'
			},
			timelineDay: {

			},

		},

		//		defaultView: 'timelineDay',


		////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

		////////////////////////////////////////



		viewRender: function (view, el) {
			//			if (view.name == "month") {
			//				calendar.setOption('height', 700);
			//
			//			} else if (view.name == "timelineDay") {
			//				console.log("timeline" +el)
			//				calendar.setOption('height', 100);
			//
			//			}

		},
		eventAfterAllRender: function (view) {


			//			if (view.name == "timelineDay") {
			//				$(".fc-content").css('height', 'auto');
			//			}
			///  for timeline view
			//			var resources = $('#calendar').fullCalendar('getResources');
			//
			//			$.each(resources, function (index, resource) {
			//				//				console.log(resources[0]);
			//
			//				var events = $('#calendar').fullCalendar('getResourceEvents', resource)
			//
			//				var total_duration = events.reduce(function (accumulator, event) {
			//					return accumulator + moment.duration(event.end.diff(event.start)).asHours()
			//				}, 0)
			//
			//				//console.log('Resource ' + resource.id + ' has ' + total_duration + ' hours')
			//
			//			})

			//////////////////////////

		},
		eventLimitClick: function (cellInfo, event) {


		},
		eventResize: function (event, delta, revertFunc, jsEvent, ui, view) {
			$('.popover.fade.top').remove();
		},
		eventDragStart: function (event, jsEvent, ui, view) {
			var draggedEventIsAllDay;
			draggedEventIsAllDay = event.allDay;
		},
		eventDrop: function (event, delta, revertFunc, jsEvent, ui, view) {
			$('.popover.fade.top').remove();
		},
		unselect: function (jsEvent, view) {
			//$(".dropNewEvent").hide();
		},
		dayClick: function (startDate, jsEvent, view) {
			//////alert(startDate);
		},
		select: function (startDate, endDate, jsEvent, view) {
			//         ////alert("selected");
			var today = moment();
			//			var startDate;
			//			var endDate;
			//			
			//console.log(startDate._d);console.log(endDate._d);
			newEvent(startDate, endDate, view);

		},

		dateClick: function (info) {
			//alert('clicked ' + info.dateStr + ' on resource ' + info.resource.id);
		},

		// editing the event .... i can use it for display
		eventClick: function (event, jsEvent, view) {
			$("#trip_start").prop("disabled", false);
			$("#trip_end").prop("disabled", false); // btn

			$("#hobb_end").prop("disabled", false);
			$("#hobb_start").prop("disabled", false); //txt
			
			$("#lbl_craft").show();
				$("#d_craft").show();
			
				$("#lbl_inst").show();
				$("#d_instructor").show();



			$('#eventDisplayModal').modal('show');
			if (event.res_type == "maintenance") {
				$("#modallabel").text("Maintenance");
				$("#d_instructor").hide();
				$("#lbl_inst").hide();
				$("#hobbs_cont").hide();

				if (user_role == "maintenance") {
					$("#btn_append").html('<button type="button" class="btn btn-secondary m-1" id="" onclick="endReservation(this)" value="' + event._id + '">End Maintenance</button><button type="button" class="btn btn-secondary m-1" data-dismiss="modal">Close</button>');
				} else {
					$("#btn_append").html('<button type="button" class="btn btn-secondary m-1" data-dismiss="modal">Close</button>');
				}

			} else {
				$("#hobbs_cont").show();
				$("#modallabel").text("Reservations");
				if (userLoggedIn == event.userID) {
					$("#btn_append").html('<button type="button" class="btn btn-secondary m-1" id=""  onclick="endReservation(this)" value="' + event._id + '">Cancel Reservation</button><button type="button" class="btn btn-secondary m-1" data-dismiss="modal">Close</button>');
				} else {
					$("#btn_append").html('<button type="button" class="btn btn-secondary m-1" data-dismiss="modal">Close</button>');
				}

			}
			$("#d_user").html("<a href='profile_view.php?user_id=" + event.userID + "#'  target='_blank'>" + event.title + "</a>"); ////
			
			if (craft_map[event.aircraft_id]) {
				$("#d_aircraft").html("<a href='aircraft.php?aricraft=" + event.aircraft_id + "#aircraftInfo_tab'  target='_blank'>" + craft_map[event.aircraft_id] + "</a>");
			} else {
				$("#lbl_craft").hide();
				$("#d_aircraft").hide();
			}

			console.log(instructor_map);
						console.log(craft_map);

			if (instructor_map[event.instructor_id]) {
				$("#d_instructor").html("<a href='profile_view.php?instuctor_id=" + event.instructor_id + "#' target='_blank'>" + instructor_map[event.instructor_id] + "</a>");

			} else {
				$("#lbl_inst").hide();
				$("#d_instructor").hide();
			}





			$("#d_from_dt").text(moment(event.from_dt).format('h:mm a  DD MMM YYYY'));
			$("#d_to_dt").text(moment(event.to_dt).format('h:mm a  DD MMM YYYY'));
			//			$("#d_res_type").text(event.res_type);
			$("#d_destination").text(event.destination);
			$("#d_comments").text(event.comments);
			if (event.userID == userLoggedIn) {
				//				$("#trip_start").show();
				//				$("#trip_end").hide();
			}


			if (!event.start_hobbs && !event.end_hobbs) {

				$("#trip_start").prop("disabled", false);
				$("#trip_end").prop("disabled", true);
				$("#hobb_end").prop("disabled", true);

			} else if (event.start_hobbs && event.end_hobbs) {

				$("#hobb_start").val(event.start_hobbs);
				$("#hobb_end").val(event.end_hobbs);

				$("#trip_start").prop("disabled", true);
				$("#trip_end").prop("disabled", true); // btn

				$("#hobb_end").prop("disabled", true);
				$("#hobb_start").prop("disabled", true); //txt

			} else {

				$("#hobb_start").val(event.start_hobbs);
				$("#trip_start").prop("disabled", true);
				$("#trip_end").prop("disabled", false);
				$("#hobb_start").prop("disabled", true);
			}
			hobbs_id = event._id;





		},

		//		locale: 'en-GB',
		timezone: "local",
		//		nextDayThreshold: "09:00:00",
		allDaySlot: true,
		displayEventTime: true,
		displayEventEnd: true,
		firstDay: 1,
		weekNumbers: false,
		selectable: true,
		weekNumberCalculation: "ISO",
		eventLimit: true,
		eventLimitClick: 'week', //popover
		navLinks: true,
		timeFormat: 'h(:mm)t',
		//		defaultTimedEventDuration: '01:00:00',
		editable: false,
		//		minTime: '07:00:00',
		//		maxTime: '18:00:00',
		slotLabelFormat: 'h(:mm)t',
		weekends: true,
		//		nowIndicator: true,
		dayPopoverFormat: 'dddd DD/MM',
		longPressDelay: 0,
		eventLongPressDelay: 0,
		selectLongPressDelay: 0,
		hour12: true,
		//events: 'php/get-events.php',

		///////////////////////////////// getting events
		//		events: {
		//			//			url: 'php/getEvents/get-events.php',
		//			url: 'php/getEvents/get-events.php',
		//			failure: function () {
		//				//alert("event getting failed");
		//			}
		//		},

		///////////////////////////////// getting events
		/////////////
		loading: function (isLoading, view) {
			if (isLoading) { // isLoading gives boolean value
				//                console.log("events are being loaded");
			} else {
				//hide your loader here
			}
		},

		events: function (start, end, timezone, callback) {


			$.ajax({
					url: 'php/getEvents/getreservations.php',
					dataType: 'json',
					type: 'GET',
					encode: true,
					data: {
						//						// our hypothetical feed requires UNIX timestamps
						//						start: moment(start).format('ddd DD MMM YYYY HH:mm'), //start.unix(),
						//						end: moment(end).format('ddd DD MMM YYYY HH:mm') // end.unix(),
						start: moment(start).format('YYYY-MM-DD'), //start.unix(),
						end: moment(end).format('YYYY-MM-DD') // end.unix(),
					}
				})

				.done(function (data) {


					if (data.status == "err") {
						$.notify(
							"Resource Fetch Failed !", {
								position: "bottom center",
								showDuration: 1,
								className: 'warn'
							}
						);

						// show error

					} else if (data.status == "ok") {
						var events = [];
						for (var i = 0; i < data.event.length; i++) {
							//							console.log( data.event[0]['title']);
							var res = [];
							res.push(data.event[i].resourceIds1);
							res.push(data.event[i].resourceIds2);

							//console.log(res);
							events.push({

								title: data.event[i].title, //
								//								start: data.event[i].start, //
								//								end: data.event[i].end, //
								start: data.event[i].from_dt, //
								end: data.event[i].to_dt, //
								to_dt: data.event[i].to_dt, //
								from_dt: data.event[i].from_dt, //
								resourceIds: res,
								aircraft_id: data.event[i].aircraft_id, //
								instructor_id: data.event[i].instructor_id, //
								res_type: data.event[i].res_type, //
								destination: data.event[i].destination, //
								comments: data.event[i].comments, //
								userID: data.event[i].user_id,
								start_hobbs: data.event[i].start_hobbs,
								end_hobbs: data.event[i].end_hobbs,
								_id: data.event[i]._id,
								stick: true,
							});
						}
						//	console.log(events[0].start);
						callback(events);



					}
				})


				.fail(function (data) {

					console.log("ajax failed");
				});

		}

		///////////////////////////////////

	});






	$('#month_view').click(function () {
		$('#calendar').fullCalendar('changeView', 'month');
		$('#calendar').fullCalendar('refetchEvents');
		$('#divToHide').show();
		$('#calendar').show();
		$('#loading').hide();
		$('#divtoshow').hide();

	});
	$('#air_craftFilter').on('change', function () {
		$('#calendar').fullCalendar('rerenderEvents');
	});

	$('#instructor_filter').on('change', function () {
		$('#calendar').fullCalendar('rerenderEvents');
	});



	//	$("#calendar_filter").select2({
	//		placeholder: "Filter Calendars",
	//		allowClear: true
	//	});

	$("#starts-at, #ends-at").datetimepicker({
		format: 'ddd DD MMM YYYY HH:mm'
	});

	$("#startAt1 , #startAt2, #endAt1 , #endAt2").datetimepicker({
		//		format: 'DD MMM YYYY'
		//		format: 'DD-MM-YYYY'
		format: 'DD MMM YYYY'

	});
	$("#last_maintenance , #next_due_date").datetimepicker({
		//		format: 'DD MMM YYYY'
		//		format: 'DD-MM-YYYY'
		format: 'YYYY-MM-DD'

	});

	//var minDate = moment().subtract(0, 'days').millisecond(0).second(0).minute(0).hour(0);

	$(" #editStartDate, #editEndDate").datetimepicker({
		format: 'ddd DD MMM YYYY HH:mm'
		//minDate: minDate
	});



	//CREATE NEW EVENT CALENDAR

	newEvent = function (start, end, view, eventType) {
            var type;




		if (view.name == "timelineDay") {

			$('#startAt1').val(moment(start).format('DD MMM YYYY'));
			$('#endAt1').val(moment(end).format('DD MMM YYYY'));
			//		$('#endAt1').val(moment(end).subtract(1, 'day').format('DD MMM YYYY'));

			$('#startAt2').val(moment(start).format('DD MMM YYYY'));
			$('#endAt2').val(moment(end).format('DD MMM YYYY'));

			$('#last_maintenance').val(moment(start).format('DD MMM YYYY'));
			$('#next_due_date').val(moment(end).format('DD MMM YYYY'));
			// time for add reservation
			$('#startAt1Time1').val(moment(start).format('HH'));
			$('#startAt1Time2').val(moment(start).format('mm'));

			$('#endAt1time1').val(moment(end).format('HH'));
			$('#endAt1time2').val(moment(end).format('mm'));
			// time for add instructor only
			$('#startAt2Time1').val(moment(start).format('HH'));
			$('#startAt2Time2').val(moment(start).format('mm'));

			$('#endAt2time1').val(moment(end).format('HH'));
			$('#endAt2time2').val(moment(end).format('mm'));
			// time for add maintenance
			$('#startAt3Time1').val(moment(start).format('HH'));
			$('#startAt3Time2').val(moment(start).format('mm'));



			$('#endAt3time1').val(moment(end).format('HH'));
			$('#endAt3time2').val(moment(end).format('mm'));




		} else if (view.name == "month") {

			$('#startAt1').val(moment(start).format('DD MMM YYYY'));
			$('#endAt1').val(moment(end).subtract(1, 'day').format('DD MMM YYYY'));
			//		$('#endAt1').val(moment(end).subtract(1, 'day').format('DD MMM YYYY'));

			$('#startAt2').val(moment(start).format('DD MMM YYYY'));
			$('#endAt2').val(moment(end).subtract(1, 'day').format('DD MMM YYYY'));

			$('#last_maintenance').val(moment(start).format('DD MMM YYYY'));
			$('#next_due_date').val(moment(end).subtract(1, 'day').format('DD MMM YYYY'));
		}
		//      $("#contextMenu").hide();
		//$('.eventType').text(eventType);
		$('input#title').val("");
		//		$('#starts-at').val(start);



		if (user_role == "user") {
			$('#newEventModal').modal('show');
            type = "regular";
        } else if (user_role == "maintenance") {
            $('#subTabs').hide();
            $('#instructor_id').hide();
            $('#destination').hide();
            $('#lbl_destination').hide();
            $('#lbl_instructor').hide();
            $('#newEventModal').modal('show');
            type = "maintenance"
		} else if (user_role == "admin") {
			$('#newEventModal').modal('show');
            type = "maintenance";
			//alert("admin role");
		}

		var endDay;
		var eventId = 1 + Math.floor(Math.random() * 1000);
		$('#flight-event').unbind();
		$('#save-event2').unbind();
		$('#maintenance-event').unbind(); //imp

		////////////////////////////////////
		// flight reserve
		$('#flight-event').on('click', function () {


			var title = $('#title').text();
			var startDay = $('#startAt1').val();
			var endDay = $('#endAt1').val();

			var startAt1Time1 = $('#startAt1Time1 option:selected').val(); //text();
			var startAt1Time2 = $('#startAt1Time2 option:selected').val();

			var endAt1time1 = $('#endAt1time1 option:selected').val();
			var endAt1time2 = $('#endAt1time2 option:selected').val();

			//



			startDay += " " + startAt1Time1 + ":" + startAt1Time2;
			endDay += " " + endAt1time1 + ":" + endAt1time2;



			//			console.log(moment(startAt1Time1).format('hh') +  " - "+ moment(endAt1time1).format('HH '));

			var aircraft_id = $('#aircraft option:selected').val();
			var instructor_id = $('#instructor_id option:selected').val();
			var destination = $('#destination').val();
			var comments = $('#comments1').val();
//			var type = "regular";


			if (title) {
				var eventData = {
					_id: eventId,
					title: title,
					resourceIds1: aircraft_id,
					resourceIds2: instructor_id,
					aircraft_id: aircraft_id,
					instructor_id: instructor_id,
					from_dt: startDay,
					to_dt: endDay,
					res_type: type,
					destination: destination,
					comments: comments,
					start: startDay,
					end: endDay,
					destination: destination,

				};
				console.log(eventData);


				$.ajax({
						type: 'POST',
						url: 'php/addreservation.php',
						//						data: {jsondata :JSON.stringify(eventData)},
						data: {
							jsondata: eventData
						}, //change this to 

						//					data: eventData,

						dataType: 'json',
						encode: true
					})

					.done(function (data) {



						if (data.status == "err") {
							$.notify(
								data.msg, {
									position: "bottom center",
									showDuration: 1,
									className: 'warn'
								}
							);

							// show error

						} else if (data.status == "ok") {

							$.notify(
								data.msg, {
									position: "bottom center",
									showDuration: 1,
									className: 'success'
								}
							);

							$("#calendar").fullCalendar('refetchEvents');
							$(calSelected).fullCalendar('refetchEvents');

							// 							$("#calendar").fullCalendar('renderEvent', eventData, true);
							$('#newEventModal').find('input, textarea').val('');
							$('#newEventModal').modal('hide');


						}
					})


					.fail(function (data) {

						console.log("ajax failed");

					});

				//				$("#calendar").fullCalendar('renderEvent', eventData, true);
				//				$('#newEventModal').find('input, textarea').val('');
				//				$('#newEventModal').modal('hide');
			} else {
				//alert("Title can't be blank. Please try again.")
			}
		});
		//// instructor only reserve
		$('#save-event2').on('click', function () {

			var title = "name of user"; //$('#title').text();
			var startDay = $('#startAt2').val();
			var endDay = $('#endAt2').val();

			var startAt2Time1 = $('#startAt2Time1 option:selected').val(); //text();
			var startAt2Time2 = $('#startAt2Time2 option:selected').val();

			var endAt2time1 = $('#endAt2time1 option:selected').val();
			var endAt2time2 = $('#endAt2time2 option:selected').val();


			startDay += " " + startAt2Time1 + ":" + startAt2Time2;

			endDay += " " + endAt2time1 + ":" + endAt2time2;




			var instructor_id = $('#instructor_id2 option:selected').val();

			var comments = $('#comments2').val();
			//////////////
			var calendar = $('#calendar-type').val();
			var description = $('#add-event-desc').val();
			var type = "regular";
			if (title) {
				var eventData = {
					_id: eventId,
					title: title,
					start: startDay,
					end: endDay,
					resourceIds1: 0,
					resourceIds2: instructor_id,
					instructor_id: instructor_id,
					res_type: type, // set on the basis of role
					comments: comments,
					from_dt: startDay,
					to_dt: endDay

				};
				console.log(eventData);
				$.ajax({
						type: 'POST',
						url: 'php/addreservation.php',
						data: {
							jsondata: eventData
						}, //change this to 
						dataType: 'json',
						encode: true
					})

					.done(function (data) {

						console.log(data);

						if (data.status == "err") {
							$.notify(
								data.msg, {
									position: "bottom center",
									showDuration: 1,
									className: 'warn'
								}
							);

							// show error

						} else if (data.status == "ok") {

							$.notify(
								data.msg, {
									position: "bottom center",
									showDuration: 1,
									className: 'success'
								}
							);

							$("#calendar").fullCalendar('refetchEvents');

							//							$("#calendar").fullCalendar('renderEvent', eventData, true);
							$(calSelected).fullCalendar('refetchEvents');


							$('#newEventModal').find('input, textarea').val('');
							$('#newEventModal').modal('hide');
						}
					})


					.fail(function (data) {

						console.log("ajax failed");

					});

			} else {
				//alert("Title can't be blank. Please try again.")
			}
		});
		///////////// maintenance
        $('#maintenance-event').on('click', function () {

            var title = "maintainance user";
            var startDay = $('#startAt2').val();
            var endDay = $('#endAt2').val();

            var startAt2Time1 = $('#startAt2Time1 option:selected').val();
            var startAt2Time2 = $('#startAt2Time2 option:selected').val();

            var endAt2time1 = $('#endAt2time1 option:selected').val();
            var endAt2time2 = $('#endAt2time2 option:selected').val(); // need fixing


            startDay += " " + startAt2Time1 + ":" + startAt2Time2;

            endDay += " " + endAt2time1 + ":" + endAt2time2;


            var aircraft_id = $('#main_aircraft_id option:selected').val();
            //			var comments = $('#comments2').val();
            //////////////
            var calendar = $('#calendar-type').val();
            var description = $('#add-event-desc').val();
            var type = "maintenance";
            if (title) {
                var eventData = {
                    _id: eventId,
                    title: title,
                    start: startDay,
                    end: endDay,
                    aircraft_id: aircraft_id,
                    resourceIds1: aircraft_id,
                    resourceIds2: null,
                    //					instructor_id: instructor_id,
                    res_type: "maintenance", // set on the basis of role
                    from_dt: startDay,
                    to_dt: endDay,

                };
                console.log(eventData);
                $.ajax({
                        type: 'POST',
                        url: 'php/addreservation.php',
                        data: {
                            jsondata: eventData
                        }, //change this to
                        dataType: 'json',
                        encode: true
                    })

                    .done(function (data) {

                        console.log(data);

                        if (data.status == "err") {
                            $.notify(
                                data.msg, {
                                    position: "bottom center",
                                    showDuration: 1,
                                    className: 'warn'
                                }
                            );

                            // show error

                        } else if (data.status == "ok") {

                            $.notify(
                                data.msg, {
                                    position: "bottom center",
                                    showDuration: 1,
                                    className: 'success'
                                }
                            );

                            $("#calendar").fullCalendar('refetchEvents');
                            $(calSelected).fullCalendar('refetchEvents');

                            //							$("#calendar").fullCalendar('renderEvent', eventData, true);
                            $('#maintenence-modal').find('input, textarea').val('');
                            $('#maintenence-modal').modal('hide');


                        }
                    })


                    .fail(function (data) {

                        console.log("ajax failed");

                    });

            } else {
                //                //alert("Title can't be blank. Please try again.")
            }
        });
    }

	//EDIT EVENT CALENDAR


});
// modal handling
$(document).ready(function () {

	//	$('.modal').modal('show');
	//				$('#newEventModal').modal('show');
	$('#instructor-form').hide();

	$('#flight-tab').click(function () {
		$('#flight-form').show();
		$('#instructor-form').hide();
	});
	$('#inst-tab').click(function () {
		$('#instructor-form').show();
		$('#flight-form').hide();
	});


});




var crafts = [];
var crafts_id = [];


$(document).ready(function () {

	$.ajax({
		type: 'GET',
		url: "php/getaircrafts.php",
		dataType: 'json',
		encode: true,
		success: function (data) {
			//			             //alert( "success  " +data);
			obj = (data);
			for (var msgCount = 0; msgCount < obj.msg.length; msgCount++) {

				var craftname = obj.msg[msgCount]["aircraft"] + ' - ' + obj.msg[msgCount]["tail_no"];

				$("#air_craftFilter").append('<option value=' + obj.msg[msgCount]["id"] + '>' + craftname + '</option>');
				$("#main_aircraft_id").append('<option value=' + obj.msg[msgCount]["id"] + '>' + craftname + '</option>');
				// $("#aircraft").append('<option value=' + obj.msg[msgCount]["id"] + '>' + craftname + '</option>');

				crafts.push(craftname);
				crafts_id.push(obj.msg[msgCount]["id"]);
				craft_map[obj.msg[msgCount]["id"]] = obj.msg[msgCount]["tail_no"];
			}

		},
		error: function (data) {
			//alert("error in getting aircraft info");
		}

	});



});

$(document).ready(function () {
	dataSet = {
		user_id: userLoggedIn,
	};

	$.ajax({
		type: 'GET',
		url: "php/getallowedaircrafts.php",
		dataType: 'json',
		data: dataSet,
		encode: true,
		success: function (data) {
			if (data.status == "ok") {
				//                console.log(data);
				for (var msgCount = 0; msgCount < data.msg.length; msgCount++) {
var craftname = data.msg[msgCount]["aircraft"] + ' - ' + data.msg[msgCount]["tail_no"];
				$("#aircraft").append('<option value=' + data.msg[msgCount]["id"] + '>' + craftname + '</option>');

				}
			} else if (data.status == "err") {
				$("#aircraft").append('<option> No aircraft allowed</option>');

			}
		},
		error: function (data) {
			alert("error in getting aircraft info");
		}

	});



});

$(document).ready(function () {

	$.ajax({
		type: 'GET',
		url: "php/getinstructors.php",
		dataType: 'json',
		encode: true,
		success: function (data) {
			obj = (data);
			if (obj.msg) {

				for (var msgCount = 0; msgCount < obj.msg.length; msgCount++) {

					var instructornames = obj.msg[msgCount]["name"]; //+ '-' + obj.msg[msgCount]["tail_no"];
					//				/	console.log(instructornames);
					$("#instructor_filter").append('<option value=' + obj.msg[msgCount]["id"] + '>' + instructornames + '</option>');
					$("#instructor_id").append('<option value=' + obj.msg[msgCount]["id"] + '>' + instructornames + '</option>');
					$("#instructor_id2").append('<option value=' + obj.msg[msgCount]["id"] + '>' + instructornames + '</option>');
					instructors.push(instructornames);
					instructor_map[obj.msg[msgCount]["id"]] = obj.msg[msgCount]["name"];
				}

			}

		},
		error: function (data) {
			//alert("error in getting aircraft info");
		}

	});

});
$(document).ready(function () {

	$.ajax({
		type: 'GET',
		url: "php/getequipment.php",
		dataType: 'json',
		encode: true,
		success: function (data) {
			//			             //alert( "success  " +data);
			if (data.status == "ok") {
				if (data.msg.length > 0) {
					for (var msgCount = 0; msgCount < data.msg.length; msgCount++) {



						var equ = data.msg[msgCount]["name"]; //

						$("#equ_filter").append('<option value=' + data.msg[msgCount]["id"] + '>' + equ + '</option>');
					}
				} else {


				}


			} else if (data.status == "err") {

			}


			//console.log(data.msg[0]);
		},
		error: function (data) {

			//alert("error in getting equipments info");
		}

	});

});


$(document).ready(function () {
	var noty_ID = [];
	var old_notifs = null;
	setInterval(function () {
		//getNotification();
	}, 60000);


	function getNotification(view = '') {
		$.ajax({
			type: 'GET',
			url: "php/getnotifications.php",
			dataType: 'json',
			encode: true,
			success: function (data) {
				//			             //alert( "success  " +data);

				//				console.log(obj);
				//				console.log(obj.notif_list[1]);
				console.log(data);

				if (data) {
					obj = (data);
					if (obj.msg.total_notifications > 0) {
						if(_.isEqual(old_notifs, obj))
							return;
						old_notifs = obj;
						$('.count').html(obj.msg.total_notifications);
						for (var i = 0; i < obj.msg.total_notifications; i++) {
							var markup = "<li id='lol22' style='padding-left:5px; padding-right:5px;display:table;;color:black;font-size:10px;list-style-position:inside; border-bottom: 1px #D3D3D3 solid; width: 260px;;'> " + moment(obj.msg.notif_list[i].time).format('hh:mm') + "  &nbsp| &nbsp" + moment(obj.msg.notif_list[i].time).format('DD MMM YYYY') + "  &nbsp &nbsp<span style='horizontal-align:right;background-color:#F8F8F8;'>   <b >" + obj.msg.notif_list[i].notification + " </b> </span></li>";
							$("#noti_list").append(markup);
							if (obj.msg.notif_list[i].unread == 1) {
								noty_ID.push(obj.msg.notif_list[i].id);
							}
						}
					}
				}
				//                				else{
				//                					$("#noti_list").html("No Notifications");
				//                				}

			},
			error: function (data) {
				console.log("error in getting notificaton");
			}

		});
	}

	$("#noti_bar").click(function () {

		var dataSet = {
			notif_ids: noty_ID

		};
		console.log(dataSet);

		$.ajax({
			type: 'POST',
			url: "markread",
			dataType: 'json',
			encode: true,
			data: dataSet,
			success: function (data) {


				if (data.status == "ok") {
					console.log(data.msg);

				} else if (data.status == "err") {
					console.log(data.msg);

				}

			},
			error: function (data) {
				//alert("ajax Failed in hobbs start");
			}

		});
		noty_ID = [];
		$('.count').html('');
	});


});



$(document).ready(function () {
	$("#btn_squawk").click(function () {

		$("#add_squawk_list").empty();
		for (var i = 0; i < crafts.length; i++) {

			var markup = "<tr><td> </td><td style='padding-left:20px;width:220px;color:black'><a href='aircraft.php?aricraft=" + crafts_id[i] + "#squawks_tab' style='text-decoration:none'>" + crafts[i] + "<a></td> </tr>";
			$("#add_squawk_list").append(markup);
		}
	});

	//	$("#btn_squawk").popover({
	//		trigger: 'click',
	//		placement: 'bottom',
	//		html: 'true',
	//		content: '<ul class="dropdown-menu"><li><a href="#">+craftname+</a></li>'+
	//		'</ul>',
	//		 
	//	})


});

$(function () {
	$('[data-toggle="popover"]').popover()
})

// get user role
$(document).ready(function () {

	$.ajax({
		type: 'GET',
		url: "php/getuserrole.php",
		dataType: 'json',
		encode: true,
		success: function (data) {


			if (data.status == "ok") {
				//console.log(data['msg']);

			} else if (data.status == "err") {
				//alert("error  in getting users role");
			}

		},
		error: function (data) {
			//alert("ajax Failed in getting users role");
		}

	});



});

// update user role  print_r($_GET);


/////////////// hobs

$(document).ready(function () {

	$('#trip_start').click(function () {
		var dataSet = {
			reservation_id: hobbs_id,
			start_hobbs: $('#hobb_start').val(),

		}
		console.log(dataSet);

		$.ajax({
			type: 'POST',
			url: "php/starttrip.php",
			dataType: 'json',
			encode: true,
			data: dataSet,
			success: function (data) {


				if (data.status == "ok") {
					$.notify(
						data.msg, {
							position: "bottom center",
							showDuration: 1,
							className: 'success'
						}
					);

				} else if (data.status == "err") {
					$.notify(
						data.msg, {
							position: "bottom center",
							showDuration: 1,
							className: 'warn'
						}
					);
				}

			},
			error: function (data) {
				//alert("ajax Failed in hobbs start");
			}

		});
	});


});
$(document).ready(function () {

	$('#trip_end').click(function () {
		var dataSet = {
			reservation_id: hobbs_id,
			end_hobbs: $('#hobb_end').val(),

		}
		//		console.log(dataSet);


		$.ajax({
			type: 'POST',
			url: "php/endtrip.php",
			dataType: 'json',
			encode: true,
			data: dataSet,

			success: function (data) {


				if (data.status == "ok") {
					$.notify(
						data.msg, {
							position: "bottom center",
							showDuration: 1,
							className: 'success'
						}
					);

				} else if (data.status == "err") {
					$.notify(
						data.msg, {
							position: "bottom center",
							showDuration: 1,
							className: 'warn'
						}
					);
				}

			},
			error: function (data) {
				//alert("ajax Failed in hobbs end");
			}

		});

	});

});
// end Reservation 
function endReservation(res_id) {
	var dataSet = {
		reservation_id: res_id.value,

	}

	$.ajax({
		type: 'POST',
		url: "php/cancelreservation.php",
		dataType: 'json',
		encode: true,
		data: dataSet,

		success: function (data) {


			if (data.status == "ok") {
				$.notify(
					data.msg, {
						position: "bottom center",
						showDuration: 1,
						className: 'success'
					}
				);
				$("#calendar").fullCalendar('refetchEvents');
				$('#eventDisplayModal').modal('hide');



			} else if (data.status == "err") {
				$.notify(
					data.msg, {
						position: "bottom center",
						showDuration: 1,
						className: 'warn'
					}
				);
			}

		},
		error: function (data) {
			//alert("ajax Failed in hobbs end");
		}

	});



}

/// clearing the eventdisplay modal on close
$('#eventDisplayModal').on('hidden.bs.modal', function (e) {
	$(this)
		.find("input,textarea,select")
		.val('')
		.end()
		.find("input[type=checkbox], input[type=radio]")
		.prop("checked", "")
		.button('')
		.end();
})
