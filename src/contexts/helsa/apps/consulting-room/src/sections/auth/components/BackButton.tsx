import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useLocation } from "react-router-dom";
export function BackButton({ text, to }) {
  const location = useLocation()
  if (location.pathname == '/auth/login') return null;
  return (
    <>
    <Link to={to} className='flex items-center text-black no-underline'>
      <FontAwesomeIcon className='' icon ={faAngleLeft}/>
      <span className="ml-[10px]">
        {text}
      </span>
    </Link>
  </>
  )
}
