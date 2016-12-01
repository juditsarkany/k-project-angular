

    var app = angular.module('calculator',[]);

    app.controller('CalculatorController', ['$scope', function($scope) {

        /*
        * Constants
        */
        var STUNDEN_DIGITAL_DATA = [0.0, 0.0, 0.0, 0.0, 0.0, 0.2];
        var STUNDEN_KREATIZE_DATA = [0.0, 4.0, 0.0, 0.166666666666667, 0.0, 0.0];
        var TOTAL_OFFER_TIME_KREATIZE = STUNDEN_KREATIZE_DATA.reduce((a, b) => a + b, 0);
        var TOTAL_OFFER_TIME_DIGITAL = STUNDEN_DIGITAL_DATA.reduce((a, b) => a + b, 0);
        var HR_MANUAL_QUOTING_KREATIZE = 0;
        var ONLINE_QUOTING_KREATIZE = 500;
        var DIGITAL_PRODUCTION_KREATIZE = 1500;

        $scope.employees = 2;
        $scope.quotes = 10;
        $scope.sundan = 75;
        $scope.quote_check = 1.0;
        $scope.price = 4.0;
        $scope.nda = 0.5;
        $scope.offers_create = 0.5;
        $scope.emails_time = 1.0;
        $scope.call_time = 1.0;

        $scope.calculate = function(){
            
            /*
             * New variables from input
             */
            $scope.totalOfferTime = parseFloat($scope.quote_check) + parseFloat($scope.price) + 
                                parseFloat($scope.nda) + parseFloat($scope.offers_create) + 
                                parseFloat($scope.emails_time) + parseFloat($scope.call_time);
            $scope.amountOfSalesEmp = parseFloat($scope.employees);
            $scope.quotesPerMonthEmp = parseFloat($scope.quotes);
            // $scope.sundan = parseFloat($scope.sundan); 

            if (isNaN($scope.totalOfferTime) || isNaN($scope.amountOfSalesEmp) || isNaN($scope.quotesPerMonthEmp) || isNaN($scope.sundan)) {
                // Form is not completely filled by user yet.
                console.log('Form is not completely filled by user yet.');
                return;
            }

            /*
             * Make calculations from input + constants
             */
            $scope.costPerQuote = $scope.totalOfferTime * $scope.sundan;
            $scope.costPerQuoteKreatize = TOTAL_OFFER_TIME_KREATIZE * $scope.sundan;
            $scope.costPerQuoteKreatizeDigital = TOTAL_OFFER_TIME_DIGITAL * $scope.sundan;
            $scope.hrManualQuoting = $scope.quotesPerMonthEmp * $scope.costPerQuote * $scope.amountOfSalesEmp;
            $scope.onlineQuoting = $scope.quotesPerMonthEmp * $scope.costPerQuoteKreatize * $scope.amountOfSalesEmp;
            $scope.digitalProduction = $scope.quotesPerMonthEmp * $scope.amountOfSalesEmp * $scope.costPerQuoteKreatizeDigital;
            $scope.totalCostPerMonth = $scope.hrManualQuoting + HR_MANUAL_QUOTING_KREATIZE;
            $scope.totalCostPerMonthOnline = $scope.onlineQuoting + ONLINE_QUOTING_KREATIZE;
            $scope.totalCostPerMonthDigital = $scope.digitalProduction + DIGITAL_PRODUCTION_KREATIZE;
            $scope.online_quoting_month1 = ($scope.totalCostPerMonth - $scope.totalCostPerMonthOnline);
            $scope.digital_production_month1 = $scope.totalCostPerMonth - $scope.totalCostPerMonthDigital;         
        }

    // Kick off the first calculation with the default values.
    $scope.calculate();
}]);


