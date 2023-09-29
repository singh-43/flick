import { useNavigate } from 'react-router-dom';
import './Header.scss';
import React,{ useState, useEffect } from 'react';
import { SlMenu } from "react-icons/sl";
import { VscChromeClose } from "react-icons/vsc";
import { HiOutlineSearch } from "react-icons/hi";
import ContentWrapper from "../contentWrapper/ContentWrapper";
import logo from "../../assets/images/logo.png";

const Header = () => {
    
    const navigate = useNavigate();

    const [query, setQuery] = useState("");
    const [lastScrollY, setLastScrollY] = useState(0);
    const [show, setShow] = useState("top");
    const [mobile, setMobile] = useState(false);
    const [showSearch, setShowSearch] = useState(false);

    const searchQueryHandler = (event) => {
        if(event.key === "Enter" && query.length > 0){
            let title = ( query )?.split(': ').join('-').split(' ').join('-').split('--').join('').split(':').join('-').split('.-').join('-');
            navigate(`/search/${title}`);
            setShowSearch(false)
        }
    }

    useEffect(() => {
        window.addEventListener("scroll", controlNavbar);
        return () => {
            window.removeEventListener("scroll", controlNavbar);
        };
        //eslint-disable-next-line
    }, [lastScrollY]);

    const controlNavbar = () => {
        if (window.scrollY > 200) {
            if (window.scrollY > lastScrollY && !mobile) {
                setShow("hide");
            } else {
                setShow("show");
            }
        } else {
            setShow("top");
        }
        setLastScrollY(window.scrollY);
    };

    return (
        <header className={`header ${mobile ? "mobileView" : "" } ${show}`}>
            <ContentWrapper>
                <div className='logo'
                    onClick={() => {
                        navigate('/')
                    }}
                >
                    <img src={logo} alt=""/>                                                                  
                    <span>Flick</span>
                </div>
                <ul className='menuItem'>
                    <li className='menuItems'
                        onClick={() => {
                            if(location?.pathname !== '/discover/movie'){
                                navigate('/discover/movie')
                                setMobile(false);
                            }
                            setShowSearch(false);
                        }}
                    >Movies</li>
                    <li className='menuItems'
                        onClick={() => {
                            if(location?.pathname !== '/discover/tv'){
                                navigate('/discover/tv')
                                setMobile(false);
                            }
                            setShowSearch(false);
                    }}>Tv Show</li>
                    <li className='menuItems'>
                        <HiOutlineSearch 
                            onClick={() => {
                                setShowSearch(true);
                                setMobile(false);
                            }}
                        />
                    </li>
                </ul>
                <div className='mobileMenuItems'>
                        <HiOutlineSearch 
                            onClick={() => {
                                setShowSearch(true)
                                setMobile(false);
                            }}
                        />
                    {mobile ? 
                        (
                            <VscChromeClose
                                onClick={() => {
                                    setMobile(false);
                                }}
                            />
                        ) : (
                            <SlMenu 
                                onClick={() => {
                                    setMobile(true)
                                    setShowSearch(false)
                                }}
                            />
                        )
                    }
                </div>
            </ContentWrapper>
            
            {showSearch && (
                <div className='searchBar'>
                    <ContentWrapper>
                        <div className='searchInput'>
                            <input 
                                type='text'
                                placeholder='Search for a movie or tv show ...'
                                onChange={(e) => {
                                    setQuery(e.target.value);
                                }}
                                onKeyUp={searchQueryHandler}
                            />
                            <VscChromeClose 
                                onClick={() => {
                                    setShowSearch(false);
                                }}
                            />
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </header>
    )
}

export default Header;