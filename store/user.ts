import { defineStore } from 'pinia'

interface Venue {
  addressCompleted: boolean
  applicationStatus: string
  businessInfoCompleted: boolean
  dateCreated: string
  email: string
  mobileNumber: string
  photos: string[]
  photosCompleted: boolean
  profileCompleted: boolean
  profileCompletedAt: string
  rating: number
  subCategoryDisplayName:
    | 'Wedding Venue'
    | 'Private Villa'
    | 'Boat'
    | 'Restaurant'
    | ''
  subCategoryUuid: string
  tradeName: string
  uuid: string
}
interface User {
  dateCreated: string
  dateLastLogin: string
  mobileNumber: string
  state: string
  name: string
  email: string
  userType: string
  username: string
  uuid: string
  venue: Venue
}

interface dynamicData {
  businessInfoCompleted?: boolean | string | number
  addressCompleted?: boolean | string | number
  photosCompleted?: boolean | string | number
  profileCompleted?: boolean | string | number
  profileCompletedAt?: string | boolean | number
}

interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export const useUserStore = defineStore('user', {
  // State contains user info and tokens
  state: () => ({
    isAuthenticated: false,
    user: {
      dateCreated: '',
      dateLastLogin: '',
      mobileNumber: '',
      state: '',
      name: '',
      email: '',
      userType: '',
      username: '',
      uuid: '',
      venue: {
        addressCompleted: false,
        applicationStatus: '',
        businessInfoCompleted: false,
        dateCreated: '',
        email: '',
        mobileNumber: '',
        photos: [],
        photosCompleted: false,
        profileCompleted: false,
        rating: 0,
        subCategoryDisplayName: '',
        subCategoryUuid: '',
        tradeName: '',
        uuid: '',
        profileCompletedAt: ''
      }
    } as User,
    tokens: {
      accessToken: '',
      refreshToken: ''
    } as AuthTokens
  }),

  // Actions for updating user data and tokens
  actions: {
    // Set user information (name, email)
    setUser(userData: User) {
      Object.assign(this.user, userData)
      localStorage.setItem('user', JSON.stringify(userData))
    },

    // Update user Data information photosCompleted, profileCompleted, profileCompletedAt
    UpdateUserData(dynamicData: dynamicData) {
      Object.assign(this.user, { ...this.user, ...dynamicData })
      localStorage.setItem('user', JSON.stringify(this.user))
    },

    // Set tokens
    setTokens(tokens: AuthTokens) {
      this.isAuthenticated = true
      this.tokens.accessToken = tokens.accessToken
      this.tokens.refreshToken = tokens.refreshToken

      // Optionally save tokens in localStorage for persistence
      localStorage.setItem('accessToken', tokens.accessToken)
      localStorage.setItem('refreshToken', tokens.refreshToken)
      localStorage.setItem('isAuthenticated', this.isAuthenticated.toString())
    },

    // Clear user data and tokens (for logout)
    clearUser() {
      this.user = {
        dateCreated: '',
        dateLastLogin: '',
        mobileNumber: '',
        state: '',
        name: '',
        email: '',
        userType: '',
        username: '',
        uuid: '',
        venue: {
          addressCompleted: false,
          applicationStatus: '',
          businessInfoCompleted: false,
          dateCreated: '',
          email: '',
          mobileNumber: '',
          photos: [],
          photosCompleted: false,
          profileCompleted: false,
          rating: 0,
          subCategoryDisplayName: '',
          subCategoryUuid: '',
          tradeName: '',
          uuid: '',
          profileCompletedAt: ''
        }
      }
      this.tokens = { accessToken: '', refreshToken: '' }
      this.isAuthenticated = false

      // Remove tokens from localStorage
      localStorage.removeItem('user')
      localStorage.removeItem('accessToken')
      localStorage.removeItem('refreshToken')
      localStorage.removeItem('isAuthenticated')
    },

    // Optionally load tokens from localStorage when app initializes
    loadTokensFromLocalStorage() {
      const storedUser = localStorage.getItem('user')
      const accessToken = localStorage.getItem('accessToken')
      const refreshToken = localStorage.getItem('refreshToken')
      const isAuthenticated = localStorage.getItem('isAuthenticated')

      if (storedUser) {
        this.user = JSON.parse(storedUser)
      }
      if (accessToken && refreshToken) {
        this.tokens.accessToken = accessToken
        this.tokens.refreshToken = refreshToken
      }
      this.isAuthenticated = isAuthenticated === 'true'
    }
  }
})
