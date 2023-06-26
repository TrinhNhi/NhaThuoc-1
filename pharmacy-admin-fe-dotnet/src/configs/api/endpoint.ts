import { HEADERS } from './header';

export const API_URLS = {
  Users: {
    signup: () => ({
      endPoint: 'Users/signup',
      method: 'POST',
      headers: HEADERS.header()
    }),

    login: () => ({
      endPoint: `Users/login`,
      method: 'POST',
      headers: HEADERS.header()
    }),

    edit: (username: string) => ({
      endPoint: `Users/${username}/profile`,
      method: 'POST',
      headers: HEADERS.authHeader()
    }),

    get: (username: string) => ({
      endPoint: `Users/${username}/profile`,
      method: 'GET',
      headers: HEADERS.authHeader()
    }),

    getAll: () => ({
      endPoint: `Users`,
      method: 'GET',
      headers: HEADERS.authHeader()
    }),

    delete: (id: number) => ({
      endPoint: `Users/${id}`,
      method: 'DELETE',
      headers: HEADERS.authHeader()
    })
  },

  Drugs: {
    create: () => ({
      endPoint: `Drugs`,
      method: 'POST',
      headers: HEADERS.authHeader()
    }),

    getAll: () => ({
      endPoint: `Drugs/search`,
      method: 'POST',
      headers: HEADERS.authHeader()
    }),

    update: (id: number) => ({
      endPoint: `Drugs/${id}`,
      method: 'PUT',
      headers: HEADERS.authHeader()
    }),

    changeStatus: (id: number) => ({
      endPoint: `Drugs/${id}/actions`,
      method: 'PUT',
      headers: HEADERS.authHeader()
    })
  },

  Properties: {
    create: () => ({
      endPoint: `Properties`,
      method: 'POST',
      headers: HEADERS.authHeader()
    }),

    getAll: () => ({
      endPoint: `Properties`,
      method: 'GET',
      headers: HEADERS.authHeader()
    }),

    update: (id: number) => ({
      endPoint: `Properties/${id}`,
      method: 'PUT',
      headers: HEADERS.authHeader()
    })
  },

  Suppliers: {
    create: () => ({
      endPoint: `Suppliers`,
      method: 'POST',
      headers: HEADERS.authHeader()
    }),

    getAll: () => ({
      endPoint: `Suppliers`,
      method: 'GET',
      headers: HEADERS.authHeader()
    }),

    update: (id: number) => ({
      endPoint: `Suppliers/${id}`,
      method: 'PUT',
      headers: HEADERS.authHeader()
    }),

    changeStatus: (id: number) => ({
      endPoint: `Suppliers/${id}/actions`,
      method: 'PUT',
      headers: HEADERS.authHeader()
    })
  },

  Units: {
    create: () => ({
      endPoint: `Units`,
      method: 'POST',
      headers: HEADERS.authHeader()
    }),

    getAll: () => ({
      endPoint: `Units`,
      method: 'GET',
      headers: HEADERS.authHeader()
    }),

    update: (id: number) => ({
      endPoint: `Units/${id}`,
      method: 'PUT',
      headers: HEADERS.authHeader()
    })
  },

  Statistics: {
    get: () => ({
      endPoint: `Statistics`,
      method: 'GET',
      headers: HEADERS.authHeader()
    })
  },

  Order: {
    getAll: () => ({
      endPoint: 'Orders',
      method: 'GET',
      headers: HEADERS.authHeader()
    }),
    create: () => ({
      endPoint: `Orders`,
      method: 'POST',
      headers: HEADERS.header()
    }),
    pack: (id: number) => ({
      endPoint: `Orders/${id}/pack`,
      method: 'POST',
      headers: HEADERS.authHeader()
    })
  }
};
