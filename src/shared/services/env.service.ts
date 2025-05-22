import { env } from './env';

class AppEnvironmentService {
  static get apiUrl(): string {
    return env.VITE_API_URL;
  }
}

export default AppEnvironmentService;
