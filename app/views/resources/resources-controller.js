angular.module('MAResources').controller('MAResourcesController', function($scope, MASituation) {

    $scope.options = {
        drawLegend: true,
        drawDots: true,
        axes: {
            x: {
                key: 'date', type: 'date', ticksFormatter: function(date) {
                    return moment(date).format('MMM YYYY');
                }
            },
            y: {
                ticksFormatter: function(amount) {
                    return amount + ' €';
                }
            }
        },
        tooltip: {
            formatter: function(date, amount, series) {
                return  'En '
                        + moment(date).format('MMMM YYYY')
                        + ', vous avez touché des '
                        + series.label.toLowerCase()
                        + ' de '
                        + amount
                        + ' €.';
            }
        }
    };

    $scope.options.series = [];
    $scope.options.stacks = [ { axis: 'y', series: [] } ];

    var data = {};

    angular.forEach(MASituation.individus[0].resources, function(dates, id) {
        $scope.options.stacks[0].series.push(id);
        $scope.options.series.push({
            id: id,
            y: id,
            label: id,    // TODO
            type: 'area'
        });

        angular.forEach(dates, function(amount, date) {
            data[date] = data[date] || { date: new Date(date) };
            data[date][id] = amount;
        });
    });

    $scope.data = [];
    angular.forEach(data, function(point) {
        $scope.data.push(point);  // assumes that objects keeps insertion order
    });
});
