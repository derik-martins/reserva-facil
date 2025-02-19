export interface User {
  id: string;
  email: string;
  name: string;
}

export interface Resource {
  id: string;
  name: string;
  type: 'room' | 'equipment';
  description: string;
  created_at: string;
}

export interface Reservation {
  id: string;
  user_id: string;
  resource_id: string;
  start_time: string;
  end_time: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  created_at: string;
  resource: Resource;
  user: User;
}