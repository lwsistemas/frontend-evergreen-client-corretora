export const ButtonSubmit = ({ disabled, children }) => {
  return (
    <button type="submit" className="form" disabled={disabled}>
      {children}
    </button>
  );
};
