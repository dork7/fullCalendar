var newEvent;
var editEvent;
var eventsToRender;

var instructors = [];

var list = [];
var createCals;
var mainFunc;

//WTF IS GOING ON 
//var instructor_map = [];
//var craft_map = [];

var userLoggedIn;
var user_role;
var hobbs_id;

var fcalName;
var calSelected;
var days = 5;

// $(document).ready(function () {
//  	myVar = setTimeout(myFun, 300)
// 	function myFun(){
// document.getElementById("resource_view").click();}
// });

$(document).ready(function () {

	$('#resource_view').click(function () {

		//		$('#calendar').fullCalendar('changeView', 'timelineDay');
		$('#loading').html("");
		$('#calendar').hide();
		$('#divtoshow').show();
		mainFunc();

	});
});
$('#no_of_days').on('change', function () {
	days = $('#no_of_days').val();
	mainFunc(days);
});


$(document).ready(function () {
	
	mainFunc = function (dayss) {
		$('#loading').html("");
		var currentDate = moment(); //$('#calendar').fullCalendar('getDate');
		//					newDate = moment(currentDate).add(30, 'days').format();
		//					$("#calendar").fullCalendar('gotoDate', newDate);
		for (var i = 0; i < days; i++) {
			var calNames = "timelines" + i;

			//			console.log("#" + calNames);
			$("#loading").append('&nbsp;<div  class="print-visible" id="' + calNames + '"> &nbsp;</div>');
			newDate = moment(currentDate).add(i, 'days').format();
			endDate = moment(currentDate).add(i + 1, 'days').format();
			createCals(calNames, newDate, endDate);
			$("#loading").show();
			//$("#"+calNames).fullCalendar('gotoDate', newDate);
		}
		$('#divToHide').hide();
		$(".print-visible").click(function (evt) {
			calSelected = "#" + ($(this).attr("id"));
			console.log(calSelected);

		});

	}

	createCals = function (calName, newStartDate, newEndDate) {
		fcalName = "#" + calName;
		var calName = $("#" + calName).fullCalendar({
			schedulerLicenseKey: 'GPL-My-Project-Is-Open-Source',
			defaultDate: newStartDate,
			eventRender: function (event, element, view) {
				//			console.log(view);

				///////////////////////////////////////////////// for timelineDay
				if (view.name == "timelineDay") {

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
						currentDate = $('#calendar').fullCalendar('getDate');
						newDate = moment(currentDate).add(30, 'days').format();
						//					$("#calendar").fullCalendar('gotoDate', newDate);
						$("#calendar2").fullCalendar('gotoDate', newDate);


						//					$("#calendar").fullCalendar('refetchEvents');
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
				left: '',
				center: '',
				right: ''
			},


			///////////////////////////

			views: {
				month: {
					columnFormat: 'dddd'
				},
				timelineDay: {

				},

			},

			defaultView: 'timelineDay',
			header: false,

			resourceAreaWidth: 150,
 			scrollTime: '00:00',
			//		slotWidth: 4, // !!!!!!!!!
			slotDuration: '00:60',
			contentHeight: 'auto',
			//		height: 400,
			eventLimit: 6,
			resourceLabelText: moment(newStartDate).format('dddd,D MMM YYYY'),
			//		duration: { days: 3 },
			//		resourceGroupField: 'groupId',


			resources: function (callback) {

				var ajax1 = $.ajax({
					dataType: "json",
					//encode: true,
					url: "php/getaircrafts.php",
					success: function (result) {

					}
				});


				var ajax2 = $.ajax({
					dataType: "json",
					//	encode: true,
					url: "php/getinstructors.php",
					success: function (result) {

					}
				});

				$.when(ajax1, ajax2).done(function (a1, a2) {
					//				console.log("ajax done" +  a1[0]);

					// a1 and a2 are arguments resolved for the url1 and url2.
					// Each argument is an array with the following structure: [ data, statusText, jqXHR ]
					var data = a1[0] + a2[0]; // a1[0] = "Got", a2[0] = " Success"
					//				var list = [];
					//				var list2 = [];
					//				var list3 = [];
//				ITS HARD BEING ALIVE
                    console.log();
					var emp;
					for (var i = 0; i < a1[0].msg.length; i++) {
						var ttt = {
							id: a1[0].msg[i]['id'],
							//groupdId: a1[0].msg[i]['groupdId'],
							title: a1[0].msg[i]['tail_no'],


						};
						//console.log(ttt);
						craft_map[a1[0].msg[i]['id']] = a1[0].msg[i]['tail_no'];

						list.push(ttt);

					}
					var ttt = {
						id: "00000",
						//groupdId: a1[0].msg[i]['groupdId'],
						title: "",
						eventClassNames: "aaaa",
						selectable: false,

					};
					//console.log(ttt);

					list.push(ttt);
					for (var i = 0; i < a2[0].msg.length; i++) {
						var ttt2 = {
							'id': a2[0].msg[i]['id'],
							'title': a2[0].msg[i]['name'],
						};
						//	console.log(ttt2)
						list.push(ttt2);
						instructor_map[a2[0].msg[i]['id']] = a2[0].msg[i]['name'];

					}

					if (/Got Success/.test(data)) {
						////alert("All AJAX calls successfully gave responses");
					}
					callback(list);
				});

			},
			resourceRender: function (resourceObj, labelTds, bodyTds, element) {
				//			console.log(resourceObj);
				if (resourceObj.id == "00000") {
					labelTds.html("");
					labelTds.append("<div style='background-color:#DDD;border-left:1px solid #aaa;border-right: 1px solid #aaa;'> &nbsp </div>")
					bodyTds.html("");
					bodyTds.html("<div style='background-color:#DDD;border-left:1px solid #aaa;border-right: 1px solid #aaa;'> &nbsp </div>");

					//				cell.addClass('disable');

					//console.log(selectInfo);
				} //			console.log(bodyTds );
				//belTds.append(" Delete")
			}, //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

			////////////////////////////////////////



			viewRender: function (view, el) {


			},
			eventAfterAllRender: function (view) {
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
				//alert(startDate);
			},
			select: function (startDate, endDate, jsEvent, view, info) {
//				console.log(startDate._d);
//				console.log(endDate._d);
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
			
			if (craft_map[event.aircraft_id]) 
			{
				$("#d_aircraft").html("<a href='aircraft.php?aricraft=" + event.aircraft_id + "#aircraftInfo_tab'  target='_blank'>" + craft_map[event.aircraft_id] + "</a>");
			}
			else {
				$("#lbl_craft").hide();
				$("#d_aircraft").hide();
			}

			console.log(instructor_map);
			console.log(event.instructor_id);
			console.log(craft_map);
			console.log(event.aircraft_id);
			
			if (instructor_map[event.instructor_id])
			{
				$("#d_instructor").html("<a href='profile_view.php?instuctor_id=" + event.instructor_id + "#' target='_blank'>" + instructor_map[event.instructor_id] + "</a>");

			} 
			else {
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
				//				console.log(moment(newStartDate).format('YYYY-MM-DD'));
				//				console.log(moment(newEndDate).format('YYYY-MM-DD'));

				$.ajax({
						url: 'php/getEvents/getreservations.php',
						dataType: 'json',
						type: 'GET',
						encode: true,
						data: {
							//						// our hypothetical feed requires UNIX timestamps
							//													start: moment(start).format('ddd DD MMM YYYY HH:mm'), //start.unix(),
							//													end: moment(end).format('ddd DD MMM YYYY HH:mm') // end.unix(),
							start: moment(newStartDate).format('YYYY-MM-DD'), //moment(start).format('YYYY-MM-DD'), //start.unix(),
							end: moment(newEndDate).format('YYYY-MM-DD'), //moment(start).format('YYYY-MM-DD'), //start.unix(),
							//							end: moment(startDate).format('YYYY-MM-DD') // end.unix(),
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

	}


	//	$('#resource_view').click(function () {
	//		//		$('#calendar').fullCalendar('changeView', 'timelineDay');
	//		//		$('#calendar').fullCalendar('refetchEvents');
	//		//		$('#divToHide').hide();
	//
	//		currentDate = moment(); //$('#calendar').fullCalendar('getDate');
	//		//					newDate = moment(currentDate).add(30, 'days').format();
	//		//					$("#calendar").fullCalendar('gotoDate', newDate);
	//		for (var i = 0; i < 15; i++) {
	//			var calNames = "calendar" + i;
	//
	//			//			console.log("#" + calNames);
	//			$("#loading").append('<div  class="print-visible" id="' + calNames + '">   &nbsp;</div>');
	//			newDate = moment(currentDate).add(i, 'days').format();
	//			endDate = moment(currentDate).add(i, 'days').format();
	//			createCals(calNames, newDate, endDate);
	//			//$("#"+calNames).fullCalendar('gotoDate', newDate);
	//		}
	//
	//
	//	});
	//
	//
	//	$('#month_view').click(function () {
	//		$('#calendar').fullCalendar('changeView', 'month');
	//		$('#calendar').fullCalendar('refetchEvents');
	//		$('#divToHide').show();
	//	});
	//	$('#air_craftFilter').on('change', function () {
	//		$('#calendar').fullCalendar('rerenderEvents');
	//	});
	//
	//	$('#instructor_filter').on('change', function () {
	//		$('#calendar').fullCalendar('rerenderEvents');
	//	});
	//
	//
	//
	//	//	$("#calendar_filter").select2({
	//	//		placeholder: "Filter Calendars",
	//	//		allowClear: true
	//	//	});
	//
	//	$("#starts-at, #ends-at").datetimepicker({
	//		format: 'ddd DD MMM YYYY HH:mm'
	//	});
	//
	//	$("#startAt1 , #startAt2, #endAt1 , #endAt2").datetimepicker({
	//		//		format: 'DD MMM YYYY'
	//		//		format: 'DD-MM-YYYY'
	//		format: 'DD MMM YYYY'
	//
	//	});
	//	$("#last_maintenance , #next_due_tach").datetimepicker({
	//		//		format: 'DD MMM YYYY'
	//		//		format: 'DD-MM-YYYY'
	//		format: 'DD MMM YYYY'
	//
	//	});
	//
	//	//var minDate = moment().subtract(0, 'days').millisecond(0).second(0).minute(0).hour(0);
	//
	//	$(" #editStartDate, #editEndDate").datetimepicker({
	//		format: 'ddd DD MMM YYYY HH:mm'
	//		//minDate: minDate
	//	});
	//
	//
	//
	//	//CREATE NEW EVENT CALENDAR
	//
	//	newEvent = function (start, end, view, eventType) {
	//
	//
	//
	//		console.log(moment(start).format('HH'));
	//
	//		if (view.name == "timelineDay") {
	//
	//			$('#startAt1').val(moment(start).format('DD MMM YYYY'));
	//			$('#endAt1').val(moment(end).format('DD MMM YYYY'));
	//			//		$('#endAt1').val(moment(end).subtract(1, 'day').format('DD MMM YYYY'));
	//
	//			$('#startAt2').val(moment(start).format('DD MMM YYYY'));
	//			$('#endAt2').val(moment(end).format('DD MMM YYYY'));
	//
	//			$('#last_maintenance').val(moment(start).format('DD MMM YYYY'));
	//			$('#next_due_tach').val(moment(end).format('DD MMM YYYY'));
	//			// time for add reservation
	//			$('#startAt1Time1').val(moment(start).format('HH'));
	//			$('#startAt1Time2').val(moment(start).format('mm'));
	//
	//			$('#endAt1time1').val(moment(end).format('HH'));
	//			$('#endAt1time2').val(moment(end).format('mm'));
	//			// time for add instructor only
	//			$('#startAt2Time1').val(moment(start).format('HH'));
	//			$('#startAt2Time2').val(moment(start).format('mm'));
	//
	//			$('#endAt2time1').val(moment(end).format('HH'));
	//			$('#endAt2time2').val(moment(end).format('mm'));
	//			// time for add maintenance
	//			$('#startAt3Time1').val(moment(start).format('HH'));
	//			$('#startAt3Time2').val(moment(start).format('mm'));
	//
	//
	//
	//			$('#endAt3time1').val(moment(end).format('HH'));
	//			$('#endAt3time2').val(moment(end).format('mm'));
	//
	//
	//
	//
	//		} else if (view.name == "month") {
	//
	//			$('#startAt1').val(moment(start).format('DD MMM YYYY'));
	//			$('#endAt1').val(moment(end).subtract(1, 'day').format('DD MMM YYYY'));
	//			//		$('#endAt1').val(moment(end).subtract(1, 'day').format('DD MMM YYYY'));
	//
	//			$('#startAt2').val(moment(start).format('DD MMM YYYY'));
	//			$('#endAt2').val(moment(end).subtract(1, 'day').format('DD MMM YYYY'));
	//
	//			$('#last_maintenance').val(moment(start).format('DD MMM YYYY'));
	//			$('#next_due_tach').val(moment(end).subtract(1, 'day').format('DD MMM YYYY'));
	//		}
	//		//      $("#contextMenu").hide();
	//		//$('.eventType').text(eventType);
	//		$('input#title').val("");
	//		//		$('#starts-at').val(start);
	//
	//
	//
	//
	//		if (user_role == "user") {
	//			$('#newEventModal').modal('show');
	//		} else if (user_role == "maintenance") {
	//			$('#maintenence-modal').modal('show');
	//		} else if (user_role == "admin") {
	//			//alert("admin role");
	//		}
	//
	//		var endDay;
	//		var eventId = 1 + Math.floor(Math.random() * 1000);
	//
	//		$('#flight-event').unbind();
	//		$('#save-event2').unbind();
	//		$('#maintenance-event').unbind(); //imp
	//
	//		////////////////////////////////////
	//		// flight reserve
	//		$('#flight-event').on('click', function () {
	//
	//
	//			var title = $('#title').text();
	//			var startDay = $('#startAt1').val();
	//			var endDay = $('#endAt1').val();
	//
	//			var startAt1Time1 = $('#startAt1Time1 option:selected').val(); //text();
	//			var startAt1Time2 = $('#startAt1Time2 option:selected').val();
	//
	//			var endAt1time1 = $('#endAt1time1 option:selected').val();
	//			var endAt1time2 = $('#endAt1time2 option:selected').val();
	//
	//			//
	//
	//
	//
	//			startDay += " " + startAt1Time1 + ":" + startAt1Time2;
	//			endDay += " " + endAt1time1 + ":" + endAt1time2;
	//
	//
	//
	//			//			console.log(moment(startAt1Time1).format('hh') +  " - "+ moment(endAt1time1).format('HH '));
	//
	//			var aircraft_id = $('#aircraft option:selected').val();
	//			var instructor_id = $('#instructor_id option:selected').val();
	//			var destination = $('#destination').val();
	//			var comments = $('#comments1').val();
	//			var type = "regular";
	//
	//
	//			if (title) {
	//				var eventData = {
	//					_id: eventId,
	//					title: title,
	//					resourceIds1: aircraft_id,
	//					resourceIds2: instructor_id,
	//					aircraft_id: aircraft_id,
	//					instructor_id: instructor_id,
	//					from_dt: startDay,
	//					to_dt: endDay,
	//					res_type: type,
	//					destination: destination,
	//					comments: comments,
	//					start: startDay,
	//					end: endDay,
	//					destination: destination,
	//
	//				};
	//				console.log(eventData);
	//
	//
	//				$.ajax({
	//						type: 'POST',
	//						url: 'php/addreservation.php',
	//						//						data: {jsondata :JSON.stringify(eventData)},
	//						data: {
	//							jsondata: eventData
	//						}, //change this to
	//
	//						//					data: eventData,
	//
	//						dataType: 'json',
	//						encode: true
	//					})
	//
	//					.done(function (data) {
	//
	//
	//
	//						if (data.status == "err") {
	//							$.notify(
	//								data.msg, {
	//									position: "bottom center",
	//									showDuration: 1,
	//									className: 'warn'
	//								}
	//							);
	//
	//							// show error
	//
	//						} else if (data.status == "ok") {
	//
	//							console.log(calSelected);
	//
	//							$(calSelected).fullCalendar('refetchEvents');
	//							// 							$("#calendar").fullCalendar('renderEvent', eventData, true);
	//							$('#newEventModal').find('input, textarea').val('');
	//							$('#newEventModal').modal('hide');
	//
	//
	//						}
	//					})
	//
	//
	//					.fail(function (data) {
	//
	//						console.log("ajax failed");
	//
	//					});
	//
	//				//				$("#calendar").fullCalendar('renderEvent', eventData, true);
	//				//				$('#newEventModal').find('input, textarea').val('');
	//				//				$('#newEventModal').modal('hide');
	//			} else {
	//				//alert("Title can't be blank. Please try again.")
	//			}
	//		});
	//		//// instructor only reserve
	//		$('#save-event2').on('click', function () {
	//
	//			var title = "name of user "; //$('#title').text();
	//			var startDay = $('#startAt2').val();
	//			var endDay = $('#endAt2').val();
	//
	//			var startAt2Time1 = $('#startAt2Time1 option:selected').val(); //text();
	//			var startAt2Time2 = $('#startAt2Time2 option:selected').val();
	//
	//			var endAt2time1 = $('#endAt2time1 option:selected').val();
	//			var endAt2time2 = $('#endAt2time2 option:selected').val();
	//
	//
	//			startDay += " " + startAt2Time1 + ":" + startAt2Time2;
	//
	//			endDay += " " + endAt2time1 + ":" + endAt2time2;
	//
	//
	//
	//
	//			var instructor_id = $('#instructor_id2 option:selected').val();
	//
	//			var comments = $('#comments2').val();
	//			//////////////
	//			var calendar = $('#calendar-type').val();
	//			var description = $('#add-event-desc').val();
	//			var type = "instructoronly";
	//			if (title) {
	//				var eventData = {
	//					_id: eventId,
	//					title: title,
	//					start: startDay,
	//					end: endDay,
	//					resourceIds1: null,
	//					resourceIds2: instructor_id,
	//					instructor_id: instructor_id,
	//					res_type: type, // set on the basis of role
	//					comments: comments,
	//					from_dt: startDay,
	//					to_dt: endDay
	//
	//				};
	//				console.log(eventData);
	//				$.ajax({
	//						type: 'POST',
	//						url: 'php/addreservation.php',
	//						data: {
	//							jsondata: eventData
	//						}, //change this to
	//						dataType: 'json',
	//						encode: true
	//					})
	//
	//					.done(function (data) {
	//
	//						console.log(data);
	//
	//						if (data.status == "err") {
	//							$.notify(
	//								"Failed !", {
	//									position: "bottom center",
	//									showDuration: 1,
	//									className: 'warn'
	//								}
	//							);
	//
	//							// show error
	//
	//						} else if (data.status == "ok") {
	//							//                        $("#calendar").fullCalendar('refetchEvents');
	//							$(calSelected).fullCalendar('refetchEvents');
	//							//							$("#calendar").fullCalendar('renderEvent', eventData, true);
	//
	//
	//							$('#newEventModal').find('input, textarea').val('');
	//							$('#newEventModal').modal('hide');
	//						}
	//					})
	//
	//
	//					.fail(function (data) {
	//
	//						console.log("ajax failed");
	//
	//					});
	//
	//			} else {
	//				//alert("Title can't be blank. Please try again.")
	//			}
	//		});
	//		///////////// maintenance
	//		$('#maintenance-event').on('click', function () {
	//
	//			var title = "maintainance user";
	//			var startDay = $('#startAt2').val();
	//			var endDay = $('#endAt2').val();
	//
	//			var startAt2Time1 = $('#startAt2Time1 option:selected').val();
	//			var startAt2Time2 = $('#startAt2Time2 option:selected').val();
	//
	//			var endAt2time1 = $('#endAt2time1 option:selected').val();
	//			var endAt2time2 = $('#endAt2time2 option:selected').val(); // need fixing
	//
	//
	//			startDay += " " + startAt2Time1 + ":" + startAt2Time2;
	//
	//			endDay += " " + endAt2time1 + ":" + endAt2time2;
	//
	//
	//			var aircraft_id = $('#main_aircraft_id option:selected').val();
	//			//			var comments = $('#comments2').val();
	//			//////////////
	//			var calendar = $('#calendar-type').val();
	//			var description = $('#add-event-desc').val();
	//			var type = "maintenance";
	//			if (title) {
	//				var eventData = {
	//					_id: eventId,
	//					title: title,
	//					start: startDay,
	//					end: endDay,
	//					aircraft_id: aircraft_id,
	//					resourceIds1: aircraft_id,
	//					resourceIds2: null,
	//					//					instructor_id: instructor_id,
	//					res_type: "maintenance", // set on the basis of role
	//					from_dt: startDay,
	//					to_dt: endDay,
	//
	//				};
	//				console.log(eventData);
	//				$.ajax({
	//						type: 'POST',
	//						url: 'php/addreservation.php',
	//						data: {
	//							jsondata: eventData
	//						}, //change this to
	//						dataType: 'json',
	//						encode: true
	//					})
	//
	//					.done(function (data) {
	//
	//						console.log(data);
	//
	//						if (data.status == "err") {
	//							$.notify(
	//								"Failed !", {
	//									position: "bottom center",
	//									showDuration: 1,
	//									className: 'warn'
	//								}
	//							);
	//
	//							// show error
	//
	//						} else if (data.status == "ok") {
	//							//                        $("#calendar").fullCalendar('refetchEvents');
	//							$(calSelected).fullCalendar('refetchEvents');
	//							//							$("#calendar").fullCalendar('renderEvent', eventData, true);
	//							$('#mainenence-modal').find('input, textarea').val('');
	//							$('#maintenence-modal').modal('hide');
	//
	//
	//						}
	//					})
	//
	//
	//					.fail(function (data) {
	//
	//						console.log("ajax failed");
	//
	//					});
	//
	//			} else {
	//				//                //alert("Title can't be blank. Please try again.")
	//			}
	//		});
	//	}

	//EDIT EVENT CALENDAR


});
