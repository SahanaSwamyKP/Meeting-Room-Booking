import { EmpTab } from "./emp-tab"
import { RoomTab } from "./room-tab"

export interface SlotTab {
    slotId: number
    roomId: number
    empId: number
    date: Date,
    sTime: Date,
    eTime: Date,
    active: boolean,
    emp: EmpTab,
    room: RoomTab
}
