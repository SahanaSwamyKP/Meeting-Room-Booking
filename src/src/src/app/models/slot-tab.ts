
import { EmpTab } from "./emp-tab"
import { RoomTab } from "./room-tab"

export interface SlotTab {
    slotId: number
    roomId: number
    empId: number
    date:string,
    sTime: string,
    eTime: string,
    active: boolean,
    emp: EmpTab | null,
    room: RoomTab | null
}

