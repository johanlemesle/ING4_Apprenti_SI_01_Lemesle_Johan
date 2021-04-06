import React, {useState} from 'react';

const styles = {

    header: {
        height: 60,
        backgroundColor: 'rgba(255,255,255,.3)',
        flexShrink: 0
    },
    headerLogIn: {
        backgroundColor: 'red'
    },
    headerLogOut: {
        backgroundColor: 'blue'
    }

};

export default ({

}) => {
    return (
    <header className="App-header" style={styles.header}>
        <h1>header</h1>
    </header>);
}