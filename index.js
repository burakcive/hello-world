    var map;

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

   



