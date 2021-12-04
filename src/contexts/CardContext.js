import { createContext, useState, useContext } from 'react';

export const CardContext = createContext();

const initialState = {
    id: '',
    question: '',
    answer: '',
    owner: ''
}

export const CardProvider = ({
    children
}) => {
    
    const [card, setCard] = useState(initialState);
    const create = (question, answer, owner) => {
        setCard(question, answer, owner);
    }
    return <CardContext.Provider value={{card, create }}>
        { children }
    </CardContext.Provider>
};

export const useCard = () => {
    const cardState = useContext(CardContext);
    return cardState;
}
