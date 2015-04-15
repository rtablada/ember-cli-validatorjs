import Ember from 'ember';

export default Ember.Mixin.create({
  validatedProperties: [],

  rules: {},

  validationMessages: {},

  validationErrors: null,

  getValidatedProperties: function() {
    return this.get('model')
      .getProperties(this.get('validatedProperties'));
  },

  validate: function(data) {
    this.set('validationErrors', null);

    data = data || this.getValidatedProperties();

    var validator = new Validator(data, this.get('rules'), this.get('validationMessages'));

    if(validator.fails()) {
      this.set('validationErrors', validator.errors);
      return false;
    } else {
      return true;
    }
  }
});
