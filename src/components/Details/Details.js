import React from "react";
import { useLocation } from 'react-router-dom';
import Parse from '../../../node_modules/parse/dist/parse.js';
import '../Details/Details.css';
import { Link, useNavigate } from 'react-router-dom';

function Details() {
    const location = useLocation();
    const { id } = location.state;
    const { question } = location.state;
    const { answer } = location.state;
    const navigate = useNavigate();

    (async function getOwner() {
        const Flashcard = Parse.Object.extend('Flashcard');
        const query = new Parse.Query(Flashcard);
        query.equalTo('objectId', id);
        const userId = localStorage.getItem('userId');
        const username = localStorage.getItem('username');
        try {
            const results = await query.find();
            for (const object of results) {
                const owner = object.get('owner');
                const ownerId = owner.id;
                const isOwner = ownerId === userId;
            if (isOwner) {
                let ownerName = username;
                localStorage.setItem('owner', ownerName);
            }
          }
        } catch (error) {
            console.error('Error while fetching Flashcard', error);
        }
    })();
    
    async function onDelete() {
        const query = new Parse.Query('Flashcard');
        try {
          // here you put the objectId that you want to delete
          const object = await query.get(id);
          try {
            const response = await object.destroy();
            navigate('/', { replace: true })
            console.log('Deleted ParseObject', response);
          } catch (error) {
            console.error('Error while deleting ParseObject', error);
          }
        } catch (error) {
          console.error('Error while retrieving ParseObject', error);
        }
    };

    const owner = localStorage.getItem('owner');

    return (
        <div>
            <h2>Flashcard id: {`${id}`}</h2>
            <h2>Flashcard Question: {`${question}`}</h2>
            <h2>Flashcard Answer: {`${answer}`}</h2>
            <h2>Flashcard Owner: {`${owner}`}</h2>
            <div className="buttons">
                <Link onClick={onDelete} 
                className="flashcard-buttons" 
                to={`/delete/${id}`}
                >Delete</Link>
                <Link className="flashcard-buttons"
                    to={`/edit/${id}`}
                    state={{
                        id,
                        question,
                        answer,
                    }}
                    >Edit</Link>
            </div>
        </div>
    )
}

export default Details;
