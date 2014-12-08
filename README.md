angular-captureplus
===================

**In progress** Capture+ directives for Angular 1.2
**Depends on Lodash/Underscore**

# Usage

## Set up the page
Drop in the address.js script **instead** of the captureplus.js script:

```html
<script src="https://services.postcodeanywhere.co.uk/js/address-3.40.js"></script>
```

Include the Address and AddressField directives. 

##Set up your address form
This is like any other form in Angular. 
Wrap the address inputs in a `div` with the `address` (or what ever you call it) directive attribute on. There also needs to be a `key` attribute, which is your licence key:

```html
<form>
    <div pca-address key="{{create.capturePlusKey}}">
        ...address inputs...
    </div>
</form>
```

##Set up your address fields
This is how we bind your form to Capture+. Since we aren't using the Capture+ script **none** of your bindings will be loaded. This means we need to map them manually and set their mode via the `addressField` (or what ever you call it) directive.
```html
<input type="text" pca-address-field mode="default" response-field="Line1" name="line1" ng-model="thing.line1" ng-required="create.account.address.city"/>
```
`mode` and `response-field` match to the normal Capture+ versions. 


