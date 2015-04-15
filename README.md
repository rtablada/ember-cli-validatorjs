# Ember-cli-validatorjs

This addon is a wrapper around ValidatorJS that let's you drop validation into any component, controller, model, or Ember Object.

## Installation

* `ember install ember-cli-validatorjs`

## Use

Import the validatable mixin:

```js
import Validatable from 'ember-cli-validatorjs/mixins/validatable';

export default Ember.Object.extend(Validatable, {
  // Your logic here
});
```

Then declare your validation rules with the `rules` hash on your object:

```js

export default Ember.Object.extend(Validatable, {
  rules: {
    email: 'required|email',
    password: 'required'
  }
});
```

To run validations, use the `validate` function and pass in data to be validated:

```js
export default Ember.Object.extend(Validatable, {
  rules: {
    email: 'required|email',
    password: 'required'
  },

  actions: {
    submitForm: function () {
      var formData = {};
      // Logic to set properties from form
      if (this.validate(formData)) {
        alert('success');
      } else {
        alert('failure');
      }
    }
  }
});
```

When a validation fails, your object will now have a `validationErrors` property set to the validation errors from validatorJs.

You can also set custom messages for your validation errors by setting the `validationMessages` property on your object. Follow the validatorJs documentation for declaring these messages.

## One More Thing

When working with controllers, it's pretty common to need to validate the properties for the current `model` object.
Since Ember uses the `get` function to be able to grab proxied and computed properties, this makes it hard for validatorjs to validate models.

But, if you create a `validatedProperties` array on your object and run `validate` without passing in data, then those properties will be grabbed from your `model`.


```js
export default Ember.Controller.extend(Validatable, {
  validatedProperties: [
    'email',
    'password'
  ],

  rules: {
    email: 'required|email',
    password: 'required'
  },

  actions: {
    checkUser: function () {
      // Logic to set properties from form
      if (this.validate()) {
        alert('success');
      } else {
        alert('failure');
      }
    }
  }
});
```

If you want to hack this a bit more you can create your own `getValidatedProperties` function which is called whenever no data is passed to the `validate` function.
