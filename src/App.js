import React from "react";
import { HashRouter as Router, Route, Switch, Link } from "react-router-dom";
import PokemonList from "./components/PokemonList";
import PokemonDetail from "./components/PokemonDetail";
import { Layout, Menu, Typography } from "antd";
import "./App.css";

const { Header, Content, Footer } = Layout;
const { Title } = Typography;

function App() {
  return (
    <Router>
      <Layout style={{ minHeight: "100vh", background: "#f2f2f2" }}>
        <Header style={{ background: "#e3350d", padding: 0 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              maxWidth: "1400px",
              margin: "0 auto",
              padding: "0 20px",
            }}
          >
            <link
              href="https://fonts.cdnfonts.com/css/pokemon-solid"
              rel="stylesheet"
            ></link>
            <Title
              style={{
                color: "#fff",
                margin: 0,
                fontFamily: "'Pokemon Solid', sans-serif",
                textAlign: "left",
                letterSpacing: "0.2vw",
              }}
              level={2}
            >
              <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
                PokéApp
              </Link>
            </Title>
            <Menu
              className="custom-header-menu"
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={["1"]}
              style={{
                background: "transparent",
                color: "#fff",
                textAlign: "left",
              }}
            >
              {/* Cambiamos "Inicio" a "Home" */}
              <Menu.Item
                key="1"
                style={{ color: "#fff", whiteSpace: "nowrap" }}
              >
                <Link to="/">Home</Link>
              </Menu.Item>
            </Menu>
          </div>
        </Header>
        <Content
          style={{
            padding: "20px",
            paddingTop: "10px",
            maxWidth: "1200px",
            margin: "0 auto",
            background: "#fff",
            boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
            borderRadius: "5px",
          }}
        >
          <Switch>
            <Route exact path="/" component={PokemonList} />
            <Route path="/pokemon/:id" component={PokemonDetail} />
          </Switch>
        </Content>
        <Footer
          style={{
            textAlign: "center",
            background: "#e3350d",
            color: "#fff",
            padding: "10px 0",
          }}
        >
          PokéApp ©2023 Created by ABDOTECH
        </Footer>
      </Layout>
    </Router>
  );
}

export default App;
