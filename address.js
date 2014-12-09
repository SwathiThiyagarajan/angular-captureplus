var address = ['$timeout',function ($timeout) {
    return {
        transclude: true,
        replace:true,
        scope:true,
        template: '<div ng-transclude></div>',
        controller: ['$scope', function ($scope) {
            var self = this;

            if (angular.isUndefined(window._))
                throw new Error('pca-address: Lodash is required for this directive.');
            if (angular.isUndefined(window.pca))
                throw new Error('pca-address: PCAAddress is required for this directive.');

            $scope.registeredFields = [];
            self.registerField = function (fieldDefinition) {
                $scope.registeredFields.push(fieldDefinition);
            };

        }],
        link: {
            post:function(scope, element, attrs){
                var control;

                function createControl(){
                    var capturePlusFields = _.map(scope.registeredFields,function(field){
                       return {
                           element: field.id,
                           field: field.responseField,
                           mode: field.mode
                       }
                    });

                    var capturePlusOptions = {key: attrs.key};
                    control = new pca.Address(capturePlusFields, capturePlusOptions);
                    control.listen('populate',onPopulate);
                }

                function onPopulate(address) {
                    _.forEach(scope.registeredFields, function (field) {
                        var populate = _.isFunction(field.populate) ? field.populate : angular.noop;
                        var fieldValue = address[field.responseField];
                        populate(fieldValue);
                    });

                    scope.$apply();
                }

                attrs.$observe('key',function(){
                    $timeout(createControl,100);
                });
            }
        }
    }
}];

module.exports = address;
