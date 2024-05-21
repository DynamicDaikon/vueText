import { defineStore } from 'pinia'
import type { Member } from '@/interfaces'

interface State {
  memberList: Map<number, Member>
}

export const useMembersStore = defineStore({
  id: 'members',
  state: (): State => {
    return {
      memberList: new Map<number, Member>()
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
    prepareMemberList(): void {
      let memberList = new Map<number, Member>()
      const memberListJSONstr = sessionStorage.getItem('memberList')
      if (memberListJSONstr != undefined) {
        const memberListJSON = JSON.parse(memberListJSONstr)
        memberList = new Map<number, Member>(memberListJSON)
      }

      this.memberList = memberList
    },
    insertmember(member: Member): void {
      this.memberList.set(member.id, member)
      const memberListJSONstr = JSON.stringify([...this.memberList])
      sessionStorage.setItem('memberList', memberListJSONstr)
    }
  }
})
