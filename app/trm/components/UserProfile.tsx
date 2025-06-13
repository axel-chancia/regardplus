"use client"
import React from 'react';
import styled from 'styled-components';

const Card = styled.div`
  background: #ffffff;
  padding: 30px;
  height: 350px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.21);
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const UserHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
`;

const Avatar = styled.img`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid #e0e0e0;
`;

const UserRoleText = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: #333;
`;

const InfoRow = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #f3f4f6;
  &:last-child {
    border-bottom: none;
  }
`;

const InfoLabel = styled.span`
  font-size: 1rem;
  color: #6b7280;
  font-weight: 500;
`;

const InfoValue = styled.span`
  font-size: 1rem;
  color: #374151;
  font-weight: 600;
  text-align: right;
`;

interface UserProfileProps {
  user: {
    avatar: string;
    role: string;
    name: string;
    email: string;
    mobile: string;
    residence: string;
  };
}

const UserProfile: React.FC<UserProfileProps> = ({ user }) => {
  return (
    <Card>
      <UserHeader>
        <Avatar src={user.avatar} alt="User Avatar" />
        <UserRoleText>{user.role}</UserRoleText>
      </UserHeader>

      <InfoRow>
        <InfoLabel>Name</InfoLabel>
        <InfoValue>{user.name}</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoLabel>Email</InfoLabel>
        <InfoValue>{user.email}</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoLabel>Mobile number</InfoLabel>
        <InfoValue>{user.mobile}</InfoValue>
      </InfoRow>
      <InfoRow>
        <InfoLabel>Residence</InfoLabel>
        <InfoValue>{user.residence}</InfoValue>
      </InfoRow>
    </Card>
  );
};

export default UserProfile;
