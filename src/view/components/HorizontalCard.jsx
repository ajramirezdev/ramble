const HorizontalCard = ({
  model,
  icon,
  chatType,
  header,
  message,
  firstUser,
  userNameFirst,
  chatFirst,
  SecondUser,
  userNameSecond,
  chatSecond,
}) => {
  return (
    <div className="max-w-sm w-full lg:max-w-full lg:flex p-1 rounded-2xl">
      <div className="h-48 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden">
        <img src={model} alt="Avatar of Jonathan Reinink" />
      </div>
      <div className="border-r border-b border-l border-gray-400 lg:border-l-0 lg:border-t lg:border-gray-400 bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <p className="text-sm text-gray-600 flex items-center">
            {icon}

            {chatType} 
          </p>
          <div className="text-gray-900 font-bold text-xl mb-2">{header}</div>
          <p className="text-gray-700 text-base">{message}</p>
        </div>
        <div className="flex items-center justify-between">
          <section className="flex  items-center">
            <img
              className="w-10 h-10 rounded-full mr-4"
              src={firstUser}
              alt="Avatar"
            />

            <div className="text-sm">
              <div className="flex flex-col">
                <p className="text-gray-900 leading-none">{userNameFirst}</p>
                <p className="text-gray-600">Aug 18</p>
              </div>
            </div>
          </section>
          <div className="bg-emerald-500 w-40 rounded-xl text-white p-1 shadow text-center">
            {chatFirst}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <section className="flex  items-center">
            <img
              className="w-10 h-10 rounded-full mr-4"
              src={SecondUser}
              alt="Avatar"
            />

            <div className="text-sm">
              <div className="flex flex-col">
                <p className="text-gray-900 leading-none">{userNameSecond}</p>
                <p className="text-gray-600">Aug 18</p>
              </div>
            </div>
          </section>
          <div className="bg-emerald-500 w-40 rounded-xl text-white p-1 shadow text-center">
            {chatSecond}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalCard;
