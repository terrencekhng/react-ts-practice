import { useEffect, useState } from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
// Styles
import './index.css';

const LoadingPage = (): JSX.Element => {
  const [currentPercentage, setCurrentPercentage] = useState(0);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      if (currentPercentage !== 100) {
        setCurrentPercentage(currentPercentage + 1);
      }
    }, 50)
    return () => {
      clearTimeout(timer);
    }
  }, [currentPercentage]);

  return (
    <div className="loading-page">
      <div className="progress-bar-outer-container">
        <ProgressBar displayPercentage={true} percentage={currentPercentage}></ProgressBar>
      </div>
    </div>
  )
}

export default LoadingPage;