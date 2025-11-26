import { describe, it, expect, beforeEach, vi } from 'vitest'
import { useAuth } from '../useAuth'
import type { LoginCredentials } from '../types'

// Mock storage - use vi.hoisted() to ensure these are created before vi.mock()
const { mockStorage, mockGetItem, mockSetItem, mockRemoveItem } = vi.hoisted(() => {
    const storage = new Map<string, string>()

    return {
        mockStorage: storage,
        mockGetItem: vi.fn((key: string) => storage.get(key) ?? null),
        mockSetItem: vi.fn((key: string, value: string) => storage.set(key, value)),
        mockRemoveItem: vi.fn((key: string) => storage.delete(key))
    }
})

vi.mock('../../storage', () => ({
    useStorage: () => ({
        getItem: mockGetItem,
        setItem: mockSetItem,
        removeItem: mockRemoveItem
    })
}))

describe('useAuth', () => {
    beforeEach(async () => {
        // Clear mock storage before each test
        mockStorage.clear()

        // Clear the user state by simulating a logout
        // This ensures tests start with a clean state
        const auth = useAuth()
        if (auth.user.value) {
            await auth.logout()
        }

        // Clear mock function call history AFTER cleanup
        // so the cleanup calls don't affect test assertions
        mockGetItem.mockClear()
        mockSetItem.mockClear()
        mockRemoveItem.mockClear()
    })

    describe('initialization', () => {
        it('should initialize with no user when localStorage is empty', () => {
            const auth = useAuth()
            expect(auth.user.value).toBeNull()
            expect(auth.isAuthenticated.value).toBe(false)
            expect(auth.isLoading.value).toBe(false)
        })

        it('should initialize with user from localStorage', async () => {
            const userData = { email: 'test@example.com', name: 'Test User' }
            mockStorage.set('xap-user', JSON.stringify(userData))

            // Need to re-import to trigger init with localStorage data
            vi.resetModules()
            const { useAuth: useAuthFresh } = await import('../useAuth')
            const auth = useAuthFresh()

            expect(auth.user.value).toEqual(userData)
            expect(auth.isAuthenticated.value).toBe(true)
        })

        it('should handle corrupted localStorage data gracefully', async () => {
            mockStorage.set('xap-user', 'invalid-json{')
            const consoleLogSpy = vi.spyOn(console, 'log')

            vi.resetModules()
            const { useAuth: useAuthFresh } = await import('../useAuth')
            const auth = useAuthFresh()

            expect(auth.user.value).toBeNull()
            expect(auth.isAuthenticated.value).toBe(false)
            expect(consoleLogSpy).toHaveBeenCalledWith('User data parse error')
            expect(mockStorage.get('xap-user')).toBeUndefined()

            consoleLogSpy.mockRestore()
        })

        it('should only initialize once even when called multiple times', () => {
            mockStorage.set('xap-user', JSON.stringify({ email: 'test@example.com', name: 'Test User' }))

            const auth1 = useAuth()
            const auth2 = useAuth()
            const auth3 = useAuth()

            // getItem should only be called once during first init
            expect(mockGetItem).toHaveBeenCalledTimes(1)
            expect(mockGetItem).toHaveBeenCalledWith('xap-user')
        })
    })

    describe('login', () => {
        it('should login successfully with correct credentials', async () => {
            const auth = useAuth()
            const credentials: LoginCredentials = {
                email: 'test@test.local',
                password: 'test'
            }

            expect(auth.isLoading.value).toBe(false)

            const loginPromise = auth.login(credentials)

            // Should be loading during login
            expect(auth.isLoading.value).toBe(true)

            const result = await loginPromise

            expect(result.success).toBe(true)
            expect(result.user).toEqual({
                email: 'test@test.local',
                name: 'Testonga'
            })
            expect(auth.user.value).toEqual({
                email: 'test@test.local',
                name: 'Testonga'
            })
            expect(auth.isAuthenticated.value).toBe(true)
            expect(auth.isLoading.value).toBe(false)

            // Should persist to storage
            const stored = mockStorage.get('xap-user')
            expect(stored).toBeTruthy()
            expect(JSON.parse(stored!)).toEqual({
                email: 'test@test.local',
                name: 'Testonga'
            })
        })

        it('should fail login with incorrect credentials', async () => {
            const auth = useAuth()
            const credentials: LoginCredentials = {
                email: 'wrong@example.com',
                password: 'wrongpassword'
            }

            const result = await auth.login(credentials)

            expect(result.success).toBe(false)
            expect(result.message).toBe('Invalid email or password')
            expect(auth.user.value).toBeNull()
            expect(auth.isAuthenticated.value).toBe(false)
            expect(auth.isLoading.value).toBe(false)
            expect(mockStorage.get('xap-user')).toBeUndefined()
        })

        it('should set isLoading to false even if login throws error', async () => {
            const auth = useAuth()

            // Mock setTimeout to throw error
            const originalSetTimeout = global.setTimeout
            global.setTimeout = vi.fn(() => {
                throw new Error('Network error')
            }) as any

            const credentials: LoginCredentials = {
                email: 'test@test.local',
                password: 'test'
            }

            const result = await auth.login(credentials)

            expect(result.success).toBe(false)
            expect(result.message).toBe('Login failed. Please try again later')
            expect(auth.isLoading.value).toBe(false)
            expect(auth.user.value).toBeNull()

            // Restore setTimeout
            global.setTimeout = originalSetTimeout
        })
    })

    describe('logout', () => {
        it('should logout successfully', async () => {
            // First login
            const auth = useAuth()
            await auth.login({
                email: 'test@test.local',
                password: 'test'
            })

            expect(auth.isAuthenticated.value).toBe(true)
            expect(auth.user.value).not.toBeNull()

            // Then logout
            const result = await auth.logout()

            expect(result.success).toBe(true)
            expect(result.message).toBe('logout successful')
            expect(auth.user.value).toBeNull()
            expect(auth.isAuthenticated.value).toBe(false)
            expect(auth.isLoading.value).toBe(false)
            expect(mockStorage.get('xap-user')).toBeUndefined()
        })

        it('should set isLoading during logout', async () => {
            const auth = useAuth()
            await auth.login({
                email: 'test@test.local',
                password: 'test'
            })

            const logoutPromise = auth.logout()

            // Should be loading during logout
            expect(auth.isLoading.value).toBe(true)

            await logoutPromise

            expect(auth.isLoading.value).toBe(false)
        })

        it('should handle logout errors and return error response', async () => {
            const auth = useAuth()
            await auth.login({
                email: 'test@test.local',
                password: 'test'
            })

            // Mock setTimeout to throw error
            const originalSetTimeout = global.setTimeout
            global.setTimeout = vi.fn(() => {
                throw new Error('Network error')
            }) as any

            const result = await auth.logout()

            expect(result.success).toBe(false)
            expect(result.message).toContain('Error on logout')
            expect(auth.isLoading.value).toBe(false)

            // Restore setTimeout
            global.setTimeout = originalSetTimeout
        })
    })

    describe('reactivity', () => {
        it('should have reactive user state', async () => {
            const auth = useAuth()

            expect(auth.user.value).toBeNull()

            await auth.login({
                email: 'test@test.local',
                password: 'test'
            })

            expect(auth.user.value).not.toBeNull()
            expect(auth.user.value?.email).toBe('test@test.local')
        })

        it('should have reactive isAuthenticated state', async () => {
            const auth = useAuth()

            expect(auth.isAuthenticated.value).toBe(false)

            await auth.login({
                email: 'test@test.local',
                password: 'test'
            })

            expect(auth.isAuthenticated.value).toBe(true)

            await auth.logout()

            expect(auth.isAuthenticated.value).toBe(false)
        })

        it('should have reactive isLoading state', async () => {
            const auth = useAuth()

            expect(auth.isLoading.value).toBe(false)

            const loginPromise = auth.login({
                email: 'test@test.local',
                password: 'test'
            })

            expect(auth.isLoading.value).toBe(true)

            await loginPromise

            expect(auth.isLoading.value).toBe(false)
        })
    })

    describe('state persistence', () => {
        it('should clear storage on failed login', async () => {
            // Set some initial user data
            mockStorage.set('xap-user', JSON.stringify({ email: 'old@test.com', name: 'Old User' }))

            const auth = useAuth()
            await auth.login({
                email: 'wrong@test.com',
                password: 'wrong'
            })

            expect(mockStorage.get('xap-user')).toBeUndefined()
        })

        it('should update storage on successful login', async () => {
            const auth = useAuth()

            await auth.login({
                email: 'test@test.local',
                password: 'test'
            })

            const stored = mockStorage.get('xap-user')
            expect(stored).toBeTruthy()

            const parsed = JSON.parse(stored!)
            expect(parsed.email).toBe('test@test.local')
            expect(parsed.name).toBe('Testonga')
        })
    })
})
