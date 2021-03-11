const isLogin = (): boolean => sessionStorage.getItem('sid') !== null;

export default isLogin;
