import RunValidation from './run-validation';

const validate = (formObject:any) => {
  let validateObject = {
    rules: {},
    fileds: {},
    message: {},
    additionalParam: {},
    formObject,
  };
  return {
    setRules(rules:any) {
      validateObject = {
        ...validateObject,
        rules:rules,
      };
      return this;
    },
    setFileds(fileds:any) {
      validateObject = {
        ...validateObject,
        fileds:fileds,
      };
      return this;
    },
    setMessage(message:any) {
      validateObject = {
        ...validateObject,
        message:message,
      };
      return this;
    },
    setAdditionalParam(additionalParam:Object) {
      validateObject = {
        ...validateObject,
        additionalParam:additionalParam,
      };
      return this;
    },
    run(cb:Function) {
      const validateObj = new RunValidation(validateObject);
      return validateObj.validate(cb);
    },
  };
};

export default validate;