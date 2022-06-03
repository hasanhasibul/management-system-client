import React from 'react';
import DefaultLayout from './DefaultLayout';

const WelcomeScreen = () => {
    return (
        <DefaultLayout>
            <div  className='text-center' >
                <h1 style={{fontSize:'75px',marginTop:'18%',fontWeight:'bolder'}}>Welcome To Fit Gym</h1>
            </div>
        </DefaultLayout>
    );
};

export default WelcomeScreen;