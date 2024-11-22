import React from "react";


class TodoRow extends React.Component {
  constructor(props) {
    super(props);
    this.state = { item: props.item };
    this.delete = props.delete;
  }

  // 함수 추가
  deleteEventHandler = () => {
    this.delete(this.state.item)
  }

  render() {
    const item = this.state.item;

    return (
      <tr key={item.id}>
        <td>{item.id}</td>
        <td>{item.title}</td>
        <td>{item.userId}</td>
        <td>{item.brand}</td>
        <td>{item.type}</td>
        <td><button onClick={this.deleteEventHandler}>delete</button></td>
      </tr>
    )
  }
}

export default TodoRow;



