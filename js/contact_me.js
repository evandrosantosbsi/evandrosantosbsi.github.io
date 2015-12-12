$(function() {

    $("input,textarea").jqBootstrapValidation({
        preventSubmit: true,
        submitError: function($form, event, errors) {
            // additional error messages or events
        },
        submitSuccess: function($form, event) {
            // Prevent spam click and default submit behaviour
            $("#btnSubmit").attr("disabled", true);
            event.preventDefault();

            // get values from FORM
            var name = $("input#name").val();
            var email = $("input#email").val();
            var phone = $("input#phone").val();
            var message = $("textarea#message").val();
            var addressT = $("input#address").val();
            var firstName = name; // For Success/Failure Message
            // Check for white space in name for Success/Fail message
            if (firstName.indexOf(' ') >= 0) {
                firstName = name.split(' ').slice(0, -1).join(' ');
            }

            var lat = 0.0;
            var lng = 0.0;

            $.ajax(
                {
                 async:false,
                 timeout: 3000,
                 type : "GET",
                 url: "http://maps.google.com/maps/api/geocode/json",
                 data: {
                     address: addressT,
                     sensor: "true"
                 },
                 success: function(data) {
                    lat=data.results[0].geometry.location.lat;
                    lng=data.results[0].geometry.location.lng;
                 },
                 error : function() {
                   lat='0.0';
                   lng='0.0';
                 }
               });

            $.parse.init({
                app_id : "5CY8oHvxmeeiIk6NpHMrzPLxMWvtoDjslgrJyF2v", // <-- enter your Application Id here
                rest_key : "UeOb8bI4fHnMDdBgHIh3epPfl0wStqYbMPuCDmVU" // <--enter your REST API Key here
            });

            $.parse.post('customer',{ 'name' : name, 'email' : email, 'phone' : phone,
                'message' : message, 'address' : addressT, 'lat' : lat, 'lng' : lng },
                function(json){
                  $("#btnSubmit").attr("disabled", false);
                  $('#success').html("<div class='alert alert-success'>");
                  $('#success > .alert-success').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                      .append("</button>");
                  $('#success > .alert-success')
                      .append("<strong>Your message has been sent. </strong>");
                  $('#success > .alert-success')
                      .append('</div>');

              //clear all fields
              $('#contactForm').trigger("reset");
            }, function() {
                // Fail message
                $('#success').html("<div class='alert alert-danger'>");
                $('#success > .alert-danger').html("<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;")
                    .append("</button>");
                $('#success > .alert-danger').append("<strong>Sorry " + firstName + ", it seems that my mail server is not responding. Please try again later!");
                $('#success > .alert-danger').append('</div>');
            });

        },
        filter: function() {
            return $(this).is(":visible");
        },
    });

    $("a[data-toggle=\"tab\"]").click(function(e) {
        e.preventDefault();
        $(this).tab("show");
    });
});

// When clicking on Full hide fail/success boxes
$('#name').focus(function() {
    $('#success').html('');
});
