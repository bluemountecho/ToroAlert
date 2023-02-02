import React from "react";

const Logout = ({ className, ...rest }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={className ? className : "h-5 w-5"}
      fill="none"
      viewBox="0 0 24 20"
      {...rest}
    >
      <path
        fill="#072C9E"
        fillRule="evenodd"
        d="M.324 9.257l3.75-3.646c1.037-1.026 2.592.513 1.555 1.538L4.364 8.398c-.289.284-.194.514.211.514H16.94c.613 0 1.102.487 1.102 1.088 0 .6-.494 1.088-1.102 1.088H4.575c-.403 0-.5.23-.212.514l1.266 1.249c1.037 1.025-.518 2.564-1.554 1.538L.329 10.781a1.052 1.052 0 01-.005-1.524zM6.8 17.07c-.501-.497-.501-1.303 0-1.8a1.29 1.29 0 011.813 0c2.934 2.911 7.69 2.911 10.623 0a7.415 7.415 0 000-10.542c-2.933-2.911-7.69-2.911-10.623 0a1.29 1.29 0 01-1.813 0c-.501-.497-.501-1.303 0-1.8 3.935-3.905 10.315-3.905 14.25 0a9.947 9.947 0 010 14.142c-3.935 3.905-10.316 3.905-14.25 0z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default Logout;
