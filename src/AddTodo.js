import React  from "react";
import { TextField, Paper, Button, Grid } from "@material-ui/core";

class AddTodo extends React.Component {
  constructor(props) {
    super(props);
    this.state = { item: { title: ""} }; // 사용자의 입력을 저장할 오브젝트
    this.add = props.add;
  }

  onInputChange = (e) => { // 이벤트가 오면 이렇게 처리하라 <<람다식>>
    const thisItem = this.state.item;
    thisItem.title = e.target.value;
    this.setState({ item: thisItem });
    console.log(thisItem); // println처럼 값을 바로 확인할 수 있는 문장
  }

  onButtonClick = () => {
    // add 함수 이용해서 item 추가하기
    this.add(this.state.item); // add 함수 사용
    this.setState({item: {title: ""}}); // 초기화 시켜줌
  }

  enterKetEventHandler = (e) => {
    if(e.key === 'Enter') {
      this.onButtonClick();
    }
  }

  render() {
    return (
      <Paper style={{ margin: 16, padding: 16}}>
        <Grid container>
          <Grid xs={11} md={11} item style={{ paddingRight: 16}}>
            <TextField placeholder="Add Too here" 
            fullWidth
            onChange={this.onInputChange}
            onKeyPress={this.enterKetEventHandler}
            value={this.state.item.title}
            /> 
          </Grid>
          <Grid xs={1} md={1} item>
            <Button 
              fullWidth 
              color="secondary" 
              variant="contained"
              onClick={this.onButtonClick}
            >
                +
            </Button>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default AddTodo;