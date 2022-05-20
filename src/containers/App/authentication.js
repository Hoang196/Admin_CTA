import { Navigate } from 'react-router-dom';

import { getLocalStorage, setLocalStorage } from '../../services/storage/LocalStorage';
import paths from './paths';
import { checkLogin } from '../../services/api/checkAccount';

// const handleCheckLogin = async () => {
//   const { data, success } = await checkLogin();
//   if (success) {
//     const user = {
//       email: data.data.email,
//       role: data.data.role,
//     }
//     setLocalStorage('user', user);
//     console.log('ndh', user);
//     return true;
//   } else {
//     return undefined;
//   }
// }

export function ProtectedAdmin({ children }) {
  const user = getLocalStorage('user');
  // handleCheckLogin();
  // console.log('ndh', user)
  if (user) { 
    if (user.role === 'ADMIN') {
      // console.log('ndh', 'login success')
      return children;
    } else if (user.role === 'USER') {
      return <Navigate to={paths.Homepage} />
    }
  } else {
    return <Navigate to={paths.Login} />
  }
} 

export function ProtectedExam({ children }) {
  const user = getLocalStorage('user');
  // handleCheckLogin();
  if (user) {
    return children
  } else {
    return <Navigate to={paths.Login} />
  }
}

export function ProtectedLogin({ children }) {
  const token_login = getLocalStorage("token_login");
  if (token_login) {
    return <Navigate to="exams" />;
  } else {
    return children;
  }
}