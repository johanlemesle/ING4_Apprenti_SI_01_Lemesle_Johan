import React, {useState} from 'react';

//Permet d'inserer un retour à la ligne
//https://github.com/yosuke-furukawa/react-nl2br#readme
const nl2br = require('react-nl2br');

const styles = {

    messages: {
        flex: '1 1 auto',
        height: '100%',
        overflow: 'auto',
        '& ul': {
            'margin': 0,
            'padding': 0,
            'textIndent': 0,
            'listStyleType': 0
        }
    },
    message: {
        margin: '.2rem',
        padding: '.2rem',
        // backgroundColor: '#66728E',
        ':hover': {
            backgroundColor: 'rgba(255,255,255,.2)'
        }
    }
};


export default ({
    channel = {
        name: 'Fake channel'
    },
    messages
                }) => {
    

    return (
        <div style={styles.messages}>
            <h1>Messages for {channel.name}</h1>
            <ul>
                {messages.map((message, i) => (
                    <li key={i} style={styles.message}>
                        <p>
                            <span>{message.author}</span>
                            {' '}
                            <span>{(new Date(message.creation)).toString()}</span>
                        </p>
                        <div>
                            {nl2br(message.content)}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
}