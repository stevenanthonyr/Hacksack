$(function() {
    var items = $('.item');
    var weight = 0;
    var value = 0;
    var maxWeight = parseInt($(".mainContainer").attr('data-maxweight'));
    for (i = 0; i < items.length; i++) {
        $(items[i]).data('location', 'house'); //never forget, you need the selector!
    }

    function exceededCapacity() {
        console.log('exceeded capacity');
        $('.alert').fadeIn(2000);
        $('.alert').fadeOut(2000);
    }

    function updateKnapsack() {
        $("#knapsack .header .info").text("($" + value + ", " + weight + "kg)");
    }

    function draw() {
        $(".items").empty;
        for (i = 0; i < items.length; i++) {
            if ($(items[i]).data('location') == 'house') {
                $("#house .items").append($(items[i]))
            }
            else {
                $("#knapsack .items").append($(items[i]))
            }
        }
    }

    function steal(stealMe) {
        var newWeight = weight + parseInt($('img', stealMe).attr('data-weight'));
        if (newWeight > maxWeight) {exceededCapacity();}
        else {
            //move item to the knapsack
            value += parseInt($('img', stealMe).attr('data-value'));
            weight = newWeight;
            //stealMe.detach();
            //$("#knapsack .items").append(stealMe);
            $(stealMe).data('location', 'knapsack');
            updateKnapsack();
            draw();
        }
    }

    function unsteal(replaceMe) {
        weight -= parseInt($('img', replaceMe).attr('data-weight'));
        //move item to the house
        value -= parseInt($('img', replaceMe).attr('data-value'));
        //replaceMe.detach();
        //$("#house .items").append(replaceMe);
        $(replaceMe).data('location', 'house');
        updateKnapsack();
        draw();
    }

    items.click(function(event) {
        console.log("clicked item is in: " + $(this).data('location'));
        if ($(this).data('location') == 'house') {
            steal($(this));
        }
        else if ($(this).data('location') == 'knapsack') {
            unsteal($(this));
        }
        $("#knapsack.header").text("($" + value + ", " + weight + "kg)");

    });

});
