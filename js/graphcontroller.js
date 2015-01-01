/**
 * Created with IntelliJ IDEA.
 * User: tinus
 * Date: 10/14/13
 * Time: 6:24 PM
 * To change this template use File | Settings | File Templates.
 */
function GraphController($scope) {
    $scope.graph = function () {
        $scope.graphing = true;
        drawChart($scope.players[0], $scope.players[1], $scope.players[2], $scope.players[3], $scope.totals.slice(0));
        $('#graphModal').modal({keyboard: true});
    }
}

drawChart = function (player1, player2, player3, player4, scores) {
    scores.unshift(['Round', player1, player2, player3, player4]);
    var data = google.visualization.arrayToDataTable(scores, false);

//    var dataview = new google.visualization.DataView(data);

    var options = {
        title: 'Score',
        hAxis: {title: 'Round', titleTextStyle: {color: 'red'}},
        yAxis: {title: 'Score'},
        width: 850,
        height: 450
    };

    var chart = new google.visualization.LineChart(document.getElementById('graph'));
    chart.draw(data, options);

    // Create the data table.
//    var data = new google.visualization.DataTable();
//    data.addColumn('string', 'Topping');
//    data.addColumn('number', 'Slices');
//    data.addRows([
//        ['Mushrooms', 3],
//        ['Onions', 1],
//        ['Olives', 1],
//        ['Zucchini', 1],
//        ['Pepperoni', 2]
//    ]);
//
//    // Set chart options
//    var options = {'title':'How Much Pizza I Ate Last Night',
//        'width':400,
//        'height':300};
//
//    // Instantiate and draw our chart, passing in some options.
//    var chart = new google.visualization.PieChart(document.getElementById('graph'));
//    chart.draw(data, options);
};

// Load the Visualization API and the piechart package.
google.load('visualization', '1.0', {'packages': ['corechart']});

// Set a callback to run when the Google Visualization API is loaded.
google.setOnLoadCallback(drawChart);