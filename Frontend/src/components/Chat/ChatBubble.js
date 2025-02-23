// src/components/Chat/ChatBubble.js
import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { GlassContainer } from '../GlassContainer';
import { ReactMediaRecorder } from 'react-media-recorder';

// Keyframe animation for fade-in effect
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// Styled Bubble component
const Bubble = styled(GlassContainer)`
  max-width: 70%;
  position: relative;
  border-radius: ${props => props.isUser ? '20px 20px 0 20px' : '20px 20px 20px 0'};
  margin: 10px 0;
  animation: ${fadeIn} 0.3s ease-in-out;

  &::after {
    content: '';
    position: absolute;
    border: 10px solid transparent;
    ${props => props.isUser ? 'border-left-color: rgba(255, 255, 255, 0.15)' : 'border-right-color: rgba(255, 255, 255, 0.15)'};
    ${props => props.isUser ? 'right: -20px' : 'left: -20px'};
  }
`;

// Component to render different types of message content
const MessageContent = ({ content, isVoiceMessage }) => {
  if (isVoiceMessage) {
    return <audio controls src={content} />;
  } else if (content.includes('giphy.com')) {
    return <iframe src={content} width="100%" height="200" frameBorder="0" title="Giphy Embed" className="giphy-embed" allowFullScreen></iframe>;
  } else if (content.match(/\.(jpeg|jpg|gif|png)$/)) {
    return <img src={content} alt="User sent content" style={{ maxWidth: '100%', borderRadius: '10px' }} />;
  } else {
    return <p>{content}</p>;
  }
};

MessageContent.propTypes = {
  content: PropTypes.string.isRequired,
  isVoiceMessage: PropTypes.bool,
};

// Main ChatBubble component
const ChatBubble = ({ message, isUser }) => {
  return (
    <Bubble isUser={isUser}>
      <MessageContent content={message.content} isVoiceMessage={message.isVoiceMessage} />
    </Bubble>
  );
};

const ChatBubble = ({ message, isUser }) => {
  const [showReactions, setShowReactions] = useState(false);
  const socket = useSocket();

  const handleReaction = (reaction) => {
    socket.emit('addReaction', { messageId: message._id, reaction });
    setShowReactions(false);
  };

  return (
    <div>
      <div>{message.content}</div>
      <ReactionsContainer>
        {Object.entries(message.reactions || {}).map(([reaction, count]) => (
          <div key={reaction}>
            {reaction} {count}
          </div>
        ))}
      </ReactionsContainer>
      <ReactionButton onClick={() => setShowReactions(!showReactions)}>
        😀
      </ReactionButton>
      {showReactions && (
        <div>
          {['👍', '👎', '❤️', '😂', '😮', '😢'].map((reaction) => (
            <ReactionButton key={reaction} onClick={() => handleReaction(reaction)}>
              {reaction}
            </ReactionButton>
          ))}
        </div>
      )}
    </div>
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
