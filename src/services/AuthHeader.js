export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (user && user.user.token) {
    // for Node.js Express back-end
    return { 'authorization': user.user.token };
  } else {
    return {};
  }
}

