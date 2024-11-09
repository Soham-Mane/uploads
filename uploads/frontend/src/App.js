import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx"
import Schedule from "./pages/Schedule.jsx";
import Series from "./pages/Series.jsx";
import Player from "./pages/Player.jsx";
import Table from "./pages/Table.jsx";
import ScorecardAPI from './Api/Scorecardapi.jsx';
import SeriesPointsAPI from './Api/Seriesptapi.jsx';
import Admincms from './pages/Admincms.jsx';
import ExcelUpload from './components/ExcelUpload.jsx';
import BlogEditor from './components/BlogEditor.jsx';
import Crick from './Api/crick.jsx';
import Carousel from './components/Carousel.jsx';
import InfoSeries from './pages/InfoSeries.jsx';
import SeriesDetail from './components/SeriesDetail';
import BlogPost from './components/BlogDetail.js';
import DisplayBlog from "./components/DisplayBlog.js"
import RankingsPage from './components/Ranking.js';
import RankP from './pages/RankP.jsx';
import WTCPage from './components/WTCPage.js';

function App() {

  return (
    <Router>
    <div className="h-full w-full">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/schedule" element={<Schedule />} />
        <Route path="/series" element={<Series />} />
        <Route path="/players" element={<Player />} />
        <Route path="/table" element={<Table/>} />
        <Route path="/scorecard" element={<SeriesPointsAPI/>} />
        <Route path="/ranking" element={<RankP/>} />
        <Route path="/admincms" element={<Admincms/>} />
        <Route path="/blog/:id" element={<BlogPost />} />
        <Route path="/upload" element={<ExcelUpload/>} />
        <Route path="/blog" element={<BlogEditor/>} />
      <Route path='/crick' element={<Crick/>} />
      <Route path='/carousel' element={<Carousel/>} />
      <Route path='/infos' element={<InfoSeries/>} />
      <Route path="/series/:id" element={<SeriesDetail />} />
      <Route path="/news" element={<DisplayBlog/>} />
      <Route path="/wtc" element={<WTCPage/>} />
     
      </Routes>
    </div>
  </Router>
  );
}

export default App;
