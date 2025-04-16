import { useState } from "react";
import './DiariesList.css'

function Diary({ title, body ,date }) {
    return (
      <label>
        {title}
        {body}
        {date}
      </label>
    );
  }
  
  export default Diary;