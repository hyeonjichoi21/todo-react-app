import React from "react";
import './App.css';
import Todo from './Todo';

class App extends React.Component {
  constructor(props){
    super(props); // 부모 생성자를 반드시 호출해야 함
    this.state = {
      tiem: {id: 0, title: "Hello World 1", done: true}, // state에 item 객체를 담는다.
    };
  }

  render(){
    return (
      <div className='App'>
        <Todo item={this.state.item}/> 
        <Todo /> 
      </div>
    );
  }
  
}

export default App;
