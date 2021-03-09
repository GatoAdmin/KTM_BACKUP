import React from 'react';
import axios from 'axios';
import Router from 'next/router';
const Logout: React.VFC =()=>{
    React.useEffect(() => {
        axios.post('/api/logout/')
        .then(res=>{
            if(res.data.status==="success"){
                sessionStorage.removeItem('sid');
                Router.push('/');
        }})
      }, []);
    return <div></div>;
}


export default Logout;