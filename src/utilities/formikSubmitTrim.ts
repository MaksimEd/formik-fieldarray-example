export function formikSubmitTrim<T>(values: T): {value: T, error: object} {
  // return Object.keys(values).reduce(
  //   (accum, curr) => (
  //     typeof values[curr] === 'string' ? (
  //       {...accum, [curr]: values[curr].trim()}
  //     ) : (
  //       {...accum, [curr]: values[curr]}
  //     )
  //   ), 
  //   {} as T
  // );
  let newError: any;
  let newValues: any;
  if (typeof values === 'string') {
    newValues = values.trim();

    if (!newValues.length) {
      newError = 'Request';
    }
  } else if (Array.isArray(values)) {
    const valArray = [];
    const errArray: object[] = [];
    for (let index2 = 0; index2 < values.length; index2++) {
      const {value, error} = formikSubmitTrim(values[index2]);
      valArray[index2] = value;
      if (error && Object.keys(error).length) {
        errArray[index2] = error;
      }
    }
    newValues = valArray;
    if (errArray.length) {
      newError = values.map((_: any, n: number) => !!errArray[n] && errArray[n] || null);
    }
  } else if (typeof values === 'object') {
    newError = {};
    newValues = {};
    const keys = Object.keys(values);
    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < keys.length; index++) {
      const element = keys[index];
      const valueElement = values[element];

      const {value, error} = formikSubmitTrim(valueElement);
      newValues[element] = value;          
      if (error) {
        newError[element] = error;
      }
    }
  } else {
    newValues = values;
  }

  return { value: newValues, error: newError };
}