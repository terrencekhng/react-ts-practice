import React, { useEffect, useState } from "react";
import './ProgressBar.css';

type ProgressBarProps = {
  percentage: number;
  displayPercentage: boolean;
  text?: string;
}

const ProgressBar = ({ percentage = 0, displayPercentage = false, text = '' }: ProgressBarProps): JSX.Element => {
  const progressBarPercentStyle: React.CSSProperties = {
    width: `${percentage}%`
  }
  const [finishLoadingText, setFinishLoadingText] = useState<JSX.Element | null>(null);

  useEffect(() => {
    if (percentage === 100) {
      setFinishLoadingText(<span>Finish loading</span>);
    }
  }, [percentage]);

  return (
    <div className="progress-bar">
      <div className="progress-bar-container">
        <div className="progress-bar-percent" style={progressBarPercentStyle}>
        </div>
        <div className="progress-bar-text-container" style={progressBarPercentStyle}>
          <p className="progress-bar-text">
            {text}
            {displayPercentage ? <span>{percentage}%{finishLoadingText}</span> : <></>}
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProgressBar;