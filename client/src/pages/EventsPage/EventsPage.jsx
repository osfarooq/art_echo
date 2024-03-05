import React, { useState } from "react";
import "./eventsPage.scss";

const EventsPage = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      name: "Charcoal Frenzy",
      start: "2023-05-10",
      end: "2023-05-15",
      status: "soon",
      medium: "Charcoal",
      participants: [],
    },
    {
      id: 2,
      name: "Pour your heart out, Literally!",
      start: "2023-05-01",
      end: "2023-05-31",
      status: "ongoing",
      medium: "Acrylics",
      participants: [
        {
          id: 1,
          name: "Participant 1",
          artwork:
            "https://images.unsplash.com/photo-1607893407846-49905270209e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          description: "This is my artwork description",
          votes: 5,
        },
        {
          id: 2,
          name: "Participant 2",
          artwork:
            "https://images.unsplash.com/photo-1597177331064-2990be8887fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
          description: "This is my artwork description",
          votes: 2,
        },
      ],
    },
  ]);

  const [showEnterEventModal, setShowEnterEventModal] = useState(false);
  const [showCreateEventModal, setShowCreateEventModal] = useState(false);
  const [newEventName, setNewEventName] = useState("");
  const [newEventMediums, setNewEventMediums] = useState("");
  const [newEventStart, setNewEventStart] = useState("");
  const [newEventParticipants, setNewEventParticipants] = useState("");

  const handleEnterEventClick = () => {
    setShowEnterEventModal(true);
  };

  const handleVoteClick = (participantId) => {
    const updatedEvents = events.map((event) => {
      if (event.status !== "ongoing") {
        return event;
      }
      const updatedParticipants = event.participants.map((participant) => {
        if (participant.id !== participantId) {
          return participant;
        }
        return {
          ...participant,
          votes: participant.votes + 1,
        };
      });
      return {
        ...event,
        participants: updatedParticipants,
      };
    });
    setEvents(updatedEvents);
  };

  const handleCreateEventSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      id: events.length + 1,
      name: newEventName,
      start: newEventStart,
      end: "",
      status: "soon",
      participants: [],
    };
    setEvents([newEvent, ...events]);
    setShowCreateEventModal(false);
  };

  const handleShowEnterEventSubmit = (e) => {
    e.preventDefault();
    const newParticipant = {
      id: events.length + 1,
      name: newEventName,
      start: newEventStart,
      end: "",
      status: "soon",
      participants: [],
    };
    setShowEnterEventModal(false);
  };

  const renderEventCard = (event) => {
    if (event.status === "soon") {
      return (
        <div key={event.id} className="event-card">
          <h2>{event.name}</h2>
          <p>Starts soon!</p>
          <button onClick={() => handleEnterEventClick(event.id)}>
            Enter Event
          </button>
        </div>
      );
    } else if (event.status === "ongoing") {
      return (
        <div key={event.id} className="event-card">
          <h2>{event.name}</h2>
          {event.participants.map((participant) => (
            <div key={participant.id} className="participant-card">
              <h3>{participant.name}</h3>
              <img src={participant.artwork} alt={participant.name} />
              <p>{participant.description}</p>
              <button onClick={() => handleVoteClick(participant.id)}>
                Vote
              </button>
              <p>Votes: {participant.votes}</p>
            </div>
          ))}
        </div>
      );
    }
  };

  return (
    <div className="events-page">
      <h1>Art Competition Events</h1>
      <span>
        "Competitions open to artists from around the world who are looking to
        showcase their talents and gain recognition in the art world. Lets get
        ready to create!"
      </span>
      <div className="buttonContainer">
        <button onClick={() => setShowCreateEventModal(true)}>
          Create Event
        </button>
      </div>
      {events.map((event) => renderEventCard(event))}
      {showCreateEventModal && (
        <div className="modal">
          <form onSubmit={handleCreateEventSubmit}>
            <label htmlFor="event-name">Event Name:</label>
            <input
              type="text"
              id="event-name"
              value={newEventName}
              onChange={(e) => setNewEventName(e.target.value)}
            />

            <label htmlFor="event-mediums">Mediums:</label>
            <input
              type="text"
              id="event-mediums"
              value={newEventMediums}
              onChange={(e) => setNewEventMediums(e.target.value)}
            />

            <label htmlFor="event-start">Start Date:</label>
            <input
              type="date"
              id="event-start"
              value={newEventStart}
              onChange={(e) => setNewEventStart(e.target.value)}
            />

            <label htmlFor="event-participants">Participants:</label>
            <input
              type="number"
              id="event-participants"
              min="1"
              max="100"
              value={newEventParticipants}
              onChange={(e) => setNewEventParticipants(e.target.value)}
            />

            <button type="submit">Create Event</button>
            <button onClick={() => setShowCreateEventModal(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}
      {showEnterEventModal && (
        <div className="modal">
          <form onSubmit={handleShowEnterEventSubmit}>
            <label htmlFor="participant-name">Name:</label>
            <input
              type="text"
              id="participant-name"
              onChange={(e) => e.target.value}
            />

            <label htmlFor="participant-art">Image Url:</label>
            <input
              type="text"
              id="participant-art"
              onChange={(e) => e.target.value}
            />

            <button type="submit">Enter Event</button>
            <button
              onClick={() => {
                setShowEnterEventModal(false);
                <span>Entered in Event!</span>;
              }}
            >
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default EventsPage;
