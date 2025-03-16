import React, { useState, useEffect } from "react";
import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
import { FaSearch, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { IoMdArrowDropright, IoMdArrowDropleft } from "react-icons/io";
import "../index.css";
import allMangaDb from "../MangaDB/allManga";
import { FaFire } from "react-icons/fa";
import { MdRecommend } from "react-icons/md";
import { GoDot } from "react-icons/go";

const Card = ({ image, title }) => (
  <div className="card w-[100px] h-[200px] sm:w-[150px] sm:h-[250px] md:w-[180px] md:h-[300px] lg:w-[200px] lg:h-[330px] rounded-xl bg-white drop-shadow-lg m-2 font-bold text-center text-sm sm:text-md transition duration-300 ease-in-out hover:-translate-y-1 hover:scale-105">
    <img
      className="drop-shadow-lg mx-auto mt-2 w-[90%] h-[70%] object-cover"
      src={image}
      alt={title}
    />
    <p className="flex items-center justify-center mt-1 sm:mt-2 pt-1 text-xs sm:text-sm truncate">
      {title}
    </p>
  </div>
);

const Col = () => {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [nav, setNav] = useState(false);
  const [search, setSearch] = useState("");
  const [filteredResults, setFilteredResults] = useState(allMangaDb);
  const [more, setMore] = useState(false);
  const [moreOne, setMoreOne] = useState(false);
  const [drop, setDrop] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [demo,setDemo] = useState(true);
  const [genre,setGenre] = useState(true);
  const [demoP,setDemoP] = useState(false);
  const [genreP,setGenreP] = useState(true);
  
  
  const handlGenre = () => setGenre(!genre);
  const handlGenreP = () => setGenreP(!genreP);
  const handleDemoP = () => setDemoP(!demoP);
  const handleDemo = () => setDemo(!demo);
  const toggleTheme = () => setIsDarkMode((prevMode) => !prevMode);
  const handleNav = () => setNav(!nav);
  const dropdown = () => setDrop(!drop);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);
  const handleMoreToggle = () => setMore(!more);
  const handleMoreOneToggle = () => setMoreOne(!moreOne);

  useEffect(() => {
    const savedMode = localStorage.getItem("darkMode") === "true";
    setIsDarkMode(savedMode);
  }, []);

  useEffect(() => {
    localStorage.setItem("darkMode", isDarkMode);
    document.body.className = isDarkMode ? "dark-mode" : "light-mode";
  }, [isDarkMode]);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearch(value);
  };

  useEffect(() => {
    const debounceSearch = setTimeout(() => {
      const results = allMangaDb.filter((item) =>
        item.searchKey.toLowerCase().trim().includes(search.toLowerCase())
      );
      setFilteredResults(results);
    }, 300);
    return () => clearTimeout(debounceSearch);
  }, [search]);
  useEffect(() => {
    if (demo) {
      const timer = setTimeout(() => {
        setDemo(true); // Set demo to false after 5 seconds
      }, 5000);

      // Cleanup the timer on component unmount or when demo changes
      return () => clearTimeout(timer);
    }
  }, [demo]);
  useEffect(() => {
    if (genre) {
      const timer = setTimeout(() => {
        setGenre(true); // Set demo to false after 5 seconds
      }, 8000);

      // Cleanup the timer on component unmount or when demo changes
      return () => clearTimeout(timer);
    }
  }, [genre]);

  return (
    <>
      <header className="text-black flex w-full items-center justify-between bg-gray-100 py-2 px-2 sm:px-4">
        <div onClick={handleNav} className="p-2 sm:p-4 block md:hidden">
          {nav ? (
            <AiOutlineClose className="icon" size={20} />
          ) : (
            <AiOutlineMenu className="icon" size={20} />
          )}
        </div>
        <nav className="hidden md:flex mx-2 sm:mx-4 max-w-[400px] overflow-x-auto">
          <ul className="flex p-4 sm:p-4 space-x-2 sm:space-x-4 text-sm sm:text-base">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/newest">News</Link></li>
            <li><Link to="/col">Collections</Link></li>
            <li><Link to="/RegistrationForm">Register</Link></li>
            <li>Payment</li>
            <li><Link to="/popular">Popular</Link></li>
            <li>Favourites</li>
            
          </ul>
        </nav>
        <h2 className="text-xl sm:text-2xl md:text-3xl font-bold p-2 sm:p-4 mx-auto">
          Mobibeezz
        </h2>
        <div className="flex items-center space-x-2 sm:space-x-4 pr-2 sm:pr-4">
          <FaSearch className="cursor-pointer" size={20} onClick={toggleSearch} />
          <label className="switch">
            <input
              className="dkmod"
              type="checkbox"
              checked={isDarkMode}
              onChange={toggleTheme}
            />
            <span className="slider"></span>
          </label>
        </div>

        {/* Mobile Navigation */}
        {nav && (
                  <div className="text-white fixed overflow-y-auto items-center z-1 w-[90%] h-full right-0 top-0 border-r border-r-gray-900 bg-gray-700 ease-in-out duration-600 lg:hidden ">
                      <nav className="">
                          <h2 className="flex md:text-3xl text-3xl font-bold p-4 mx-24 text-gray-300 border-b ">Mobibeezz</h2>
                          <ul className="mx-auto pt-4">
                              <li className="text-gray-500 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400"><Link to="/">Home</Link></li>
                              <li className="text-gray-500 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400"><Link to='/newest'>News</Link></li>
                              <li className="text-gray-500 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400"><Link to="/col">Collections</Link></li>
                              
                              <li onClick={dropdown} className="text-gray-500 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400">Series</li>
                              {drop ? 
                                  <ul className="">
                                      <li onClick={handleDemoP} className=" flex items-center text-gray-500 mx-3 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400"><GoDot color="white " size={20}/> Demographic</li>
                                      {!demoP ? <ul className="hidden"></ul> : <ul>
                                  <li className="text-gray-500 mx-10 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400"> Shōnen</li>
                                  <li className="text-gray-500 mx-10 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400"> Shōjo
                                          </li>
                                  <li className="text-gray-500 mx-10 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400"> Seinen
                                  </li>
                                  <li className="text-gray-500 mx-10 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400"> Josei
                                  </li>
                                  <li className="text-gray-500 mx-10 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400"> Kodomomuke
                                  </li>
                                  
                                </ul> }
                                      <li onClick={handlGenreP} className="flex items-center text-gray-500 mx-3 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400"><GoDot color="white " size={20}/> Genre</li>
                                      {!genreP ? <ul>
                                  <li className="text-gray-500 mx-10 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400"> Action / Adventure
                                  </li>
                                  <li className="text-gray-500 mx-10 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400"> Romance
                                          </li>
                                  <li className="text-gray-500 mx-10 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400"> Comedy
                                  </li>
                                  <li className="text-gray-500 mx-10 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400"> Drama
                                  </li>
                                  <li className="text-gray-500 mx-10 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400"> Fantasy
                                  </li>
                                  <li className="text-gray-500 mx-10 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400"> Horror
                                  </li>
                                  <li className="text-gray-500 mx-10 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400"> Science Fiction
                                  </li>
                                  <li className="text-gray-500 mx-10 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400"> Mystery / Thriller
                                  </li>
                                  <li className="text-gray-500 mx-10 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400"> Sport
                                  </li>
                                  <li className="text-gray-500 mx-10 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400"> Slice of Life
                                  </li>
                                  <li className="text-gray-500 mx-10 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400"> Historical
                                  </li>
                                  <li className="text-gray-500 mx-10 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400"> Isekai
                                  </li>
                                  <li className="text-gray-500 mx-10 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400"> Supernatural
                                  </li>
                                  <li className="text-gray-500 mx-10 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400"> Mecha
                                  </li>
                                  <li className="text-gray-500 mx-10 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400"> Psychological
                                  </li>
                                  
                                </ul> : <ul className="hidden"></ul>}
                                  </ul>
                              : <div className="hidden"></div>
                              }
                              <li className="text-gray-500 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400"><Link to="/popular">Popular</Link></li>
                              <li className="text-gray-500 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400">
                                  <Link to="/RegistrationForm">Register</Link> {/* Link to Login */}
                              </li>
                          </ul>
                
                      </nav>
                         
                  </div>
                )}
      </header>

      {/* Search Bar */}
      {isSearchOpen && (
        <div className="w-full bg-transparent my-2 p-2">
          <div className="InputContainer max-w-[400px]  mx-auto">
            <input
              onChange={handleSearch}
              value={search}
              placeholder="Search..."
              className="input w-full p-2 text-sm sm:text-base border rounded focus:outline-none"
              type="text"
            />
          </div>
        </div>
      )}
      
      {/* Second Nav and Genre */}
      <section className="w-full h-auto"> 
            <div className="flex w-full h-[100%] items-center justify-center mx-auto p-4">
                <ul className="flex mx-4 font-bold border-b">
                    <li className="p-4  hover:bg-sky-300 focus:outline-2 focus:outline-sky-300 active:bg-sky-500 rounded-2xl"><Link to="/popular">Popular</Link></li>
                    <li className="p-4  hover:bg-sky-300 focus:outline-2 focus:outline-sky-300 active:bg-sky-500 rounded-2xl"><Link to="/newest">Newest</Link></li>
                    <li className=" p-4 bg-sky-300 hover:bg-sky-300 focus:outline-2 focus:outline-sky-300 active:bg-sky-500 rounded-2xl"><Link to="/col">Collections</Link></li>
                    <li className=" p-4 hover:bg-sky-300 focus:outline-2 focus:outline-sky-300 active:bg-sky-500 rounded-2xl hidden md:flex ease-in-out duration-500" onClick={dropdown} >Series {!drop ? <IoMdArrowDropright size={20} className="mt-0.5 hidden md:flex" /> :<IoMdArrowDropleft size={20} className="hidden md:flex mt-0.5"/>}</li>
                </ul>
                {drop ? <div className="hidden md:flex">
                        <ul className="mx-[-20px]">
                            <li onClick={handleDemo} className="text-[13px] md:text-[1rem] py-1 md:py-2  font-bold hover:bg-sky-300 focus:outline-2 focus:outline-sky-300 active:bg-sky-500 rounded-2xl mx-[10px]">Demographic</li>
                            <li onClick={handlGenre} className="text-[13px] md:text-[1rem] py-1 md:py-2 font-bold  hover:bg-sky-300 focus:outline-2 focus:outline-sky-300 active:bg-sky-500 rounded-2xl mx-[10px]">Genre</li>
                        </ul>
                    </div> : <div className="hidden"></div>
                }
            </div>
          {demo ? <ul className="hidden"></ul> : <ul>
                    <li className="text-gray-500 mx-3 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400"> Shōnen</li>
                    <li className="text-gray-500 mx-3 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400"> Shōjo
                            </li>
                    <li className="text-gray-500 mx-3 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400"> Seinen
                    </li>
                    <li className="text-gray-500 mx-3 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400"> Jose
                    </li>
                    <li className="text-gray-500 mx-3 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400"> Kodomomuke
                    </li>
                    
                  </ul> } 
                  {genre ? <ul className="hidden"></ul> : <ul>
                                  <li className="text-gray-500 mx-3 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400"> Action / Adventure
                                  </li>
                                  <li className="text-gray-500 mx-3 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400"> Romance
                                          </li>
                                  <li className="text-gray-500 mx-3 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400"> Comedy
                                  </li>
                                  <li className="text-gray-500 mx-3 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400"> Drama
                                  </li>
                                  <li className="text-gray-500 mx-3 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400"> Fantasy
                                  </li>
                                  <li className="text-gray-500 mx-3 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400"> Horror
                                  </li>
                                  <li className="text-gray-500 mx-3 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400"> Science Fiction
                                  </li>
                                  <li className="text-gray-500 mx-3 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400"> Mystery / Thriller
                                  </li>
                                  <li className="text-gray-500 mx-3 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400"> Sport
                                  </li>
                                  <li className="text-gray-500 mx-3 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400"> Slice of Life
                                  </li>
                                  <li className="text-gray-500 mx-3 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400"> Historical
                                  </li>
                                  <li className="text-gray-500 mx-3 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400"> Isekai
                                  </li>
                                  <li className="text-gray-500 mx-3 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400"> Supernatural
                                  </li>
                                  <li className="text-gray-500 mx-3 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400"> Mecha
                                  </li>
                                  <li className="text-gray-500 mx-3 my-1 p-4 rounded-2xl hover:bg-gray-300 focus:outline-2 focus:outline-offset-2  active:bg-gray-400"> Psychological
                                  </li>
                                  
                                </ul>}                   
        </section>
      {/* Card */}             
      <div className="flex overflow-x-auto justify-center p-2 sm:p-4">
        {filteredResults.length > 0 ? (
          <div className="flex justify-cent>">
            {filteredResults.map((item) => (
              <Card key={item.id} image={item.image} title={item.title} />
            ))}
          </div>
        ) : (
          <p className="font-bold text-lg sm:text-2xl p-4">No results found</p>
        )}
      </div>

      {/* Popular Section */}
      <section className="w-full">
        <h2 className="flex items-center font-bold text-lg sm:text-2xl p-2 sm:p-4">
          Newest - <FaFire className="mx-2 icon" size={20} color="black" />
        </h2>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 p-2 sm:p-4">
          {allMangaDb.slice(0, more ? allMangaDb.length : 6).map((item, index) => (
            <Card key={index} image={item.image} title={item.title} />
          ))}
        </div>
        <div className="flex justify-center gap-2 sm:gap-4 p-2 sm:p-4">
          <button
            onClick={handleMoreToggle}
            className="flex items-center bg-sky-300 px-2 sm:px-4 py-1 sm:py-2 rounded-2xl hover:bg-sky-400 active:bg-sky-500 text-sm sm:text-base"
          >
            <FaArrowLeft className="mr-1 sm:mr-2" size={16} /> Less
          </button>
          <button
            onClick={handleMoreToggle}
            className="flex items-center bg-sky-300 px-2 sm:px-4 py-1 sm:py-2 rounded-2xl hover:bg-sky-400 active:bg-sky-500 text-sm sm:text-base"
          >
            More <FaArrowRight className="ml-1 sm:ml-2" size={16} />
          </button>
        </div>
      </section>

      {/* Recommended Section */}
      <section className="w-full">
        <h2 className="flex items-center font-bold text-lg sm:text-2xl p-2 sm:p-4">
          Recommended For You -{" "}
          <MdRecommend className="mx-2 icon" size={24} color="black" />
        </h2>
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 p-2 sm:p-4">
          {allMangaDb.slice(0, moreOne ? allMangaDb.length : 6).map((item, index) => (
            <Card key={index} image={item.image} title={item.title} />
          ))}
        </div>
        <div className="flex justify-center gap-2 sm:gap-4 p-2 sm:p-4">
          <button
            onClick={handleMoreOneToggle}
            className="flex items-center bg-sky-300 px-2 sm:px-4 py-1 sm:py-2 rounded-2xl hover:bg-sky-400 active:bg-sky-500 text-sm sm:text-base"
          >
            <FaArrowLeft className="mr-1 sm:mr-2" size={16} /> Less
          </button>
          <button
            onClick={handleMoreOneToggle}
            className="flex items-center bg-sky-300 px-2 sm:px-4 py-1 sm:py-2 rounded-2xl hover:bg-sky-400 active:bg-sky-500 text-sm sm:text-base"
          >
            More <FaArrowRight className="ml-1 sm:ml-2" size={16} />
          </button>
        </div>
      </section>
    </>
  );
};

export default Col;