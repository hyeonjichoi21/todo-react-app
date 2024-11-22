import React from "react";
import { TextField, Paper, Button, Grid } from "@material-ui/core";

class RetrieveProd extends React.Component {
  constructor(props) {
    super(props);
    this.state = { item: { title: ""} }; // 사용자의 입력을 저장할 오브젝트 

    this.retrieve = props.retrieve; // props의 함수 retrueve를 this.retrieve에 할당
  } 

  onButtonClick = () => {
    const {item} = this.state;

    // 유효성 검사: title 값이 비어있는지 또는 데이터에 없는지 확인
    if (item.title.trim() === "") {
      alert("정확한 title 값을 입력해주세요");
      return;
    }

    this.retrieve(item);

  };

  onInputChange = (e) => {
    const {value} = e.target;
    this.setState((prev) => ({
      item: {...prev.item, title:value},
    }));
  };

  render() {
    const { item } = this.state;
    const { searchResult } = this.props;

    const brand = searchResult.brand || "";
    const publisher = searchResult.publisher || "";
    const userId = searchResult.userId || "";

    return (
      <Paper style={{ margin: 16, padding: 16 }}>
        <Grid container spacing={2} >
          <Grid item xs={12} >
            <TextField 
              id = "title"
              label="title:"
              onChange={this.onInputChange}
              value={item.title}
            />
          </Grid>  
          <Grid item xs={12} >
            <TextField 
              label="userId:"
              onChange={this.onInputChange}
              value={item.userId}
            />
          </Grid>  
          <Grid item xs={12} >
            <TextField 
              id="brand"
              label="brand:"
              value={item.brand}
            />
          </Grid>  
          <Grid item xs={12} >
            <TextField 
              id = "type"
              label="type:"
              value={item.publisher}
            />
          </Grid>  
          <Grid item xs={2}  Grid style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
              fullWidth 
              color="secondary" 
              variant="contained"
              onClick={this.onButtonClick}>
              제품 검색
            </Button>
          </Grid>
        </Grid>
        <div >
          <h3>검색:</h3>
          <pre>{JSON.stringify(searchResult, null, 2)}</pre>
        </div>
      </Paper>
    );
  }
}

export default RetrieveProd;