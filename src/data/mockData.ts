import type { User } from '../types/user';
import type { Reference } from '../types/reference';

export const mockUsers = [
  {
    id: "999",
    email: "demo@example.com",
    name: "Demo User",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Demo",
    title: "Software Engineer",
    bio: "Demo user account showcasing the platform features",
    linkedin: "https://linkedin.com/in/demo-user",
    skills: [
      { name: "JavaScript", type: "hard" },
      { name: "React", type: "hard" },
      { name: "TypeScript", type: "hard" },
      { name: "Leadership", type: "soft" },
      { name: "Communication", type: "soft" }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: "888",
    email: "jane@example.com",
    name: "Jane Smith",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
    title: "Product Manager",
    bio: "Experienced product manager focused on user-centric solutions",
    linkedin: "https://linkedin.com/in/janesmith",
    skills: [
      { name: "Product Strategy", type: "hard" },
      { name: "Agile", type: "hard" },
      { name: "Leadership", type: "soft" }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
] as User[];

export const mockReferences: Reference[] = [
  {
    id: "rec1",
    status: "approved",
    author: {
      id: "888",
      name: "Jane Smith",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Jane",
      title: "Product Manager",
      linkedin: "https://linkedin.com/in/janesmith"
    },
    recipient: {
      id: "999",
      name: "Demo User"
    },
    relationship: {
      type: "manager",
      company: "TechCorp",
      duration: "2-5"
    },
    endorsement: "Demo is an exceptional software engineer who consistently delivers outstanding results. Their technical expertise in React and TypeScript has been invaluable to our team.",
    rating: 5,
    skills: [
      { name: "JavaScript", type: "hard" },
      { name: "React", type: "hard" },
      { name: "Leadership", type: "soft" }
    ],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Mock data store
class MockDataStore {
  private users: Map<string, User>;
  private references: Map<string, Reference>;

  constructor() {
    this.users = new Map(mockUsers.map(user => [user.id, user]));
    this.references = new Map(mockReferences.map(ref => [ref.id, ref]));
  }

  getUser(id: string): User | null {
    return this.users.get(id) || null;
  }

  getReferences(userId: string): Reference[] {
    return Array.from(this.references.values())
      .filter(ref => ref.recipient.id === userId);
  }

  updateUser(id: string, updates: Partial<User>): void {
    const user = this.users.get(id);
    if (user) {
      this.users.set(id, {
        ...user,
        ...updates,
        updatedAt: new Date().toISOString()
      });
    }
  }

  updateReference(id: string, updates: Partial<Reference>): void {
    const reference = this.references.get(id);
    if (reference) {
      this.references.set(id, {
        ...reference,
        ...updates,
        updatedAt: new Date().toISOString()
      });
    }
  }
}

export const mockStore = new MockDataStore();