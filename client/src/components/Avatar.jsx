import React from "react";
import styled from "styled-components";

const AvatarImage = styled.img`
  width: ${(props) => props.size || '50px'};
  height: ${(props) => props.size || '50px'};
  border-radius: 50%;
  object-fit: cover;
`;

export function Avatar({ player, size }) {
  const avatarUrl = `https://api.dicebear.com/8.x/pixel-art/svg?seed=${player}`;

  return (
    <AvatarImage
      src={avatarUrl}
      alt="Avatar"
      size={size}
    />
  );
}