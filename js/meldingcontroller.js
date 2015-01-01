    /**
 * Created with IntelliJ IDEA.
 * User: tinus
 * Date: 10/14/13
 * Time: 6:21 PM
 * To change this template use File | Settings | File Templates.
 */
    function MeldingController($scope, sticks, modifiers) {

        $scope.sticks=sticks;
        $scope.modifiers=modifiers;

        // Start round
        $scope.startRound = function () {
            // Sol_round
            if ($scope.stick.number < 2) {
                $scope.sol_round = true;
            }
            $scope.round_started = true;
            $scope.teamA = [];
            $scope.teamB = [];
            $scope.teamA.push($scope.melder);
//        $scope.players.lastIndexOf($scope.melder);
            $scope.concatHand();
        }

        $scope.checkSticks = function () {
            // If 'sol' there can be no modifiers.
            if ($scope.stick.number < 2) {
                for (var j = 0; j < $scope.modifiers.length; j++) {
                    $scope.modifiers[j].selected = false;
                }
                toggleModifiers($scope);
            }
            $scope.calculatePrice();
        }

        // Disable modifiers if conflicting
        $scope.checkMelding = function (index) {
            // If any modifiers selected, can't have 'sol'
            if ($scope.stick.number < 2) {
                $scope.stick = $scope.sticks[4];
            }
            // Only one vip can be selected
            if (index < 3) {
                $scope.modifiers[3].selected = false;
                for (var i = 0; i < 3; i++) {
                    if (index === i) {
                        continue;
                    }
                    $scope.modifiers[i].selected = false;
                }
            }
            // If modifier is 'halve' only 'halve' can be selected
            if (index == 3) {
                for (var i = 0; i < $scope.modifiers.length; i++) {
                    if (i === 3) {
                        continue;
                    }
                    $scope.modifiers[i].selected = false;
                }
            }
            // If modifier is 'Sang' only 'Sang' can be selected
            if (index == 4) {
                $scope.modifiers[3].selected = false;
                $scope.modifiers[5].selected = false;
            }
            // If modifier is 'Klør' only 'Klør' can be selected
            if (index == 5) {
                $scope.modifiers[3].selected = false;
                $scope.modifiers[4].selected = false;
            }
        };

        $scope.setModifier = function (pressedModifier) {
            $scope.modifiers[pressedModifier].selected = !$scope.modifiers[pressedModifier].selected;
            $scope.checkMelding(pressedModifier);

            toggleModifiers($scope, pressedModifier);

            $scope.calculatePrice();
        };

        // Concat selection into hand
        $scope.concatHand = function () {
            $scope.hand = null;
            if ($scope.stick.number < 2) {
                $scope.hand = $scope.stick.name;
            } else {
                $scope.hand = $scope.stick.name;
                for (var i = 3; i < $scope.modifiers.length; i++) {
                    if ($scope.modifiers[i].selected) {
                        $scope.hand = +' ' + $scope.modifiers[i].name;
                    }
                }

                for (var i = 0; i < 3; i++) {
                    if ($scope.modifiers[i].selected) {
                        $scope.hand = +' ' + $scope.modifiers[i].name;
                    }
                }

            }
            $scope.hand = $scope.melder + ' har meldt ' + $scope.hand;
        }
    }
