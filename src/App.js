import React from 'react';
import './App.css';
import Todo from './Todo';
import { Paper, List, Container } from "@material-ui/core";
import AddTodo from "./AddTodo.js"

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [

      ]
    };
  }

  componentDidMount() {
    const requestOptions = {
      method: "GET",
      headers: { "Content-Type": "application/json"},
    };

    fetch("http://localhost:8080/todo", requestOptions)
      .then( (response) => response.json() )
      .then(
        (response) => {
          this.setState( {
            items: response.data,
            });
        },
        (error) => {
          this.setState({
            error,
          });
        }
      );
  }

  add = (item) => {
    const thisItems = this.state.items;
    item.id = "ID-" + thisItems.length;
    item.done = false;
    thisItems.push(item);
    this.setState({items: thisItems});

    console.log("items: ", this.state.items);

  }

  delete = (item) => {
    const thisItems = this.state.items;

    console.log("Befere delete: ", this.state.items);

    const newItems = thisItems.filter( e => e.id !== item.id);

    this.setState({items: newItems}, () => {
      console.log("After delete: ", this.state.items);
    });
  }

  render() {
    var todoItems = this.state.items.length > 0 && (
      <Paper style={{margin:16}}>
        <List>
          { this.state.items.map((item, index) => (
              <Todo item={item} key={item.id} delete={this.delete} />
          ))}
        </List>
      </Paper>
    );


    return (
      <div className="App">
        <Container maxWidth="md">
          <AddTodo add={this.add} />
          <div className="TodoList">
            {/* <Todo> 컴포넌트 여러 개*/}
            {todoItems}
          </div>
        </Container>
      </div>
  );
  }
}

export default App;
