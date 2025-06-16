"use client"

import { create } from 'zustand';
import { Employee, Admin, Evenement, CompanyStats } from '@/types';

interface AppState {
  // Données
  employees: Employee[];
  admins: Admin[];
  events: Evenement[];
  companyStats: CompanyStats;
  
  // États UI
  isLoading: boolean;
  selectedEmployee: Employee | null;
  searchTerm: string;
  filterDepartment: string;
  
  // Actions pour les employés
  addEmployee: (employee: Omit<Employee, 'id'>) => void;
  updateEmployee: (id: string, data: Partial<Employee>) => void;
  deleteEmployee: (id: string) => void;
  setSelectedEmployee: (employee: Employee | null) => void;
  
  // Actions pour les admins
  addAdmin: (admin: Omit<Admin, 'id' | 'dateCreation'>) => void;
  deleteAdmin: (id: string) => void;
  
  // Actions pour les événements
  addEvent: (event: Omit<Evenement, 'id'>) => void;
  updateEvent: (id: string, data: Partial<Evenement>) => void;
  deleteEvent: (id: string) => void;
  
  // Actions de recherche/filtre
  setSearchTerm: (term: string) => void;
  setFilterDepartment: (department: string) => void;
  
  // Actions générales
  setLoading: (loading: boolean) => void;
  initializeData: () => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // État initial
  employees: [],
  admins: [],
  events: [],
  companyStats: {
    totalEmployees: 0,
    activeEmployees: 0,
    newThisMonth: 0,
    upcomingEvents: 0,
    growthRate: '+0%',
    departmentDistribution: []
  },
  isLoading: false,
  selectedEmployee: null,
  searchTerm: '',
  filterDepartment: '',

  // Actions employés
  addEmployee: (employeeData) => {
    console.log('Adding new employee:', employeeData);
    const newEmployee: Employee = {
      ...employeeData,
      id: Math.random().toString(36).substr(2, 9),
    };
    set((state) => ({
      employees: [...state.employees, newEmployee],
    }));
  },

  updateEmployee: (id, data) => {
    console.log('Updating employee:', id, data);
    set((state) => ({
      employees: state.employees.map(emp => 
        emp.id === id ? { ...emp, ...data } : emp
      ),
    }));
  },

  deleteEmployee: (id) => {
    console.log('Deleting employee:', id);
    set((state) => ({
      employees: state.employees.filter(emp => emp.id !== id),
    }));
  },

  setSelectedEmployee: (employee) => {
    console.log('Selected employee:', employee);
    set({ selectedEmployee: employee });
  },

  // Actions admins
  addAdmin: (adminData) => {
    console.log('Adding new admin:', adminData);
    const newAdmin: Admin = {
      ...adminData,
      id: Math.random().toString(36).substr(2, 9),
      dateCreation: new Date().toISOString(),
    };
    set((state) => ({
      admins: [...state.admins, newAdmin],
    }));
  },

  deleteAdmin: (id) => {
    console.log('Deleting admin:', id);
    set((state) => ({
      admins: state.admins.filter(admin => admin.id !== id),
    }));
  },

  // Actions événements
  addEvent: (eventData) => {
    console.log('Adding new event:', eventData);
    const newEvent: Evenement = {
      ...eventData,
      id: Math.random().toString(36).substr(2, 9),
    };
    set((state) => ({
      events: [...state.events, newEvent],
    }));
  },

  updateEvent: (id, data) => {
    console.log('Updating event:', id, data);
    set((state) => ({
      events: state.events.map(event => 
        event.id === id ? { ...event, ...data } : event
      ),
    }));
  },

  deleteEvent: (id) => {
    console.log('Deleting event:', id);
    set((state) => ({
      events: state.events.filter(event => event.id !== id),
    }));
  },

  // Actions recherche/filtre
  setSearchTerm: (term) => {
    console.log('Search term:', term);
    set({ searchTerm: term });
  },

  setFilterDepartment: (department) => {
    console.log('Filter department:', department);
    set({ filterDepartment: department });
  },

  // Actions générales
  setLoading: (loading) => set({ isLoading: loading }),

  initializeData: () => {
    console.log('Initializing app data...');
    
    // Données d'exemple pour les employés
    const sampleEmployees: Employee[] = [
      {
        id: '1',
        nom: 'Mboma',
        prenom: 'Jean',
        email: 'jean.mboma@entreprise.ga',
        telephone: '+241 01 23 45 67',
        poste: 'Développeur Senior',
        departement: 'IT',
        dateEmbauche: '2023-01-15',
        qrCode: 'EMP001_JEAN_MBOMA',
        statut: 'actif',
        performances: [
          { mois: 'Jan', score: 85, objectifs: 90, completions: 12 },
          { mois: 'Fév', score: 92, objectifs: 85, completions: 15 },
          { mois: 'Mar', score: 88, objectifs: 95, completions: 11 },
          { mois: 'Avr', score: 95, objectifs: 90, completions: 18 },
        ],
        horaires: [
          { jour: 'Lundi', heureDebut: '08:00', heureFin: '17:00', groupe: 1 },
          { jour: 'Mardi', heureDebut: '08:00', heureFin: '17:00', groupe: 1 },
          { jour: 'Mercredi', heureDebut: '08:00', heureFin: '17:00', groupe: 1 },
          { jour: 'Jeudi', heureDebut: '08:00', heureFin: '17:00', groupe: 1 },
          { jour: 'Vendredi', heureDebut: '08:00', heureFin: '17:00', groupe: 1 },
        ]
      },
      {
        id: '2',
        nom: 'Nze',
        prenom: 'Marie',
        email: 'marie.nze@entreprise.ga',
        telephone: '+241 01 23 45 68',
        poste: 'Chef de Projet',
        departement: 'Management',
        dateEmbauche: '2022-06-20',
        qrCode: 'EMP002_MARIE_NZE',
        statut: 'actif',
        performances: [
          { mois: 'Jan', score: 90, objectifs: 85, completions: 10 },
          { mois: 'Fév', score: 88, objectifs: 90, completions: 13 },
          { mois: 'Mar', score: 93, objectifs: 88, completions: 16 },
          { mois: 'Avr', score: 91, objectifs: 92, completions: 14 },
        ],
        horaires: [
          { jour: 'Lundi', heureDebut: '09:00', heureFin: '18:00', groupe: 2 },
          { jour: 'Mardi', heureDebut: '09:00', heureFin: '18:00', groupe: 2 },
          { jour: 'Mercredi', heureDebut: '09:00', heureFin: '18:00', groupe: 2 },
          { jour: 'Jeudi', heureDebut: '09:00', heureFin: '18:00', groupe: 2 },
          { jour: 'Vendredi', heureDebut: '09:00', heureFin: '18:00', groupe: 2 },
        ]
      }
    ];

    // Données d'exemple pour les admins
    const sampleAdmins: Admin[] = [
      {
        id: '1',
        nom: 'Admin',
        prenom: 'Principal',
        email: 'admin@entreprise.ga',
        role: 'super_admin',
        dateCreation: '2023-01-01',
        statut: 'actif'
      }
    ];

    // Calcul des statistiques
    const stats: CompanyStats = {
      totalEmployees: sampleEmployees.length,
      activeEmployees: sampleEmployees.filter(emp => emp.statut === 'actif').length,
      newThisMonth: 4,
      upcomingEvents: 6,
      growthRate: '+12%',
      departmentDistribution: [
        { name: 'IT', value: 45, color: '#2563EB' },
        { name: 'Management', value: 25, color: '#10B981' },
        { name: 'Marketing', value: 20, color: '#F59E0B' },
        { name: 'RH', value: 10, color: '#EF4444' },
      ]
    };

    set({
      employees: sampleEmployees,
      admins: sampleAdmins,
      companyStats: stats,
    });
  },
}));