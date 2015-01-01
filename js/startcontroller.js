/**
 * Created with IntelliJ IDEA.
 * User: tinus
 * Date: 10/14/13
 * Time: 6:20 PM
 * To change this template use File | Settings | File Templates.
 */
function StartController($scope) {

//    $scope.player1 = '';
//    $scope.player2 = '';
//    $scope.player3 = '';
//    $scope.player4 = '';
//    $scope.players = ["", "", "", ""];
    $scope.players = ["anne", "thomas", "tinus", "nadia"];
    $scope.base_score = 0.1;

    // Check player names are set
    $scope.checkNames = function () {
        $scope.name_errors = [false, false, false, false];
        var any_errors = false;
        for (var i = 0; i < $scope.players.length; i++) {
            if ($scope.players[i] == "") {
                $scope.name_errors[i] = true;
                any_errors = true;
            } else {
                for (var j = 0; j < $scope.players.length; j++) {
                    if (i == j) {
                        continue;
                    }
                    if ($scope.players[i] == $scope.players[j]) {
                        $scope.name_errors[i] = true;
                        $scope.name_errors[j] = true;
                        any_errors = true;
                    }
                }
            }
        }
        return any_errors;
    }

    // Start game
    $scope.startGame = function () {
        if ($scope.name_errors.indexOf(true) == -1 && $scope.base_score > 0) {
            $scope.calculateThirteenBonus();
            $scope.game_started = true;

        }

        $scope.calculatePrice();
    }

    $scope.setBaseScore = function (score) {
        $scope.base_score = Math.round(score * 10) / 10;
    }

    $scope.decreaseBaseScore = function () {
        if ($scope.base_score > 0) {
            $scope.base_score = Math.round(($scope.base_score - 0.1) * 10) / 10;
        }
    }

    $scope.increaseBaseScore = function () {
        $scope.base_score = Math.round(($scope.base_score + 0.1) * 10) / 10;
    }

    // Calculate price of the current selection
    $scope.calculatePrice = function () {

        // It is a sol melding
        if ($scope.stick.number < 2) {
            $scope.max_gevinst = $scope.base_score * $scope.stick.mul;
            $scope.max_tab = $scope.max_gevinst * 2;

            $scope.gevinst_per_stik = 'SOL';
            $scope.tab_per_stik = 'SOL';
        } else { // It is a "normal" melding
            $scope.total_modification = 1;

            for (var i = 0; i < $scope.modifiers.length; i++) {
                if ($scope.modifiers[i].selected) {
                    $scope.total_modification = $scope.total_modification * $scope.modifiers[i].mul;
                }
            }

            $scope.gevinst_per_stik = ($scope.base_score * $scope.total_modification * $scope.stick.mul).toFixed(2);
            $scope.tab_per_stik = ($scope.gevinst_per_stik * 2).toFixed(2);

            $scope.max_win_stik = 14 - $scope.stick.number;
            $scope.max_tab_stik = $scope.stick.number;

            $scope.max_gevinst = (($scope.gevinst_per_stik * $scope.max_win_stik) + $scope.thirteen_bonus).toFixed(2);
            $scope.max_tab = (($scope.tab_per_stik * $scope.max_tab_stik) + $scope.thirteen_bonus).toFixed(2);
        }
    }

    // Calculate thriteen bonus
    $scope.calculateThirteenBonus = function () {
        $scope.thirteen_bonus = $scope.base_score * 40;
    }

}