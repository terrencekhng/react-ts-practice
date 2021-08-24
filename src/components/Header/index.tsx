import './Header.css';

type HeaderProp = {
  title: string;
  firstName: string;
  lastName: string;
}

const Header = (props: HeaderProp): JSX.Element => {

  return (
    <div className="header">
      <div className="left">
        Left
      </div>
      <div className="center">{props.firstName + props.lastName}</div>
      <div className="right">
        <p>
          Right
        </p>
      </div>
    </div>
  );
}

export default Header;