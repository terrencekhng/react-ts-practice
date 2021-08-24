import { useEffect, useState } from "react"
import { useRouteMatch, Link, Route, Switch } from "react-router-dom";

// Components
// import SubFancyInput from "../SubFancyInput";

const CountClick = (): JSX.Element => {
  const [count, setCount] = useState(0);

  debugger;
  const match = useRouteMatch();

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    // Update the document title using the browser API
    document.title = `You clicked ${count} times`;
    console.log('Render finished or updated');
    return () => {
      console.log('clean up!!!');
    }
  }, [count])

  return (
    <>
      <p>
        You clicked {count} times.
      </p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
      <div>
        <Link to={`${match.url}/components`}>
          Components
        </Link>
      </div>
      <div>
        <Link to={`${match.url}/props-v-states`}>
          Props v. State
        </Link>
      </div>

      <Switch>
        <Route path={`${match.path}`}>
          <p>
            hello
          </p>
        </Route>
        <Route path={match.path}>
          <p>
            This is a page about Props v. State
          </p>
        </Route>
      </Switch>
    </>
  )
}

export default CountClick;