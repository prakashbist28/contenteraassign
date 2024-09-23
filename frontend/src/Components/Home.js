
import { useEffect, useState } from 'react';
import HashLoader from 'react-spinners/HashLoader'

const Home = () => {

  const [cardList, setCardList] = useState([]);
  const [loading, setLoading] = useState(true); 

  const [search, setSearch] = useState('')

  const filterCards = cardList.filter((item)=> item.data.title.toLowerCase().includes(search.toLowerCase()))

  useEffect(() => {
    const fetchCard = async () => {
      try {
        const response = await fetch(`https://www.reddit.com/r/reactjs.json`);
        const obj = await response.json();
        setCardList(obj.data.children);
        console.log(obj.data.children)
        setLoading(false); 
      } catch (error) {
        console.error("Error fetching Card data:", error);
        setLoading(false);
      }
    };
    fetchCard();
  }, []);


  if (loading) {
    return (
    <div className="flex flex-col gap-4 md:gap-8 w-full min-h-screen items-center text-center m-auto justify-center">
      <h1 className="font-ten text-[18px] md:text-[24px] font-bold text-indigo-400"> Please wait... </h1>
      <HashLoader size={150} color="#524fff" />
    </div>);
  }

  return (
    <div className="p-6 w-full md:w-11/12 min-h-screen m-auto">
      <h1 className=" text-transparent bg-clip-text bg-gradient-to-b  from-indigo-600 to-purple-300  font-thirteen  font-bold text-4xl md:text-8xl pb-10 ">
        List of Cards
      </h1>

      <input onChange={(e) => setSearch(e.target.value)} placeholder='Search titles...' className='  p-4 border-2 border-indigo-400 outline-none h-10 w-[80%] mb-10 ' />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16">

        {filterCards.length > 0 ? (
          filterCards.map((card, index) => (
            <div key={index}>
              <div className=" border-2 flex items-center justify-center p-4 relative overflow-hidden group rounded-lg border-indigo-400  h-[420px] md:h-[500px] hover:shadow-xl hover:shadow-indigo-300 transition duration-700 ">
               
                <div className="w-11/12  flex flex-col gap-8  items text-left">

                    <div>
                    <div className=" h-32 w-32 md:h-40 md:w-40 rounded-full -bottom-20 -right-20 bg-gradient-to-tr opacity-40 from-indigo-200 to-purple-200 absolute group-hover:scale-[800%] transition ease-in-out duration-700"></div>
                    <div className=" h-64 w-64 md:h-64 md:w-64 rounded-full -bottom-28 -right-28 bg-gradient-to-tr opacity-40 from-indigo-300 to-purple-100 absolute group-hover:scale-[900%] transition ease-in-out duration-700"></div>
                    </div>

                  <h2 className="  flex flex-col text-indigo-500 text-[16px] md:text-[24px] group-hover:scale-[105%] font-ten font-semibold z-10 transition duration-500 line-clamp-1">
                    Title{" "}
                    <span className="font-normal  text-black text-[14px] md:text-[20px]">
                      {card.data.title}
                    </span>
                  </h2>
                  <h2 className="  flex flex-col text-indigo-500 text-[16px] md:text-[24px] group-hover:scale-[105%] font-ten font-semibold z-10 transition duration-500 ">
                    Self text html{" "}
                    <span className="font-normal  text-black text-[14px] md:text-[20px] line-clamp-3">
                      {card.data.selftext_html
                        ? card.data.selftext_html
                        : "not available in this card"}
                    </span>
                  </h2>
                  <h2 className="text-indigo-500 flex flex-col text-[16px] md:text-[24px] group-hover:scale-[105%] font-ten font-semibold z-10 transition duration-500 overflow-hidden">
                    URL{" "}
                    <a
                      target="_blank"
                      href={card.data.url}
                      className=" font-normal text-black text-[14px] md:text-[20px]"
                    >
                      {card.data.url}
                    </a>
                  </h2>
                  <h2 className="  flex flex-col text-indigo-500 text-[16px] md:text-[24px] group-hover:scale-[105%] font-ten font-semibold z-10 transition duration-500 line-clamp-1">
                    Score{" "}
                    <span className=" font-normal text-black text-[14px] md:text-[20px]">
                      {card.data.score}
                    </span>
                  </h2>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="w-full ">
            <h1 className=" font-ten text-xl text-center mb-4 ">
              {" "}
              No data available
            </h1>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
