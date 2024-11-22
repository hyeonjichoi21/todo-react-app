import React from "react";
import "./App.css";
import {
  Container,
  Grid,
  Button,
  AppBar,
  Toolbar,
  Typography,
  Tabs,
  Tab,
} from "@material-ui/core";
import { DriveEta, ExitToApp } from "@material-ui/icons";
import { call, signout } from "./service/ApiService"; // signout 추가
import TodoRow from "./TodoRow";
import AddProd from "./AddProd";
import RetrieveProd from "./RetrieveProd";
import UpdateProd from "./UpdateProd";
import DeleteProd from "./DeleteProd";
import HelpModal from "./HelpModal";
import StarRating from "./StarRating";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      searchResult: {}, 
      searchResultForUpdate: {}, 
      /* 1. 로딩중이라는 상태이다. 생성자에 상태 변수를 추가한다. */
      loading: true,
      activeMenu: 0, // Initially set to the index of "Add" menu
      isHelpVisible: false, // 도움말 가시성 상태 변수
    };
  }

  componentDidMount() {
    /* 2. componentDidMount에서 todo리스트를 가져오는 
    GET 리퀘스트가 성공적으로 리턴하는 경우 loading을 false로 고친다. 
    더 이상 로딩중이 아니라는 뜻이다. */
    call("/todo", "GET", null).then((response) =>
      this.setState({ items: response.data, loading: false })
    );
  }

  add = (item) => {
    call("/todo", "POST", item).then((response) =>
      this.setState({ items: response.data })
    );
  };

  delete = (item) => {
    call("/todo", "DELETE", item).then((response) =>
      this.setState({ items: response.data })
    );
  };

  deleteFromTitle = (item) => { 
    call(`/todo/${item.title}`, "GET")
    .then((response) => {
      const deleteItem = response.data[0]; 
      return call("/todo", "DELETE", deleteItem);
    })
    .then((response) => {
      this.setState({ items: response.data });
    });
  }

  retrieve = (item) => {
    const title = item.title;
    call(`/todo/${title}`, "GET").then((response) => {
      this.setState({ searchResult: response.data[0] }); 
      console.log("set searchResult: ", this.state.searchResult)
    });

    
  }

  retrieveForUpdate = (item) => {
    const title = item.title;
    call(`/todo/${title}`, "GET").then((response) => {
      this.setState({ searchResultForUpdate: response.data[0] });
      console.log("set searchResultForUpdate: ", this.state.searchResultForUpdate)
    });

    
  }

  update = (item) => { 
    // 업데이트 하기
    call("/todo", "PUT", item).then((response) =>
      this.setState({ items: response.data })
    );

  }

  handleMenuChange = (event, newValue) => {
    this.setState({ activeMenu: newValue });
  };
  

  toggleHelpVisibility = () => {
    this.setState((prevState) => ({
      isHelpVisible: !prevState.isHelpVisible,
    }));
  };



  render() {
    console.log("searchResultForUpdate:", this.state.searchResultForUpdate);

    var todoRows = this.state.items.length > 0 && (
      <table className="todo-table">
        <caption>Car item table</caption>
        <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>userId</th>
            <th>brand</th>
            <th>type</th>
            <th>삭제 버튼</th>
          </tr>
        </thead>
        <tbody>
          {this.state.items.map((item, idx) => (
              <TodoRow
                item={item} 
                key={item.id}  
                delete ={this.delete}
              />
          ))}
        </tbody>
      </table>
    );

    // navigationBar 추가
    var navigationBar = (
      <AppBar position="static">
    <Toolbar>
      <Grid container justify="space-between" alignItems="center">
        <Grid item>
          <Grid container alignItems="center">
            <Grid item>
              <DriveEta style={{ marginRight: 8 }} /> {/* 아이콘을 추가 */}
            </Grid>
            <Grid item>
              <Typography variant="h6">Car 리스트</Typography>
            </Grid>
          </Grid>
        </Grid>
        <Grid item>
          <Grid container alignItems="center">
            <Grid item>
              <ExitToApp style={{ marginRight: 8 }} /> {/* 아이콘을 추가 */}
            </Grid>
            <Grid item>
              <Button color="inherit" onClick={signout}>
                로그아웃
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Toolbar>
  </AppBar>
    );

    var content = null;
    if (this.state.activeMenu === 0) {
      // 제품 추가에 대한 JSX
      content = (
        <Container maxWidth="md">
          <AddProd add={this.add} />
        </Container>
      );
    } else if (this.state.activeMenu === 1) {
      // 제품 검색에 대한 JSX
      content = (
        <Container maxWidth="md">
          <RetrieveProd
            retrieve={this.retrieve}
            searchResult={this.state.searchResult}
          />
        </Container>
      );
    } else if (this.state.activeMenu === 2) {
      // 제품 수정에 대한 JSX
      content = (
        <Container maxWidth="md">
          <UpdateProd
            retrieveForUpdate={this.retrieveForUpdate}
            searchResultForUpdate={this.state.searchResultForUpdate}
            update={this.update}
          />
        </Container>
      );
    } else if (this.state.activeMenu === 3) {
      // 제품 삭제에 대한 JSX
      content = (
        <Container maxWidth="md">
          <DeleteProd deleteFromTitle={this.deleteFromTitle} />
        </Container>
      );
    }

    /* 로딩중이 아닐 때 렌더링 할 부분 */
    var todoListPage = (
      <div>
        {navigationBar}
        <Container maxWidth="md">
          <Tabs
            value={this.state.activeMenu}
            onChange={this.handleMenuChange}
            indicatorColor="primary"
            textColor="primary"
            centered
          >
            <Tab label="추가" />
            <Tab label="검색" />
            <Tab label="수정" />
            <Tab label="삭제" />
          </Tabs>
        </Container>
        {content}
        <Container>
          <div className="TodoTable">{todoRows}</div>
        </Container>
      </div>
    );

    /* 로딩중일 때 렌더링 할 부분 */
    var loadingPage = <h1> 로딩중.. </h1>;

    var content = loadingPage;

    if (!this.state.loading) {
      /* 로딩중이 아니면 todoListPage를 선택*/
      content = todoListPage;
    }

    /* 선택한 content 렌더링 */
    return (
      <div className="App">
        {content}
        <Button variant="outlined" color="primary" onClick={this.toggleHelpVisibility}>
          도움말
        </Button>
        {this.state.isHelpVisible && <HelpModal />}
        <StarRating/>
      </div>
    );

  }
}

export default App;
