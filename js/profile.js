var listofTabs = ['#profile_tab', '#pilotprofile_tab', '#allowedaircraft_tab', '#equipment_tab', '#preferences_tab', '#accounts_tab', '#changepass_tab'];
for (var i = 0; i < listofTabs.length; i++) {

    $(listofTabs[i]).hide();

}
if (window.location.hash) {


    //		
    var urlParams = new URLSearchParams(location.search);
    //	 console.log(urlParams.get('aricraft'));
    var aircraftName = urlParams.get('aricraft');
    var x = location.hash;



    for (var i = 0; i < listofTabs.length; i++) {
        if (listofTabs[i] == x) {
            $(listofTabs[i]).show();
        } else {
            $(listofTabs[i]).hide();
        }
    }

}
/// tab switching
$(window).on('hashchange', function () {
    var x = location.hash;
    for (var i = 0; i < listofTabs.length; i++) {
        if (listofTabs[i] == x) {
            $(listofTabs[i]).show();
        } else {
            $(listofTabs[i]).hide();
        }
    }

});
/////////////



$(document).ready(function () {
    $("#dob , #p_date").datetimepicker({
        format: 'DD MMM YYYY '
    });
});

// profile update form
$(document).ready(function () { // Get the form.
    var form = $('#profileUpdate');

    $(form).submit(function (event) {

        event.preventDefault();
        /*var fileInput = document.getElementById('ProfileImgInput');
        if (fileInput) {
            var file = fileInput.files[0];
        }*/
        //				var formData = new FormData();
        //				formData.append('file', file);
        //            var formData = JSON.stringify($(form).serializeArray());

        //		var formData = {
        //			'first_name': $('#first_name').val(),
        //			'last_name': $('#last_name').val(),
        //			'dob': $('#dob').val(),
        //			'country': $('#country').val(),
        //			'city': $('#city').val(),
        //			'street': $('#street').val(),
        //			'state': $('#state').val(),
        //			'postal_code': $('#postal_code').val(),
        //			'cell_phone': $('#cell_phone').val(),
        //			'home_phone': $('#home_phone').val(),
        //			'work_phone': $('#work_phone').val(),
        //			'emergency_contact': $('#emergency_contact').val(),
        //			'emergency_num': $('#emergency_num').val(),
        //			'comments': $('#comments').val(),
        //		//	'profile_pic': file,
        //			//                 '': $('#').val(),
        //
        //        };
        var file_data = $('#profile_pic').prop('files')[0];
        var formData = new FormData($(this)[0]);
        formData.append('profile_pic', file_data)
        console.log(formData);
        $.ajax({
                type: 'POST',
                url: 'updateprofile',
                data: formData,
                dataType: 'json',
                contentType: false,
                processData: false,
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


                }
            })


            .fail(function (data) {

                console.log("ajax failed");
            });

    });

});
////////////////////profile picture /////////////////
//$(document).ready(function (e) {
// 
//
//	$("#ProfileImgInput").on("change", function () {
//		console.log("adasdasdasd");
//		//		$("#profileUpdate").submit();
//		//		e.preventDefault();
//		var fileInput = document.getElementById('ProfileImgInput');
//		var file = fileInput.files[0];
//		var formData = new FormData();
////		$("#profile_Image")
// 		console.log(URL.createObjectURL(fileInput.files[0]));
//		$('#profile_Image').css('background-image', 'url(' + URL.createObjectURL(fileInput.files[0]) + ')');
////		$('#profile_Image').css('src', 'hidden');
// 		$('#profile_Image').attr('src', 'url(' + URL.revokeObjectURL(fileInput.files[0]) + ')');
// 		
//	});
//});

/////////////////////////////////////////////////////

/////////////// aircraft////////////////
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


                    var markup = "<tr><td>   " + data.msg[msgCount]["aircraft"] + " - " + data.msg[msgCount]["tail_no"] + "</td> </tr>";


                    $("#aircraft_table").append(markup);
                }
            } else if (data.status == "err") {
                var markup = "<tr style='text-align:center'> <td> No Aircrafts </td> </tr>";
                $("#aircraft_table").append(markup);
            }
        },
        error: function (data) {
            alert("error in getting aircraft info");
        }

    });



});

// get pilot profile 

/////////////// getting pilot profile////////////////
$(document).ready(function () {
    //    var dataSet = {
    //        'cert_num': $('#cert_num').val(),
    //        'aopa_num': $('#aopa_num').val(),
    //        'cert_date': $('#cert_date').val(),
    //        'member_num': $('#member_num').val(),
    //        'medcert_exp': $('#medcert_exp').val(),
    //        'medcert_reminder': $('#medcert_reminder').val(),
    //        'bfr': $('#bfr').val(),
    //        'bfr_reminder': $('#bfr_reminder').val(),
    //        'clubreview': $('#clubreview').val(),
    //        'clubreview_reminder': $('#clubreview_reminder').val(),
    //        'sing_eng_land': $('#sing_eng_land').val(),
    //        'sing_eng_sea': $('#sing_eng_sea').val(),
    //        'sing_eng_inst': $('#sing_eng_inst').val(),
    //        'mult_eng_land': $('#mult_eng_land').val(),
    //        'mult_eng_sea': $('#mult_eng_sea').val(),
    //        'mult_eng_inst': $('#mult_eng_inst').val(),
    //
    //    };
    $.ajax({
        type: 'GET',
        url: "php/getpilotprofile.php",
        dataType: 'json',
        encode: true,
        success: function (data) {
            if (data.status == "ok") {


 
                $('#cert_num').val(data.msg.cert_num); //': 
                $('#aopa_num').val(data.msg.aopa_num); //': 
                $('#cert_date').val(data.msg.cert_date); //': 
                $('#member_num').val(data.msg.member_num); //': 
                $('#medcert_exp').val(data.msg.medcert_exp); //': 
                $('#medcert_reminder').val(data.msg.medcert_reminder); //': 
                $('#bfr').val(data.msg.bfr); //': 
                $('#bfr_reminder').val(data.msg.bfr_reminder); //':
                $('#clubreview').val(data.msg.clubreview); //': 
                $('#clubreview_reminder').val(data.msg.clubreview_reminder); //':
                $('#sing_eng_land').prop('checked', data.msg.sing_eng_land); //': 
                $('#sing_eng_sea').prop('checked', data.msg.sing_eng_sea); //': 
                $('#sing_eng_inst').prop('checked', data.msg.sing_eng_inst); //': 
                $('#mult_eng_land').prop('checked', data.msg.mult_eng_land); //': 
                $('#mult_eng_sea').prop('checked', data.msg.mult_eng_sea); //': 
                $('#mult_eng_inst').prop('checked', data.msg.mult_eng_inst); //':



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
            alert("error in getting pilot profile ");
        }

    });



});
// pilotsa profile update form
$(document).ready(function () { // Get the form.
    var form = $('#pilot_update');

    $(form).submit(function (event) {

        event.preventDefault();

        //				var formData = new FormData();
        //				formData.append('file', file);
        //            var formData = JSON.stringify($(form).serializeArray());

        var dataSet = {
            'cert_num': $('#cert_num').val(),
            'aopa_num': $('#aopa_num').val(),
            'cert_date': $('#cert_date').val(),
            'member_num': $('#member_num').val(),
            'medcert_exp': $('#medcert_exp').val(),
            'medcert_reminder': $('#medcert_reminder').val(),
            'bfr': $('#bfr').val(),
            'bfr_reminder': $('#bfr_reminder').val(),
            'clubreview': $('#clubreview').val(),
            'clubreview_reminder': $('#clubreview_reminder').val(),
            'sing_eng_land': $('#sing_eng_land').is(":checked"),
            'sing_eng_sea': $('#sing_eng_sea').is(":checked"),
            'sing_eng_inst': $('#sing_eng_inst').is(":checked"),
            'mult_eng_land': $('#mult_eng_land').is(":checked"),
            'mult_eng_sea': $('#mult_eng_sea').is(":checked"),
            'mult_eng_inst': $('#mult_eng_inst').is(":checked"),

        };
        console.log(dataSet);
        $.ajax({
                type: 'POST',
                url: 'php/updatepilotprofile.php',
                data: dataSet,
                dataType: 'json',
                //			 processData: false,
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


                }
            })


            .fail(function (data) {

                console.log("ajax failed");
            });

    });

});

//////////

 

$(document).ready(function () { // Get the form.
    var form = $('#changepass_form');

    $(form).submit(function (event) {

        event.preventDefault();
        var dataSet = {
            'curr_password': $('#curr_password').val(),
            'new_password': $('#new_password').val()
        };
        console.log(dataSet);
        $.ajax({
                type: 'POST',
                url: 'php/changepassword.php',
                data: dataSet,
                dataType: 'json',
                //			 processData: false,
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


                }
            })


            .fail(function (data) {

                console.log("ajax failed");
            });

    });

});
///////////// get preferences
$(document).ready(function () {
    $.ajax({
        type: 'GET',
        url: "php/getuserprefs.php",
        dataType: 'json',
        encode: true,
        success: function (data) {
            if (data.status == "ok") {


                console.log(data.msg);

                $('#email_alerts').prop('checked', data.msg.email_alerts); //': 
                $('#hide_details').prop('checked', data.msg.hide_details); //': 
                $('#block_nxtday_alerts').prop('checked', data.msg.block_nxtday_alerts); //':



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
            alert("error in getting user pref ");
        }

    });



});
///////////////////////////////
$(document).ready(function () { // Get the form.
    var form = $('#preferences_form');

    $(form).submit(function (event) {

        event.preventDefault();
        var dataSet = {
            'email_alerts':$('#email_alerts').is(":checked"),
            'hide_details':$('#hide_details').is(":checked"),
            'block_nxtday_alerts':$('#block_nxtday_acheckedlerts').is(":checked")
        };
        console.log(dataSet);
        $.ajax({
                type: 'POST',
                url: 'php/updateuserprefs.php',
                data: dataSet,
                dataType: 'json',
                //			 processData: false,
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


                }
            })


            .fail(function (data) {

                console.log("ajax failed");
            });

    });

});
