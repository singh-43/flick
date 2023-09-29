import { BrowserRouter,Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Find from "./pages/SearchResult/SearchResult";
import Explore from  './pages/Explore/Explore';
import ContentDetails from "./pages/ContentDetails/ContentDetails";
import MoviesListData from './pages/CollectionDetail/MovieCollectionDetail/MoviesCollection';
import SeasonData from "./pages/CollectionDetail/SeriesCollectionDetail/SeasonData/SeasonData";
import SeasonsData from './pages/CollectionDetail/SeriesCollectionDetail/SeasonsData/SeasonsData';
import { AppContext } from './components/context/Context';
import PageNotFound from "./pages/404/PageNotFound";
import StreamMovie from "./pages/StreamOnline/Movie/Movie";
import StreamSeries from "./pages/StreamOnline/Series/Series";

function App() {

    return (
        <div className="App">
          <AppContext>
            <BrowserRouter>
              <Header />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/search/:query" element={<Find />}></Route>
                    <Route path="/:id/:movieName/streaming-online" element={<StreamMovie />}></Route>
                    <Route path="/series/:id/:seriesName/streaming-online" element={<StreamSeries />}></Route>
                    <Route path="/:mediaType/:id/:name" element={<ContentDetails />}></Route>
                    <Route path="/discover/:mediaType" element={<Explore />}></Route>
                    <Route path="/collection/:id/:title" element={<MoviesListData />}></Route>
                    <Route path="/tv/:id/:title/seasons" element={<SeasonsData />}></Route>
                    <Route path="/tv/:id/:title/season/:season_number" element={<SeasonData />}></Route>
                    <Route path="*" element={<PageNotFound />}></Route>
                  </Routes>
              <Footer />
            </BrowserRouter>
          </AppContext>
        </div>
      );
}

export default App;
