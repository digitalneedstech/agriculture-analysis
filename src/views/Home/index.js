import React from "react";
import { Layout } from "antd";
import InternalRoutes from "~/routes/InternalRoutes";
import MenuSider from "~/layout/Menu";
import HeaderComp from "~/layout/Header";
import FooterComp from "~/layout/Footer";
import "./style.scss";

const { Content } = Layout;

class SiderDemo extends React.Component {
  state = {
    collapsed: false,
  };

  onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    return (
      <Layout style={{ minHeight: "100vh" }}>
        <MenuSider
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        />
        <Layout className="site-layout">
          <HeaderComp />
          <Content style={{ margin: "16px" }}>
            <InternalRoutes />
          </Content>
          <FooterComp />
        </Layout>
      </Layout>
    );
  }
}

export default SiderDemo;
