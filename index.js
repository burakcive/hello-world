    var map, infoWindow;
    var defaultLocation = {lat: 42, lng: 26};
    function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
            center: defaultLocation,
            maxZoom: 32,
            minZoom: 2,
            zoom: 8,
            styles: [
                {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
                {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
                {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
                {
                  featureType: 'administrative.locality',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#d59563'}]
                },
                {
                  featureType: 'poi',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#d59563'}]
                },
                {
                  featureType: 'poi.park',
                  elementType: 'geometry',
                  stylers: [{color: '#263c3f'}]
                },
                {
                  featureType: 'poi.park',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#6b9a76'}]
                },
                {
                  featureType: 'road',
                  elementType: 'geometry',
                  stylers: [{color: '#38414e'}]
                },
                {
                  featureType: 'road',
                  elementType: 'geometry.stroke',
                  stylers: [{color: '#212a37'}]
                },
                {
                  featureType: 'road',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#9ca5b3'}]
                },
                {
                  featureType: 'road.highway',
                  elementType: 'geometry',
                  stylers: [{color: '#746855'}]
                },
                {
                  featureType: 'road.highway',
                  elementType: 'geometry.stroke',
                  stylers: [{color: '#1f2835'}]
                },
                {
                  featureType: 'road.highway',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#f3d19c'}]
                },
                {
                  featureType: 'transit',
                  elementType: 'geometry',
                  stylers: [{color: '#2f3948'}]
                },
                {
                  featureType: 'transit.station',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#d59563'}]
                },
                {
                  featureType: 'water',
                  elementType: 'geometry',
                  stylers: [{color: '#17263c'}]
                },
                {
                  featureType: 'water',
                  elementType: 'labels.text.fill',
                  stylers: [{color: '#515c6d'}]
                },
                {
                  featureType: 'water',
                  elementType: 'labels.text.stroke',
                  stylers: [{color: '#17263c'}]
                }
              ]
        });

        infoWindow = new google.maps.InfoWindow;
                // Try HTML5 geolocation.
                if (navigator.geolocation) {
                  navigator.geolocation.getCurrentPosition(function(position) {
                    var pos = {
                      lat: position.coords.latitude,
                      lng: position.coords.longitude
                    };
        
                    infoWindow.setPosition(pos);
                    infoWindow.setContent('Location found.');
                    infoWindow.open(map);
                    map.setCenter(pos);
                  }, function() {
                    handleLocationError(true, infoWindow, map.getCenter());
                  });
                } else {
                  // Browser doesn't support Geolocation
                  handleLocationError(false, infoWindow, map.getCenter());
                }
             
    }

    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }

    function createMarker(positionToMark, message)
    {
        var markerOptions = positionToMark.options;

        var infowindow = new google.maps.InfoWindow({
            content: message
        });

        var marker = new google.maps.Marker({
            position: positionToMark,
            map: map,
            animation: google.maps.Animation.DROP,
            //label: markerOptions.label
        });

        infowindow.open(map, marker);
        setTimeout(function(){
            infowindow.close();
            marker.setMap(null);
        },5000);
    }

    document.getElementById("btn_sendmessage").onclick = function ()
    {
        var _lat = document.getElementById("input_lat").value;
        var _lang = document.getElementById("input_lang").value;
        var _message =  document.getElementById("multi_message").value;
        _lat = parseInt(_lat);
        _lang = parseInt(_lang);
        
        var center = new google.maps.LatLng(_lat, _lang);
        // using global variable:
        map.panTo(center);

        //create Marker
        var newPositionToMark = {lat: _lat, lng: _lang};
        newPositionToMark.options =  {
            label : _message
        } 
        createMarker(newPositionToMark, _message);
    }

    var app_container = document.getElementById("app_container");
    
    var calculatedHeight = ((document.documentElement.clientHeight || document.body.clientHeight) - 400) + 'px';
    
    var calculatedWidth = ((document.documentElement.clientWidth || document.body.clientWidth) - 500) + 'px';

    app_container.style.top = calculatedHeight;
    app_container.style.left = calculatedWidth;

    (function setupDrag(container) {
        var selected = null, // Object of the element to be move
            x_pos = 0,
            y_pos = 0, // Stores x & y coordinates of the mouse pointer
            x_elem = 0,
            y_elem = 0; // Stores top, left values (edge) of the element

        // Will be called when user starts dragging an element
        function _drag_init(elem) {
            // Store the object of the element which needs to be moved
            selected = elem;
            x_elem = x_pos - selected.offsetLeft;
            y_elem = y_pos - selected.offsetTop;
        }

        // Will be called when user dragging an element
        function _move_elem(e) {
            x_pos = document.all ? window.event.clientX : e.pageX;
            y_pos = document.all ? window.event.clientY : e.pageY;
            if (selected !== null) {
                selected.style.left = (x_pos - x_elem) + 'px';
                selected.style.top = (y_pos - y_elem) + 'px';
            }
        }
        // Destroy the object when we are done
        function _destroy() {
            selected = null;
        }
        // Bind the functions...
        container.onmousedown = function (e) {
            _drag_init(this);
        };

        document.onmousemove = _move_elem;
        document.onmouseup = _destroy;
    })(app_container);




