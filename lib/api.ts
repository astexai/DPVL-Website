class API {
  private baseUrl: string;
  private token: string | null;

  constructor() {
    this.baseUrl = '/api';
    this.token = null;
    
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('adminToken');
    }
  }

  private async request(endpoint: string, options: RequestInit = {}) {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string> || {}),
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch(`${this.baseUrl}${endpoint}`, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'API request failed');
    }

    return response.json();
  }

  // Auth methods
  async login(username: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
  }

  async verifyToken() {
    return this.request('/auth/verify', {
      method: 'GET',
    });
  }

  // Admin methods
  async getBanners() {
    return this.request('/admin/banners');
  }

  async uploadBanner(data: FormData) {
    // For file uploads, we need to handle FormData without Content-Type header
    const headers: Record<string, string> = {};
    
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const response = await fetch('/api/admin/banners', {
      method: 'POST',
      headers,
      body: data,
    });
    
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || 'Upload failed');
    }
    
    return response.json();
  }

  // Set token manually (for login)
  setToken(token: string) {
    this.token = token;
  }

  // Clear token (for logout)
  clearToken() {
    this.token = null;
  }
}

export const api = new API();