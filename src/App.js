import React, {useState} from 'react';
import Header from './Header';
import Footer from './Footer';
import Channels from './Channels';
import Channel from './Channel';
import './App.css';


const styles = {
    root: {
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#565E71',
        padding: 50
    },
    main: {
        backgroundColor: '#373B44',
        flex: '1 1 auto',
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden'
    } 
};



export default ({
                    
                }) => {
    

    return (
        <div className="app" style={styles.root}>
            <Header/>
            <main className='App-main' style={styles.main}>
                <Channels/>
                <Channel/>
            </main>
            <Footer/>
        </div>
    );
}
