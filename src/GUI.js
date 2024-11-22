import React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import AddProd from './AddProd';
import UpdateProd from './UpdateProd';
import DeleteProd from './DeleteProd';
import RetrieveProd from './RetrieveProd';

class GUI extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedTab: 0 // 선택된 메뉴의 인덱스를 저장할 변수
    };
  }

  handleTabChange = (event, newValue) => {
    this.setState({ selectedTab: newValue });
  }

  render() {
    return (
      <div>
        <Tabs value={this.state.selectedTab} onChange={this.handleTabChange}>
          <Tab label="Add Product |" />
          <Tab label="Search Product |" />
          <Tab label="Update Product |" />
          <Tab label="Delete Product" />
        </Tabs>
        <TabPanel value={this.state.selectedTab} index={0}>
          <AddProd />
        </TabPanel>
        <TabPanel value={this.state.selectedTab} index={2}>
          <RetrieveProd />
        </TabPanel>
        <TabPanel value={this.state.selectedTab} index={3}>
          <UpdateProd />
        </TabPanel>
        <TabPanel value={this.state.selectedTab} index={1}>
          <DeleteProd />
        </TabPanel>
      </div>
    );
  }
}

// TabPanel 컴포넌트 예시
const TabPanel = ({ children, value, index }) => {
  return (
    <div hidden={value !== index}>
      {value === index && (
        <div>
          {children}
        </div>
      )}
    </div>
  );
}

// AddProdUI, DeleteProductUI, SearchProductUI, EditProductUI 컴포넌트는 각각 해당 기능에 맞게 구현합니다.
// Table 컴포넌트는 현재 DB의 내용을 보여주는 역할을 합니다.

export default GUI;