import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import listPlugin from "@fullcalendar/list";
import { Box, List, ListItem, ListItemText, Typography, useTheme } from "@mui/material";
import moment from "moment";
import axios from 'axios';

const Calendar = () => {
  const name = localStorage.userName;
  console.log(localStorage)
  const [userInfo, setUserInfo] = useState([]);
  const [userId, setUserId] = useState(null);
  const theme = useTheme();
  const [currentEvents, setCurrentEvents] = useState([]);

  useEffect(() => {
    // Fetch events from the backend API
   
    getUserInfo();
    // fetchEvents(userId);
  }, []);

  const getUserInfo = () => {
    axios.get(`https://localhost:7213/api/Account/users/${name}`)
      .then(response => {
        // Handle the successful response
        setUserInfo(response.data);
        setUserId(response.data.id);
      fetchEvents(response.data.id);

      })
      .catch(error => {
        // Handle the error
        console.error(error);
      });
  }

  const fetchEvents = (userId) => {
    
    axios.get(`https://localhost:7120/api/EventAPI/user/${userId}`)
      .then(response => {
        setCurrentEvents(response.data);
      })
      .catch(error => {
        console.error("Failed to fetch events:", error);
      });
  };

  const handleDateClick = (selected) => {
    const title = prompt("Please enter a new title for your event");
    const startTime = prompt("Please enter the start time for your event (HH:mm)");
  
    if (title && startTime) {
      const startDate = moment(selected.start).format("YYYY-MM-DD") + "T" + startTime + ":00";
      //const endDateTime = moment(selected.date).format("YYYY-MM-DD") + "T" + startTime + ":59";
  
      createEvent(title, startDate,false);
    }
  };
  
  const createEvent = (title, start, end, allDay) => {
    const startDateTime = moment(start).toISOString();
   // const endDateTime = moment(end).toISOString();
  
    axios
      .post("https://localhost:7120/api/EventAPI", {
        title,
        start: startDateTime,
        
        allDay,
        userId,
      })
      .then(response => {
        setCurrentEvents([...currentEvents, response.data]);
      })
      .catch(error => {
        console.error("Failed to create an event:", error);
      });
  };
  

  const handleEventClick = (selected) => {
    if (window.confirm(`Are you sure you want to delete the event '${selected.event.title}'`)) {
      deleteEvent(selected.event.id);
    }
  };

  const deleteEvent = (eventId) => {
    axios.delete(`https://localhost:7120/api/EventAPI/${eventId}`)
      .then(response => {
        setCurrentEvents(currentEvents.filter((event) => event.id !== eventId));
      })
      .catch(error => {
        console.error("Failed to delete an event:", error);
      });
  };

  return (
    <div>
      <Box m="20px">
        <Box display="flex" justifyContent="space-between">
          <Box flex="1 1 20%" backgroundColor="primary" p="15px" borderRadius="4px">
            <Typography variant="h5">Events</Typography>
            <List>
              {currentEvents.map((event) => (
                <ListItem
                  key={event.id}
                  sx={{
                    backgroundColor: "red",
                    margin: "10px 0",
                    borderRadius: "2px",
                  }}
                >
                  <ListItemText
                    primary={event.title}
                    secondary={
                      <Typography>
                        {moment(event.start).format("MMM D, YYYY")}
                      </Typography>
                    }
                  />
                </ListItem>
              ))}
            </List>
          </Box>
          <Box flex="1 1 100%" ml="15px">
            <FullCalendar
              height="75vh"
              plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin]}
              headerToolbar={{
                left: "prev,next today",
                center: "title",
                right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
              }}
              initialView="dayGridMonth"
              editable={true}
              selectable={true}
              selectMirror={true}
              dayMaxEvents={true}
              select={handleDateClick}
              eventClick={handleEventClick}
              events={currentEvents.map((event) => ({
                id: event.id,
                title: event.title,
                start: event.start,
                end: event.end,
                allDay: event.allDay,
              }))}
            />
          </Box>
        </Box>
      </Box>
    </div>
  );
};

export default Calendar;
