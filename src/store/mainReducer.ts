
const initialState = {
  isAuthorization: false, 
  isLoad: false, 
  token: '',
  errorMessage: { email: '', password: '' }
};
export default (state = initialState, action: { type: string, payload: any}) => {
  switch (action.type) {
    case 'AUTHORIZATION_REQUEST_START':
      return { ...initialState, isLoad: true };
      
    case 'AUTHORIZATION_REQUEST_DONE':
      return { ...state, isAuthorization: true, isLoad: false, token: action.payload };
      
    case 'AUTHORIZATION_REQUEST_ERROR':
      return { ...state, isAuthorization: false, isLoad: false, errorMessage: action.payload };

    case 'AUTHORIZATION_REQUEST_LOGOUT':
      return {...initialState, isAuthorization: false, token: ''};
      
    default: 
      return state;
  }
};