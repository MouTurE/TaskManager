import { useState, useEffect } from "react";
import ListGroup from "./components/ListGroup";


function App () {



  const MainPage = <>
    <header> 
      <div className="header-box">
        <h1>Task Manager App</h1> 
      </div>
      
      
    
    </header>
    
    <ListGroup></ListGroup>
    
  </>

    return MainPage;
}



export default App;