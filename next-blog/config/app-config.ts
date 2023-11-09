
const errorMessageList :any = {
    required: 'Please enter the :attribute',
    unique: 'The :attribute has already been taken.',
    max: 'The :attribute may not be greater than :max.',
    min: 'The :attribute must be at least :min.',
    maxAmount: 'The :attribute may not be greater than :max.',
    numeric: 'The :attribute must be a number.',
    valueIn: 'Please :attribute should in [:in].',
    regex: ':attribute value not in the right format.',
    exists: 'The :attribute value is not available in the database',
    checkDroneIsReady: 'selected drone should be in IDLE or LOADING status',
};


export { errorMessageList };