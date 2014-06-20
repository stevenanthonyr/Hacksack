var fullDriveAudio = new Audio('resources/error.mp3'); //outside of $(function() {...} so that is can start loading faster.
var isRatio = false;

$(function() {
    //Global-ish Variables
    var items = $('.item');
    var weight = 0;
    var value = 0;
    var maxWeight = parseInt($(".mainContainer").attr('data-maxweight'));
    for (i = 0; i < items.length; i++) {
            $(items[i]).data('location', 'server'); //never forget, you need the selector!
    }

//HELPER FUNCTIONS
    //Parses the 'data-weight' attribute of images stored inside item divs.
    function parseWeight(element) {
        return parseInt($('img', element).attr('data-weight'));
    }

    //Parses the 'data-value' attribute of images stored inside item divs.
    function parseValue(element) {
        return parseInt($('img', element).attr('data-value'));
    }

    //Updates the knapsack information in the knapsack header based on what objects are currently in it.
    function updateKnapsack() {
        $("#knapsack .header .info").text("($" + value + ", " + weight + "GB)");
    }

    //Draws the items inside of the server/knapsack divs. Used to ensure that
    //items appear in the same index when put back into the house.
    function draw() {
        for (i = 0; i < items.length; i++) {
            var $item = $(items[i])
            var locationTag = ""
            $item.data('location') == 'server' ? locationTag = "#server" : locationTag = "#knapsack";
            $(locationTag + " .items").append($item) //detach not needed because append just moves the element.
        }
    }

//BUTTON FUNCTIONS
    //Toggles between the ratio view and the value, weight view, depending on what the
    //current view is.
    function toggleRatios(isRatioClass) {
        $('.item').each(function(i, e) {
            var itemWeight = parseWeight(e);
            var itemValue = parseValue(e);
            var text = "";
            //if in ratio form, turn it into (value, weight) form, and vice versa.
            if (isRatio) { text= "$" + itemValue + ", " + itemWeight + "GB" }
            else { text = itemValue/itemWeight + " dol/GB" }
            $('span', e).text(text);
        });
        isRatio = !isRatio;
    }

    //displays a help message when the help button is pressed.
    function help() {
        var sec = 1000; //second in milliseconds
        $('.helpWindow').fadeIn(sec);
        $('.helpWindow').click(function(event) {
            $('.helpWindow').hide();
        });
    }

    //Resets the state of the board to the introductory state.
    function reset() {
        //reset the item location to server so that they reset position upon the draw() call.
        $('.item').each(function(i, e){ $(e).data('location', 'server'); });
        draw();
        value = 0;
        weight = 0;
        updateKnapsack();

    }

//SIMULATION FUNCTIONS
    //Alerts the user that the knapsack has exceeded capacity.
    function exceededCapacity() {
        var sec = 1000; //second in milliseconds
        fullDriveAudio.play();
        $('.alert').click(function(event) { $('.alert img').hide(); });
//        $('.alert').fadeIn(sec/2).delay(1.5*sec).fadeOut(sec/2); this can lead to tons of chaining of alerts.
        $('.alert').fadeIn(sec/2);
        setTimeout(function(){ $('.alert').fadeOut(sec/2); }, 1.5*sec);
    }

    //Moves an object from the server to the knapsack.
    function steal(stealMe) {
        var newWeight = weight + parseWeight(stealMe);
        if (newWeight > maxWeight) {exceededCapacity();}
        else {
            //move item to the knapsack
            value += parseValue(stealMe);
            weight = newWeight;
            $(stealMe).data('location', 'knapsack');
            updateKnapsack();
            draw();
        }
    }

    //Moves an object from the knapsack to the server.
    function unsteal(replaceMe) {
        weight -= parseWeight(replaceMe);
        value -= parseValue(replaceMe);
        $(replaceMe).data('location', 'server');
        updateKnapsack();
        draw();
    }

    draw(); //this seemingly random draw is used to get the images in line with how they are in the beginning.

    items.click(function(event) {
        //server is the game server on the left side of the screen.
        ($(this).data('location') == 'server') ? steal($(this)) : unsteal($(this));
        updateKnapsack();

    });

    //use a 'showingRatio' variable above for this instead
    $('.ratioToggle').click(function(event) { toggleRatios(isRatio); });
    $('.help').click(function(event) { help(); });
    $('.reset').click(function(event) { reset(); });

});
