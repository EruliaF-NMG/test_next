import { _get } from "@/lib/util/lodash.wrappers";

/**
 * @author Nisal Madusanka(EruliaF)
 * @description get from inputs for form validation
 * @param {Object|Array} formValue form data list
 * @param {string} key form value key
 */
export const getInputsForValidate = (formValue:any, key:any) => {
    let value = _get(formValue, key, '');
  
    switch (typeof value) {
      case 'string': {
        value = value.trim();
        break;
      }
      default: {
        break;
      }
    }
    return value;
  };
  
  /**
  * @author Nisal Madusanka(EruliaF)
  * @description genarate map key for form validation
  * @param {string} realInputKey known key
  * @param {string} keyToMap key should find
  */
  export const mapInputKey = (realInputKey:string, keyToMap:string) => {
    const arrayMatch:any = realInputKey.match(/(\.\d*\.)/g);
    let key = 0;
    const returnData = keyToMap.replace(/(\.\**\.)/g, () => {
      const value = arrayMatch[key];
      key += 1;
      return value;
    });
    return returnData;
  };
  

/**
 * @description validate required fields
 * @param {string} key input value key
 * @param {object} values form values
 * @param {array} param additional validation parameters
 * @param {string} message Error message
 * @param {object} filedList display name for form elements
 * @param {Function} cb callback function
 */
const required = (key:string, values:any, param:any, message:string, filedList:any,additionalParam:any, cb:Function) => {
  try {
    const formValue = getInputsForValidate(values, key);
    if (formValue === null || formValue === undefined || formValue === '') {
      cb(message);
    } else {
      cb(null, true);
    }
  } catch (ex) {
    console.log(
      `----------------Validation Exception At (required)-------------------`,
      `Input Key - ${key}`,
      `Exception - ${ex}`
    );

    cb(true);
  }
};

/**
 * @description validate required if on another field
 * @param {string} key input value key
 * @param {object} values form values
 * @param {array} param additional validation parameters
 * @param {string} message Error message
 * @param {object} filedList display name for form elements
 * @param {Function} cb callback function
 */
const requiredIf = (key:string, values:any, param:any, message:string, filedList:any,additionalParam:any, cb:Function) => {
  try {
    const mainFild = getInputsForValidate(
      values,
      mapInputKey(key, param[0])
    );

    if (String(mainFild) === String(param[1])) {
      required(key, values, [], message, filedList,additionalParam, cb);
    } else {
      cb(null, true);
    }
  } catch (ex) {
    console.log(
      `----------------Validation Exception At (requiredIf)-------------------`,
      `Input Key - ${key}`,
      `Exception - ${ex}`
    );

    cb(true);
  }
};

/**
 * @description validate max
 * @param {string} key input value key
 * @param {object} values form values
 * @param {array} param additional validation parameters
 * @param {string} message Error message
 * @param {object} filedList display name for form elements
 * @param {Function} cb callback function
 */
const max = (key:string, values:any, param:any, message:string, filedList:any,additionalParam:any, cb:Function) => {
  try {
    const formValue = getInputsForValidate(values, key);
    if (formValue && formValue.length > param) {
      let newMessage = message;
      newMessage = newMessage.replace(':max', param);
      cb(newMessage);
    } else {
      cb(null, true);
    }
  } catch (ex) {
    console.log(
      `----------------Validation Exception At (max)-------------------`,
      `Input Key - ${key}`,
      `Exception - ${ex}`
    );

    cb(true);
  }
};

/**
 * @description validate min
 * @param {string} key input value key
 * @param {object} values form values
 * @param {array} param additional validation parameters
 * @param {string} message Error message
 * @param {object} filedList display name for form elements
 * @param {Function} cb callback function
 */
const min = (key:string, values:any, param:any, message:string, filedList:any,additionalParam:any,cb:Function) => {
  try {
    const formValue = getInputsForValidate(values, key);
    if (formValue && formValue.length < param) {
      let newMessage = message;
      newMessage = newMessage.replace(':min', param);
      cb(newMessage);
    } else {
      cb(null, true);
    }
  } catch (ex) {
    console.log(
      `----------------Validation Exception At (min)-------------------`,
      `Input Key - ${key}`,
      `Exception - ${ex}`
    );

    cb(true);
  }
};

/**
 * @description validate numeric
 * @param {string} key input value key
 * @param {object} values form values
 * @param {array} param additional validation parameters
 * @param {string} message Error message
 * @param {object} filedList display name for form elements
 * @param {Function} cb callback function
 */
const numeric = (key:string, values:any, param:any, message:string, filedList:any,additionalParam:any, cb:Function) => {
  try {
    const formValue = getInputsForValidate(values, key);

    if (!formValue || isFinite(Number(formValue))) {
      cb(null, true);
    } else {
      let newMessage = message;
      newMessage = newMessage.replace(':min', param);
      cb(newMessage);
    }

  } catch (ex) {
    console.log(
      `----------------Validation Exception At (numeric)-------------------`,
      `Input Key - ${key}`,
      `Exception - ${ex}`
    );

    cb(true);
  }
};

const maxAmount = (key:string, values:any, param:any, message:string, filedList:any,additionalParam:any, cb:Function) => {
  try {
   
    let formValue = getInputsForValidate(values, key);
      
    if(param[0]==="" || !formValue){
      cb(null, true);
    } else {
        formValue = parseFloat(formValue);
        if (formValue < parseFloat(param[0])) {
          cb(null, true);
        } else {
          let newMessage = message;
          newMessage = newMessage.replace(':max', param);
          cb(newMessage);
        }
    }
  } catch (ex) {
    console.log(
      `----------------Validation Exception At (maxAmount)-------------------`,
      `Input Key - ${key}`,
      `Exception - ${ex}`
    );
    cb(true);
  }
}

const valueIn = (key:string, values:any, param:any, message:string, filedList:any,additionalParam:any, cb:Function) => {
  try {
   
    let formValue = getInputsForValidate(values, key);
    if(!param || !formValue){
      cb(null, true);
    } else {
        if ( param && param.includes(formValue) ) {
          cb(null, true);
        } else {
          let newMessage = message;
          newMessage = newMessage.replace(':in', param.toString());
          cb(newMessage);
        }
    }
  } catch (ex) {
    console.log(
      `----------------Validation Exception At (valueIn)-------------------`,
      `Input Key - ${key}`,
      `Exception - ${ex}`
    );
    cb(true);
  }
}

const regex = (key:string, values:any, param:any, message:string, filedList:any,additionalParam:any, cb:Function) => {
  try {
    let formValue = getInputsForValidate(values, key);
    if(!param[0] || !formValue) {
      cb(null, true);
    } else {
        const regex = new RegExp(param[0]);
        if ( formValue.match(regex) ) {
          cb(null, true);
        } else {
          cb(message);
        }
    }
  } catch (ex) {
    console.log(
      `----------------Validation Exception At (regex)-------------------`,
      `Input Key - ${key}`,
      `Exception - ${ex}`
    );
    cb(true);
  }
}


export { required, requiredIf, max, min, numeric, maxAmount, valueIn, regex };