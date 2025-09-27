'use client'

import type { Dispatch, SetStateAction } from 'react'
import { useCallback, useState } from 'react'

export function resolveSetState<T>(action: SetStateAction<T>, prev: T): T {
    return typeof action === 'function' ? (action as (prev: T) => T)(prev) : action
}

class StorageService {
    constructor(private storage: Storage) {
    }

    public get<T>(key: string): T | null {
        const value = this.storage.getItem(key)
        if (value === null) {
            return null
        }
        return JSON.parse(value)
    }

    public set<T>(key: string, value: T) {
        this.storage.setItem(key, JSON.stringify(value))
    }

    public delete(key: string) {
        this.storage.removeItem(key)
    }

    public deleteAll() {
        this.storage.clear()
    }
}

export class LocalStorageService extends StorageService {
    constructor() {
        super(window.localStorage)
    }
}

type SetValue<T> = Dispatch<SetStateAction<T>>
export const useLocalStorage = <T>(key: string, initValue: T): [T, SetValue<T>] => {
    const get = useCallback((): T => {
        if (typeof window === 'undefined') {
            return initValue
        }
        const storageService = new LocalStorageService()
        const value = storageService.get<T>(key)
        return value || initValue
    }, [initValue, key])

    const [storedValue, setStoredValue] = useState<T>(get)

    const setValue: SetValue<T> = useCallback(action => {
        const newValue = resolveSetState(action, storedValue)
        const storageService = new LocalStorageService()
        storageService.set(key, newValue)

        setStoredValue(newValue)
    }, [storedValue, setStoredValue, key])

    return [storedValue, setValue]
}