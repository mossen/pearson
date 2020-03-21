import React from "react";
import PropTypes from "prop-types";

const Input = props => {
  const className =
    props.type === "range" ? `${props.className} slider` : props.className;

  return (
    <input
      data-testid="input"
      type={props.type}
      min={props.min}
      max={props.max}
      value={props.value}
      step={props.step}
      className={className}
      onChange={event => props.onChangeHandler(event.target.value)}
    />
  );
};

Input.propTypes = {
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  className: PropTypes.string,
  type: PropTypes.string,
  max: PropTypes.number,
  min: PropTypes.number,
  step: PropTypes.number
};
export default Input;
