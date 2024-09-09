import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@src/components/Header';
import Footer from '@src/components/Footer';
import Copyright from '@src/components/Copyright';
import { removeToken } from '@src/utils/localStorage';
import { StyledBox, StyledTypography, StyledButton } from './index.style';

const Home = () => {
  const navigate = useNavigate();

  const handleLogout = () => removeToken();

  const handleClickToVoice = () => navigate('/voice-cloning');

  return (
    <div>
      <Header onLogout={handleLogout} />
      <StyledBox>
        <StyledBox className="title">
          <StyledTypography variant="h1" className="title">
            Welcome to Voice Cloning
          </StyledTypography>
          <StyledTypography variant="body1" className="describe">
            Your advanced solution for creating and managing voice clones with
            ease.
          </StyledTypography>
        </StyledBox>
        <StyledBox className="content">
          <StyledTypography variant="h2" className="content">
            What is Voice Cloning?
          </StyledTypography>
          <StyledTypography variant="body1" className="describe">
            Voice cloning is a technology that allows you to replicate a persons
            voice based on a sample. Our state-of-the-art platform lets you
            create accurate and customizable voice clones for a variety of
            applications.
          </StyledTypography>
          <StyledTypography variant="h2" className="content">
            Features:
          </StyledTypography>
          <StyledTypography variant="body1" className="describe">
            <ul>
              <li>High-quality voice synthesis</li>
              <li>Customizable voice characteristics</li>
              <li>Easy integration with various applications</li>
            </ul>
          </StyledTypography>
          <StyledButton onClick={handleClickToVoice} className="customButton">
            Get Started
          </StyledButton>
        </StyledBox>
      </StyledBox>
      <Footer />
      <Copyright />
    </div>
  );
};

export default Home;
