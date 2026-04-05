import { useLocation } from "react-router-dom";

export default function Result() {
  const { state } = useLocation();

  return (
    <div>
      <h1 className="text-3xl font-bold">Result</h1>
      <p className="mt-4 text-xl">
        Recommended: {state?.result}
      </p>
    </div>
  );
}