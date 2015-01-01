/**
 * Created with IntelliJ IDEA.
 * User: tinus
 * Date: 10/14/13
 * Time: 6:23 PM
 * To change this template use File | Settings | File Templates.
 */
function ResultatController($scope) {
    $scope.finishRoundAllowed = function () {
        if ($scope.sol_round) {
            for (var i = 0; i < $scope.winners.length; i++) {
                if ($scope.teamA.lastIndexOf($scope.players[i]) != -1) {
                    if ($scope.winners[i] != true && $scope.winners[i] != false) {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    $scope.finishRound = function () {
        var winnings = [0.0, 0.0, 0.0, 0.0];
        if ($scope.sol_round) { // Sol round
            for (var i = 0; i < $scope.winners.length; i++) {
                if ($scope.teamA.lastIndexOf($scope.players[i]) != -1) {
                    if ($scope.winners[i]) { // Player won
                        winnings[i] += $scope.max_gevinst;
                        for (var j = 0; j < $scope.players.length; j++) {
                            if (j != i) {
                                winnings[j] -= $scope.max_gevinst / 3;
                            }
                        }
                    } else { // Player lost
                        winnings[i] -= $scope.max_tab;
                        for (var j = 0; j < $scope.players.length; j++) {
                            if (j != i) {
                                winnings[j] += $scope.max_tab / 3;
                            }
                        }
                    }
                }
            }
        } else { // Normal round
            var split = Math.max($scope.teamA.length, $scope.teamB.length);
            var loss_multiplier = $scope.stick.number > $scope.stickTaken ? 2 : 1;
            var difference = loss_multiplier === 2 ? $scope.stickTaken - $scope.stick.number : 1 + $scope.stickTaken - $scope.stick.number;
            var sum = difference * $scope.gevinst_per_stik * loss_multiplier * split;

            for (var i = 0; i < $scope.teamA.length; i++) {
                winnings[$scope.players.lastIndexOf($scope.teamA[i])] = sum / $scope.teamA.length;
                if ($scope.stickTaken == 13) {
                    winnings[$scope.players.lastIndexOf($scope.teamA[i])] += $scope.thirteen_bonus;
                }
            }

            for (var i = 0; i < $scope.teamB.length; i++) {
                winnings[$scope.players.lastIndexOf($scope.teamB[i])] = -1 * sum / $scope.teamB.length;
                if ($scope.stickTaken == 13) {
                    winnings[$scope.players.lastIndexOf($scope.teamB[i])] -= $scope.thirteen_bonus;
                }
            }
        }

        for (var i = 0; i < winnings.length; i++) {
            winnings[i] = parseFloat(winnings[i].toFixed(2));
        }

        $scope.scores.push([$scope.round.toString(), winnings[0], winnings[1], winnings[2], winnings[3]]);
        $scope.player1Total += winnings[0];
        $scope.player2Total += winnings[1];
        $scope.player3Total += winnings[2];
        $scope.player4Total += winnings[3];
        $scope.totals.push([$scope.round.toString(), $scope.player1Total, $scope.player2Total, $scope.player3Total, $scope.player4Total]);

        $scope.player1Total = parseFloat($scope.player1Total.toFixed(2));
        $scope.player2Total = parseFloat($scope.player2Total.toFixed(2));
        $scope.player3Total = parseFloat($scope.player3Total.toFixed(2));
        $scope.player4Total = parseFloat($scope.player4Total.toFixed(2));

        $scope.newRound();
    }

    // TODO Hele denne metode skal formentlig fjernes.
    $scope.newRound = function () {
        $scope.modifier = $scope.modifiers[0];
        $scope.stick = $scope.sticks[4]; // TODO skal gøres i starten af init af ny runde i stedet
        $scope.melder = null;
        for (var i = 0; i < $scope.modifiers.length; i++) {
            $scope.modifiers[i].selected = false;
        }
        toggleModifiers($scope);
        $scope.stickTaken = 0;
        $scope.winners = ["", "", "", ""];
        $scope.gevinst_per_stik = 0;
        $scope.tab_per_stik = 0;
        $scope.max_gevinst = 0;
        $scope.max_tab = 0;
        $scope.sol_round = false;
        $scope.round++;

        $scope.calculatePrice();
    }
}