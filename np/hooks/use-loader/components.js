import Lottie from "lottie-react";
import orangeAnimation from "@/assets/workingOrange.json";

// lottie-react
export function OrangeLoader({ show = false }) {
  return (
    <div className={`orange-loader-bg ${show ? "" : "orange-loader--hide"}`}>
      <Lottie
        className={`orange-loader ${show ? "" : "orange-loader--hide"}`}
        animationData={orangeAnimation}
      />
    </div>
  );
}
