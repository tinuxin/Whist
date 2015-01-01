/**
 * Created with IntelliJ IDEA.
 * User: tinus
 * Date: 10/14/13
 * Time: 6:19 PM
 * To change this template use File | Settings | File Templates.
 */
angular.module('Whist', []).config(['$routeProvider', function ($routeProvider) {
    $routeProvider.
        when('/start', {templateUrl: 'partials/start.html', controller: StartController}).
        when('/melding', {templateUrl: 'partials/melding.html', controller: MeldingController}).
        when('/hold', {templateUrl: 'partials/hold.html', controller: HoldController}).
        when('/resultat', {templateUrl: 'partials/resultat.html', controller: ResultatController}).
        when('/score', {templateUrl: 'partials/score.html', controller: ScoreController}).
        when('/graph', {templateUrl: 'partials/graph.html', controller: GraphController}).
        otherwise({redirectTo: '/start'});
}]);

angular.module('Whist', []).constant('sticks',
    [
        {number: 0, name: 'Bordlægger ren sol', mul: 240},
        {number: 1, name: 'Bordlægger sol', mul: 120},
        {number: 0, name: 'Ren sol', mul: 60},
        {number: 1, name: 'Sol', mul: 30},
        {number: 7, name: '7', mul: 1},
        {number: 8, name: '8', mul: 2},
        {number: 9, name: '9', mul: 4},
        {number: 10, name: '10', mul: 8},
        {number: 11, name: '11', mul: 16},
        {number: 12, name: '12', mul: 32},
        {number: 13, name: '13', mul: 64}
    ]
);

angular.module('Whist', []).constant('modifiers',
    [
        {name: '1. Vip', id: "vip1", mul: 2, selected: false},
        {name: '2. Vip', id: "vip2", mul: 4, selected: false},
        {name: '3. Vip', id: "vip3", mul: 8, selected: false},
        {name: 'Halve', id: "halve", mul: 2, selected: false},
        {name: 'Sans', id: "sans", mul: 2, selected: false},
        {name: 'Klør', id: "kloer", mul: 2, selected: false}
    ]
);

angular.module("Whist", []).factory("roundFactory", function () {
    // TODO Nogle værdier hører ikke til her andre skal fjernes. Denne skal holde en rundes state, intet andet.
    return function () {
        this.rounds = [];
        this.currentMetaRound;

        var MetaRound = function () {
            var Round = function () {
                this.round = rounds.length;
                this.melder = null;
                this.teamA = [];
                this.teamB = [];
                this.hand = null;
                this.stickTaken = 0;
                this.winners = [null, null, null, null];
                this.score = [0, 0, 0, 0];
            }
            this.round = new Round();
            this.melder_error = false;
            this.melding = false;
            this.gevinst_per_stik = 0;
            this.tab_per_stik = 0;
            this.max_gevinst = 0;
            this.max_tab = 0;
            this.thirteen_bonus = 0.0;
            this.sol = 0.0;
        }

        this.newMetaRound = function () {
            var metaround = new MetaRound();
            rounds.push(metaround.round);
            return metaround;
        }

        this.getRound = function (round) {
            return rounds[round];
        }

        this.getRounds = function () {
            return rounds;
        }

        this.getNumberofRounds = function () {
            return rounds.length;
        }

        this.getCurrentMetaRound = function () {
            return currentMetaRound;
        }
    }
});

angular.module("Whist", []).factory("gameState", function () {

    return {
        gameState: {
//    $scope.scores=[{player1: 0, player2: 0, player3: 0, player4: 0}, {player1: -3, player2: 3, player3: -3, player4: 3}];
            scores: [],
//    $scope.totals=[["0",0,0,0,0], ["1", -2, 2, -2, 2], ["2", -0.4, 0.4, -3.6, 3.6], ["3", 1.0, -1.0, -4.6, 4.6], ["4", 11.0, -11.0, -14.6, 14.6]];
            totals: [
                ["0", 0, 0, 0, 0]
            ],
            player1Total: 0.0,
            player2Total: 0.0,
            player3Total: 0.0,
            player4Total: 0.0,
            sol_round: false,
            name_errors: [false, false, false, false],
            round: 1,

            //Reset selections
            // TODO Skal deles op og flyttes til hver enkelt controller, evt. som init() metode.
            reset: function () {
                $scope.modifier = $scope.modifiers[0];
                $scope.stick = $scope.sticks[4];
                $scope.melder = null;
                for (modifier in $scope.modifiers) {
                    modifier.selected = false;
                }
                $scope.teams_defined = false;
                $scope.round_started = false;
                $scope.game_started = false;
            },

//    $scope.playerTotal = function(player) {
//        var total=0.0;
//        for (score in scores) {
//            sum+=score[player];
//        }
//    }

            range: function (start, end) {
                var result = [];
                for (var i = start; i <= end; i++) {
                    result.push(i);
                }
                return result;
            }
        }
    }
});

angular.module('Whist', []).
    filter('multilist', function () {
        return function (original, list1, list2) {
            var result = [];
            for (var i = 0; i < original.length; i++) {
                var cur = original[i];
                if (list1.indexOf(cur) == -1 && list2.indexOf(cur) == -1) {
                    result.push(cur);
                }
            }
            return result;
        }
    });

var toggleModifiers = function (scope, pressedModifier) {
    for (var i = 0; i < scope.modifiers.length; i++) {
        if ((!pressedModifier || pressedModifier != i) && !scope.modifiers[i].selected) {
            var button = $('#' + scope.modifiers[i].id);
            if (button.hasClass('active')) {
                button.button('toggle');
            }
        }
    }
}