import { BiArrowBack } from "react-icons/bi";
import { useNavigate } from "react-router-dom";

function PageNotFound() {
	const navigate = useNavigate()

	function back(){
		navigate("/campaign")
	}
  return (
    <div className="text-2xl font-bold  px-4">
      <div className="h-[100vh] flex flex-col items-center justify-center gap-2">
        <h1 className="text-center">Page Not found.</h1>
        <BiArrowBack onClick={back} className=" text-4xl"/>
      </div>
    </div>
  )
}

export default PageNotFound