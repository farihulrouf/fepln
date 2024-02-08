export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('authorization'));
  //console.log(user)
  if (user) {
    // for Node.js Express back-end
    return { 'authorization': user };
  } else {
    return {};
  }
  {/*
  if (user && user.user.token) {
    // for Node.js Express back-end
    return { 'authorization': user.user.token };
  } else {
    return {};
  }
*/}
}

