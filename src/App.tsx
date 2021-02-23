import React, { useState } from "react";
import "./App.css";

import { Layout } from "antd";
import { Route, Switch } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Heatmap from "./pages/Heatmap";
import Timespent from "./pages/Timespent";
import Activity from "./pages/Activity";
import NotFound from "./pages/NotFound";
import Header from "./components/Header";
import { ContextProvider } from "./context";

const { Content, Sider } = Layout;

function App() {
  const [page, setPage] = useState("home");

  return (
    <ContextProvider value={{ page, setPage }}>
      <Layout>
        <Sider>
          <Sidebar></Sidebar>
        </Sider>
        <Layout>
          <Header></Header>
          <Content id="content">
            <Route path="/">
              <Switch>
                <Route path="/heatmap" component={Heatmap} />
                <Route path="/timespent" component={Timespent} />
                <Route path="/activity" component={Activity} />
                <Route component={Heatmap} />
              </Switch>
            </Route>
          </Content>
        </Layout>
      </Layout>
    </ContextProvider>
  );
}

export default App;
