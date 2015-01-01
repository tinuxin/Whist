/**
 * Created with IntelliJ IDEA.
 * User: tinus
 * Date: 10/14/13
 * Time: 6:23 PM
 * To change this template use File | Settings | File Templates.
 */
function ScoreController($scope) {

    $scope.deal = function (player) {
        if (player === 4) {
            player = 0;
        }

        // TODO enten skal round være en global variabel eller også skal alle runder gemmes et sted som denne metod har adgang til
        if ($scope.round % 4 == player) {
            return "deal";
        }
    }
}