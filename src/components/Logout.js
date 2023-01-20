const Logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    window.location.reload();
}

export default Logout;