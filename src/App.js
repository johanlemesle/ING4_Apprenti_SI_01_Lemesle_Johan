import React, {useState} from 'react';
import Header from './Header';
import Footer from './Footer';
import Main from './Main';

import './App.css';


const styles = {

    root: {
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#565E71',
        padding: 50
    },
};



export default ({      
                }) => {
    
    return (
        <div className="app" style={styles.root}>
            <Header/>
            <Main/>
            <Footer/>
        </div>
    );
}
