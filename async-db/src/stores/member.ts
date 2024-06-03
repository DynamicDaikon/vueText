import { defineStore } from 'pinia'
import type { Member } from '@/interfaces'

interface State {
  memberList: Map<number, Member>
  isLoading: boolean
}

let _database: IDBDatabase

async function getDataBase(): Promise<IDBDatabase> {
  const promise = new Promise<IDBDatabase>((resolve: reject): void => {
    if (_database != undefined) {
      resolve(_database)
    } else {
      const request = window.indexedDB.open('asyncdb', 1)
      request.onupgradeneeded = (event) => {
        const target = event.target as IDBRequest
        const _database = target.result as IDBDatabase
        _database.createObjectStore('members', { keyPath: 'id' })
      }

      // 成功時のコールバック関数
      request.onsuccess = (event) => {
        const target = event.target as IDBRequest
        const _database = target.result as IDBDatabase
        resolve(_database)
      }

      // エラー時のコールバック関数
      request.onerror = (event) => {
        console.log('ERROR: DBをオープンできません。', event)
        reject(new Error('ERROR: DBをオープンできません。'))
      }
    }
  })
  return promise
}

export const useMembersStore = defineStore({
  id: 'members',
  state: (): State => {
    return {
      memberList: new Map<number, Member>(),
      isLoading: true
    }
  },
  getters: {
    getById: (state) => {
      return (id: number): Member => {
        const member = state.memberList.get(id) as Member
        return member
      }
    },
    isMemberListEmpty: (state): boolean => {
      return state.memberList.size == 0
    }
  },
  actions: {
    initList(): void {
      this.memberList.set(33456, {
        id: 33456,
        name: '田中太郎',
        email: 'bow@example.com',
        points: 35,
        note: '初回入会特典あり。'
      })
      this.memberList.set(47783, {
        id: 47783,
        name: '鈴木二郎',
        email: 'hoe@example.com',
        points: 53
      })
    },
    addMember(member: Member): void {
      this.memberList.set(member.id, member)
    },
    async prepareMemberList(): Promise<boolean> {
      const database = await getDataBase()
      const promise = new Promise<boolean>((resolve, reject) => {
        const transaction = database.transaction('members', 'readonly')
        const objectStore = transaction.objectStore('members')

        const memberList = new Map<number, Member>()
        const request = objectStore.openCursor()

        request.onsuccess = (event) => {
          const target = event.target as IDBRequest
          const cursor = target.result as IDBCursorWithValue
          if (cursor) {
            const id = cursor.key as number
            const member = cursor.value as Member
            memberList.set(id, member)
            cursor.continue()
          }
        }
        transaction.oncomplete = () => {
          this.memberList = memberList
          this.isLoading = false
          resolve(true)
        }

        transaction.onerror = (event) => {
          console.log('ERROR: データ取得に失敗。', event)
          reject(new Error('ERROR: データ取得に失敗。'))
        }
      })
      return promise
    },

    async insertmember(member: Member): Promise<boolean> {
      const memberAdd: Member = {
        ...member
      }
      const database = await getDataBase()
      const promise = new Promise<boolean>((resolve, reject) => {
        const transaction = database.transaction('members', 'readwrite')
        const objectStore = transaction.objectStore('members')
        objectStore.put(memberAdd)

        transaction.oncomplete = () => {
          resolve(true)
        }

        transaction.onerror = (event) => {
          console.log('ERROR: データ登録に失敗', event)
          reject('ERROR: データ登録に失敗。')
        }
      })
      return promise
    }
  }
})
