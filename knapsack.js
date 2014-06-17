function updateKnapsack() {

}

$(function() {
    var items = $('.item');
    var weight = 0;
    var value = 0;
    var maxWeight = parseInt($(".mainContainer").attr('data-maxweight'));
    console.log(maxWeight);
    for (i = 0; i < items.length; i++) {
        console.log(items[i]);
        items[i].data('location', 'house');
    }

    function exceededCapacity() {
        $('.alert').fadeIn(500);
        $('.alert').fadeOut(500);
    }

    function steal(stealMe) {
        var newWeight = weight + parseInt($(stealMe).attr('data-value'));
        if (newWeight > maxWeight) {exceededCapacity();}
        else {
            //move item to the knapsack
            value += parseInt($(stealMe).attr('data-value'));
            weight = newWeight;
            stealMe.remove();
            $("#knapsack").append(stealMe);
            $(stealMe).data('location', 'knapsack');
        }
    }

    function unsteal(replaceMe) {
        weight -= parseInt($(replaceMe).attr('data-value'));
        //move item to the house
        value -= parseInt($(replaceMe).attr('data-value'));
        replaceMe.remove();
        $("#house").append(replaceMe);
        $(replaceMe).data('location', 'house');
    }

    items.click(function(event) {
        if ($(this).data('location') === 'house') {
            steal($(this));
        }
        else if ($(this).data('location') === 'knapsack') {
            unsteal($(this));
        }
        $("#knapsack.header").text("($" + value + ", " + weight + "kg)");

    });

});
