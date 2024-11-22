import React from "react";
import { TextField, Paper, Button, Grid } from "@material-ui/core";

class AddProd extends React.Component {
  constructor(props) {
    super(props);
    this.state = { item: { title: ""} }; // 사용자의 입력을 저장할 오브젝트 
    this.state = { item: { userId: ""} };
    this.state = { item: { brand: ""} };
    this.state = { item: { type: ""} };
    this.add = props.add; // props의 함수를 this.add에 연결
  }

  onInputChange = (e) => {
    const thisItem = this.state.item;
    thisItem.title = e.target.value;
    this.setState({ item: thisItem });
    console.log(thisItem);
  };

  onInputChange2 = (e) => {
    const thisItem = this.state.item;
    thisItem.userId = e.target.value;
    this.setState({ item: thisItem });
    console.log(thisItem);
  };

  onInputChange3 = (e) => {
    const thisItem = this.state.item;
    thisItem.brand = e.target.value;
    this.setState({ item: thisItem });
    console.log(thisItem);
  };

  onInputChange4 = (e) => {
    const thisItem = this.state.item;
    thisItem.type = e.target.value;
    this.setState({ item: thisItem });
    console.log(thisItem);
  };


  onButtonClick = () => {
    this.add(this.state.item);
    this.setState({ item: { title: "", userId: "", brand: "", type: "" } });

    
  };

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
          <Grid item xs={12}>
            <TextField 
              label="userId:"
              onChange={this.onInputChange2}
              value={this.state.item.userId}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              label="brand:"
              onChange={this.onInputChange3}
              value={this.state.item.brand}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField 
              label="type:"
              onChange={this.onInputChange4}
              value={this.state.item.type}
            />
          </Grid>
          <Grid item xs={2}  Grid style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button 
              fullWidth 
              color="secondary" 
              variant="contained"
              onClick={this.onButtonClick}>
              제품 추가
            </Button>
          </Grid>
        </Grid>
      </Paper>
    );
  }
}

export default AddProd;