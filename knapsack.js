var audio = new Audio('resources/sadtrombone.mp3');
$(function() {
    var items = $('.item');
    var weight = 0;
    var value = 0;
    var maxWeight = parseInt($(".mainContainer").attr('data-maxweight'));
    for (i = 0; i < items.length; i++) {
        $(items[i]).data('location', 'house'); //never forget, you need the selector!
    }

    function draw() {
        //$(".items").empty(); //todo: rewrite this, same functionality
        for (i = 0; i < items.length; i++) {
            console.log(items[i])
            if ($(items[i]).data('location') == 'house') {
                $("#house .items").append($(items[i]))
            }
            if ($(items[i]).data('location') == 'knapsack') {
                $("#knapsack .items").append($(items[i]))
            }
        }
    }
    //draw(); //this seemingly random draw is used to get the images in line with how they are in the beginning.

    function exceededCapacity() {
        audio.play();
        $('.alert').fadeIn(1000).delay(1000);
        $('.alert').fadeOut(1000);
    }

    function updateKnapsack() {
        //$("#knapsack .header .info").text("($" + value + ", " + weight + "kg)");
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
        //move item to the house
        value -= parseInt($('img', replaceMe).attr('data-value'));
        $(replaceMe).data('location', 'house');
        updateKnapsack();
        draw();
    }

    items.click(function(event) {
        if ($(this).data('location') == 'house') {
            steal($(this));
        }
        else if ($(this).data('location') == 'knapsack') {
            unsteal($(this));
        }
        $("#knapsack.header").text("($" + value + ", " + weight + "kg)");

    });

});
