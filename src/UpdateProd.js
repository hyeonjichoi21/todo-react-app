import React from "react";
import { TextField, Paper, Button, Grid } from "@material-ui/core";

class UpdateProd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      item: { title: "" },
      updateItem: { id: "", title: "", brand: "", type: "", userId: "" },
    };
    this.retrieveForUpdate = props.retrieveForUpdate;
    this.update = props.update;
  }

  onButtonClick = () => {
    const { item } = this.state;

    // 유효성 검사: title 값이 비어있거나 데이터에 없는 경우 경고창 표시
    if (item.title.trim() === "") {
      alert("정확한 title 값을 입력해주세요");
      return;
    }
    
    this.retrieveForUpdate(item);
  };

  onUpdateButtonClick = () => {
    
    this.update(this.state.updateItem);
  };

  onInputChange = (e) => {
    const { value } = e.target;
    this.setState((prev) => ({ // 순서대로
      item: { ...prev.item, title: value }, // 깊은 복사 + title지정
    }));
  };

  onInputChangeTextField = (e) => {
    const { id, value } = e.target;
    this.setState((prev) => ({
      updateItem: { ...prev.updateItem, [id]: value }, // 복사 + 어떤 id의 값인지
    }));
  };

  componentDidUpdate(prev) { // 컴포넌트가 업데이트된 직후에 실행되는 메소드(처음에는 안쓰임)
    if (prev.searchResultForUpdate !== this.props.searchResultForUpdate) { // 이전의 값을 가져와 비교
      const { searchResultForUpdate } = this.props;
      this.setState({ // null값일 시 초기값 설정
        updateItem: {
          id: searchResultForUpdate.id || "",
          title: searchResultForUpdate.title || "",
          brand: searchResultForUpdate.brand || "",
          type: searchResultForUpdate.type || "",
          userId: searchResultForUpdate.userId || "",
        },
      });
    }
  }

  render() {
    const { item, updateItem } = this.state;
    const { searchResultForUpdate } = this.props;

    return (
      <Paper style={{ margin: 16, padding: 16 }}>
        <Grid>
          <Grid xs={4} md={4} item style={{ paddingRight: 16 }}>
            <label>title: </label>
          </Grid>
          <Grid xs={4} md={4} item style={{ paddingRight: 16 }}>
            <TextField 
              id="title" // 검색
              placeholder="add here"
              onChange={this.onInputChange}
              value={item.title}
            />
          </Grid>
        </Grid>
        <Grid>
          <Grid xs={4} md={4} item style={{ paddingRight: 16 }}>
            <label>brand: </label>
          </Grid>
          <Grid xs={4} md={4} item style={{ paddingRight: 16 }}>
            <TextField
              id="brand"
              value={updateItem.brand}
              onChange={this.onInputChangeTextField}
            />
          </Grid>
        </Grid>

        <Grid>
          <Grid xs={4} md={4} item style={{ paddingRight: 16 }}>
            <label>type: </label>
          </Grid>
          <Grid xs={4} md={4} item style={{ paddingRight: 16 }}>
            <TextField
              id="type"
              value={updateItem.type}
              onChange={this.onInputChangeTextField}
            />
          </Grid>
        </Grid>

        <Grid>
          <Grid xs={4} md={4} item style={{ paddingRight: 16 }}>
            <label>userId: </label>
          </Grid>
          <Grid xs={4} md={4} item style={{ paddingRight: 16 }}>
            <TextField
              id="userId"
              value={updateItem.userId}
              onChange={this.onInputChangeTextField}
            />
          </Grid>
        </Grid>

        <Grid>
          
          <Grid item xs={2}  Grid style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              fullWidth
              color="secondary"
              variant="contained"
              onClick={this.onButtonClick}
            >
              제품 검색
            </Button>
          </Grid>
          <Grid item xs={2}  Grid style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <Button
              fullWidth
              color="secondary"
              variant="contained"
              onClick={this.onUpdateButtonClick}
            >
              제품 수정
            </Button>
          </Grid>
        </Grid>
        <div><h3>수정:</h3>
          <pre>{JSON.stringify(this.state.updateItem, null, 3)}</pre>
        </div>
        <div><h3>검색 결과:</h3>
          <pre>{JSON.stringify(searchResultForUpdate, null, 3)}</pre>
        </div>
      </Paper>
    );
  }
}

export default UpdateProd;
