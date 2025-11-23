export interface IPayload {
  name: string;
  email: string;
  message: string;
  role: "frontend" | "backend" | "fullstack";
  experienceYears: number;
  experienceLevel: "junior" | "mid" | "senior" | "lead";
  salary: number;
}
