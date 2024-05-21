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
    }
  },
  actions: {
    prepareMemberList(): void {
      let memberList = new Map<number, Member>()
      const memberListJSONstr = sessionStorage.getItem('memberList')
      if (memberListJSONstr != undefined) {
        const memberListJSON = JSON.parse(memberListJSONstr)
        memberList = new Map<number, Member>(memberListJSON)
      }

      this.memberList = memberList
    }
  }
})
