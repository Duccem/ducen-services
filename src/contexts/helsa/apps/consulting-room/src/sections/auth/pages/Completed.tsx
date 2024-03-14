import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OkButton } from "../components/OkButton";

export function Completed() {
  return (
    <>
      <div className="flex flex-col justify-center items-center box-border h-full">
        <div className="h-full w-full p-4 flex flex-col gap-5 justify-start items-center box-border">
          <div className="w-3/4">
            <div className="rounded-full border-2 border-black flex justify-center items-center w-[150px] h-[150px] mx-auto my-8 text-5xl shadow-[4px_4px_var(--dark-gray)]">
              <FontAwesomeIcon icon={faCheck}/>
            </div>
            <p className="text-3xl font-bold mb-1">
              SignUp completed
            </p>
            <p className='text-base text-[#747474]'>
              You can go to login
            </p>
            <OkButton route={'/auth/login'}></OkButton>
          </div>
        </div>
      </div>
    </>
  )
}
