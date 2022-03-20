import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

PostFilterForm.propTypes = {
  onSubmit: PropTypes.func,
};

PostFilterForm.defaultProps = {
  onSubmit: null,
};

function PostFilterForm(props) {
  const { onSubmit } = props;
  const [searchTerm, setSearchTerm] = useState("");
  const typingTimeoutRef = useRef(null);

  function handleValueChange(e) {
    const value = e.target.value;
    setSearchTerm(value);

    if (typingTimeoutRef.current) {
      clearTimeout(typingTimeoutRef.current);
    }

    typingTimeoutRef.current = setTimeout(() => {
      if (!onSubmit) return;
      const newValue = {
        title: value,
      };
      onSubmit(newValue);
    }, 300);
  }

  return (
    <div>
      <form action="">
        <input type="text" value={searchTerm} onChange={handleValueChange} />
      </form>
    </div>
  );
}

export default PostFilterForm;
