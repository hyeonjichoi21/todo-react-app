import React from "react";
import './App.css';
import Todo from './Todo';
import {Paper, List, Container} from "@material-ui/core";
import AddTodo from "./AddTodo";

class App extends React.Component {
  constructor(props){
    super(props); // 부모 생성자를 반드시 호출해야 함
    this.state = { 
      items: [],  
    };
  }

  // (1) 함수 추가
  add = (item) => { // item이 오면 이렇게 처리하라 <<람다식>>
    const thisItems = this.state.items;
    item.id = "ID-" + thisItems.length; //  key를 위한 id 추가
    item.done = false; // done 초기화
    thisItems.push(item); // 리스트에 아이템 추가
    this.setState({ items: thisItems }); // 업데이트는 반드시 this.Setstate로 해야 됨
    console.log("items: ", this.state.items);
  }

  delete = (item) => {
    const thisItems = this.state.items;
    console.log("Before delete : ", this.state.items)
    const newItems = thisItems.filter(e => e.id !== item.id);
    this.setState({ items: newItems }, () => {
      // 디버깅 콜백
        console.log("After delete : ", this.state.items)
    });
  }

  render(){
    var todoItems = this.state.items.length > 0 && (
      <Paper style ={{ margin: 16}}>
        <List>
          {this.state.items.map((item, idx) => (
            <Todo item={item} key={item.id} delete={this.delete}/> // delete={this.delete}로 함수를 자식에게 전달
          ))}
        </List>
      </Paper>
    );


    // (2) 함수 연결
    return (
      <div className='App'>
        <Container maxWidth="md"> 
          <AddTodo add={this.add} />
          <div className="TodoList">{todoItems}</div>
        </Container>  
      </div>
      /*Container: 내부 컴포넌트를 가운데 정렬시키는 컨테이너*/
    );
  }
  
  
}

export default App;
