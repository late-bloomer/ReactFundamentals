import React, { lazy, useState, Suspense, useEffect, useContext } from "react";
import logo from "./logo.svg";
import "./App.module.css";
import { BrowserRouter, Link, NavLink, Route, Switch } from "react-router-dom";
import Details from "./Details";
// import Homes from './Home';

export const ColorContext = React.createContext("Red"); // default initialization of context
// Context to pass in child component from parent component

/***** Example of theme change using context *****/
export const ChangeThemeContext = React.createContext(null);

/** lazy is for lazy loading.... */
const Home = lazy(() => import("./Home"));
//const Home = lazy(() => <Homes />);

const InvalidComponent = () => (
  <div style={{ color: "Red", fontSize: "60px" }}>Invalid URL....</div>
);

/**
 * Dynamic component load on and get URL data from props
 */
function DynamicsExampleComponent(props) {
  return (
    <div style={{ color: "blue", fontSize: "60px" }}>
      Dynamic URL example....{props.match.url} and {props.match.params.id}
    </div>
  );
}
function App() {
  const [color, setColor] = useState("brown");

  function toggleColor() {
    setColor((color) => (color === "brown" ? "blue" : "brown"));
  }
  return (
    /**
     * for routing, refer this - https://codeburst.io/getting-started-with-react-router-5c978f70df91
     */
    <BrowserRouter>
      {/**
       * Default route
       */}
      <Link to="/" style={{ margin: "0 20px 0 0" }}>
        Home
      </Link>

      {/* <NavLink /> provides a way to change the visited link color which isn't possible in
          <Link /> tag
      */}
      <NavLink
        to="/details"
        activeClassName="detailsActiveClass"
        style={{ margin: "0 20px 0 0" }}
      >
        Details
      </NavLink>

      <Link to="/change_theme" style={{ margin: "0 20px 0 0" }}>
        Change_Theme
      </Link>
      {/**
       * Context Provider needs to pass the context to child component
       */}
      <ChangeThemeContext.Provider
        value={{
          color,
          toggleColor,
        }}
      >
        {/* provider is needed at top level to pass data to child... */}
        <ColorContext.Provider value="Green">
          {/* Switch component helps us to render the components only when path matches 
            otherwise it fallbacks to the not found component. */}
          <Switch>
            {/* exact mention in the route means if path match to '/' only navigate..
              read about exact(important-interview question !!!)
          */}
            <Route
              exact
              path="/"
              component={(props) => (
                /* Suspense is for showing fallback component if Home(a lazy component) is
                 taking time for loading. */
                <Suspense fallback={<div>loading...</div>}>
                  <Home {...props} />
                </Suspense>
              )}
            ></Route>

            {/* useContext is used inside the Details Component */}
            <Route exact path="/details" component={Details}></Route>

            {/*Dynamic URL*/}
            <Route
              exact
              path="/dynamic/:id"
              component={DynamicsExampleComponent}
            ></Route>

            {/* useContext is used inside the ChangeThemeComponent to change the default value of context */}
            <Route
              exact
              path="/change_theme"
              component={ChangeThemeComponent}
            ></Route>

            {/**
             * Enter any invalid path in localhost:3000/invalid and see....
             * what if u declare this route above all route...
             * Place it there and see...
             * if u click on any link provided i.e, Home or Details...
             * it will redirect you to invalid component only....
             * so generic route should be placed at the end.
             */}
            <Route component={InvalidComponent}></Route>
          </Switch>
        </ColorContext.Provider>
      </ChangeThemeContext.Provider>
    </BrowserRouter>
  );
}

function ChangeThemeComponent(props) {
  let { color, toggleColor } = useContext(ChangeThemeContext);

  return (
    <div>
      <div style={{ color: color, fontSize: "40px", margin: "28px" }}>
        color provided by theme and example for changing and manupulating the
        value of context !!!
      </div>
      <button onClick={toggleColor}>change theme</button>
    </div>
  );
}
export default App;
