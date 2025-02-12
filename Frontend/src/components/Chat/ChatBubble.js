import styled from 'styled-components';
import { GlassContainer } from '../GlassContainer';
import PropTypes from 'prop-types';

// src/components/Chat/ChatBubble.js
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const Bubble = styled.div`
  background: ${props => props.bgColor};
  backdrop-filter: blur(10px);
  border-radius: ${props => props.borderRadius};
  padding: 1rem;
  margin: 0.5rem;
  max-width: 70%;
  position: relative;
  animation: ${fadeIn} 0.3s ease-in-out;

  &::after {
    content: '';
    position: absolute;
    border: 10px solid transparent;
    ${props => props.isUser ? 'border-left-color: ' + props.bgColor : 'border-right-color: ' + props.bgColor};
    ${props => props.isUser ? 'right: -20px' : 'left: -20px'};
  }
`;
export default function ChatBubble({ message, isUser }) {
    return (
        <Bubble
            bgColor={isUser ? '#2196F3' : '#ffffff'}
            borderRadius={isUser ? '20px 20px 0 20px' : '20px 20px 20px 0'}
            isUser={isUser}
        >
            {message.content}
        </Bubble>
    );
}
const Bubble = styled(GlassContainer)`
  max-width: 70%;
  position: relative;
  border-radius: ${props => props.isUser ? '20px 20px 0 20px' : '20px 20px 20px 0'};
  margin: 10px 0;

  &::after {
    content: '';
    position: absolute;
    border: 10px solid transparent;
    ${props => props.isUser ? 'border-left-color: rgba(255, 255, 255, 0.15)' : 'border-right-color: rgba(255, 255, 255, 0.15)'};
    ${props => props.isUser ? 'right: -20px' : 'left: -20px'};
  }
`;

const MessageContent = ({ content, isVoiceMessage }) => {
    if (isVoiceMessage) {
        return <audio controls src={content} />;
    } else if (content.includes('giphy.com')) {
        return <iframe src={content} width="100%" height="200" frameBorder="0" className="giphy-embed" allowFullScreen></iframe>;
    } else if (content.match(/\.(jpeg|jpg|gif|png)$/)) {
        return <img src={content} alt="User sent content" style={{ maxWidth: '100%', borderRadius: '10px' }} />;
    } else {
        return <p>{content}</p>;
    }
};

const ChatBubble = ({ message, isUser }) => {
    return (
        <Bubble isUser={isUser}>
            <MessageContent content={message.content} isVoiceMessage={message.isVoiceMessage} />
        </Bubble>
    );
};

ChatBubble.propTypes = {
    message: PropTypes.shape({
        content: PropTypes.string.isRequired,
        isVoiceMessage: PropTypes.bool,
    }).isRequired,
    isUser: PropTypes.bool.isRequired,
};

export default ChatBubble;
