'use strict';

describe('json-schema-view', function () {
  var scope, $compile, $rootScope, element;

  function createDirective(template) {
    var elm;

    elm = angular.element(template);
    angular.element(document.body).prepend(elm);
    $compile(elm)(scope);
    scope.$digest();

    return elm;
  }

  beforeEach(window.angular.mock.module('ngSanitize', 'mohsen1.json-schema-view'));
  beforeEach(inject(function(_$rootScope_, _$compile_) {
    $rootScope = _$rootScope_;
    scope = $rootScope.$new();
    $compile = _$compile_;
  }));

  afterEach(function () {
    if (element) element.remove();
  });

  describe('simple schema', function (){
    it('should render property name and type', function () {
      $rootScope.simple = {properties: [{type: 'string', name: 'value'}]};
      element = createDirective('<json-schema-view schema="simple"></json-schema-view>');

      expect(element.text()).toContain('string');
      expect(element.text()).toContain('value');
    });

    it('should put an asterisk next to required properties', function () {
      $rootScope.simpleRequired = {
        properties: {value: {type: 'string'}},
        required: ['value']
      };
      element = createDirective('<json-schema-view schema="simpleRequired"></json-schema-view>');
      expect(element.text()).toContain('*');
    });
  });

  describe('schema with value constraints', function (){
    it('should render minimum and maximum', function () {
      $rootScope.maxandmin = {
        properties: [
          {type: 'integer', format: 'int32', minimum: 10, maximum: 13}
        ]
      };

      element = createDirective('<json-schema-view schema="maxandmin" open="1"></json-schema-view>');

      expect(element.text()).toContain('minimum:10');
      expect(element.text()).toContain('maximum:13');
    });

    it('should render minLength and maxLength', function () {
      $rootScope.maxandminlength = {
        properties: [
          {type: 'string', minLength: 5, maxLength: 20}
        ]
      };

      element = createDirective('<json-schema-view schema="maxandminlength" open="1"></json-schema-view>');

      expect(element.text()).toContain('minLength:5');
      expect(element.text()).toContain('maxLength:20');
    });
  });
});