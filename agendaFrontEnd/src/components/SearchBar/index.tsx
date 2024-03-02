/* eslint-disable @typescript-eslint/ban-types */
import { ChangeEvent, FormEvent, useState } from 'react';
import './styles.css'

type Props = {

  onSearch: Function;
}

export default function SearchBar({onSearch}:Props) {

const [text,setText] = useState("");

  function handleSubmit (event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onSearch(text);
  }

  function handleChange (event: ChangeEvent<HTMLInputElement>){
    setText(event.target.value)
  }

  function handleClearClick(){
     setText("");
     onSearch(text);
  }

  return (
    <>
      <form className="dsc-search-bar" onSubmit={handleSubmit}>
        <button type="submit">🔎︎</button>
        <input 
        value={text}
        type="text" 
        placeholder="Nome do produto" 
        onChange={handleChange}
        />
        <button onClick={handleClearClick}>🗙</button>
      </form>
    </>
  );
}
