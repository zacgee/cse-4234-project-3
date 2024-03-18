import React, {useEffect, useState} from 'react';
import './App.css';
import members from './images';
import './Team.css';

const TeamMember = ({ name, src, email,  bio }) => {
    const [showName, setShowName] = useState(false);
    const [showBio, setShowBio] = useState(false);
    const [showEmail, setShowEmail] = useState(false);

    return (
        <div
            className="team-member"
            onMouseEnter={() => (setShowName,setShowEmail,setShowBio(true))}
            onMouseLeave={() => (setShowName,setShowEmail,setShowBio(false))}
        >
            <img src={src} alt={name}/>
            {showName && <div className="name">{name}</div>}
            {showEmail && <div className="email">{email}</div>}
            {showBio && <div className="bio">{bio}</div>}
        </div>
    );
};

function Teams () {

    return (
        <div className="team">
        <h3 style={{textAlign: "center"}}>The Team</h3>
            {members.map((member, index) => (
                <TeamMember
                    key={index}
                    name={member.name}
                    email={member.email}
                    bio={member.bio}
                    src={member.src}
                />
            ))}
        </div>
    );
}
export default Teams;
