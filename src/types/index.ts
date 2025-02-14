import * as z from 'zod';

export interface User {
  id: string;
  name: string;
  role: 'admin' | 'staff' | 'patient';
  email: string;
  title?: string;
  department?: string;
  avatar?: string;
}

export const UserSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2),
  role: z.enum(['admin', 'staff', 'patient']),
  email: z.string().email(),
  title: z.string().optional(),
  department: z.string().optional(),
  avatar: z.string().url().optional()
});

export interface MenuItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  group?: string;
}

export const MenuItemSchema = z.object({
  id: z.string().uuid(),
  label: z.string().min(2),
  icon: z.string(),
  path: z.string(),
  group: z.string().optional()
});

export interface Appointment {
  id: string;
  patientName: string;
  date: string;
  time: string;
  type: string;
  status: 'confirmed' | 'pending' | 'cancelled';
  provider?: string;
}

export const AppointmentSchema = z.object({
  id: z.string().uuid(),
  patientName: z.string().min(2),
  date: z.string().date(),
  time: z.string(),
  type: z.string(),
  status: z.enum(['confirmed', 'pending', 'cancelled']),
  provider: z.string().optional()
});

export interface Treatment {
  id: string;
  type: string;
  tooth?: string;
  priority: 'high' | 'medium' | 'low';
  estimatedCost: number;
  insuranceCoverage: number;
  recommendedDate: string;
  status: string;
}

export const TreatmentSchema = z.object({
  id: z.string().uuid(),
  type: z.string(),
  tooth: z.string().optional(),
  priority: z.enum(['high', 'medium', 'low']),
  estimatedCost: z.number().positive(),
  insuranceCoverage: z.number().positive(),
  recommendedDate: z.string().date(),
  status: z.string()
});

export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  dob: string;
  nextAppointment?: string;
  insurance?: string;
  status: 'active' | 'inactive';
}

export const FamilyMemberSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2),
  relation: z.string(),
  dob: z.string().date(),
  nextAppointment: z.string().date().optional(),
  insurance: z.string().optional(),
  status: z.enum(['active', 'inactive'])
});

export interface Document {
  id: string;
  name: string;
  type: string;
  date: string;
  status: string;
  category: string;
}

export const DocumentSchema = z.object({
  id: z.string().uuid(),
  name: z.string().min(2),
  type: z.string(),
  date: z.string().date(),
  status: z.string(),
  category: z.string()
});
