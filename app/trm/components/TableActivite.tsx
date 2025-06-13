"use client"
import React from 'react';
import styled from 'styled-components';

const TableWrapper = styled.div`
  overflow-x: auto;
  background:rgb(255, 255, 255);
  height: 300px;
  padding: 20px;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.19);
`;

const StyledTable = styled.table`
  width: 100%;
  height: 100%;
  border-collapse: collapse;
  text-align: left;

  th, td {
    padding: 12px 15px;
  }

  thead {
    background-color: #f9fafb;
    border-bottom: 2px solid #e5e7eb;
  }

  th {
    font-size: 0.875rem;
    color: #6b7280;
    text-transform: uppercase;
    font-weight: 600; /* Plus épais pour les en-têtes */
  }

  tbody tr {
    border-bottom: 1px solid #f3f4f6;
  }
  
  tbody tr:last-child {
    border-bottom: none;
  }

  td {
    color:rgb(0, 0, 0);
    font-weight: 500; /* Ligne de texte légèrement plus épaisse */
  }
`;

interface Activity {
  date: string;
  checkIn: string;
  checkOut: string;
}

interface ActivityTableProps {
  activities: Activity[];
}

const ActivityTable = ({ activities }: ActivityTableProps) => {
  return (
    <TableWrapper>
      <StyledTable>
        <thead>
          <tr>
            <th>JOUR</th>
            <th>HEURES D&apos;ENTRÉES</th>
            <th>HEURES DE SORTIES</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity: Activity, index: number) => (
            <tr key={index}>
              <td>{activity.date}</td>
              <td>{activity.checkIn}</td>
              <td>{activity.checkOut}</td>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </TableWrapper>
  );
};

export default ActivityTable;
