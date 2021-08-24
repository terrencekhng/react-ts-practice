import React, { useContext, useState } from "react";
import ThemeContext from "../../theme/ThemeContext";

export type Ref = HTMLInputElement;
// type Props = {children?: React.ReactNode}

const FancyInput = React.forwardRef<Ref>((props, fancyInputEl) => {
  // const fancyInputEl = useRef<HTMLInputElement>(null);
  const [fancyName, setFancyName] = useState<string>('');

  const onFancyNameChange = (e: any): void => {
    setFancyName(name => name = e.target.value as string);
  }

  // useEffect(() => {
  //   if (fancyInputEl && fancyInputEl.current) {
  //     fancyInputEl.current.focus();
  //   }
  // }, [])

  const theme = useContext(ThemeContext);

  return (
    <div>
      {/* <ThemeContext.Consumer>
        {context => (
          <div>
            <input type="text" ref={fancyInputEl} placeholder="Please type anything here..." onChange={onFancyNameChange} />
            <div>
              <p style={{ background: context.background, color: context.foreground }}>
                {fancyName}
              </p>
            </div>
          </div>
        )}
      </ThemeContext.Consumer> */}
      <input type="text" ref={fancyInputEl} placeholder="Please type anything here..." onChange={onFancyNameChange} />
      <div>
        <p style={{ background: theme.theme.background, color: theme.theme.foreground }}>
          {fancyName}
        </p>
        <button onClick={theme.toggleTheme}>Inner change theme</button>
      </div>
    </div>
  )
})

export default FancyInput;