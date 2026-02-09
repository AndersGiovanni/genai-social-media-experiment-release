import styled, { keyframes } from 'styled-components';

export const Post = styled.div`
  margin-bottom: 40px;
  padding: 20px;
  border: 1px solid #e1e8ed;
  border-radius: 5px;
  background-color: #f8f9fa;
  width: 100%;
  max-width: 800px;
  box-sizing: border-box; // Ensures padding and border are included in the width
`;

export const PostContent = styled.div`
  padding: 10px;
  border-bottom: 2px solid #e1e8ed;
`;

export const PostText = styled.div`
  margin-left: 10px;
`;

export const PostActions = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 10px;
`;

export const Button = styled.button`
  background-color: #1da1f2;
  color: #ffffff;
  border: none;
  padding: 8px 16px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0d95e8;
  }

  &:disabled {
    background-color: #a0d1f2;
    cursor: not-allowed;
  }
`;

export const CommentsSection = styled.div`
  padding: 10px;
`;

export const CommentInput = styled.input`
  width: 100%;
  padding: 2px;
  margin-bottom: 10px;
  border: 1px solid #e1e8ed;
  border-radius: 5px;
`;

export const CommentsList = styled.div`
  margin-top: 10px;
`;

export const Comment = styled.div`
  margin-left: 10px;
  margin-bottom: 10px;
  padding: 10px;
  border-bottom: 2px solid #e1e8ed;
`;

export const CommentText = styled.div`
  align-items: center;
  margin-left: 5;
`;

export const AvatarWrapper = styled.div`
  padding-right: 3px; 
`;

export const CommentActions = styled.div`
  display: flex;
  justify-content: space-around;
  padding: 5px 0;
`;

export const SmallButton = styled.button`
  background-color: #1da1f2;
  color: #ffffff;
  border: none;
  padding: 5px 10px;
  font-size: 12px;
  border-radius: 4px;
  cursor: pointer;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #0d95e8;
  }

  &:disabled {
    background-color: #a0d1f2;
    cursor: not-allowed;
  }
`;

export const StatText = styled.span`
  font-size: 12px;
  padding-left: 5px;
`;

export const ButtonAlignment = styled.div` 
  display: flex;
  align-items: center;
`;

export const Reply = styled(Comment)`
  margin-bottom: 5px;
  padding: 10px;
  border-bottom: 1px solid #e1e8ed;
`;

export const ReplyInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-top: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;


export const ReplyText = styled(CommentText)`
  margin-left: 20px;
`;

export const ImagePreviewContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`;

export const ImageWrapper = styled.div`
  flex: 1 1 calc(33.333% - 10px);
  max-width: calc(33.333% - 10px);
  box-sizing: border-box;
  cursor: pointer;
`;

export const Modal = styled.div`
  display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalContent = styled.div`
  position: relative;
  background-color: #fff;
  border-radius: 10px;
  max-width: 90%;
  max-height: 90%;
  overflow: auto;
`;

const spin = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: rgba(255, 255, 255, 0.7); // Semi-transparent white background
  border: none;
  border-radius: 50%; // Circular shape
  font-size: 20px; // Slightly larger font size
  padding: 5px; // Padding remains the same
  color: black; // Black text color for contrast
  cursor: pointer;
  z-index: 10; // Ensure it's in front
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px; // Slightly larger width for circle
  height: 35px; // Slightly larger height for circle

  &:hover {
    animation: ${spin} 0.5s linear;
  }
`;