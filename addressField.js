var addressField = [function () {
    return {
        require: ['ngModel', '^pcaAddress'],
        link: function (scope, element, attrs, controllers) {
            var ngModel = controllers[0];
            var addressCtrl = controllers[1];

            var fieldId = _.uniqueId('capturePlusField_');
            element.attr('id', fieldId);

            var mode = pca.fieldMode.DEFAULT;
            switch ((attrs.mode || '').toLowerCase()) {
                case 'search':
                    mode = pca.fieldMode.SEARCH;
                    break;
                case 'country':
                    mode = pca.fieldMode.COUNTRY;
                    break;
                case 'none':
                    mode = pca.fieldMode.NONE;
                    break;
                case 'populate':
                    mode = pca.fieldMode.POPULATE;
                    break;
                case 'preserve':
                    mode = pca.fieldMode.PRESERVE;
                    break;
                default:
                    break;
            }

            addressCtrl.registerField({
                id: fieldId,
                mode: mode,
                responseField: attrs.responseField,
                populate: function (field) {
                    ngModel.$setViewValue(field || '');
                }
            });
        }
    }
}];

module.exports = addressField;