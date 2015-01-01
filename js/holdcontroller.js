/**
 * Created with IntelliJ IDEA.
 * User: tinus
 * Date: 10/14/13
 * Time: 6:22 PM
 * To change this template use File | Settings | File Templates.
 */
function HoldController($scope) {

    // Mangler team?COntains, addToTeam osv. se, i hold.html og kig i tidligere version af engine.js

    $scope.addToTeam = function(player, team) {
        if (team=='A') {
            if (!$scope.teamAContains(player)) {
                if ($scope.sol_round || $scope.teamA.length < 2) {
                    $scope.teamA.push(player);
                    $scope.removeTeamMember(player, 'B');
                } else {
                    alert("Cannot have more than two players on teamA in a non sol round");
                }
            }
        } else {
            if (!$scope.teamBContains(player)) {
                $scope.teamB.push(player);
                $scope.removeTeamMember(player, 'A');
            }
        }
    }

    $scope.removeTeamMember = function(player, team) {
        if (player!=$scope.melder) {
            if (team=='A') {
                var index = $scope.teamA.lastIndexOf(player);
                if (index != -1) {
                    $scope.teamA.splice(index, 1);
                }

            } else {
                var index = $scope.teamB.lastIndexOf(player);
                if (index != -1) {
                    $scope.teamB.splice(index, 1);
                }
            }
        }
    }

    $scope.restToB = function() {
        for (var i = 0; i < $scope.players.length; i++) {
            var player = $scope.players[i];
            if ($scope.teamA.lastIndexOf(player)==-1 && $scope.teamB.lastIndexOf(player)==-1) {
                $scope.teamB.push(player);
            }
        }
    }

    $scope.teamAContains = function(player) {
        if ( $scope.teamA.lastIndexOf(player) != -1 ) {
            return true;
        }
        return false;
    }

    $scope.teamBContains = function(player) {
        if ( $scope.teamB.lastIndexOf(player) != -1 ) {
            return true;
        }
        return false;
    }

    $scope.playerAdded = function(player) {
        if ($scope.teamA.lastIndexOf(player)!=-1 || $scope.teamB.lastIndexOf(player)!=-1) {
            return "disabled";
        }
        return "";
    }

    $scope.back = function () {
        if ($scope.teams_defined) {
            $scope.teams_defined = false;
            $scope.sol_round = false;
        } else if ($scope.round_started) {
            $scope.round_started = false;
            $scope.stickTaken = 0;
        }
    }
}