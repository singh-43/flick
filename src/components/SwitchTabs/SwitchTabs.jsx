import { useRef } from 'react';
import "./SwitchTabs.scss";

const SwitchTabs = ({ data, onTabChange, setContainer, setPage, setFirstSlide}) => {

    let selectedTab = useRef(0);
    let tabs = useRef(0);

  return (
    <div className="switchTabs">
        {data.map((tab, index) => (
            <span
                key={index}
                className={`tabItem ${
                    selectedTab.current === index ? "active" : ""
                }`}
                onClick={() => {
                    selectedTab.current = index;
                    onTabChange(tab);
                    if(tabs.current !== selectedTab.current){     
                        tabs.current = selectedTab.current;
                        setContainer([]);
                        setPage(1);
                        setFirstSlide(true);
                    }
                 }}
                 >
                {tab}
            </span>
        ))}
    </div>

  )
}

export default SwitchTabs;