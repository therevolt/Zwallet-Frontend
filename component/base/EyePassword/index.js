import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEyeSlash, faEye } from "@fortawesome/free-solid-svg-icons";

const EyePassword = (props) => {
  return (
    <div className={props.className}>
      <span onClick={props.onClick}>
        <FontAwesomeIcon icon={props.show ? faEye : faEyeSlash} />
      </span>
    </div>
  );
};

export default EyePassword;
