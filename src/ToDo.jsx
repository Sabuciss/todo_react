import { useState } from "react";

function ToDo({ task, completed }) {
    return (
      <label>
       <input
            type="checkbox"
            checked={check}
            onChange={() => setCheck(!check)}
            />
        {task}
      </label>
    );
  }
  
  export default ToDo;