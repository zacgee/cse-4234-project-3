import React, { useState } from 'react';
import images from './images'; // Import the images array from Images.js
import './Team.css'; // Import CSS for Team component

const TeamMember = ({ name, src, email, bio }) => {
    const [showInfo, setShowInfo] = useState(false);
  
    return (
      <div
        className="team-member"
        onMouseEnter={() => setShowInfo(true)}
        onMouseLeave={() => setShowInfo(false)}
      >
        <div className="image-container">
          {showInfo ? null : <img src={src} alt={name} />}
        </div>
        <div className="name-container">
          {showInfo ? <div className="name">{name}</div> : null}
        </div>
        {showInfo && (
          <div className="member-info">
            <div className="email">{email}</div>
            <div className="bio">{bio}</div>
          </div>
        )}
      </div>
    );
  };
  
function Team() {
    console.log(images)
  return (
    <div className="team">
      <h3>The Team</h3>
      <div className="team-members">
        {images.slice(0, 3).map((member, index) => ( // Render the first 3 team members
          <TeamMember
            key={index}
            name={member.name}
            email={member.email}
            bio={member.bio}
            src={member.src}
          />
        ))}
      </div>
      <div className="team-members">
        {images.slice(3, 5).map((member, index) => ( // Render the next 2 team members
          <TeamMember
            key={index}
            name={member.name}
            email={member.email}
            bio={member.bio}
            src={member.src}
          />
        ))}
      </div>
    </div>
  );
}

export default Team;
