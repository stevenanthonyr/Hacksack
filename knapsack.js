var maxWeight = $(.mainContainer).attr('data-maxweight');
console.log(maxWeight);

function updateKnapsack() {

}

$(function() {
    var items = $(.item);
    var weight = 0;
    var value = 0;
    for (i = 0, i < items.length, i++) {
        items[i].data('location', 'house');
    }

    function exceededCapacity() {

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
    }



}
