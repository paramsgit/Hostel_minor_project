import React,{useContext} from 'react'
import noteContext from '../context/noteContext'
export const About = () => {
  const { state, dispatch } = useContext(noteContext);
  function handleClick() {
    dispatch({ type: 'UPDATE_VALUE', payload: true });
  }
  function fandleClick() {
    dispatch({ type: 'UPDATE_VALUE', payload: false });
  }
  return (
    <>
    <div>
    
    
      <p>Value: {state.value?"true":"false"}</p>
      <br />
      <br />
      <button onClick={handleClick}>Change true</button>
      <button onClick={fandleClick}>Cha false</button>
    </div>
    </>
  )
}
