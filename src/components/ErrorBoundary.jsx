import { useRouteError } from "react-router-dom";
import { BiError } from "react-icons/bi";

function ErrorBoundary() {
  const errorBoundary = useRouteError();
  console.log(errorBoundary, "errorBoundary");

  return (
    <div className="text-2xl font-bold  px-4">
      <div className="h-[100vh] flex flex-col items-center justify-center gap-2">
        <h1 className="text-center">There is an error, check back later.</h1>
        <BiError className="text-red-600 text-4xl"/>
      </div>
    </div>
  );
}

export default ErrorBoundary;
