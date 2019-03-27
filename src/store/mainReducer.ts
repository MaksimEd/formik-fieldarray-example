
interface Type {
  isAuthorization: boolean; 
  isLoad: boolean; 
  token: string;
  errorMessage: { 
    email: string;
    password: string;
  }
}

const initialState: Type = {
  errorMessage: { 
    email: '', 
    password: '' 
  },
  isAuthorization: false, 
  isLoad: false, 
  token: ''
};
export default (state = initialState, action: { type: string, payload: any}): Type => {
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