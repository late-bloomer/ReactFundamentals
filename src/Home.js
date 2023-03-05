import React, { useContext, useState } from "react";
import { ColorContext } from "./App";
import CustomHOCExample from "./CustomHOCExample";
import ExampleRenderPros from "./ExampleRenderPros";
import ExampleRefAndForwardingRef from "./ExampleRefAndForwardingRef";
import ReactHooksExample from "./ReactHooksExample";

import ErrorBoundaryComp from "./ErrorBoundaryComp";

/*  if Home will be class component then code will be like written below..
    how to use context in class component...
*/

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlParams: 0,
      textMsg: "",
    };
  }
  static contextType = ColorContext;
  // Example of context to take in component passed from parent component

  handleOnChange = (event) => {
    this.setState({ urlParams: event.target.value });
  };

  onChangeText = (event) => {
    ///console.log(event.target.value);
    this.setState({ textMsg: event.target.value });
  };

  render() {
    return (
      <>
        <div style={{ color: this.context, fontSize: "60px" }}>
          Example of Context...
        </div>

        {/*Dynamic URL navigation*/}
        <div style={{ margin: "16px" }}>
          <input
            style={{ marginRight: "inherit" }}
            value={this.state.urlParams}
            onChange={this.handleOnChange}
          ></input>
          <a href={`/dynamic/${this.state.urlParams}`}>Dynamic URL</a>
        </div>

        <ErrorBoundaryComp>
          <CustomHOCExample />
        </ErrorBoundaryComp>

        <ErrorBoundaryComp>
          <ExampleRenderPros render={(value) => <div>{value}</div>}>
            <div>Example of props children...</div>
          </ExampleRenderPros>
        </ErrorBoundaryComp>
        <br></br>
        <br></br>
        <ErrorBoundaryComp>
          <ExampleRefAndForwardingRef />
        </ErrorBoundaryComp>
        <br></br>
        <br></br>
        <div>React hooks implementation....</div>
        <input
          id="inputHook"
          value={this.state.textMsg}
          onChange={this.onChangeText}
        />
        <ErrorBoundaryComp>
          <ReactHooksExample textMsg={this.state.textMsg} />
        </ErrorBoundaryComp>
        <ErrorBoundaryComp>
          <ComponentWhereErrorOccured error="error-occured" />
        </ErrorBoundaryComp>
        <ErrorBoundaryComp>
          <GridInsideGrid />
        </ErrorBoundaryComp>
      </>
    );
  }
}

/* if Home will be functional component then code will be like written below..
   (without useContext hook)
   comment the above class component and see...
*/

// export default function Home(props) {
//     return (
//         <ColorContext.Consumer>
//             {(value) => <div style={{ color: value, fontSize: '50px' }}>Example of Context...</div>}
//         </ColorContext.Consumer>
//     )
// }

/* if Home will be functional component then code will be like written below..
   Here we are using useContext hook to get context..
   comment the above class component and see...
*/

// export default function Home(props) {
//     const context = useContext(ColorContext)
//     return (
//         <div style={{ color: context, fontSize: '60px' }}>
//            Example of Context...inside home
//         </div>
//     )
// }

function ComponentWhereErrorOccured(props) {
  if (props.error === "error-occured") {
    throw new Error(
      "yes error...Click on right top cancel icon...programe will run..It is the Example of error boundary....Dont worry!!!"
    );
  }
  return <div>Hello</div>;
}

function GridInsideGrid() {
  return (
    <div className="App">
      GridInsideGrid
      <Grid />
    </div>
  );
}
function Grid(props) {
  const [gridCount, setGridCount] = useState([1]);
  const handleClick = () => {
    let temp = [...gridCount];
    console.log(temp);
    let t = [];
    t.push(temp);
    setGridCount(t);
  };
  const renderGrid = (item) => {
    return (
      <>
        {item.map((itm, index) => (
          <div
            onClick={handleClick}
            style={{
              border: "1px solid green",
              margin: "20px",
              padding: "20px",
              cursor: "pointer",
            }}
          >
            {typeof itm !== "object" ? itm : renderGrid(itm)}
          </div>
        ))}
      </>
    );
  };
  return (
    <div>{renderGrid(gridCount)}
    </div>
  );
}
