import React from "react";
import { TextField, Paper, Button, Grid } from "@material-ui/core";

class DeleteProd extends React.Component {
  constructor(props) {
    super(props);
    this.state = { item: { title: ""} }; // 사용자의 입력을 저장할 오브젝트 
    this.deleteFromTitle = props.deleteFromTitle;
  }

  onButtonClick = () => {
    // 검색
    // 삭제
    const { title } = this.state.item;

    // 유효성 검사: title 값이 비어있으면 경고창 표시
    if (title.trim() === "") {
      alert("정확한 title 값을 입력해주세요");
      return;
    }

    // 삭제 여부 확인
    if (window.confirm("정말 삭제하시겠습니까?")) {
      console.log("after click: " + this.state.item.title);
      this.deleteFromTitle(this.state.item);
      this.setState({ item: { title: "" } }); // 추가 후 state객체 초기화
    }

  }

  onInputChange = (e) => {
    const thisItem = this.state.item;
    thisItem.title = e.target.value
    this.setState({ item: thisItem }); // 사용자가 key입력할 때마다 state객체 설정
    console.log(thisItem);
  }

  render() {
    return (
      <Paper style={{ margin: 16, padding: 16 }}>
        <Grid container spacing={2} >
          <Grid item xs={12} >
            <TextField 
              label="title:"
              onChange={this.onInputChange}
              value={this.state.item.title}
            />
          </Grid>  
          <Grid item xs={2}  Grid style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
              fullWidth 
              color="secondary" 
              variant="contained"
              onClick={this.onButtonClick}>
              제품 삭제
            </Button>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default DeleteProd;