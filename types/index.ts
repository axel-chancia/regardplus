export interface Employee {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  telephone: string;
  poste: string;
  departement: string;
  dateEmbauche: string;
  qrCode: string;
  statut: 'actif' | 'inactif' | 'conge';
  photo?: string;
  performances: {
    mois: string;
    score: number;
    objectifs: number;
    completions: number;
  }[];
  horaires: {
    jour: string;
    heureDebut: string;
    heureFin: string;
    groupe: number;
  }[];
}

export interface Admin {
  id: string;
  nom: string;
  prenom: string;
  email: string;
  role: 'super_admin' | 'admin' | 'manager';
  dateCreation: string;
  statut: 'actif' | 'inactif';
}

export interface Evenement {
  id: string;
  titre: string;
  description: string;
  date: string;
  heureDebut: string;
  heureFin: string;
  type: 'reunion' | 'formation' | 'evenement' | 'conge';
  participants: string[]; // IDs des employés
  couleur: string;
}

export interface ScanResult {
  employeeId: string;
  scanTime: string;
  verificationStatus: 'success' | 'failed' | 'pending';
  location?: string;
}

export interface CompanyStats {
  totalEmployees: number;
  activeEmployees: number;
  newThisMonth: number;
  upcomingEvents: number;
  growthRate: string;
  departmentDistribution: {
    name: string;
    value: number;
    color: string;
  }[];
}