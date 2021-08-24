import { RouteComponentProps, useLocation } from "react-router-dom";

const SubFancyInput = (): JSX.Element => {
  const match = useLocation();
  return (
    <div>
      <p>
        params: {match.search}
      </p>
    </div>
  )
}

export default SubFancyInput;