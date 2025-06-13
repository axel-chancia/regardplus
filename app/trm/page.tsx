"use client"
import UserProfile from './components/UserProfile';
import PresenceChart from './components/PresenceChart';

import ActivityTable from './components/TableActivite'; // Renommé de TableActivite pour correspondre au nom exporté

export default function Page() {
  // Données de mock pour la démonstration
  const user = {
    avatar: '/user.png', // Remplacez par votre image d'avatar
    role: 'User Role',
    name: 'Your Name',
    email: 'yourname@gmail.com',
    mobile: '+241 66 78 44 45',
    residence: 'Akanda',
  };

  const chartData = [
    { day: 'Monday', absences: 12, presences: 15 },
    { day: 'Tuesday', absences: 18, presences: 11 },
    { day: 'Wednesday', absences: 6, presences: 22 },
    { day: 'Thursday', absences: 16, presences: 6 },
    { day: 'Friday', absences: 12, presences: 11 },
    { day: 'Saturday', absences: 17, presences: 13 },
    { day: 'Sunday', absences: 21, presences: 11 },
  ];

  const activities = [
    { date: 'Lundi', checkIn: '9h05', checkOut: '19h05' },
    { date: 'Mardi', checkIn: '8h24', checkOut: '18h24' },
    { date: 'Mercredi', checkIn: '9h33', checkOut: '19h33' },
    { date: 'Jeudi', checkIn: '10h00', checkOut: '18h00' },
    { date: 'Vendredi', checkIn: '7h55', checkOut: '17h55' },
    { date: 'Samedi', checkIn: '10h05', checkOut: '17h05' },
    { date: 'Dimanche', checkIn: '10h33', checkOut: '18h33' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">User Infos</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
        <UserProfile user={user} />
        <PresenceChart chartData={chartData} />
      </div>

      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 mt-12">List of track table</h2>
      <ActivityTable activities={activities} />
    </div>
  );
}