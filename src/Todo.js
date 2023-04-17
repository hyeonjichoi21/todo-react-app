import React from 'react';
import { ListItem, ListItemText, InputBase, Checkbox, ListItemSecondaryAction, IconButton } from "@material-ui/core";
import { DeleteOutlined } from '@material-ui/icons';

class Todo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { item: props.item, readOnly: true }; // 디폴트값 = 초기값
    this.delete = props.delete;
  }

  deleteEventHandler = () => {
    this.delete(this.state.item) // 이 delete는 App.js(부모)로부터 전달 받은 컴포넌트 
  }

  offReadOnlyMode = () => {
    console.log("Event!", this.state.readOnly)
    this.setState({ readOnly: false }, () => {
      console.log("ReadOnly? ", this.state.readOnly)
    });
  }

  editEventHandler = (e) => { // 이벤트를 통해서 어떤 입력값이 입력됐는데 봐야되기 때문에 e 넣어줌 
    const thisItem = this.state.item;
    thisItem.title = e.target.value; // 키 입력 이벤트가 발생한 객체로부터 value값을 얻음
    this.setState({ item: thisItem });
  }

  enterKeyEventHandler = (e) => {
    if(e.key === "Enter") { // e.key하면 e에 입력된 게 뭔지 알 수 있음
      this.setState({readOnly: true}); // true로 바껴서 이제는 수정 못하게 막음
    }
  }

  checkboxEventHandler = () => {
    const thisItem = this.state.item;
    thisItem.done = !thisItem.done;
    this.setState({ item: thisItem }); 
  }

  render() {
    const item = this.state.item; 
    return (
      <ListItem>
        <Checkbox checked={item.done} onChange={this.checkboxEventHandler}/>
        <ListItemText>
          <InputBase
            InputProps={{ 
              "aria-label": "naked",
              readOnly: this.state.readOnly,
            }}
            type='text'
            id={item.id}
            name={item.id}
            value={item.title}
            multiline={true}
            fullWidth={true}
            onClick={this.offReadOnlyMode}
            onChange={this.editEventHandler}
            onKeyPress={this.enterKeyEventHandler}
          />
        </ListItemText>
        <ListItemSecondaryAction>
          <IconButton 
          aria-label="Delete Todo"
          onClick={this.deleteEventHandler}>    
            <DeleteOutlined/>
          </IconButton>
        </ListItemSecondaryAction>
      </ListItem>
    );
  }
}

export default Todo; 