import React from 'react';
import { useMediaRecorder } from 'react-media-recorder';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const RecorderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  margin-top: 10px;
`;

const RecorderButton = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  background-color: ${props => (props.disabled ? '#ccc' : '#007bff')};
  color: white;
  cursor: ${props => (props.disabled ? 'not-allowed' : 'pointer')};
  font-size: 1em;
  &:hover {
    background-color: ${props => (props.disabled ? '#ccc' : '#0056b3')};
  }
`;

const VoiceRecorder = ({ onStop }) => {
    const { status, startRecording, stopRecording, mediaBlobUrl } = useMediaRecorder({
        audio: true,
        onStop: (blobUrl, blob) => {
            const file = new File([blob], 'audio.webm', { type: 'audio/webm' });
            onStop(file);
        }
    });

    return (
        <RecorderContainer>
            <RecorderButton onClick={startRecording} disabled={status === 'recording'}>
                Start Recording
            </RecorderButton>
            <RecorderButton onClick={stopRecording} disabled={status !== 'recording'}>
                Stop Recording
            </RecorderButton>
            {mediaBlobUrl && <audio src={mediaBlobUrl} controls />}
        </RecorderContainer>
    );
};

VoiceRecorder.propTypes = {
    onStop: PropTypes.func.isRequired,
};

export default VoiceRecorder;
