import './App.css';
import { useEffect, useState } from 'react';

function App() {

  const [note, setNote] = useState([{id: null, text: ''}]);
  const [noteText, setnoteText] = useState('');
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if(note.length > 1){
      sendData(note.length)
    }
    loadNotes()
    
  }, [note]);

  const changeHandler = (e) => {
    setnoteText(e.target.value)
  }

  const submitHadler = async (e) => {
    e.preventDefault();
    setNote(prev => [...prev, {id: note.length + 1, text: noteText}])
    setnoteText('')
    setTimeout(()=>{
      loadNotes()
    },150)
  }

  const removeHandler = (id) => {
    fetch(`http://localhost:7777/notes/${id}`,{method: 'DELETE'})
    setTimeout(()=>{
      loadNotes()
    },150)
  }

  const reload = () => {
    loadNotes()
  }

  const loadNotes = () => {
    fetch("http://localhost:7777/notes")
    .then(response=>response.json())
    .then(notes=>{
      setNotes(notes)
    })
  }

  const sendData = async (id) => {
    let body = note.filter(note => note.id === id)
    await fetch("http://localhost:7777/notes",{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(body[0])
    })
  }

  return (
    <div className="App">
      <form>
        <textarea value={noteText} onChange={changeHandler}/>
        <button type="submit" onClick={submitHadler}>add</button>
      </form>
      <button onClick={reload}>Обновить</button>
      <div className="cardwrapper">
        {notes.map(item => { return (<div className="card" id={item.id} key={item.id}>{item.text}<span onClick={() => removeHandler(item.id)}>  X</span></div>)})}
      </div>
    </div>
  );
}

export default App;
