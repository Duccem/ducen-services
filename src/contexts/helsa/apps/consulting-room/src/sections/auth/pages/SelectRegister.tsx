import { useUserContext } from "@/modules/user/state/UserContext";
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UserRoles } from "@helsa/modules";
import { Doctor, Heart } from "@shared/ui-web";
import { useNavigate } from "react-router-dom";

export function SelectRegister() {
  const navigate = useNavigate();
  const { setRegisterType, setPartialUser } = useUserContext()
  const selectAndGoToRegister = (type: 'DOCTOR' | 'PATIENT') => {
    setRegisterType(type);
    setPartialUser({
      role: type as UserRoles
    });
    navigate('/auth/register-user');
  }
  return (
    <>
      <div className="h-full w-full flex box-border py-[20px] px-[30px] flex-col justify-center items-center">
        <div className="w-3/4 mb-4">
          <p className="text-2xl font-semibold">How you want to register?</p>
        </div>
        <div className="w-3/4 flex flex-col gap-6">
          <div
            className="flex justify-between items-center p-3 border-black border-2 mt-3 rounded text-black shadow-[3px_3px_#282825] hover:cursor-pointer hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[7px_7px_#282825] transition-all"
            onClick={() => selectAndGoToRegister('DOCTOR')}
          >
            <div className="flex justify-start items-center">
              <Doctor size={30} />
              <p className="ml-4 font-bold text-lg">Doctor</p>
            </div>
            <FontAwesomeIcon icon={faAngleRight} />
          </div>
          <div
            className="flex justify-between items-center p-3 border-black border-2 mt-3 rounded text-black shadow-[3px_3px_#282825] hover:cursor-pointer hover:translate-x-[-4px] hover:translate-y-[-4px] hover:shadow-[7px_7px_#282825] transition-all"
            onClick={() => selectAndGoToRegister('PATIENT')}
          >
            <div className="flex justify-start items-center">
              <Heart size={30} />
              <p className="ml-4 font-bold text-lg">Patient</p>
            </div>
            <FontAwesomeIcon icon={faAngleRight} />
          </div>
        </div>
      </div>
    </>
  );
}
