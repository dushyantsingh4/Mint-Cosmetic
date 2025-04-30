import { useState } from "react";

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-gray-200 px-2">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center py-4 text-left font-medium text-gray-800"
      >
        <span>{title}</span>
        <span>{isOpen ? (<i className="fa-solid fa-minus"></i>) : (<i className="fa-solid fa-plus"></i>)}</span>
      </button>
      {isOpen && (
        <div className="pb-4 text-sm text-gray-600" dangerouslySetInnerHTML={{__html: children}}>
        </div>
      )}
    </div>
  );
};

export default Accordion;
