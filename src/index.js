import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';

import {BrowserRouter as Router,
        Routes,
        Route,
        Navigate,
        Link,
        Outlet,
        useParams,
        NavLink,
        useNavigate,
        useLocation
      } from 'react-router-dom'

ReactDOM.render(
 <Router>
   <Routes>
     <Route path="/" element={<Home/>}/>
     <Route path="/myapps" element={<Navigate replace to="/learn" /> } />
     <Route path="/learn" element={<Learn/>}>
       <Route path="courses" element={<Course/>} >
          <Route path=':courseid' element={<CourseId />} />
       </Route>
       <Route path="bundles" element={<Bundle/>} />
     </Route>
     <Route path="/dashboard" element={<Dashboard/> } />
   </Routes>
 </Router>,
  document.getElementById('root')
);

function Home(){
  return(
    <div>
      <h1>Home route added</h1>
    </div>
  )
}

function Learn(){
  return(
    <div>
      Learn
      <h4>All Courses are listed Here</h4>
      <Link className='btn btn-success' to="/learn/courses">
        Course
      </Link>
         {" "}
      <Link className='btn btn-primary' to="/learn/bundles">
        Bundle
      </Link>

      <Outlet />

    </div>
  )
}

function Course(){
  const courseList =['React','Angular','Vue'];
  const randomCourseName = courseList[Math.floor(Math.random() * courseList.length)];
  return(
    <div>
      Course List
      <h4>Course Card</h4>

      <p>More Tests</p>

      <NavLink 
        style={({isActive})=>{
          return{
            backgroundColor : isActive ? 'pink' : 'yellow'
          }
        }}
        to={`/learn/courses/${randomCourseName}`}>
          {randomCourseName}
      </NavLink>

      <NavLink className="btn btn-light" to="/learn/courses/tests">
        tests
      </NavLink>

      <Outlet />
    </div>
  )
}

function Bundle(){
  return(
    <div>
      Bundle List
      <h4>Bundle Card</h4>
    </div>
  )
}

function CourseId(){
  const navigate = useNavigate();
  const {courseid}= useParams();
  return(
    <div>
      <h1>URL Params is : {courseid}</h1>
      <button
        onClick={()=>{
          navigate("/dashboard", {state : courseid} );
        }}
         className='btn btn-warning'>
         Price
      </button>

      <Link to="/dashboard" state={"Python"} >
        Test Link
      </Link>
    </div>
  )
}

function Dashboard(){
  const location = useLocation();
  return(
    <div>
      <h2>Info that I got here is {location.state} </h2>
    </div>
  )
}


reportWebVitals();
