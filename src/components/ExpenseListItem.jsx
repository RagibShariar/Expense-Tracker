/* eslint-disable react/prop-types */
import Bin from "./svg/Bin";
import Pencil from "./svg/Pencil";

const ExpenseListItem = ({ category, date, amount, onEdit, onDelete }) => {
  return (
    <>
      <div className="flex justify-between items-center py-2 relative group cursor-pointer">
        <div>
          <h3 className="text-base font-medium leading-7 text-gray-600">
            {category}
          </h3>
          <p className="text-xs text-gray-600">{date}</p>
        </div>
        <div className="flex items-center gap-2">
          <p className="text-base font-semibold text-gray-600 transition-all group-hover:-translate-x-14">
            BDT {amount}
          </p>

          {/* <!-- 3 Dots --> */}
          <div className="translate-x-5 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 absolute right-0 top-1/2 -translate-y-1/2 transition-all ">
            <button
              onClick={onEdit}
              className="hover:text-teal-600 mr-1"
              role="button"
              title="Edit Button"
            >
              <Pencil />
            </button>

            <button
              onClick={onDelete}
              className="hover:text-red-600"
              role="button"
              title="Delete"
            >
              <Bin />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExpenseListItem;
