$(function() {

  var mapOptions = {
        center: new google.maps.LatLng(-22.1967, -49.9551),
        zoom: 9,
        mapTypeId: google.maps.MapTypeId.HYBRID,
        scrollwheel: true,
        draggable: true,
        panControl: true,
        zoomControl: true,
        mapTypeControl: true,
        scaleControl: true,
        streetViewControl: true,
        overviewMapControl: true,
        rotateControl: true,
    };
    var map = new google.maps.Map(document.getElementById("map-canvas"), mapOptions);
    google.maps.event.addDomListener(window, 'load');

    $.parse.init({
            app_id : "5CY8oHvxmeeiIk6NpHMrzPLxMWvtoDjslgrJyF2v", // <-- enter your Application Id here
            rest_key : "UeOb8bI4fHnMDdBgHIh3epPfl0wStqYbMPuCDmVU" // <--enter your REST API Key here
    });

    $.parse.get("customer", function(json) {
        results = json.results;
        results.forEach(function(task) {
              var myLatLng = {lat: task.lat, lng: task.lng};
              var marker = new google.maps.Marker({
                position: myLatLng,
                map: map,
                title: task.name
              });
        });
      });

});
