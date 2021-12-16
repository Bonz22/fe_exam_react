import React, { useState, useEffect } from 'react';

import Toast from 'react-bootstrap/Toast';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';

import './App.css';

const ExampleToast = ({ children }) => {
    const [show, toggleShow] = useState(true);
    const [storedEvents, setStoredEvents] = useState([]);

    useEffect(()=>{
        const url = 'http://localhost:3001/get';

        const fetchData = async ()=>{
            try {
                const response = await fetch(url);
                const json = await response.json();
                console.log(json);
                setStoredEvents(json);
            } catch (error) {
                console.log("error", error);
            }
        };

        fetchData();
    },[])

    return (
        storedEvents.map((data, index)=>(
            <>
                {!show && <Button onClick={() => toggleShow(true)}>Show Toast</Button>}
                <Toast show={show} onClose={() => toggleShow(false)}>
                <Toast.Header>
                    <strong className="mr-auto">{data.event}</strong>
                </Toast.Header>
                <Toast.Body>{data.date_created}</Toast.Body>
                </Toast>
            </>
        ))
    );
};

const App = () => (
    <Container className="p-3">
        <Container className="p-5 mb-4 bg-light rounded-3">
            <h1 className="header">Calendar</h1>
            <ExampleToast>

            </ExampleToast>
        </Container>
    </Container>
);

export default App;
