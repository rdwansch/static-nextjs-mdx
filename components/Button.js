const Button = ({ text }) => {
  return (
    <>
      <button className="btn" onClick={event => (event.target.innerText = `changed -> '${text}'`)}>
        button
      </button>

      <style jsx>{`
        .btn {
          border: none;
          padding: 10px 40px;

          font-size: 17px;

          border-radius: 10px;
          color: white;
          background: linear-gradient(to top left, #ff00cc, #333399);
        }
      `}</style>
    </>
  );
};

export default Button;
