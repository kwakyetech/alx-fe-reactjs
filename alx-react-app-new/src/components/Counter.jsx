import  { useState } from "react";

function Counter() {
    const [count, setCount] = useState(0);
    const increment = () => {
        setCount(count + 1);
    }
    const decrement = () => {
        setCount(count - 1);
    }
    const reset = () => {
        setCount(0);
    }
  return (
    <div style={{ 
        padding: '20px',
        textAlign: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        maxWidth: '300px',
        margin: '0 auto'
    }}>
        <h2 style={{
            color: '#333',
            marginBottom: '15px'
        }}>Counter</h2>
        <p style={{
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#444'
        }}>Count: {count}</p>
        <button style={{
            margin: '5px',
            padding: '8px 16px',
            backgroundColor: '#4CAF50',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
        }} onClick={increment}>Increment</button>
        <button style={{
            margin: '5px',
            padding: '8px 16px',
            backgroundColor: '#f44336',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
        }} onClick={decrement}>Decrement</button>
        <button style={{
            margin: '5px',
            padding: '8px 16px',
            backgroundColor: '#808080',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
        }} onClick={reset}>Reset</button>
    </div>
  )
}

export default Counter
