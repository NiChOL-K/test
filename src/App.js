import './App.css';

import React from 'react'
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom'
import search from './assets/icon/search.svg';

import HomeComponent from './components/HomeComponent';
import LoginComponent from './components/LoginComponent';
import LogoutComponent from './components/LogoutComponent';
import AdminComponent from './components/AdminComponent';
import SongComponent from './components/song/SongComponent';
import AddSongComponent from './components/song/AddSongComponent';
import EditSongComponent from './components/song/EditSongComponent';
import DeleteSongComponent from './components/song/DeleteSongComponent';
import UserComponent from './components/user/UserComponent';
import EditUserComponent from './components/user/EditUserComponent';
import DeleteUserComponent from './components/user/DeleteUserComponent';
import AddUserComponent from './components/user/AddUserComponent';
import SignupComponent from './components/SignupComponent';
import SearchComponent from './components/SearchComponent';
import PlayComponent from './components/PlayComponent';
import AlbumComponent from './components/AlbumComponent';
import AboutusComponent from './components/AboutusComponent';


function App() {
  let login = JSON.parse(localStorage.getItem('login'));
  let admin = '';
  let user = '';
  let userdetail = '';
  let log = '';
  let log2 = '';
  if (login == null) {
    log = <a href="/login">login/register</a>;
  } else {
    log2 = <a href="/logout">Logout</a>;
    user = <span style={{ 'color': 'white', 'paddingRight': '15px' }}> Username : {login.username}</span>;
    if (login.role == 'ADMIN') {
      admin = <a href="/admin">Admin</a>;
      userdetail = <span style={{ 'color': 'white' }}>Role : {login.role}</span>;
    } else {
      userdetail = <span style={{ 'color': 'white' }}>Plan : {login.plan}</span>;
    }
  }

  return (
    <div>
      <header className="header">
        <a href="/">
          <h1>LOOP</h1>
        </a>
        <nav className="menu-navbar-mid">
          <a href="/">Home</a>
          <a href="/album">Album</a>
          <a href="/aboutus">About us</a>
          {admin}

        </nav>
        <nav className="menu-navbar-right">
          {log}
          {user}
          {userdetail}
          <a href="/search"><object type="image/svg+xml" data={search}></object></a>
          {log2}
        </nav>
      </header>

      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<HomeComponent />} />
          <Route path="/login" element={<LoginComponent />} />
          <Route path="/signup" element={<SignupComponent/>}/>
          <Route path="/logout" element={<LogoutComponent />} />
          <Route path="/album" element={<AlbumComponent />} />
          <Route path="/aboutus" element={<AboutusComponent />} />
          <Route path="/search" element={<SearchComponent />} />
          <Route path="/result/play" element={<PlayComponent />} />
          <Route exact path="/admin" element={<AdminComponent />} />
          <Route exact path="/admin/song" element={<SongComponent />} />
          <Route exact path="/admin/song/add" element={<AddSongComponent />} />
          <Route exact path="/admin/song/edit" element={<EditSongComponent />} />
          <Route exact path="/admin/song/delete" element={<DeleteSongComponent />} />
          <Route exact path="/admin/user" element={<UserComponent />} />
          <Route exact path="/admin/user/add" element={<AddUserComponent />} />
          <Route exact path="/admin/user/edit" element={<EditUserComponent />} />
          <Route exact path="/admin/user/delete" element={<DeleteUserComponent />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
