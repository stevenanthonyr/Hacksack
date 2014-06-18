var audio = new Audio('resources/error.mp3');
$(function() {
    var items = $('.item');
    var weight = 0;
    var value = 0;
    var maxWeight = parseInt($(".mainContainer").attr('data-maxweight'));
    for (i = 0; i < items.length; i++) {
        $(items[i]).data('location', 'server'); //never forget, you need the selector!
    }

    function draw() {
        //$(".items").empty(); //todo: rewrite this, same functionality/
        //to be fair, through, it technically works without parenthesis...
        for (i = 0; i < items.length; i++) {
            console.log(items[i])
            if ($(items[i]).data('location') == 'server') {
                $("#server .items").append($(items[i])) //detach not needed because append just moves the element.
            }
            if ($(items[i]).data('location') == 'knapsack') {
                $("#knapsack .items").append($(items[i]))
            }
        }
    }
    draw(); //this seemingly random draw is used to get the images in line with how they are in the beginning.

    function exceededCapacity() {
        var sec = 1000; //second in milliseconds
        audio.play();
        $('.alert').fadeIn(sec).delay(sec);
        $('.alert').fadeOut(sec);
    }

    function updateKnapsack() {
        $("#knapsack .header .info").text("($" + value + ", " + weight + "kg)");
    }

    function steal(stealMe) {
        var newWeight = weight + parseInt($('img', stealMe).attr('data-weight'));
        if (newWeight > maxWeight) {exceededCapacity();}
        else {
            //move item to the knapsack
            value += parseInt($('img', stealMe).attr('data-value'));
            weight = newWeight;
            $(stealMe).data('location', 'knapsack');
            updateKnapsack();
            draw();
        }
    }

    function unsteal(replaceMe) {
        weight -= parseInt($('img', replaceMe).attr('data-weight'));
        //move item to the server
        value -= parseInt($('img', replaceMe).attr('data-value'));
        $(replaceMe).data('location', 'server');
        updateKnapsack();
        draw();
    }

    items.click(function(event) {
        if ($(this).data('location') == 'server') {
            steal($(this));
        }
        else if ($(this).data('location') == 'knapsack') {
            unsteal($(this));
        }
        $("#knapsack.header").text("($" + value + ", " + weight + "kg)");

    });

});
