const Card = ({ model, title, message, messag2, hash1, hash2, hash3 }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg hover:bg-neutral-100 lg:m-6 p-4 md:h-[700px] lg:h-[700px]">
      <img
        className="w-full lg:h-56"
        src={model}
        alt="Sunset in the mountains"
      />
      <div className="px-6 py-4 ">
        <div className="font-bold text-xl mb-2">{title}</div>
        <p className="text-slate-800 text-base text-justify">
          {message}
          <br />
          <br />
          {messag2}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {hash1}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {hash2}
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          {hash3}
        </span>
      </div>
    </div>
  );
};

export default Card;
