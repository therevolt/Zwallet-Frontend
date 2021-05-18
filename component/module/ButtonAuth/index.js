import Button from "../../base/Button";

const ButtonAuth = ({ disable, load, handleClick, text }) => {
  return (
    <>
      {load ? (
        <div class="spinner-grow text-primary" role="status">
          <span class="sr-only">Loading...</span>
        </div>
      ) : (
        <Button
          className="btn-filled login text-white"
          onClick={handleClick}
          disabled={disable}
          text={text}
        />
      )}
    </>
  );
};

export default ButtonAuth;
